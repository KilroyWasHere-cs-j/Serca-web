<script lang="ts">
  export type ResolvedItem = {
    id: number | string;
    name?: string;
    body?: string;
    link?: string;
    similarity?: number;
    [key: string]: any;
  };

  export type SearchResponse = {
    datetime?: string;
    code?: string;
    query?: string;
    resolved?: ResolvedItem[];
    [key: string]: any;
  };

  export let db: SearchResponse | null = null;

  const clampLen = 240;
  let expanded: Record<string, boolean> = {};

  function keyFor(item: ResolvedItem, idx: number) {
    return String(item?.id ?? idx);
  }

  function toggle(item: ResolvedItem, idx: number) {
    const k = keyFor(item, idx);
    expanded = { ...expanded, [k]: !expanded[k] };
  }

  function preview(text: string, isExpanded: boolean) {
    if (!text) return "";
    if (isExpanded) return text;
    return text.length > clampLen ? text.slice(0, clampLen).trimEnd() + "…" : text;
  }

  function simPct(sim: any) {
    const n = Number(sim);
    if (!Number.isFinite(n)) return null;
    // similarity is 0..1, clamp just in case
    const p = Math.max(0, Math.min(1, n)) * 100;
    return Math.round(p);
  }

  function formatDate(iso?: string) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleString();
  }
</script>

{#if !db}
  <div class="rounded-2xl border border-dashed p-6 text-sm text-gray-600">
    Run a search to see results.
  </div>
{:else}
  <!-- Header / meta -->
  <div class="mb-4 rounded-2xl border bg-white p-5 shadow-sm">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <!-- <div>
        <div class="text-sm text-gray-500">Query</div>
        <div class="text-lg font-semibold text-gray-900">{db.query ?? "—"}</div>
      </div> -->

      <div class="flex flex-wrap items-center gap-2">
        <span
          class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
          class:text-green-700={db.code === "Success"}
          class:bg-green-50={db.code === "Success"}
          class:border-green-200={db.code === "Success"}
          class:text-gray-700={db.code !== "Success"}
          class:bg-gray-50={db.code !== "Success"}
          class:border-gray-200={db.code !== "Success"}
        >
          {db.code ?? "Unknown"}
        </span>

        {#if db.datetime}
          <span class="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
            {formatDate(db.datetime)}
          </span>
        {/if}

        <span class="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">
          {(db.resolved?.length ?? 0)} results
        </span>
      </div>
    </div>
  </div>

  <!-- Results list -->
  {#if !db.resolved || db.resolved.length === 0}
    <div class="rounded-2xl border border-dashed p-6 text-sm text-gray-600">
      No matches found.
    </div>
  {:else}
    <div class="space-y-4">
      {#each db.resolved as item, idx (keyFor(item, idx))}
        <article class="rounded-2xl border bg-white p-5 shadow-sm">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <h3 class="truncate text-lg font-semibold text-gray-900">
                {item.name ?? "Untitled"}
              </h3>
              <div class="mt-1 flex flex-wrap gap-2 text-xs text-gray-500">
                <span>ID: {item.id ?? idx}</span>

                {#if item.similarity !== undefined}
                  {#if simPct(item.similarity) !== null}
                    <span>Similarity: {simPct(item.similarity)}%</span>
                  {:else}
                    <span>Similarity: {String(item.similarity)}</span>
                  {/if}
                {/if}
              </div>
            </div>

            {#if item.link}
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                class="shrink-0 rounded-xl border px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
              >
                Open
              </a>
            {/if}
          </div>

          {#if simPct(item.similarity) !== null}
            <div class="mt-3">
              <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  class="h-full bg-gray-900"
                  style={`width: ${simPct(item.similarity)}%`}
                  aria-label="Similarity"
                />
              </div>
            </div>
          {/if}

          {#if item.body}
            <div class="mt-3 text-sm leading-6 text-gray-700">
              <p class="whitespace-pre-wrap">
                {preview(String(item.body), !!expanded[keyFor(item, idx)])}
              </p>

              {#if String(item.body).length > clampLen}
                <button
                  type="button"
                  class="mt-2 text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-500"
                  on:click={() => toggle(item, idx)}
                >
                  {expanded[keyFor(item, idx)] ? "Read less" : "Read more"}
                </button>
              {/if}
            </div>
          {/if}
        </article>
      {/each}
    </div>
  {/if}
{/if}