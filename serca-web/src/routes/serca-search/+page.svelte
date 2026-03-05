<script lang="ts">
	// ---------------------------------------------
	// Search Page (beta)
	// - Same “rounded-2xl cards + soft borders + shadow-sm” aesthetic
	// - UX upgrades:
	//   • Clear button
	//   • Better status banners
	//   • Disable login + search while requests are in flight
	//   • Safe JSON parsing (handles non-JSON error bodies)
	//   • ✅ Sorts returned results by similarity (highest first)
	//
	// NOTE: Kept your state-object approach to minimize churn.
	// ---------------------------------------------

	// Top-level UI components
	import Navbar from '../../components/Navbar.svelte';
	import SearchResults from '../../components/SearchResults.svelte';

	// Hashing library for client-side key hashing (obfuscation, not true security)
	import * as CryptoJS from 'crypto-js';

	// ---------- Types ----------
	// One item returned from the backend search response
	type SearchItem = {
		id: number | string;
		name?: string;
		body?: string;
		link?: string;
		similarity?: number;
		[k: string]: any;
	};

	// Whole backend response object (your API returns "resolved")
	type SearchResponse = {
		datetime?: string;
		code?: string;
		query?: string;
		resolved?: SearchItem[];
		[k: string]: any;
	};

	// Filters you POST to /api/data/search
	type Filters = {
		keywords: string[];
		mature: boolean;
		child: boolean;
	};

	// ---------- State ----------
	// Auth/UI gating state
	const auth = {
		unlocked: true, // if false -> show login form
		baduser: false, // show "Login failed" banner
		limitHit: false, // show "ran out of queries" banner
		email: '',
		key: ''
	};

	// Query history (local-only)
	const history = {
		past_queries: [] as string[],
		chat_history: '' // kept for the optional AI path
	};

	// Optional AI state (not used in handleSearch right now)
	const ai = {
		lastReply: '',
		groqThoughts: '',
		groqInternalThoughts: ''
	};

	// Search UI state + last response
	const search = {
		query: '',
		searching: false,
		error: '' as string | '',
		result: null as SearchResponse | null
	};

	// Additional UI state for login request lifecycle
	let signingIn = false;

	// ---------- Helpers ----------
	/**
	 * Hash the key client-side so the raw key isn't transmitted.
	 * NOTE: This is not secure authentication by itself—treat it as obfuscation.
	 */
	function encryptKey(key: string) {
		return CryptoJS.SHA256(key).toString();
	}

	/**
	 * Split query into lowercase keywords (space-separated).
	 * Keeps it simple and predictable; you can swap later for NLP/AI filters.
	 */
	function normalizeKeywords(q: string): string[] {
		return q
			.trim()
			.split(/\s+/g)
			.map((s) => s.toLowerCase())
			.filter(Boolean);
	}

	/**
	 * Safe JSON parse:
	 * Some servers return HTML error pages or plain text on failure.
	 * This prevents runtime crashes when JSON.parse fails.
	 */
	function safeJsonParse(text: string) {
		if (!text) return null;
		try {
			return JSON.parse(text);
		} catch {
			return null;
		}
	}

	/**
	 * Generic POST helper:
	 * - Reads response as text, then attempts JSON parse
	 * - Returns a consistent envelope { ok, status, data, error }
	 */
	async function apiPost<T>(
		url: string,
		body: any
	): Promise<{ ok: boolean; status: number; data: T | null; error?: string }> {
		try {
			const res = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			});

			const text = await res.text();
			const parsed = safeJsonParse(text);

			if (!res.ok) {
				return {
					ok: false,
					status: res.status,
					data: (parsed as T) ?? null,
					error: (parsed as any)?.error || `Request failed (${res.status})`
				};
			}

			return { ok: true, status: res.status, data: (parsed as T) ?? null };
		} catch (e: any) {
			// Network failure, CORS failures, DNS issues, etc.
			return { ok: false, status: 0, data: null, error: e?.message || 'Network error' };
		}
	}

	/**
	 * Log user searches (non-blocking for UX, but awaited in handleSearch)
	 */
	async function logSearch(q: string) {
		if (!q) return;
		await apiPost('/api/data/logsearch', { search: q });
	}

	/**
	 * Increment the user's monthly query count.
	 * If backend returns 403, lock UI and show limit message.
	 */
	async function increaseUserCount() {
		const lemail = auth.email;

		const r = await apiPost<any>('/api/data/setuserqcount', { lemail });

		// 403 means "quota/limit hit"
		if (!r.ok && r.status === 403) {
			auth.unlocked = false;
			auth.limitHit = true;
			return;
		}

		if (!r.ok) {
			console.error('setuserqcount error:', r.error);
		}
	}

	// ---------- AI (optional path, not used in simple handleSearch) ----------
	/**
	 * Builds a prompt, calls /api/data/aisearch, and optionally parses JSON
	 * if the response contains a marker like "SET".
	 */
	async function sendPrompt(userprompt: string) {
		const prompt = `You are **Serca**, an AI-powered media search assistant.
Select the top 5 best matches that relate to the user's query. Suggest terms to enhance a users query

Chat history:
${history.chat_history}

User asks:
${userprompt}`;

		const r = await apiPost<{ response: string }>('/api/data/aisearch', { prompt });
		if (!r.ok || !r.data) {
			return r.error || 'AI request failed';
		}

		const response = r.data.response ?? '';

		// Append to running conversation transcript
		history.chat_history += `User said: ${userprompt}\nYou said: ${response}\n`;
		ai.lastReply = response;

		// If AI returns a JSON blob containing "SET", attempt to parse it
		if (response.includes('SET')) {
			const jsonMatch = response.match(/{[\s\S]*}/);
			if (jsonMatch) {
				try {
					const parsed = JSON.parse(jsonMatch[0]);
					return parsed; // possibly a Filters-like object
				} catch (e) {
					console.warn('AI JSON parse failed:', e);
				}
			}
		}

		return response;
	}

	// ---------- Search ----------
	/**
	 * Executes backend search and writes result into state.
	 * ✅ Sorts `resolved` by similarity (desc) before rendering.
	 */
	async function runSearch(filters: Filters) {
		search.searching = true;
		search.error = '';
		search.result = null;

		const r = await apiPost<SearchResponse>('/api/data/search', { filters });

		if (!r.ok || !r.data) {
			search.error = r.error || 'Search failed';
			search.searching = false;
			return;
		}

		// ✅ Sort by similarity (highest first).
		// Use a stable-sort pattern (decorate -> sort -> undecorate) so ties keep API order.
		const original = Array.isArray(r.data.resolved) ? r.data.resolved : [];
		const resolved = original
			.map((item, idx) => ({ item, idx }))
			.sort((a, b) => {
				const as = a.item.similarity ?? -Infinity;
				const bs = b.item.similarity ?? -Infinity;
				if (bs !== as) return bs - as;
				return a.idx - b.idx; // tie-breaker preserves original order
			})
			.map((x) => x.item);

		// ✅ Keep the original response but replace resolved with sorted
		search.result = { ...r.data, resolved };
		search.searching = false;
	}

	/**
	 * Form submit handler:
	 * - builds filters from query
	 * - runs search
	 * - logs query
	 * - increments user query count
	 */
	async function handleSearch() {
		if (!search.query.trim() || search.searching) return;

		const q = search.query.trim();

		// Update local history (max 25)
		history.past_queries = [q, ...history.past_queries].slice(0, 25);

		// Default filters (no mature/child toggles in UI yet)
		const filters: Filters = {
			keywords: normalizeKeywords(q),
			mature: false,
			child: false
		};

		// Optional AI-assisted filters:
		// const aiFilters = await sendPrompt(q);
		// if (typeof aiFilters === 'object' && aiFilters?.keywords) filters.keywords = aiFilters.keywords;

		await runSearch(filters);
		await logSearch(q);
		await increaseUserCount();
	}

	/**
	 * Clears the current query + results (client-only)
	 */
	function clearSearch() {
		search.query = '';
		search.result = null;
		search.error = '';
	}

	// ---------- Auth ----------
	/**
	 * Validates email + hashed key against /api/data/signin.
	 * Locks UI on failure and sets a banner state.
	 */
	async function validateUser() {
		if (signingIn) return;

		// Basic client-side checks
		if (!auth.email.trim() || !auth.key.trim()) {
			auth.unlocked = false;
			auth.baduser = true;
			return;
		}

		signingIn = true;

		const ekey = encryptKey(auth.key);
		const lemail = auth.email.trim();

		const r = await apiPost<{ validuser: boolean; error?: string }>('/api/data/signin', {
			lemail,
			ekey
		});

		if (r.ok && r.data?.validuser) {
			auth.unlocked = true;
			auth.baduser = false;
			auth.limitHit = false;
			signingIn = false;
			return;
		}

		// Anything else is treated as invalid credentials
		auth.unlocked = false;
		auth.baduser = true;
		signingIn = false;
	}
</script>

<Navbar />

<main class="min-h-screen w-full bg-gray-100 px-4 py-10 font-sans text-gray-900">
	<div class="mx-auto w-full max-w-4xl">
		{#if auth.limitHit}
			<!-- Shown when backend enforces monthly query cap -->
			<div class="mb-4 rounded-2xl border border-red-300 bg-red-50 p-4 shadow-sm">
				<h2 class="text-lg font-bold text-red-900">You ran out of queries</h2>
				<p class="mt-1 text-sm text-red-800">
					It’ll reset next month. Paid top-ups aren’t supported yet.
				</p>
			</div>
		{/if}

		{#if auth.baduser}
			<!-- Shown when login fails -->
			<div class="mb-4 rounded-2xl border border-red-300 bg-red-50 p-4 shadow-sm">
				<h2 class="text-lg font-bold text-red-900">Login failed</h2>
				<p class="mt-1 text-sm text-red-800">Something isn’t right about the credentials.</p>
			</div>
		{/if}

		{#if !auth.unlocked}
			<!-- Login card -->
			<section class="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
				<h1 class="text-xl font-bold text-gray-900">Login</h1>

				<div class="mt-4">
					<label for="email" class="mb-1 block text-sm font-bold text-gray-900">Email</label>
					<input
						bind:value={auth.email}
						type="email"
						id="email"
						placeholder="you@example.com"
						class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-black focus:outline-none focus:ring"
					/>
				</div>

				<div class="mt-4">
					<label for="key" class="mb-1 block text-sm font-bold text-gray-900">Key</label>
					<input
						bind:value={auth.key}
						type="password"
						id="key"
						placeholder="••••••••"
						class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-black focus:outline-none focus:ring"
					/>
				</div>

				<button
					class="mt-4 rounded-xl border border-blue-800 bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
					on:click={validateUser}
					disabled={signingIn}
				>
					{#if signingIn}Logging in…{:else}Login{/if}
				</button>
			</section>
		{/if}

		{#if auth.unlocked}
			<!-- Main search UI -->
			<section class="rounded-2xl border border-gray-300 bg-blue-50 p-6 shadow-sm">
				<h1 class="text-xl font-bold text-blue-900">Media Search Interface (beta)</h1>
				<p class="mt-2 text-sm text-gray-700">
					Describe what you’re looking for. Results are ranked by similarity. No need to include "video" or "image" that is implicit.
					Please also note that the database is currently small and growing, so results may be sparse. The search algorithm is designed to find relevant matches. 
					Lastly please be mindful that the database may contain mature content, so avoid submitting queries with adult terms or explicit content if you want to steer clear of that.
					But remember that this is the internet and there may still be surprises and rule 324, 35 exist, so proceed with caution and happy searching!
			</section>

			<!-- Search form -->
			<section class="mt-4 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
				<form on:submit|preventDefault={handleSearch}>
					<label for="query" class="mb-2 block text-sm font-bold text-gray-900">
						Describe your media
					</label>

					<div class="flex flex-col gap-2 sm:flex-row">
						<input
							bind:value={search.query}
							type="text"
							id="query"
							placeholder="e.g. music video in black and white, 90s alt rock…"
							class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-black focus:outline-none focus:ring"
						/>

						<div class="flex gap-2">
							<button
								type="submit"
								disabled={search.searching}
								class="shrink-0 rounded-xl border border-blue-800 bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{#if search.searching}Searching…{:else}Search{/if}
							</button>

							<button
								type="button"
								on:click={clearSearch}
								disabled={search.searching && !!search.query}
								class="shrink-0 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
							>
								Clear
							</button>
						</div>
					</div>

					<!-- Status line -->
					{#if search.error}
						<div class="mt-3 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-900">
							{search.error}
						</div>
					{:else if search.searching}
						<div class="mt-3 rounded-xl border border-green-300 bg-green-50 p-3 text-sm text-green-900">
							Searching the database…
						</div>
					{:else}
						<p class="mt-3 text-sm text-gray-600">Ready.</p>
					{/if}
				</form>
			</section>

			<!-- Results -->
			<section class="mt-6 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-bold text-gray-900">Results</h2>
					{#if search.result?.resolved}
						<p class="text-xs text-gray-600">
							Showing {search.result.resolved.length} result{search.result.resolved.length === 1 ? '' : 's'}
						</p>
					{/if}
				</div>

				<div class="mt-3">
					<!-- Renders API return shape: { code, datetime, query, resolved } -->
					<SearchResults db={search.result} />
				</div>
			</section>

			<!-- Past query list -->
			<section class="mt-6 rounded-2xl border border-gray-300 bg-white p-6 text-sm text-gray-700 shadow-sm">
				<p class="font-bold text-gray-900">Past Queries</p>
				{#if history.past_queries.length === 0}
					<p class="mt-2 text-gray-600">No queries yet.</p>
				{:else}
					<ul class="ml-5 mt-2 list-disc">
						{#each history.past_queries as item}
							<li class="font-mono text-xs">{item}</li>
						{/each}
					</ul>
				{/if}
			</section>
		{/if}
	</div>
</main>