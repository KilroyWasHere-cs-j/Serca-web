<script lang="ts">
  // Pass in: database.database_response (array)
  export let results: Array<Record<string, any>> = [];

  const clampLen = 260;

  function preview(text: string, expanded: boolean) {
    if (!text) return "";
    if (expanded) return text;
    return text.length > clampLen ? text.slice(0, clampLen).trimEnd() + "…" : text;
  }

  // Track expanded state per id (or index fallback)
  let expanded: Record<string, boolean> = {};

  function keyFor(item: any, idx: number) {
    // Prefer stable IDs if you have them
    return String(item?.id ?? idx);
  }

  function toggle(item: any, idx: number) {
    const k = keyFor(item, idx);
    expanded = { ...expanded, [k]: !expanded[k] };
  }

  // Pick "extra" fields to show if they exist (optional)
  const extraKeys = ["url", "source", "tags", "score", "created_at"];
</script>

{#if !results || results.length === 0}
  <div class="rounded-xl border border-dashed p-6 text-sm text-gray-600">
    No results yet.
  </div>
{:else}
  <div class="space-y-4">
    {#each results as item, idx (keyFor(item, idx))}
      <article class="rounded-2xl border bg-white p-5 shadow-sm">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <h3 class="truncate text-lg font-semibold text-gray-900">
              {item.name ?? "Untitled"}
            </h3>
            <p class="mt-1 text-xs text-gray-500">
              ID: {item.id ?? idx}
            </p>
          </div>

          {#if item.url}
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              class="shrink-0 rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Open
            </a>
          {/if}
        </div>

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

        <!-- Optional extras row -->
        <div class="mt-4 flex flex-wrap gap-2">
          {#each extraKeys as k}
            {#if item?.[k] !== undefined && item?.[k] !== null}
              {#if Array.isArray(item[k])}
                {#each item[k] as tag}
                  <span class="rounded-full border px-2.5 py-1 text-xs text-gray-700">
                    {tag}
                  </span>
                {/each}
              {:else}
                <span class="rounded-full border px-2.5 py-1 text-xs text-gray-700">
                  {k}: {String(item[k])}
                </span>
              {/if}
            {/if}
          {/each}
        </div>
      </article>
    {/each}
  </div>
{/if}