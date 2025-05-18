<script lang="ts">
	import Navbar from '../../components/Navbar.svelte';
	import * as CryptoJS from 'crypto-js';

	// Cyrpt
	function encryptKey(key) {
		let hash = CryptoJS.SHA256(key);
		return hash.toString();
	}
	// Crypt end

	// Login
	let email = '';
	let key = '';
	// Login end

	// Toggles
	let showColdSearch = false;
	let showAISearch = true;
	// Toggle end

	// Cold Search
	let response = '';
	let database = { results: [] };
	let keywords = [];
	let words = [];

	let showSearch = false;
	let showInvalid = false;

	let coldQuery = '';

	const regex = /^[A-Za-z0-9\s.,!?'"():;\-\/&]+$/;
	const sqlRegex = /\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|UNION|WHERE|FROM)\b/i;
	const htmlTagRegex = /<[^>]*>/g;
	//Cold search end

	// AI search
	let past_queries = [];
	export let data;

	let groqThoughts = '';
	let groqInternalThoughts = '';
	let chat_history = '';
	let aiQuery = '';
	let db_query = 'SELECT url, meta_data, mature, child, flag FROM urls';
	let searching = false;
	let database_response = '';

	const data_table_schema = `Table: urls
- url: string
- meta_data: string
- mature: boolean
- child: boolean
- flag: string`;
	// End AI search

	/// Cold search logic
	async function handleColdSearch() {
		console.log('Search triggered');
		if (!regex.test(coldQuery) || sqlRegex.test(coldQuery) || htmlTagRegex.test(coldQuery)) {
			coldQuery = '';
			return;
		}

		let groq = await sendColdPrompt(
			coldQuery,
			'Extract keywords, just a list of words, no formatting, no other text, separate the words with a space, [video, gif, image, etc...] are not keywords'
		);

		const match = groq.match(/<\/think>(.*)/s);
		let afterThink = match ? match[1].trim() : '';
		console.log('Groq' + afterThink);
		afterThink = afterThink.split(' ');
		database = await searchFromServerCold(afterThink.join(' '));
	}

	async function sendColdPrompt(query: string, prompt: string) {
		prompt += ':' + query;
		const res = await fetch('/api/groq-chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prompt })
		});
		const data = await res.json();
		return data.response;
	}

	async function searchFromServerCold(query) {
		console.log('Searching for:', query);
		const res = await fetch('/api/data/search', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query })
		});
		const data_r = await res.json();
		console.log(data_r);
		return data_r;
	}
	// Cold search login end

	// AI Search
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
		if (!aiQuery || searching) return;
		past_queries.push(aiQuery);
		searching = true;

		const output = await sendPrompt(aiQuery, JSON.stringify(await searchFromServer(), null, 2));
		[groqInternalThoughts, groqThoughts] = output.split('</think>');
		searching = false;
	}

	async function searchFromServerAI() {
		const res = await fetch('/api/data/groqsearch', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ aiQuery })
		});
		return await res.json();
	}
	// AI Search end
</script>

<Navbar />

// Cold Search code

{#if showColdSearch}
	<div class="flex min-h-screen w-screen flex-col items-center bg-gray-200">
		<!-- Info Box -->
		<div class="m-4 w-full max-w-xl border border-gray-800 bg-yellow-100 p-6 text-gray-700">
			<h1 class="mb-4 font-mono text-3xl text-gray-800">Important Notice</h1>
			<p class="font-mono text-sm leading-relaxed">
				This service is still in development. This does not represent the final project. Please be
				patient. Search at your own risk — not all searches are guaranteed to be accurate or
				complete. Searches may result in NSFW content. We are not responsible for the content found.
				Descriptions may be lacking or incorrect. We're improving the AI prompts. An AI-based search
				chatbot will likely be added.
			</p>
		</div>

		<!-- Search Box -->
		<div class="w-full max-w-xl border border-gray-600 bg-white p-8 text-center shadow-md">
			<h1 class="mb-6 font-mono text-4xl text-gray-800">Serca Search</h1>

			<input
				bind:value={coldQuery}
				type="text"
				placeholder="Place search terms here..."
				class="w-full rounded-lg border-2 border-gray-400 bg-gray-100 p-4 font-mono text-lg text-gray-800 focus:ring-2 focus:ring-gray-600 focus:outline-none"
			/>

			<button
				on:click={handleColdSearch}
				class="mt-6 border-2 border-blue-600 bg-blue-300 px-6 py-3 font-mono font-bold tracking-wide text-white uppercase hover:bg-blue-400"
			>
				Search
			</button>

			<p class="mt-6 font-mono text-sm text-gray-600 italic">"We find what the internet forgot"</p>
		</div>

		<!-- Results -->
		{#if database.results.length > 0}
			<div class="mt-8 w-full max-w-3xl p-4">
				<h2 class="mb-4 font-mono text-xl text-gray-700 italic">We found...</h2>
				{#each database.results as row}
					<div class="mb-6 border border-gray-600 bg-white p-4 shadow-sm">
						<a
							href={row.url}
							target="_blank"
							rel="noopener noreferrer"
							class="font-semibold break-all text-blue-600"
						>
							{row.url}
						</a>
						<p class="mt-2 font-mono text-sm text-gray-700">{row.description}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}

// AI Search code

{#if showAISearch}
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
				bind:value={aiQuery}
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
{/if}
