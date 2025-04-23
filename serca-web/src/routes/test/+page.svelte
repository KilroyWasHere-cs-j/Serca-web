<!-- <script>
	import { onMount } from 'svelte';
	let prompt = '';
	let response = '';

	async function sendPrompt() {
		const res = await fetch('/api/groq-chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ prompt })
		});

		const data = await res.json();
		response = data.response;
	}
</script>

<h1 class="flex justify-center">Testing page</h1>

<textarea bind:value={prompt} placeholder="Ask something..."></textarea>
<button on:click={sendPrompt}>Send</button>
<pre>{response}</pre> -->

<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1>Data from Database</h1>

{#if data?.error}
	<p class="error">{data.error}</p>
{:else if data?.data}
	<ul>
		{#each data.data as item}
			<li>{item.your_column_1} - {item.your_column_2}</li>
		{/each}
	</ul>
{:else}
	<p>Loading data...</p>
{/if}

<style>
	.error {
		color: red;
		font-weight: bold;
	}
</style>
