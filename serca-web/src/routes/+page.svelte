<script lang="ts">
	// ---------------------------------------------
	// Home / Landing Page
	// - Uses the same "clean cards + rounded-2xl + soft borders" aesthetic
	//   as your search page.
	// - Adds clear comments, removes duplicate CSS, and makes popup cookie UX work.
	// ---------------------------------------------

	// UI components
	import Navbar from '../components/Navbar.svelte';
	import Announcements from '../components/Announcements.svelte';
	import HighlightedSites from '../components/HighlightedSites.svelte';
	import Newsletter from '../components/Newsletter.svelte';
	import Vudoo from '../components/Vudoo.svelte';

	// Vercel instrumentation (Speed Insights is used; Analytics is imported but not used)
	// NOTE: If you want analytics, call injectAnalytics() too.
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	import { onMount } from 'svelte';

	// Enable Vercel performance tooling
	injectSpeedInsights();
	// injectAnalytics(); // uncomment if you actually want analytics enabled

	// ---------------------------------------------
	// Cookie popup state
	// ---------------------------------------------
	let showPopup = false;

	/**
	 * Read a cookie by name.
	 * Returns empty string if missing.
	 */
	function getCookie(name: string): string {
		// document.cookie -> "a=b; c=d; ..."
		const decodedCookies = decodeURIComponent(document.cookie || '');
		const cookieArr = decodedCookies.split(';');

		for (let i = 0; i < cookieArr.length; i++) {
			const cookie = cookieArr[i].trim();
			if (cookie.startsWith(name + '=')) {
				return cookie.substring(name.length + 1);
			}
		}
		return '';
	}

	/**
	 * Set a cookie with a simple expiry window (days).
	 * Adds SameSite=Lax to reduce CSRF-style cookie abuse.
	 * NOTE: "Secure" should be used in production on HTTPS.
	 */
	function setCookie(name: string, value: string, days: number) {
		const d = new Date();
		d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = 'expires=' + d.toUTCString();

		// If you are always HTTPS in prod, add `; Secure`
		document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; SameSite=Lax`;
	}

	/**
	 * Check whether this is a first visit (no "visited" cookie).
	 * If first visit -> show the cookie popup once.
	 */
	function checkFirstVisit() {
		const visited = getCookie('visited');
		showPopup = !visited;
	}

	/**
	 * Close/open the popup.
	 * (Used for overlay click and close button.)
	 */
	function togglePopup() {
		showPopup = !showPopup;
	}

	/**
	 * Accept cookies: store a long-lived flag and close.
	 */
	function acceptCookies() {
		setCookie('visited', 'true', 365);
		showPopup = false;
	}

	// Run the first-visit check on client mount (safe: document.cookie exists)
	onMount(() => {
		checkFirstVisit();
	});
</script>

<Navbar />

<!--
	Page shell:
	- max-w-5xl container
	- rounded-2xl cards
	- soft border + subtle background
	- minimal custom CSS (Tailwind-first)
-->
<main class="mx-auto w-full max-w-5xl px-4 pb-10 pt-8 font-sans text-gray-900">
	<!-- Hero / Header -->
	<section class="rounded-2xl border border-gray-300 bg-blue-50 p-6 shadow-sm">
		<h1 class="text-center text-4xl font-bold text-blue-900">Serca: AI-Powered Media Search Engine</h1>
		<p class="mt-2 text-center text-gray-700 italic">"We find what the internet forgot"</p>
	</section>

	<!-- Table of Contents -->
	<section class="mt-6 rounded-2xl border border-yellow-400 bg-yellow-100 p-5 shadow-sm">
		<h2 class="mb-2 text-xl font-bold text-teal-800">🧭 Table of Contents</h2>
		<ul class="list-inside list-disc space-y-1 text-blue-700">
			<li><a href="#what-is-serca" class="hover:underline">What is Serca?</a></li>
			<li><a href="#how-does-serca" class="hover:underline">How does this service work?</a></li>
			<li><a href="#how-it-works" class="hover:underline">Under the hood</a></li>
			<li><a href="#sample-queries" class="hover:underline">Sample Queries</a></li>
			<li><a href="#pricing" class="hover:underline">Pricing</a></li>
			<li><a href="#highlighted-sites" class="hover:underline">Cool Sites</a></li>
		</ul>
	</section>

	<!-- What is Serca -->
	<section id="what-is-serca" class="mt-8 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
		<h2 class="mb-2 text-2xl font-bold text-purple-800">What is Serca?</h2>
		<p class="text-gray-800">
			Serca is an AI-assisted search engine designed to help you find media and pages that normal search
			can’t surface easily. It builds a database by gathering URLs and descriptions, and it supports
			natural-language search so you can describe what you remember instead of guessing the “perfect keywords”.
		</p>
	</section>

	<!-- How the Serca service will work -->
	<section id="how-does-serca" class="mt-8 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
		<h2 class="mb-2 text-2xl font-bold text-purple-800">How does this service work?</h2>

		<p class="text-gray-800">
			We’re committed to being transparent. Serca will keep a free tier that’s useful and safe, and a paid
			tier with extra features and higher query limits to help cover server + database costs.
		</p>

		<p class="mt-3 text-gray-800">
			The internet has amazing content… and some content that needs stricter handling. Serca uses a
			flagging system to control access to sensitive content. The free tier won’t include flagged material,
			while paid tiers may allow access depending on policy and legality.
		</p>

		<p class="mt-3 text-gray-800">
			<strong>Important:</strong> Illegal content is not allowed. If illegal content is discovered, it will be
			removed and reported to the proper authorities.
		</p>

		<p class="mt-3 text-gray-800">
			Questions? Reach out via <a class="text-blue-700 hover:underline" href="mailto:gmtower1@gmail.com">email</a>.
		</p>
	</section>

	<!-- Under the hood -->
	<section id="how-it-works" class="mt-8 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
		<h2 class="mb-2 text-2xl font-bold text-purple-800">Under the hood</h2>

		<ul class="list-inside list-disc space-y-2 text-gray-800">
			<li>
				<strong>Multimodal AI models</strong> (image, video, and audio—coming soon) to understand different
				types of media.
			</li>
			<li>
				<strong>Web scraping + discovery</strong> to uncover hard-to-find pages and media across the web.
			</li>
			<li>
				<strong>Edge computing</strong> to process data closer to the source and reduce unnecessary load.
			</li>
		</ul>
	</section>

	<!-- Sample Queries -->
	<section id="sample-queries" class="mt-8 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
		<h2 class="mb-2 text-2xl font-bold text-purple-800">Sample Queries</h2>
		<p class="text-gray-800">Here are a few examples. (See the search page for specifics.)</p>

		<div class="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 font-mono text-sm text-gray-800">
			<pre class="whitespace-pre-wrap">
> people at the beach
> tv and broadcasts
> animals
			</pre>
		</div>
	</section>

	<!-- Pricing -->
	<section id="pricing" class="mt-8 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
		<h2 class="mb-2 text-2xl font-bold text-purple-800">Pricing</h2>

		<p class="text-gray-800">
			While the Serca-core is open source, access to the hosted database and search API can’t be completely free.
			We charge small fees to support servers, storage, and indexing.
		</p>

		<div class="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800">
			<h3 class="text-base font-bold">Pay-as-you-use</h3>
			<p class="mt-1">
				Every new user gets a set number of free queries per month. After that, queries become paid (pricing TBD).
			</p>

			<h3 class="mt-4 text-base font-bold">What’s always free</h3>
			<p class="mt-1">The basic keyword searching method will remain free.</p>
		</div>
	</section>

	<!-- Highlighted Sites -->
	<section id="highlighted-sites" class="mt-8 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
		<h2 class="mb-4 text-2xl font-bold text-purple-800">Cool Sites</h2>
		<HighlightedSites />
	</section>

	<!-- Newsletter -->
	<section class="mt-8">
		<Newsletter />
	</section>

	<!-- Announcements header -->
	<section class="mt-10 rounded-2xl border border-gray-300 bg-blue-50 p-5 text-center shadow-sm">
		<h2 class="text-2xl font-bold text-blue-900">Announcements</h2>
	</section>

	<!-- Announcements list -->
	<section class="mt-6 space-y-4">
		<Announcements
			title="Spanish localization"
			date="September 15, 2025"
			type="Development Milestone"
			content="I have located someone willing to translate the website into Spanish. At some point we will try and do this for more languages."
		/>
		<Announcements
			title="API Development"
			date="September 15, 2025"
			type="Development Milestone"
			content="Between summer and school I haven't been able to work on this as I should be. But in that time I managed to build an AI embedding search engine that I think will work well here. As such I will be implementing it into Serca."
		/>
		<Announcements
			title="Back end and AI updates"
			date="May 17, 2025"
			type="Development Milestone"
			content="It has been a bit since we added anything to announcements. We've been putting a ton of work into building out the backend. The entire AI pipeline and inference has been moved off of the cloud and can now run on a M1 Mac. It's important that we can run Serca on hardware that doesn't cost $10,000. Next is building out the API and search engine."
		/>
		<Announcements
			title="Serca launches into alpha"
			date="April 23, 2025"
			type="Development Milestone"
			content="Today our search engine and database talked for the first time. We are now officially in the alpha phase. There is definitely a ton of room to grow. For the next weeks we will be working on the following features: * Improved AI description * AI assisted search"
		/>
		<Announcements
			title="Abscissa is currently building out this page"
			date="April 7, 2025"
			type="Development"
			content="We are properly in the development trenches now. We will keep you posted."
		/>
		<Announcements title="Page creation" date="April 4, 2025" type="Development" content="This page was created" />
	</section>

	<!-- Footer / signature line -->
	<p class="mt-10 text-center font-serif text-base text-gray-600 italic">Kilroy Was Here!</p>
</main>

<!-- Cookie popup (only on first visit) -->
{#if showPopup}
	<!-- Clicking the overlay closes the modal -->
	<div class="overlay" on:click={togglePopup}></div>

	<!-- Modal card -->
	<div class="popup" role="dialog" aria-modal="true" aria-label="Cookie notice">
		<h2 class="text-xl font-bold text-gray-900">Welcome to Serca</h2>
		<p class="mt-2 text-sm text-gray-700">
			We use cookies for basic features and to improve the experience. If you accept, we’ll store a simple “visited”
			flag so you don’t see this message again.
		</p>

		<div class="mt-4 flex flex-wrap gap-2">
			<button class="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-bold hover:bg-gray-50" on:click={togglePopup}>
				Close
			</button>

			<button class="rounded-xl border border-blue-800 bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800 hover:bg-blue-200" on:click={acceptCookies}>
				Accept
			</button>
		</div>
	</div>
{/if}

<!-- Footer component -->
<Vudoo />

<style>
	/* Keep styling minimal; Tailwind handles most of the look.
	   Only modal/overlay and page background need custom CSS. */

	:global(body) {
		background-color: #d8a6c7; /* your current background */
	}

	a {
		color: #0044aa;
	}
	a:hover {
		color: #000;
		background-color: #ffe;
	}

	/* Overlay to dim the background */
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 10;
	}

	/* The popup container (modal) */
	.popup {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: min(520px, calc(100% - 2rem));
		background: white;
		padding: 20px;
		border-radius: 16px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
		z-index: 20;
	}
</style>