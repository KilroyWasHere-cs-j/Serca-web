<script>
	import Navbar from '../../components/Navbar.svelte';
	import * as CryptoJS from 'crypto-js';
	import { onMount } from 'svelte';

	let past_queries = [];

	export let data;

	let groqThoughts = '';
	let groqInternalThoughts = '';

	let query = '';
	let searching = false;

	// Shaw 256 hash :)
	function encryptKey(key) {
		let hash = CryptoJS.SHA256(key);
		return hash.toString();
	}

	async function sendPrompt(userprompt, db) {
		const prompt = `You are Serca an AI media search engine.`;

		const res = await fetch('/api/data/aisearch', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ prompt })
		});

		const data = await res.json();
		return data.response;
	}

	async function handleSearch() {
		if (!query) return; // stops people from searching for nothing
		// rate limiting
		if (!searching) {
			past_queries.push(query);
			searching = true;
			const output = await sendPrompt(query, JSON.stringify(await searchFromServer(), null, 2));
			[groqInternalThoughts, groqThoughts] = output.split('</think>');
			console.log(groqInternalThoughts);
			searching = false;
		}
	}

	async function searchFromServer() {
		console.log('Searching for:', query);
		const res = await fetch('/api/data/groqsearch', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query })
		});

		const data_r = await res.json();
		console.log(data_r);
		return data_r;
	}
</script>

<Navbar />

<div class="m-4 bg-yellow-200 p-4">
	<h1>What your looking at is a work in progress page for an AI search function</h1>
	<p>The likely hood is that this won't work if you try anything</p>
</div>

<div class="flex w-screen flex-col items-center justify-center">
	<input
		bind:value={query}
		type="text"
		placeholder="Describe your media here..."
		class="retro-font m-4 w-full border-2 border-gray-400 bg-gray-100 p-4 text-lg text-gray-800 focus:ring-2 focus:ring-gray-600 focus:outline-none"
	/>

	{#if searching}
		<p class="m-4 bg-green-600 p-2 text-center">Searching...</p>
	{:else}
		<p class="m-4 bg-green-600 p-2 text-center">Ready to search!</p>
	{/if}

	<button
		on:click={handleSearch}
		class="retro-font text-red mt-6 border-2 border-blue-600 bg-blue-300 px-6 py-3 font-bold hover:bg-blue-400"
	>
		Ask
	</button>

	<h1>Serca says</h1>
	<div class="m-4 bg-green-600 p-2 text-center">
		{groqThoughts}
	</div>
</div>
