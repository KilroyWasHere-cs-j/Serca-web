<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import Announcements from '../components/Announcements.svelte';
	import HighlightedSites from '../components/HighlightedSites.svelte';
	import Newsletter from '../components/Newsletter.svelte';
	import Vudoo from '../components/Vudoo.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();

	let showPopup = false;

	// Check if the "visited" cookie is set
	function checkFirstVisit() {
		const visited = getCookie('visited');
		if (!visited) {
			showPopup = true;
		}
	}

	// Set a cookie
	function setCookie(name, value, days) {
		const d = new Date();
		d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000); // Set expiry date
		const expires = 'expires=' + d.toUTCString();
		document.cookie = `${name}=${value}; ${expires}; path=/`;
	}

	// Get a cookie by name
	function getCookie(name) {
		const decodedCookies = decodeURIComponent(document.cookie);
		const cookieArr = decodedCookies.split(';');
		for (let i = 0; i < cookieArr.length; i++) {
			let cookie = cookieArr[i].trim();
			if (cookie.indexOf(name + '=') === 0) {
				return cookie.substring(name.length + 1, cookie.length);
			}
		}
		return '';
	}

	// Call checkFirstVisit when the component is mounted
	import { onMount } from 'svelte';
	onMount(() => {
		checkFirstVisit();
	});

	function togglePopup() {
		showPopup = !showPopup;
	}
</script>

<Navbar />

<div
	class="mx-auto max-w-5xl border-x border-gray-400 bg-gradient-to-b from-gray-100 via-white to-gray-200 px-4 py-10 font-mono text-gray-900 shadow-md"
>
	<!-- Title -->
	<h1 class="mb-2 text-center text-4xl font-bold text-blue-900">
		Serca: AI-Powered Media Search Engine
	</h1>
	<p class="mb-6 text-center text-gray-700 italic">"We find what the internet forgot"</p>

	<!-- Table of Contents -->
	<div class="mb-10 rounded-md border border-yellow-400 bg-yellow-100 p-4 shadow-sm">
		<h2 class="mb-2 text-xl font-bold text-teal-800">🧭 Table of Contents</h2>
		<ul class="list-inside list-disc space-y-1 text-blue-700">
			<li><a href="#what-is-serca" class="hover:underline">What is Serca?</a></li>
			<li><a href="#how-does-serca" class="hover:underline">How does this service work?</a></li>
			<li><a href="#how-it-works" class="hover:underline">Under the hood</a></li>
			<li><a href="#sample-queries" class="hover:underline">Sample Queries</a></li>
			<li><a href="#api" class="hover:underline">Pricing</a></li>
			<li><a href="#highlighted-sites" class="hover:underline">Cool Sites</a></li>
		</ul>
	</div>

	<!-- What is Serca -->
	<section id="what-is-serca" class="mb-12">
		<h2 class="mb-2 text-2xl font-bold text-purple-800 underline">What is Serca?</h2>
		<p>
			Serca is an advanced search engine powered by AI and intelligent web scraping technology. It
			builds a comprehensive database by gathering URLs and their descriptions, enabling users to
			search using natural language. This allows for faster, more intuitive, and accurate search
			results, transforming the way people find information online.
		</p>
	</section>

	<!-- How the Serca service will work -->
	<section id="how-does-serca" class="mb-12">
		<h2 class="mb-2 text-2xl font-bold text-purple-800 underline">How does this service work?</h2>
		<p>
			We are committed to being as transparent as possible. We will maintain a free version to
			contribute to the betterment of the internet. Additionally, Serca will offer a paid version
			with extra features and support. This paid service will be tiered, providing enhanced services
			and search capabilities. While the internet is an amazing place, and we all love it!! It's not
			all sunshine and rainbows. Serca will implement a flagging system to mark inappropriate
			content, which will be inaccessible at the free tier. Paid tiers will have access to this
			content. Furthermore, all illegal content will be banned and reported to the proper
			authorities. If you have any questions or concerns, please feel free to <a
				href="mailto:gmtower1@gmail.com">contact</a
			> us.
		</p>
	</section>

	<!-- How It Works -->
	<section id="how-it-works" class="mb-12">
		<h2 class="mb-2 text-2xl font-bold text-purple-800 underline">Under the hood</h2>
		<ul class="list-inside list-disc text-gray-800">
			<li>
				<strong>Multimodal AI models</strong> (image, video, and audio[coming soon]) to analyze and process
				various types of media.
			</li>
			<li>
				<strong>Advanced web scraping and discovery</strong> techniques to uncover hidden media across
				the web.
			</li>
			<li>
				<strong>Edge computing</strong> systems to minimize environmental impact by processing data closer
				to the source.
			</li>
		</ul>
	</section>

	<!-- Sample Queries -->
	<section id="sample-queries" class="mb-12">
		<h2 class="mb-2 text-2xl font-bold text-purple-800 underline">Sample Queries</h2>
		<h3>Here are some sample queries to try. Please see search page for specifics.</h3>
		<div class="border border-gray-300 bg-white p-4 font-mono text-sm text-gray-800 shadow-inner">
			<pre>
> "people at the beach"
> "tv and broadcasts"
> "animals"
      </pre>
		</div>
	</section>

	<!-- Serca Pricing -->
	<section id="pricing" class="mb-12">
		<h2 class="mb-2 text-2xl font-bold text-purple-800 underline">Serca Pricing</h2>
		<div class="border border-gray-400 bg-gray-100 p-4 font-mono text-sm">
			<p>
				While the Serca-core is open source access to our database and search engine are not
				completely free. We need to charge small fees to support the servers and database.
			</p>
			<h2>Pay as you go pricing</h2>
			<p>
				Every new user will have a set number of queries per month free. After these queries are
				used up, they will be charged pre query.
			</p>
			<h2>Always free</h2>
			<p>The keyword searching method will remain free.</p>
		</div>
	</section>

	<!-- Highlighted Sites -->
	<section id="highlighted-sites" class="mb-12">
		<HighlightedSites />
	</section>

	<!-- Final Note -->
	<p class="mt-8 mb-4 text-center font-serif text-base text-gray-600 italic">Kilroy Was Here!</p>
</div>

<!-- Newsletter -->
<Newsletter />

<h1 class="m-4 flex justify-center text-4xl">Announcements</h1>

<!-- Announcements -->
<div class="mx-auto mt-6 max-w-5xl px-4">
	<Announcements
		title="Back end and AI updates"
		date="May 17, 2025"
		type="Development Milestone"
		content="It has been a bit since we added anything to announcements. We've been putting a ton of work into building out the backend.
		The entire AI pipeline and inference has been moved off of the cloud and can now run on a M1 Mac.
		It's important that we can run Serca on hardware that doesn't cost $10,000. Next is building out the API and search engine."
	/>
	<Announcements
		title="Serca launches into alpha"
		date="April 23, 2025"
		type="Development Milestone"
		content="Today our search engine and database talked for the first time. We are now officially in the alpha phase.
		There is definatly a ton of room to grow. For the next weeks we will be working on the following features:
		* Improved AI description
		* AI assisted search"
	/>
	<Announcements
		title="Abscissa is currently building out this page"
		date="April 7, 2025"
		type="Development"
		content="We are properly in the development trenches now. We will keep you posted."
	/>
	<Announcements
		title="Page creation"
		date="April 4, 2025"
		type="Development"
		content="This page was created"
	/>
</div>

{#if showPopup}
	<div class="overlay" on:click={togglePopup}></div>
	<div class="popup">
		<h2 class="text-2xl">Hello welcome the Serca!</h2>
		<p>
			We do use some cookies. We haven't added them to your browser yet. You'll see this popup each
			time. Oh and we do use cookies for some features.
		</p>
		<button class="m-4 border border-gray-300 p-4" on:click={togglePopup}>Close</button>
		<button
			class="m-4 border border-gray-300 p-4"
			on:click={() => {
				setCookie('visited', 'true', 365);
				togglePopup();
			}}>Accept</button
		>
	</div>
{/if}

<!-- Footer -->
<Vudoo />

<style>
	body {
		background-color: #d8a6c7; /* Piss Purple Background */
		font-family: 'Courier New', Courier, monospace;
		color: #222;
	}

	a {
		color: #0044aa;
	}

	a:hover {
		color: #000;
		background-color: #ffe;
	}

	pre {
		background-color: #f9f9f9;
		padding: 0.5rem;
		overflow-x: auto;
		font-family: 'Courier New', Courier, monospace;
	}

	h2 {
		border-left: 4px solid #ccc;
		padding-left: 0.5rem;
	}

	/* Subtle highlight effect */
	ul li:hover {
		background-color: #f0f0f0;
	}

	/* Overlay to dim the background */
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 10;
	}

	/* The popup container */
	.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
		z-index: 20;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 10;
	}

	/* The popup container */
	.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
		z-index: 20;
	}
</style>
