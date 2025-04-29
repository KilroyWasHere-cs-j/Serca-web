<script>
	import Navbar from '../../components/Navbar.svelte';

	let showDevlog = false;

	let logs = [
		{
			date: '2025-04-29',
			entry:
				"First devlog entry. Slowing day by day working to build a database worth a shit. It's presently a bitch to add anything to the db and the search function is damn near useless."
		}
	];
</script>

<Navbar />

{#if !showDevlog}
	<div class="mx-auto mt-10 max-w-3xl border border-gray-300 bg-[#fffff8] p-6 font-mono text-black">
		<h1 class="mb-4 text-center text-xl underline">
			What your about to bare witness to is my devlog.
		</h1>
		<p class="mb-2">Be warned that this log will definitely have some typos/spelling/bad words.</p>
		<p class="mb-4">You have been warned.</p>
		<button
			class="rounded border border-gray-400 bg-gray-200 px-3 py-1 text-black hover:bg-gray-300"
			on:click={() => (showDevlog = true)}
		>
			Show Devlog
		</button>
	</div>
{/if}

{#if showDevlog}
	<div class="mx-auto mt-10 max-w-3xl border border-gray-300 bg-[#fffff8] p-6 font-mono text-black">
		<h1 class="mb-6 text-center text-xl underline">develog.txt</h1>
		{#each logs as log}
			<div class="mb-6 border-b border-dotted border-gray-400 pb-4">
				<div class="font-bold text-gray-800">{log.date}</div>
				<div class="mt-2 whitespace-pre-wrap">{log.entry}</div>
			</div>
		{/each}
	</div>
{/if}
