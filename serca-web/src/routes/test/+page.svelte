<script>
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

	let data_db = [];

	onMount(async () => {
		const res = await fetch('/api/data');
		data_db = await res.json();
	});
</script>

<h1 class="flex justify-center">Testing page</h1>

<textarea bind:value={prompt} placeholder="Ask something..."></textarea>
<button on:click={sendPrompt}>Send</button>
<pre>{response}</pre>

{#each data_db as row}
	<p>{JSON.stringify(row)}</p>
{/each}
