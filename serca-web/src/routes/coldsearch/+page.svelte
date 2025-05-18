<script lang="ts">
	import { Stream } from 'groq-sdk/lib/streaming.mjs';
	import Navbar from '../../components/Navbar.svelte';

	// Groq

	// Mostly useless variables, but if I renamed the system might implode
	let response = '';
	let database = { results: [] };
	let keywords = [];
	let words = [];

	let showSearch = false;
	let showInvalid = false;

	let query = '';

	// Regex for preventing SQL injection, XSS attacks, and HTML injection
	const regex = /^[A-Za-z0-9\s.,!?'"():;\-\/&]+$/;
	const sqlRegex = /\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|UNION|WHERE|FROM)\b/i;
	const htmlTagRegex = /<[^>]*>/g;

	let email = '';
	let key = '';

	// Query the database for the searched terms
	async function handleSearch() {
		console.log('Search triggered');
		if (!regex.test(query)) {
			query = '';
			return;
		}
		if (sqlRegex.test(query)) {
			query = '';
			return;
		}
		if (htmlTagRegex.test(query)) {
			query = '';
			return;
		}
		// Lil bit of prompt engineering who the fuck knows if this shit will actually do what I want it to do
		let groq = await sendPrompt(
			query,
			'Extract keywords, just a list of words, no formatting, no other text, seperate the words with a space, [video, gif, image, etc...] are not keywords'
		);
		const match = groq.match(/<\/think>(.*)/s);

		// Fix the messy response Groq gives us
		let afterThink = match ? match[1].trim() : '';
		console.log('Groq' + afterThink);
		afterThink = afterThink.split(' ');
		database = await searchFromServer(afterThink.join(' '));
	}

	// Sends prompt to Groq API
	async function sendPrompt(query: string, prompt: string) {
		prompt += ':' + query;
		const res = await fetch('/api/groq-chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ prompt })
		});

		const data = await res.json();
		return data.response;
	}

	//Sends query to db API
	async function searchFromServer(query) {
		console.log('Searching for:', query);
		const res = await fetch('/api/data/search', {
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

<div class="flex h-full w-screen flex-col items-center">
	<!-- Fullscreen Centered Page -->
	<div class="flex min-h-screen flex-col items-center justify-center bg-gray-200">
		<!-- Info box -->
		<div class="info-box m-8 w-full border border-gray-800 bg-yellow-100 p-8 sm:w-[600px]">
			<h1 class="retro-font mb-6 text-4xl text-gray-600">Important Notice</h1>
			<p>
				This service is still in development. This is not represent the final project. Please be
				patient. Search at your own risk, not all searches are guaranteed to be accurate, or
				complete. Searches may result in NSFW content. We will not be held responsible for any
				content that may be found. We understand the descriptions are lacking and/or are incorrect.
				We are working on improving the prompts for the AI model. Lastly we will be mostly likely
				adding an AI based search chatbot/field to better searching.
			</p>
			<!-- <p>He this service is down for maintenance. Please check back later.</p> -->
		</div>

		<!-- Centered Search Box -->
		<div class="search-box w-full max-w-xl border border-gray-600 bg-white p-8 text-center">
			<h1 class="retro-font mb-6 text-4xl text-gray-800">Serca Search</h1>

			<input
				bind:value={query}
				type="text"
				placeholder="Place search terms here..."
				class="retro-font w-full rounded-lg border-2 border-gray-400 bg-gray-100 p-4 text-lg text-gray-800 focus:ring-2 focus:ring-gray-600 focus:outline-none"
			/>

			<button
				on:click={handleSearch}
				class="retro-font text-red mt-6 border-2 border-blue-600 bg-blue-300 px-6 py-3 font-bold hover:bg-blue-400"
			>
				Search
			</button>

			<p class="retro-font mt-6 text-gray-600 italic">"We find what the internet forgot"</p>
		</div>

		<div class="results-box m-8 border border-gray-600 bg-white p-8">
			<h1 class="retro-font text-gray-600 italic">We found...</h1>
			<!-- <p>{database.results}</p> -->
			{#each database.results as row}
				<div class="m-4 border border-gray-600 bg-white p-4">
					<h1 class="text-blue-500">
						<a href={row.url} target="_blank" rel="noopener noreferrer">{row.url}</a>
					</h1>
					<p class="m-2 text-gray-600">
						{row.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	/* Retro font */
	.retro-font {
		font-family: 'Courier New', Courier, monospace;
		font-size: 16px;
		color: #333333;
		line-height: 1.5;
	}

	/* Simple bounce animation for title */
	@keyframes bounce {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-8px);
		}
		100% {
			transform: translateY(0);
		}
	}

	.animate-bounce {
		animation: bounce 1s infinite;
	}

	/* Button and input fields look more retro */
	input,
	button {
		font-family: 'Courier New', Courier, monospace;
	}

	/* Button Styles */
	button {
		background-color: #0066cc; /* Retro blue */
		border: 1px solid #003366; /* Dark blue border */
		color: white;
		text-transform: uppercase;
		letter-spacing: 1px;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	button:hover {
		background-color: #0055bb; /* Slightly darker blue on hover */
	}

	/* Input field */
	input {
		border: 1px solid #bbbbbb; /* Dull gray border */
		background-color: #f5f5f5; /* Very light gray */
	}

	input:focus {
		border-color: #0066cc;
		background-color: #ffffff;
	}

	/* Background color */
	body {
		background-color: #e0e0e0; /* Light gray */
	}

	/* Text styling */
	h1,
	p {
		font-family: 'Courier New', Courier, monospace;
	}

	/* Responsive styles */
	@media (max-width: 768px) {
		.info-box,
		.search-box,
		.results-box {
			width: 100%;
			padding: 4%;
		}

		.search-box input {
			font-size: 14px;
		}
	}

	@media (max-width: 480px) {
		.retro-font {
			font-size: 14px; /* Adjust font size for smaller screens */
		}

		.search-box h1 {
			font-size: 2rem; /* Adjust heading size for smaller screens */
		}

		.search-box button {
			width: 100%; /* Make the button full width on smaller screens */
		}

		.results-box {
			padding: 16px;
		}
	}
</style>
