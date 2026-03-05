<script lang="ts">
  // Top-level UI components
  import Navbar from '../../components/Navbar.svelte';
  import SearchResults from '../../components/SearchResults.svelte';

  // Used for hashing the user’s key before sending it to your API
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
    unlocked: true,    // if false -> show login form
    baduser: false,    // show "Login failed" banner
    limitHit: false,   // show "ran out of queries" banner
    email: '',
    key: ''
  };

  // Simple local query history + optional chat-style history for AI path
  const history = {
    past_queries: [] as string[],
    chat_history: ''
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

  // ---------- Helpers ----------
  // Hash the key client-side so the raw key isn't transmitted
  // NOTE: hashing alone is not a secure authentication mechanism; treat as obfuscation.
  function encryptKey(key: string) {
    return CryptoJS.SHA256(key).toString();
  }

  // Split query into lowercase keywords (space-separated)
  function normalizeKeywords(q: string): string[] {
    return q
      .trim()
      .split(/\s+/g)
      .map((s) => s.toLowerCase())
      .filter(Boolean);
  }

  // Generic POST helper:
  // - Always reads response body as text
  // - Tries to JSON.parse it (so it works with endpoints that return JSON)
  // - Returns { ok, status, data, error }
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
      const parsed = text ? JSON.parse(text) : null;

      // Non-2xx status: pass back a useful error string
      if (!res.ok) {
        return {
          ok: false,
          status: res.status,
          data: parsed,
          error: parsed?.error || `Request failed (${res.status})`
        };
      }

      return { ok: true, status: res.status, data: parsed };
    } catch (e: any) {
      // Network failure, CORS failures, etc.
      return { ok: false, status: 0, data: null, error: e?.message || 'Network error' };
    }
  }

  // Log user searches (non-blocking for UX, but you're awaiting it later)
  async function logSearch(q: string) {
    if (!q) return;
    await apiPost('/api/data/logsearch', { search: q });
  }

  // Increment the user's monthly query count.
  // If the server returns 403, lock the UI and show limit message.
  async function increaseUserCount() {
    const lemail = auth.email;
    const r = await apiPost<any>('/api/data/setuserqcount', { lemail });

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
  // This builds a prompt, calls your /api/data/aisearch endpoint,
  // and optionally parses a JSON object if the response contains "SET".
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
  // Executes the backend search and writes result into state.
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

    // ✅ Your API returns shape: { code, datetime, query, resolved }
    search.result = r.data;
    search.searching = false;
  }

  // Form submit handler:
  // - builds filters from the query
  // - runs search
  // - logs query
  // - increments query count
  async function handleSearch() {
    if (!search.query.trim() || search.searching) return;

    const q = search.query.trim();

    // Keep last 25 queries locally
    history.past_queries = [q, ...history.past_queries].slice(0, 25);

    // Default filters (no mature/child flags in UI yet)
    const filters: Filters = {
      keywords: normalizeKeywords(q),
      mature: false,
      child: false
    };

    // If you want AI-assisted filters later:
    // const aiFilters = await sendPrompt(q);
    // if (typeof aiFilters === 'object' && aiFilters?.keywords) filters.keywords = aiFilters.keywords;

    await runSearch(filters);
    await logSearch(q);
    await increaseUserCount();
  }

  // ---------- Auth ----------
  // Validates email + hashed key against your backend /signin endpoint
  async function validateUser() {
    const ekey = encryptKey(auth.key);
    const lemail = auth.email;

    const r = await apiPost<{ validuser: boolean; error?: string }>('/api/data/signin', { lemail, ekey });

    if (r.ok && r.data?.validuser) {
      auth.unlocked = true;
      auth.baduser = false;
      return;
    }

    // Anything else is treated as invalid credentials
    auth.unlocked = false;
    auth.baduser = true;
  }
</script>

<Navbar />

{#if auth.limitHit}
  <!-- Shown when backend enforces monthly query cap -->
  <div class="m-4 border border-gray-400 bg-red-300 p-4">
    <h1 class="text-lg font-bold">Hey you ran out of queries!!</h1>
    <p>
      This isn't the end of the line you can pay for more... Although that isn't currently supported.
      It'll be reset next month.
    </p>
  </div>
{/if}

{#if auth.baduser}
  <!-- Shown when login fails -->
  <div class="m-4 border border-gray-500 bg-red-600 p-4 text-white">
    <h1 class="text-lg font-bold">Login failed</h1>
    <p>Something isn't right about the credentials you gave us</p>
  </div>
{/if}

{#if !auth.unlocked}
  <!-- Login screen (shown when locked or not authenticated) -->
  <div class="m-4 rounded-2xl bg-green-300 p-10">
    <h1 class="text-xl font-bold">Login</h1>

    <label for="email" class="mb-1 mt-4 block text-base font-bold">Email:</label>
    <input
      bind:value={auth.email}
      type="text"
      id="email"
      class="w-full rounded-lg border border-black bg-white px-2 py-2 font-mono text-sm text-black"
    />

    <label for="key" class="mb-1 mt-4 block text-base font-bold">Key:</label>
    <input
      bind:value={auth.key}
      type="password"
      id="key"
      class="w-full rounded-lg border border-black bg-white px-2 py-2 font-mono text-sm text-black"
    />

    <button
      class="mt-4 rounded-xl border border-blue-800 bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800 hover:bg-blue-200"
      on:click={validateUser}
    >
      Login
    </button>
  </div>
{/if}

{#if auth.unlocked}
  <!-- Main search UI -->
  <div class="mx-auto w-full max-w-4xl px-4 pb-16 text-left font-sans">
    <div class="mb-4 rounded-2xl border border-gray-300 bg-blue-50 p-4">
      <h1 class="text-lg font-bold">Media Search Interface (beta)</h1>
      <p class="mt-2 text-sm text-gray-700">
        Describe what you’re looking for. Results are ranked by similarity.
      </p>
    </div>

    <!-- Search form -->
    <form on:submit|preventDefault={handleSearch} class="rounded-2xl border bg-white p-4 shadow-sm">
      <label for="query" class="mb-2 block text-base font-bold">Describe your media:</label>

      <div class="flex gap-2">
        <input
          bind:value={search.query}
          type="text"
          id="query"
          placeholder="e.g. music video in black and white, 90s alt rock…"
          class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-black focus:outline-none focus:ring"
        />

        <button
          type="submit"
          disabled={search.searching}
          class="shrink-0 rounded-xl border border-blue-800 bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800 hover:bg-blue-200 disabled:opacity-50"
        >
          {#if search.searching}Searching…{:else}Search{/if}
        </button>
      </div>

      <!-- Status line -->
      {#if search.error}
        <p class="mt-3 text-sm text-red-700">{search.error}</p>
      {:else if search.searching}
        <p class="mt-3 text-sm text-green-700">Searching the database…</p>
      {:else}
        <p class="mt-3 text-sm text-gray-600">Ready.</p>
      {/if}
    </form>

    <!-- Results -->
    <div class="mt-6">
      <h2 class="mb-2 text-xl font-bold">Results</h2>
      <SearchResults db={search.result} />
    </div>

    <!-- Past query list -->
    <div class="mt-8 rounded-2xl border bg-white p-4 text-xs text-gray-600 shadow-sm">
      <p class="font-bold">Past Queries</p>
      <ul class="ml-5 mt-2 list-disc">
        {#each history.past_queries as item}
          <li>{item}</li>
        {/each}
      </ul>
    </div>
  </div>
{/if}