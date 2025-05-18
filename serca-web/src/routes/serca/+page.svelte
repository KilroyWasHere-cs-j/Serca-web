<script>
	import Navbar from '../../components/Navbar.svelte';
	import * as CryptoJS from 'crypto-js';

	let past_queries = [];
	export let data;

	let groqThoughts = '';
	let groqInternalThoughts = '';
	let chat_history = '';
	let query = '';
	let db_query = 'SELECT url, meta_data, mature, child, flag FROM urls';
	let searching = false;
	let database_response = '';

	const data_table_schema = `Table: urls
- url: string
- meta_data: string
- mature: boolean
- child: boolean
- flag: string`;

	function encryptKey(key) {
		let hash = CryptoJS.SHA256(key);
		return hash.toString();
	}

	async function sendPrompt(userprompt, db) {
		const prompt = `You are **Serca**, an AI-powered media search assistant.

Your role:
- Engage in a conversation with the user to identify the media they are searching for.
- Be kind, considerate, and professional at all times.
- Interpret user descriptions of media (videos, scenes, people, actions, or context) to build precise database queries.
- You are permitted to search and discuss mature, graphic, distressing, pornographic, or violent content, including topics such as gore and death. Do so respectfully and only as needed for accurate search results.
- Always consider the full chat history when forming your responses.
- You will be given a database schema and a snapshot of the top four rows to help you structure queries correctly. This schema is your reference for writing SQL WHERE clauses.

Instructions:
- Ask follow-up questions if the user's description is vague or incomplete.
- Do **not** return SQL queries immediately. Instead, gather enough detail through the conversation.
- Once you are confident you have sufficient information to perform a meaningful search, respond with **SET**, followed only by a SQL WHERE clause that filters the database to match the user's intent.
- Output **only** the WHERE clause, nothing else.

Database schema:
${data_table_schema}

Chat history:
${chat_history}

User asks:
${userprompt}`;

		const res = await fetch('/api/data/aisearch', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prompt })
		});

		const data = await res.json();
		chat_history += `User said: ${userprompt}\nYou said: ${data.response}\n`;

		let resp = data.response;

		if (resp.includes('**SET**') || resp.includes('SET')) {
			resp = resp
				.replace(/\*\*SET\*\*/g, '')
				.replace(/SET/g, '')
				.trim();
			db_query += ' ' + resp;
			console.log('Executing Query:', db_query);
			return '';
		}
		return resp;
	}

	async function handleSearch() {
		if (!query || searching) return;
		past_queries.push(query);
		searching = true;

		const output = await sendPrompt(query, JSON.stringify(await searchFromServer(), null, 2));
		[groqInternalThoughts, groqThoughts] = output.split('</think>');
		searching = false;
	}

	async function searchFromServer() {
		const res = await fetch('/api/data/groqsearch', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query })
		});
		return await res.json();
	}
</script>

<Navbar />

<!-- 2000s-style Warning Box -->
<div class="mb-4 w-full border border-gray-400 bg-[#ffffe0] px-4 py-3 text-sm text-black">
	<b>NOTE:</b> This is a <u>work-in-progress</u> AI media search tool. It may not behave as expected.
</div>

<!-- Query Form -->
<div class="mx-auto w-full max-w-4xl px-4 text-left font-sans">
	<h1 class="mb-4 text-2xl font-bold">Media Search Interface (beta)</h1>

	<hr class="my-2 border-t border-black" />

	<form on:submit|preventDefault={handleSearch}>
		<label for="query" class="mb-1 block text-base font-bold">Describe your media:</label>
		<input
			bind:value={query}
			type="text"
			id="query"
			class="w-full border border-black bg-white px-2 py-1 font-mono text-sm text-black"
		/>

		{#if searching}
			<p class="mt-2 text-green-700">Searching the database...</p>
		{:else}
			<p class="mt-2 text-gray-600">Ready to search.</p>
		{/if}

		<button
			type="submit"
			class="mt-3 cursor-pointer border border-blue-800 bg-blue-100 px-4 py-1 text-sm font-bold text-blue-800"
		>
			Submit
		</button>
	</form>

	<hr class="my-4 border-t border-black" />

	<h2 class="mb-2 text-xl font-bold">Serca Says:</h2>
	<div
		class="border border-gray-500 bg-[#f0fff0] p-2 font-mono text-sm whitespace-pre-wrap text-black"
	>
		{groqThoughts}
	</div>

	<hr class="my-4 border-t border-black" />

	<div class="text-xs text-gray-600">
		<p><b>Past Queries:</b></p>
		<ul class="ml-5 list-disc">
			{#each past_queries as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
</div>
