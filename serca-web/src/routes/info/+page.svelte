<script lang="ts">
	import Navbar from '../../components/Navbar.svelte';

	const steps = [
		{ id: 'seed', label: 'Seed URLs', x: 50, y: 50 },
		{ id: 'scraper', label: 'Web Scraper', x: 250, y: 50 },
		{ id: 'subdomains', label: 'Extract Subdomains', x: 250, y: 150 },
		{ id: 'to-scraper', label: 'Subdomains → Scraper', x: 450, y: 100 },
		{ id: 'ai', label: 'AI Pipeline', x: 650, y: 100 },
		{ id: 'db', label: 'Update Database', x: 850, y: 100 }
	];

	const aiStages = [
		{ label: 'OCR', dx: 0, dy: -60 },
		{ label: 'YOLOv5', dx: 0, dy: -30 },
		{ label: 'BLIP', dx: 0, dy: 0 },
		{ label: 'Image Features', dx: 0, dy: 30 }
	];
</script>

<Navbar />

<div class="mx-auto max-w-full border-x border-gray-300 bg-white px-5 py-10 font-mono text-[#333]">
	<!-- Header -->
	<div class="mb-10 text-center">
		<h1 class="text-3xl text-[#003366]">Information</h1>
		<p class="mt-2 text-sm text-gray-600 italic">"It's like documentation, but less informative"</p>
	</div>

	<!-- Table of Contents -->
	<div class="mb-10 rounded-lg border border-gray-200 bg-gray-100 p-5">
		<h2 class="mb-2 text-lg text-[#006666]">🧭 Table of Contents</h2>
		<ul class="list-disc space-y-1 pl-5 text-[#003366]">
			<li><a href="#overview" class="hover:underline">Overview</a></li>
			<li><a href="#architecture" class="hover:underline">Process</a></li>
			<li><a href="#pricing" class="hover:underline">Pricing</a></li>
			<li><a href="#api" class="hover:underline">API</a></li>
		</ul>
	</div>

	<!-- Overview -->
	<section id="overview" class="mb-10">
		<h2 class="mb-2 text-xl text-purple-800">💾 Overview</h2>
		<p>
			This page covers information that will help users understand Serca. Hopefully beyond and basic
			level. It also covers information about the service it's self.
		</p>
	</section>

	<!-- Architecture Overview -->
	<section id="architecture" class="mb-10">
		<h2 class="mb-2 text-xl text-purple-800">🛠️ Architecture Overview</h2>
		<p class="leading-relaxed text-gray-700"></p>

		<h3 class="mt-8 text-lg font-bold">Serca overview layout</h3>
		<p class="mt-2"></p>

		<div class=""></div>

		<div class="mt-4 overflow-x-auto"></div>
	</section>

	<!-- API -->
	<section id="api" class="mb-10">
		<h2 class="mb-2 text-xl text-purple-800">📦 API</h2>
		<p>Presently Serca's API is just for backend uses, we will make it public soon enough</p>
	</section>

	<!-- Final Note -->
	<div class="mt-12 text-center text-gray-500 italic">
		<p>SQL is magic...</p>
	</div>
</div>
