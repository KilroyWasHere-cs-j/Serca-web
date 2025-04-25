<!-- <script>
	import { onMount } from 'svelte';
	export let data;

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
