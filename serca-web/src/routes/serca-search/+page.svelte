<script lang="ts">
    import Navbar from '../../components/Navbar.svelte';
    import SearchResults from '../../components/SearchResults.svelte';
    import * as CryptoJS from 'crypto-js';

    // ---------- UI Text Constants ----------
    const UI_TEXT = {
        auth: {
            limitTitle: "You ran out of queries",
            limitDesc: "It’ll reset next month. Paid top-ups aren’t supported yet.",
            errorTitle: "Login failed",
            errorDesc: "Something isn’t right about the credentials.",
            loginTitle: "Login",
            emailLabel: "Email",
            emailPlaceholder: "you@example.com",
            keyLabel: "Key",
            keyPlaceholder: "••••••••",
            submitBtn: "Login",
            loadingBtn: "Logging in…"
        },
        search: {
            headerTitle: "Media Search Interface (beta)",
            headerDesc: "Describe what you’re looking for. Results are ranked by similarity. No need to include \"video\" or \"image\" that is implicit.",
            warning: "Please also note that the database is currently small and growing, so results may be sparse. The search algorithm is designed to find relevant matches. Lastly please be mindful that the database may contain mature content, so avoid submitting queries with adult terms or explicit content if you want to steer clear of that. But remember that this is the internet and there may still be surprises and rule 32, 35 exist, so proceed with caution and happy searching!",
            inputLabel: "Describe your media",
            inputPlaceholder: "e.g. music video in black and white, 90s alt rock…",
            searchBtn: "Search",
            searchingBtn: "Searching…",
            clearBtn: "Clear",
            statusReady: "Ready.",
            statusActive: "Searching the database…",
            resultsTitle: "Results",
            resultsEmpty: "No results found.",
            historyTitle: "Past Queries",
            historyEmpty: "No queries yet."
        }
    };

    // ---------- Types ----------
    type SearchItem = {
        id: number | string;
        name?: string;
        body?: string;
        link?: string;
        similarity?: number;
        [k: string]: any;
    };

    type SearchResponse = {
        datetime?: string;
        code?: string;
        query?: string;
        resolved?: SearchItem[];
        [k: string]: any;
    };

    type Filters = {
        keywords: string[];
        mature: boolean;
        child: boolean;
    };

    // ---------- State ----------
    const auth = {
        unlocked: true,
        baduser: false,
        limitHit: false,
        email: '',
        key: ''
    };

    const history = {
        past_queries: [] as string[],
        chat_history: ''
    };

    const ai = {
        lastReply: '',
        groqThoughts: '',
        groqInternalThoughts: ''
    };

    const search = {
        query: '',
        searching: false,
        error: '' as string | '',
        result: null as SearchResponse | null
    };

    let signingIn = false;

    // ---------- Helpers ----------
    function encryptKey(key: string) {
        return CryptoJS.SHA256(key).toString();
    }

    function normalizeKeywords(q: string): string[] {
        return q.trim().split(/\s+/g).map((s) => s.toLowerCase()).filter(Boolean);
    }

    function safeJsonParse(text: string) {
        if (!text) return null;
        try { return JSON.parse(text); } catch { return null; }
    }

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
            return { ok: false, status: 0, data: null, error: e?.message || 'Network error' };
        }
    }

    async function logSearch(q: string) {
        if (!q) return;
        await apiPost('/api/data/logsearch', { search: q });
    }

    async function increaseUserCount() {
        const lemail = auth.email;
        const r = await apiPost<any>('/api/data/setuserqcount', { lemail });
        if (!r.ok && r.status === 403) {
            auth.unlocked = false;
            auth.limitHit = true;
            return;
        }
        if (!r.ok) console.error('setuserqcount error:', r.error);
    }

    // ---------- Search Logic ----------
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

        const original = Array.isArray(r.data.resolved) ? r.data.resolved : [];
        const sortedResolved = [...original].sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0));

        search.result = { ...r.data, resolved: sortedResolved };
        search.searching = false;
    }

    async function handleSearch() {
        if (!search.query.trim() || search.searching) return;
        const q = search.query.trim();
		if (q.length < 10) {
			search.error = 'Query is too short. Please limit to 10 words.';
			return;
		}
        history.past_queries = [q, ...history.past_queries].slice(0, 25);
        const filters: Filters = { keywords: normalizeKeywords(q), mature: false, child: false };

        await runSearch(filters);
        await logSearch(q);
        await increaseUserCount();
    }

    function clearSearch() {
        search.query = '';
        search.result = null;
        search.error = '';
    }

    async function validateUser() {
        if (signingIn) return;
        if (!auth.email.trim() || !auth.key.trim()) {
            auth.unlocked = false;
            auth.baduser = true;
            return;
        }
        signingIn = true;
        const ekey = encryptKey(auth.key);
        const lemail = auth.email.trim();
        const r = await apiPost<{ validuser: boolean; error?: string }>('/api/data/signin', { lemail, ekey });

        if (r.ok && r.data?.validuser) {
            auth.unlocked = true;
            auth.baduser = false;
            auth.limitHit = false;
            signingIn = false;
            return;
        }
        auth.unlocked = false;
        auth.baduser = true;
        signingIn = false;
    }
</script>

<Navbar />

<main class="min-h-screen w-full bg-gray-100 px-4 py-10 font-sans text-gray-900">
    <div class="mx-auto w-full max-w-4xl">
        
        {#if auth.limitHit}
            <div class="mb-4 rounded-2xl border border-red-300 bg-red-50 p-4 shadow-sm">
                <h2 class="text-lg font-bold text-red-900">{UI_TEXT.auth.limitTitle}</h2>
                <p class="mt-1 text-sm text-red-800">{UI_TEXT.auth.limitDesc}</p>
            </div>
        {/if}

        {#if auth.baduser}
            <div class="mb-4 rounded-2xl border border-red-300 bg-red-50 p-4 shadow-sm">
                <h2 class="text-lg font-bold text-red-900">{UI_TEXT.auth.errorTitle}</h2>
                <p class="mt-1 text-sm text-red-800">{UI_TEXT.auth.errorDesc}</p>
            </div>
        {/if}

        {#if !auth.unlocked}
            <section class="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
                <h1 class="text-xl font-bold text-gray-900">{UI_TEXT.auth.loginTitle}</h1>
                <div class="mt-4">
                    <label for="email" class="mb-1 block text-sm font-bold text-gray-900">{UI_TEXT.auth.emailLabel}</label>
                    <input bind:value={auth.email} type="email" id="email" placeholder={UI_TEXT.auth.emailPlaceholder} class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-black focus:outline-none focus:ring" />
                </div>
                <div class="mt-4">
                    <label for="key" class="mb-1 block text-sm font-bold text-gray-900">{UI_TEXT.auth.keyLabel}</label>
                    <input bind:value={auth.key} type="password" id="key" placeholder={UI_TEXT.auth.keyPlaceholder} class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-black focus:outline-none focus:ring" />
                </div>
                <button class="mt-4 rounded-xl border border-blue-800 bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50" on:click={validateUser} disabled={signingIn}>
                    {signingIn ? UI_TEXT.auth.loadingBtn : UI_TEXT.auth.submitBtn}
                </button>
            </section>
        {:else}
            <section class="rounded-2xl border border-gray-300 bg-blue-50 p-6 shadow-sm">
                <h1 class="text-xl font-bold text-blue-900">{UI_TEXT.search.headerTitle}</h1>
                <p class="mt-2 text-sm text-gray-700">{UI_TEXT.search.headerDesc}</p>
                <p class="mt-2 text-xs text-gray-500 italic">{UI_TEXT.search.warning}</p>
            </section>

            <section class="mt-4 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
                <form on:submit|preventDefault={handleSearch}>
                    <label for="query" class="mb-2 block text-sm font-bold text-gray-900">{UI_TEXT.search.inputLabel}</label>
                    <div class="flex flex-col gap-2 sm:flex-row">
                        <input bind:value={search.query} type="text" id="query" placeholder={UI_TEXT.search.inputPlaceholder} class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-black focus:outline-none focus:ring" />
                        <div class="flex gap-2">
                            <button type="submit" disabled={search.searching} class="shrink-0 rounded-xl border border-blue-800 bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50">
                                {search.searching ? UI_TEXT.search.searchingBtn : UI_TEXT.search.searchBtn}
                            </button>
                            <button type="button" on:click={clearSearch} disabled={search.searching && !!search.query} class="shrink-0 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
                                {UI_TEXT.search.clearBtn}
                            </button>
                        </div>
                    </div>
                    
                    <div class="mt-3 text-sm">
                        {#if search.error}
                            <div class="rounded-xl border border-red-300 bg-red-50 p-3 text-red-900">{search.error}</div>
                        {:else if search.searching}
                            <div class="rounded-xl border border-green-300 bg-green-50 p-3 text-green-900">{UI_TEXT.search.statusActive}</div>
                        {:else}
                            <p class="text-gray-600">{UI_TEXT.search.statusReady}</p>
                        {/if}
                    </div>
                </form>
            </section>

            <section class="mt-6 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold text-gray-900">{UI_TEXT.search.resultsTitle}</h2>
                    {#if search.result?.resolved}
                        <p class="text-xs text-gray-600">Showing {search.result.resolved.length} results</p>
                    {/if}
                </div>
                <div class="mt-3">
                    <SearchResults db={search.result} />
                </div>
            </section>

            <section class="mt-6 rounded-2xl border border-gray-300 bg-white p-6 text-sm text-gray-700 shadow-sm">
                <p class="font-bold text-gray-900">{UI_TEXT.search.historyTitle}</p>
                {#if history.past_queries.length === 0}
                    <p class="mt-2 text-gray-600">{UI_TEXT.search.historyEmpty}</p>
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