<!-- Future Gabe this code is shit please refactor -->
<!-- TODO
 - Process search terms into filters
 - Process query responce in to visual results -->
<script lang="ts">
	import Navbar from '../../components/Navbar.svelte';
	import * as CryptoJS from 'crypto-js';

	let states = {
		// Initialize state properties here
		unlocked: false,
		baduser: false,
		limitHit: false,
		showResults: false,
		searching: false
	};

	let user = {
		// Initialize user properties here
		email: '',
		key: ''
	};

	let history = {
		// Initialize history properties here
		past_queries: [],
		chat_history: ''
	};

	let ai = {
		// Initialize AI properties here
		groqThoughts: '',
		groqInternalThoughts: ''
	};

	let database = {
		// Initialize database properties here
		query: '',
		database_response: [],
		data_table_schema: `Table: urls
- url: string
- meta_data: string
- mature: boolean
- child: boolean
- flag: string`
	};

	function encryptKey(key: string) {
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
		let lemail = user.email;
		const res = await fetch('/api/data/setuserqcount', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ lemail })
		});

		if (res.status === 403) {
			const { error } = await res.json();
			console.warn('Limit hit:', error);
			states.unlocked = false;
			states.limitHit = true;
			// Handle limit reached — show a message, disable a button, etc.
		} else if (!res.ok) {
			const { error } = await res.json();
			console.error('Server error:', error);
		} else {
			const data = await res.json();
			console.log('Query succeeded:', data);
		}
	}

	async function sendPrompt(userprompt: string) {
		const prompt = `You are **Serca**, an AI-powered media search assistant.
json {
  "keywords": ["keyword1", "keyword2", ...],
  "mature": false,
  "child": true
}

Database schema:
${database.data_table_schema}

Chat history:
${history.chat_history}

User asks:
${userprompt}`;

		const res = await fetch('/api/data/aisearch', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ prompt })
		});

		const data = await res.json();
		let response = data.response;

		history.chat_history += `User said: ${userprompt}\n You said: ${response}\n`;
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
		console.log('Handling Search');
		// if (!database.query || states.searching) return;
		// history.past_queries.push(database.query);
		// history.past_queries = [...history.past_queries];
		// states.searching = true;

		// const output = await sendPrompt(database.query);
		// [ai.groqInternalThoughts, ai.groqThoughts] = output.split('</think>');
		// states.searching = false;
		// database.query = '';

		if (!database.query || states.searching) return;

		let filters = database.query.split(' ');
		queryDatabase(filters);
	}

	//async function queryDatabase(filters) {
	async function queryDatabase(extracted_filters: string[]) {
		let filters = {
			keywords: [...extracted_filters],
			mature: false,
			child: false
		};
		console.log(filters);
		try {
			console.log('Query running');
			const res = await fetch('/api/data/searchwhere', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ filters })
			});
			const data = await res.json();
			database.database_response = data.results || [];
			console.log('DB says', database.database_response);
		} catch (err) {
			console.error('Failed to query database:', err);
			database.database_response = [];
		}
	}

	async function validateUser() {
		console.log('Attempting to validate user');
		try {
			let ekey = encryptKey(user.key);
			let lemail = user.email;
			const res = await fetch('/api/data/signin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ lemail, ekey })
			});

			const data = await res.json();
			if (res.ok && data.validuser) {
				states.unlocked = true;
				states.baduser = false;
				console.log('User validated successfully!');
				return 'User validated successfully!';
			} else {
				states.unlocked = false;
				states.baduser = true;
				console.log(data.error || 'Validation failed.');
				return data.error || 'Validation failed.';
			}
		} catch (err) {
			return 'Network or server error.';
			console.error('err', err);
		}
	}
</script>

<Navbar />

<!-- Warning -->
<div class="m-4 border border-gray-400 bg-[#ffffe0] px-4 py-3 text-sm text-black">
	<p>
		<b>NOTE:</b> This isn't going to work yet... It's not currently connected to a the database. We're
		still refining the search function. We will email when everything is workable.
	</p>
</div>

<!-- Serca is still being developed. So please bare with whilst we try and get this tool working -->

{#if states.limitHit}
	<div class="m-4 border border-gray-400 bg-red-300 p-4">
		<h1>Hey you ran out of queries!!</h1>
		<p>
			This isn't the end of the line you can pay for more... Although that isn't currently
			supported. It'll be reset next month.
		</p>
	</div>
{/if}

{#if states.baduser}
	<div class="m-4 border border-gray-500 bg-red-600 p-4">
		<h1>Login failed</h1>
		<p>Something isn't right about the credentials you gave us</p>
	</div>
{/if}

{#if !states.unlocked}
	<div class="m-4 bg-green-300 p-10">
		<h1>Login</h1>
		<label for="email" class="mb-1 block text-base font-bold">Email:</label>
		<input
			bind:value={user.email}
			type="text"
			id="email"
			class="w-full border border-black bg-white px-2 py-1 font-mono text-sm text-black"
		/>

		<label for="key" class="mb-1 block text-base font-bold">Key:</label>
		<input
			bind:value={user.key}
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

{#if states.unlocked}
	<button
		class="mt-3 cursor-pointer border border-blue-800 bg-blue-100 px-4 py-1 text-sm font-bold text-blue-800"
		on:click={handleSearch}
	>
		Force Search
	</button>
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
				bind:value={database.query}
				type="text"
				id="query"
				class="w-full border border-black bg-white px-2 py-1 font-mono text-sm text-black"
			/>

			{#if states.searching}
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
			{ai.groqThoughts}
		</div>

		<hr class="my-4 border-t border-black" />

		<h2 class="mb-2 text-xl font-bold">Results:</h2>
		<ul class="list-disc pl-5 text-sm text-gray-900">
			{#each database.database_response as row}
				<li className="result-item">
					<div className="url">
						<h1>🔗 <a href={row.url} target="_blank" rel="noopener noreferrer">{row.url}</a></h1>
					</div>

					<div className="meta">
						<h2>📝 Meta Data</h2>
						<p>{row.meta_data}</p>
					</div>

					<div className="flags">
						<h3>🚩 Flags</h3>
						<ul>
							<li>{row.mature ? '🔞 Mature Content' : '✅ Not Mature'}</li>
							<li>{row.child ? '🚫 Does Not Include Children' : '🧒 Includes Children'}</li>
						</ul>
					</div>
					x
				</li>
			{/each}
		</ul>

		<hr class="my-4 border-t border-black" />

		<div class="text-xs text-gray-600">
			<p><b>Past Queries:</b></p>
			<ul class="ml-5 list-disc">
				{#each history.past_queries as item}
					<li>{item}</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}
