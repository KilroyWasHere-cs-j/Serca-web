<script lang="ts">
  import Navbar from '../../components/Navbar.svelte';
  import SearchResults from '../../components/SearchResults.svelte';
  import * as CryptoJS from 'crypto-js';

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

  // ---------- Helpers ----------
  function encryptKey(key: string) {
    return CryptoJS.SHA256(key).toString();
  }

  function normalizeKeywords(q: string): string[] {
    return q
      .trim()
      .split(/\s+/g)
      .map((s) => s.toLowerCase())
      .filter(Boolean);
  }

  async function apiPost<T>(url: string, body: any): Promise<{ ok: boolean; status: number; data: T | null; error?: string }> {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const text = await res.text();
      const parsed = text ? JSON.parse(text) : null;

      if (!res.ok) {
        return { ok: false, status: res.status, data: parsed, error: parsed?.error || `Request failed (${res.status})` };
      }

      return { ok: true, status: res.status, data: parsed };
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

    if (!r.ok) {
      console.error('setuserqcount error:', r.error);
    }
  }

  // ---------- AI (optional path, not used in simple handleSearch) ----------
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
    history.chat_history += `User said: ${userprompt}\nYou said: ${response}\n`;
    ai.lastReply = response;

    // If your AI returns JSON filters with "SET", parse them here safely
    if (response.includes('SET')) {
      const jsonMatch = response.match(/{[\s\S]*}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          return parsed; // could be filters object
        } catch (e) {
          console.warn('AI JSON parse failed:', e);
        }
      }
    }

    return response;
  }

  // ---------- Search ----------
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

    // ✅ IMPORTANT: your API returns "resolved"
    search.result = r.data;
    search.searching = false;
  }

  async function handleSearch() {
    if (!search.query.trim() || search.searching) return;

    const q = search.query.trim();
    history.past_queries = [q, ...history.past_queries].slice(0, 25);

    const filters: Filters = {
      keywords: normalizeKeywords(q),
      mature: false,
      child: false
    };

    // if you want AI-assisted filters later, do it here:
    // const aiFilters = await sendPrompt(q);
    // if (typeof aiFilters === 'object' && aiFilters?.keywords) filters.keywords = aiFilters.keywords;

    await runSearch(filters);
    await logSearch(q);
    await increaseUserCount();
  }

  // ---------- Auth ----------
  async function validateUser() {
    const ekey = encryptKey(auth.key);
    const lemail = auth.email;

    const r = await apiPost<{ validuser: boolean; error?: string }>('/api/data/signin', { lemail, ekey });

    if (r.ok && r.data?.validuser) {
      auth.unlocked = true;
      auth.baduser = false;
      return;
    }

    auth.unlocked = false;
    auth.baduser = true;
  }
</script>

<Navbar />

<!-- Warning -->
<div class="m-4 border border-gray-400 bg-[#ffffe0] px-4 py-3 text-sm text-black">
  <p>
    <b>NOTE:</b> This isn't going to work yet... It's not currently connected to a the database. We're
    still refining the search function. We will email when everything is workable.
  </p>
</div>

{#if auth.limitHit}
  <div class="m-4 border border-gray-400 bg-red-300 p-4">
    <h1 class="text-lg font-bold">Hey you ran out of queries!!</h1>
    <p>
      This isn't the end of the line you can pay for more... Although that isn't currently supported.
      It'll be reset next month.
    </p>
  </div>
{/if}

{#if auth.baduser}
  <div class="m-4 border border-gray-500 bg-red-600 p-4 text-white">
    <h1 class="text-lg font-bold">Login failed</h1>
    <p>Something isn't right about the credentials you gave us</p>
  </div>
{/if}

{#if !auth.unlocked}
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
  <div class="mx-auto w-full max-w-4xl px-4 pb-16 text-left font-sans">
    <div class="mb-4 rounded-2xl border border-gray-300 bg-blue-50 p-4">
      <h1 class="text-lg font-bold">Media Search Interface (beta)</h1>
      <p class="mt-2 text-sm text-gray-700">
        Describe what you’re looking for. Results are ranked by similarity.
      </p>
    </div>

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

      {#if search.error}
        <p class="mt-3 text-sm text-red-700">{search.error}</p>
      {:else if search.searching}
        <p class="mt-3 text-sm text-green-700">Searching the database…</p>
      {:else}
        <p class="mt-3 text-sm text-gray-600">Ready.</p>
      {/if}
    </form>

    <div class="mt-6">
      <h2 class="mb-2 text-xl font-bold">Results</h2>

      <!-- ✅ Renders the real return shape: { code, datetime, query, resolved } -->
      <SearchResults db={search.result} />
    </div>

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