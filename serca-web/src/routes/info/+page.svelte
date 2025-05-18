<script lang="ts">
	import Navbar from '../../components/Navbar.svelte';
</script>

<Navbar />

<div class="mx-auto max-w-full border-x border-gray-300 bg-white px-5 py-10 font-mono text-[#333]">
	<!-- Header -->
	<div class="mb-10 text-center">
		<h1 class="text-3xl text-[#003366]">SercaDB</h1>
		<p class="mt-2 text-sm text-gray-600 italic">
			"Built for storing video descriptions, capable of storing pie recipes."
		</p>
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
		<p></p>
	</section>

	<!-- Architecture Overview -->
	<section id="architecture" class="mb-10">
		<h2 class="mb-2 text-xl text-purple-800">🛠️ Architecture Overview</h2>
		<p class="leading-relaxed text-gray-700"></p>

		<h3 class="mt-8 text-lg font-bold">Data Table Peek</h3>
		<p class="mt-2">This is a snippet of our database (dummy data):</p>

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
