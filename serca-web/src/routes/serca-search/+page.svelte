<script lang="ts">
	import Navbar from '../../components/Navbar.svelte';
	import * as CryptoJS from 'crypto-js';

	let email = '';
	let key = '';
	let unlocked = false;
	let limitHit = false;
	let unlockfailed = false;

	let past_queries = [];
	export let data;

	let groqThoughts = '';
	let groqInternalThoughts = '';
	let chat_history = '';
	let query = '';
	let searching = false;
	let database_response: any = [];

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

	async function logSearch(search: String) {
		console.log('Logging search: ', search);
		const res = await fetch('/api/data/logsearch', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ search })
		});
	}

	async function increaseUserCount() {
		const res = await fetch('/api/data/setuserqcount', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		if (res.status === 403) {
			const { error } = await res.json();
			console.warn('Limit hit:', error);
			unlocked = false;
			limitHit = true;
			// Handle limit reached — show a message, disable a button, etc.
		} else if (!res.ok) {
			const { error } = await res.json();
			console.error('Server error:', error);
		} else {
			const data = await res.json();
			console.log('Query succeeded:', data);
		}
	}

	async function sendPrompt(userprompt) {
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
- Do **not** execute query immediately. Instead, gather enough detail through the conversation.
- Always be verbose and comprehensive with the keywords you generate.
- Once you are confident you have sufficient information to perform a meaningful search, respond with **SET** followed by a structure like:
json {
  "keywords": ["keyword1", "keyword2", ...],
  "mature": false,
  "child": true
}

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
		let response = data.response;

		chat_history += `User said: ${userprompt}\n You said: ${response}\n`;
		logSearch(userprompt);
		increaseUserCount();

		if (response.includes('SET')) {
			console.log('SET passed');

			// Keep only the JSON block up to and including the first closing curly brace
			const trimmed = response.replace(/}(?=[^}]*$)[\s\S]*/, '}');

			try {
				const filters = JSON.parse(trimmed.match(/{[\s\S]*?}/)[0]);
				console.log(await queryDatabase(filters));
				return '';
			} catch (e) {
				console.error('Failed to parse JSON:', e);
				return response;
			}
		}

		return response;
	}

	async function handleSearch() {
		if (!query || searching) return;
		past_queries.push(query);
		past_queries = [...past_queries];
		searching = true;

		const output = await sendPrompt(query);
		[groqInternalThoughts, groqThoughts] = output.split('</think>');
		searching = false;
		query = '';
	}

	async function queryDatabase(filters) {
		try {
			const res = await fetch('/api/data/searchwhere', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ filters })
			});
			const data = await res.json();
			database_response = data.results || [];
			console.log(database_response);
		} catch (err) {
			console.error('Failed to query database:', err);
			database_response = [];
		}
	}

	async function validateUser() {
		try {
			let ekey = encryptKey(key);
			const res = await fetch('/api/data/signin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, ekey })
			});

			const data = await res.json();
			if (res.ok && data.validuser) {
				unlocked = true;
				unlockfailed = false;
				return 'User validated successfully!';
			} else {
				unlocked = false;
				unlockfailed = true;
				return data.error || 'Validation failed.';
			}
		} catch (err) {
			return 'Network or server error.';
			console.error(err);
		}
	}
</script>

<Navbar />

<!-- Warning -->
<div class="m-4 border border-gray-400 bg-[#ffffe0] px-4 py-3 text-sm text-black">
	<p>
		<b>NOTE:</b> This tool isn't currently connected to a database. We will email when it is. Your welcome
		to still fiddle with it just don't expect anything just yet...
	</p>
</div>

<!-- Serca is still being developed. So please bare with whilst we try and get this tool working -->

{#if limitHit}
	<div class="m-4 border border-gray-400 bg-red-300 p-4">
		<h1>Hey you ran out of queries!!</h1>
		<p>
			This isn't the end of the line you can pay for more... Although that isn't currently
			supported. It'll be reset next month.
		</p>
	</div>
{/if}

{#if unlockfailed}
	<div class="m-4 border border-gray-500 bg-red-600 p-4">
		<h1>Login failed</h1>
		<p>Something isn't right about the credentials you gave us</p>
	</div>
{/if}

{#if !unlocked}
	<div class="m-4 bg-green-300 p-4 p-10">
		<h1>Login</h1>
		<label for="email" class="mb-1 block text-base font-bold">Email:</label>
		<input
			bind:value={email}
			type="text"
			id="email"
			class="w-full border border-black bg-white px-2 py-1 font-mono text-sm text-black"
		/>

		<label for="key" class="mb-1 block text-base font-bold">Key:</label>
		<input
			bind:value={key}
			type="text"
			id="key"
			class="w-full border border-black bg-white px-2 py-1 font-mono text-sm text-black"
		/>

		<button
			class="mt-3 cursor-pointer border border-blue-800 bg-blue-100 px-4 py-1 text-sm font-bold text-blue-800"
			on:click={validateUser}
		>
			Login
		</button>
	</div>
{/if}

{#if unlocked}
	<div class="mb-4 w-full border border-gray-400 bg-blue-300 p-4">
		<h1><b>NOTES:</b></h1>
		<br />
		<p>
			Serca search engine is an AI chatbot firstly and a search engine second. This is a strength
			and a weakness at the same time. Below are some notes to keep in mind when using this service.
		</p>
		<ul>
			<br />
			<li>
				- Be as clear as possible, the less conversational you are the easier time Serca will have
				processing your requests.
			</li>
			<br />
			<li>
				- Serca can lock up and run into issues where it continually attempts to prompt users for
				context and never runs a search. In these cases you will likely need to directly override
				the model. There are a couple methods to do this, but often saying "that's all I know" or
				"trigger search" is enough to start a search. If the issue continues please report the
				issue. And we will take a look.
			</li>
			<br />
			<li>
				- Serca will often ask you to note if the content is mature/adult in nature. Even if the
				content is seemingly unrelated to mature/adult themes. Why is this needed? See rule 34.
			</li>
		</ul>
	</div>

	<!-- Form -->
	<div class="mx-auto w-full max-w-4xl px-4 text-left font-sans">
		<h1 class="mb-4 text-2xl font-bold">Media Search Interface (beta)</h1>

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

		<h2 class="mb-2 text-xl font-bold">Results:</h2>
		<ul class="list-disc pl-5 text-sm text-gray-900">
			{#each database_response as row}
				<li>
					{row.url} — {row.meta_data} ({row.mature ? 'Mature' : 'Not Mature'}, {row.child
						? 'Child'
						: 'Not Child'})
				</li>
			{/each}
		</ul>

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
