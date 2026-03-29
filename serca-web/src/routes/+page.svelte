<script lang="ts">
    import Navbar from '../components/Navbar.svelte';
    import Announcements from '../components/Announcements.svelte';
    import HighlightedSites from '../components/HighlightedSites.svelte';
    import Newsletter from '../components/Newsletter.svelte';
    import Vudoo from '../components/Vudoo.svelte';

    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    import { onMount } from 'svelte';

    injectSpeedInsights();

    let showPopup = false;

    function getCookie(name: string): string {
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

    function setCookie(name: string, value: string, days: number) {
        const d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = 'expires=' + d.toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; SameSite=Lax`;
    }

    function checkFirstVisit() {
        const visited = getCookie('visited');
        showPopup = !visited;
    }

    function togglePopup() {
        showPopup = !showPopup;
    }

    function acceptCookies() {
        setCookie('visited', 'true', 365);
        showPopup = false;
    }

    onMount(() => {
        checkFirstVisit();
    });
</script>

<Navbar />

<main class="mx-auto w-full max-w-5xl px-4 pb-10 pt-8 font-sans text-gray-900">
    <section class="rounded-2xl border border-blue-100 bg-blue-50 p-8 shadow-sm">
        <h1 class="text-center text-4xl font-bold text-blue-900 tracking-tight">Serca: AI-Powered Media Search Engine</h1>
        <p class="mt-2 text-center text-blue-700/80 italic font-medium">"We find what the internet forgot"</p>
    </section>

    <section class="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
        <h2 class="mb-2 text-xl font-bold text-amber-900">🧭 Table of Contents</h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-1 list-inside list-disc text-blue-700">
            <li><a href="#what-is-serca" class="hover:underline">What is Serca?</a></li>
            <li><a href="#how-does-serca" class="hover:underline">How does this service work?</a></li>
            <li><a href="#how-it-works" class="hover:underline">Under the hood</a></li>
            <li><a href="#sample-queries" class="hover:underline">Sample Queries</a></li>
            <li><a href="#pricing" class="hover:underline">Pricing</a></li>
            <li><a href="#highlighted-sites" class="hover:underline">Cool Sites</a></li>
        </ul>
    </section>

    <div class="space-y-8 mt-8">
        <section id="what-is-serca" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 class="mb-2 text-2xl font-bold text-purple-900">What is Serca?</h2>
            <p class="text-gray-700 leading-relaxed">
                Serca is an AI-assisted search engine designed to help you find media and pages that normal search
                can’t surface easily. It builds a database by gathering URLs and descriptions, and it supports
                natural-language search so you can describe what you remember instead of guessing the “perfect keywords”.
            </p>
        </section>

        <section id="how-does-serca" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 class="mb-2 text-2xl font-bold text-purple-900">How does this service work?</h2>
            <p class="text-gray-700 leading-relaxed">
                We’re committed to being transparent. Serca will keep a free tier that’s useful and safe, and a paid
                tier with extra features and higher query limits to help cover server + database costs.
            </p>
            <p class="mt-3 text-gray-700 leading-relaxed">
                The internet has amazing content… and some content that needs stricter handling. Serca uses a
                flagging system to control access to sensitive content.
            </p>
            <p class="mt-3 text-gray-700 italic border-l-4 border-red-200 pl-4">
                <strong>Important:</strong> Illegal content is not allowed. If illegal content is discovered, it will be
                removed and reported to the proper authorities.
            </p>
            <p class="mt-3 text-gray-700">
                Questions? Reach out via <a class="text-blue-600 font-medium hover:underline" href="mailto:gmtower1@gmail.com">email</a>.
            </p>
        </section>

        <section id="how-it-works" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 class="mb-2 text-2xl font-bold text-purple-900">Under the hood</h2>
            <ul class="list-inside list-disc space-y-2 text-gray-700">
                <li><strong>Multimodal AI models</strong> to understand image, video, and audio.</li>
                <li><strong>Web scraping + discovery</strong> to uncover hard-to-find pages.</li>
                <li><strong>Edge computing</strong> to process data closer to the source.</li>
            </ul>
        </section>

        <section id="sample-queries" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 class="mb-2 text-2xl font-bold text-purple-900">Sample Queries</h2>
            <div class="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4 font-mono text-sm text-gray-600">
                <pre class="whitespace-pre-wrap">> people at the beach{"\n"}> tv and broadcasts{"\n"}> animals</pre>
            </div>
        </section>

        <section id="pricing" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 class="mb-2 text-2xl font-bold text-purple-900">Pricing</h2>
            <p class="text-gray-700">
                While the Serca-core is open source, access to the hosted database and search API can’t be completely free.
            </p>
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <h3 class="font-bold text-gray-900">Pay-as-you-use</h3>
                    <p class="text-sm text-gray-600 mt-1">Monthly free query allotment. Paid tiers for heavy users.</p>
                </div>
                <div class="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <h3 class="font-bold text-gray-900">Always Free</h3>
                    <p class="text-sm text-gray-600 mt-1">Basic keyword searching will remain free for everyone.</p>
                </div>
            </div>
        </section>

        <section id="highlighted-sites" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 class="mb-4 text-2xl font-bold text-purple-900">Cool Sites</h2>
            <HighlightedSites />
        </section>

        <Newsletter />
    </div>

    <div class="mt-12">
        <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900">Announcements</h2>
            <div class="h-1 w-20 bg-blue-600 mx-auto mt-2 rounded-full"></div>
        </div>
        <div class="space-y-4">
            <Announcements title="Spanish localization" date="Sept 15, 2025" type="Milestone" content="Translating the site into Spanish soon." />
            <Announcements title="API Development" date="Sept 15, 2025" type="Milestone" content="Implementing AI embedding search engine." />
            <Announcements title="Back end updates" date="May 17, 2025" type="Milestone" content="AI pipeline now runs locally on M1 Mac." />
            <Announcements title="Alpha Launch" date="April 23, 2025" type="Milestone" content="Serca is officially in alpha phase." />
        </div>
    </div>

    <p class="mt-16 text-center font-serif text-sm text-gray-400 italic">Kilroy Was Here!</p>
</main>

{#if showPopup}
    <div class="overlay" on:click={togglePopup}></div>
    <div class="popup" role="dialog" aria-modal="true">
        <h2 class="text-xl font-bold text-gray-900">Welcome to Serca</h2>
        <p class="mt-2 text-sm text-gray-600">We use cookies to improve your experience.</p>
        <div class="mt-6 flex justify-end gap-3">
            <button class="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800" on:click={togglePopup}>Close</button>
            <button class="rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-700" on:click={acceptCookies}>Accept</button>
        </div>
    </div>
{/if}

<Vudoo />

<style>
    :global(body) {
        background-color: #ffffff; /* Switched to White */
        margin: 0;
        padding: 0;
    }

    /* Refined Link styles for white background */
    a {
        color: #2563eb;
        transition: color 0.2s;
    }
    a:hover {
        color: #1e40af;
    }

    .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(4px);
        z-index: 10;
    }

    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: min(400px, calc(100% - 2rem));
        background: white;
        padding: 24px;
        border-radius: 20px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        z-index: 20;
        border: 1px solid #f3f4f6;
    }
</style>