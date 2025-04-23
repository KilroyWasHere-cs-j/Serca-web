<script lang="ts">
	import Navbar from '../../components/Navbar.svelte';
	import ResultBox from '../../components/ResultBox.svelte';

	// Groq

	let prompt = '';
	let response = '';

	let query = '';
	let query_valid = true;
	let sql_detected = false;
	let html_detected = false;
	let cooldown = false;

	const regex = /^[A-Za-z0-9\s.,!?'"():;\-\/&]+$/;
	const sqlRegex = /\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|UNION|WHERE|FROM)\b/i;
	const htmlTagRegex = /<[^>]*>/g;

	function handleSearch() {
		if (cooldown) return;
		cooldown = true;
		setTimeout(() => (cooldown = false), 3000);

		if (!regex.test(query)) {
			query_valid = false;
			query = '';
			return;
		}
		if (sqlRegex.test(query)) {
			sql_detected = true;
			query = '';
			return;
		}
		if (htmlTagRegex.test(query)) {
			html_detected = true;
			query = '';
			return;
		}

		query_valid = true;
		sql_detected = false;
		html_detected = false;
		console.log('Search valid');
	}

	async function sendPrompt() {
		prompt += ' ' + query;
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

	export let data;
</script>

<Navbar />

<!-- Fullscreen Centered Page -->
<div class="flex min-h-screen flex-col items-center justify-center bg-gray-200">
	<!-- Info box -->
	<div class="m-8 border border-gray-800 bg-yellow-100 p-8">
		<h1 class="retro-font mb-6 text-4xl text-gray-600">Important Notice</h1>
		<p>This service is currently not running we will update when it is.</p>
	</div>

	<!-- Query is invalid warning -->
	{#if query_valid == false}
		<div class="m-8 border border-gray-600 bg-red-700 p-8">
			<h1 class="flex justify-center text-2xl font-bold">Your query is invalid</h1>
			<p>Only letters, dashes (-), and exclamation marks (!) are allowed.</p>
		</div>
	{/if}

	{#if sql_detected == true}
		<div class="m-8 border border-gray-600 bg-pink-600 p-8">
			<h1 class="flex justify-center text-2xl font-bold">Potential SQL keyword detected.</h1>
			<p>I don't know what your try to do, but it can't be good</p>
		</div>
	{/if}

	{#if html_detected == true}
		<div class="m-8 border border-gray-600 bg-pink-600 p-8">
			<h1 class="flex justify-center text-2xl font-bold">Potential HTML scripting detected.</h1>
			<p>We do not allow for html searching</p>
		</div>
	{/if}

	{#if html_detected == cooldown}
		<div class="m-8 border border-gray-600 bg-pink-600 p-8">
			<h1 class="flex justify-center text-2xl font-bold">Slow down bro...</h1>
			<p>In order to prevent rate attacks we gonna pause you for a sec</p>
		</div>
	{/if}
	<!-- Centered Search Box -->
	<div class="w-full max-w-xl border border-gray-600 bg-white p-8 text-center">
		<h1 class="retro-font mb-6 text-4xl text-gray-800">Serca Search</h1>

		<input
			bind:value={query}
			type="text"
			placeholder="Describe your media here..."
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

	<div class="m-8 border border-gray-600 bg-white p-8">
		<h1 class="retro-font text-gray-600 italic">We found...</h1>
		<ResultBox />
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
</style>
