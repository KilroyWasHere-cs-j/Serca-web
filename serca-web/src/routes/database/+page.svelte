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
			<li><a href="#architecture" class="hover:underline">Architecture Overview</a></li>
			<li><a href="#api" class="hover:underline">API</a></li>
		</ul>
	</div>

	<!-- Overview -->
	<section id="overview" class="mb-10">
		<h2 class="mb-2 text-xl text-purple-800">💾 Overview</h2>
		<p>
			We are managing an expanding database that links media URLs to automatically generated
			descriptions. As our AI engines produce new descriptions for media content, we continuously
			update the database.
		</p>
	</section>

	<!-- Architecture Overview -->
	<section id="architecture" class="mb-10">
		<h2 class="mb-2 text-xl text-purple-800">🛠️ Architecture Overview</h2>
		<p class="leading-relaxed text-gray-700">
			Serca's database is a centralized cloud-hosted PostgreSQL DB with a Sqlx-powered Rust API.
		</p>

		<h3 class="mt-8 text-lg font-bold">Data Table Peek</h3>
		<p class="mt-2">This is a snippet of our database (dummy data):</p>

		<div class="mt-4 overflow-x-auto">
			<table class="min-w-[600px] border-collapse text-sm">
				<thead>
					<tr class="border-b border-gray-400 bg-gray-100">
						<th class="border border-gray-400 px-3 py-2 text-left font-bold">ID</th>
						<th class="border border-gray-400 px-3 py-2 text-left font-bold">URL</th>
						<th class="border border-gray-400 px-3 py-2 text-left font-bold">Description</th>
						<th class="border border-gray-400 px-3 py-2 text-left font-bold">Special one</th>
						<th class="border border-gray-400 px-3 py-2 text-left font-bold">Special two</th>
						<th class="border border-gray-400 px-3 py-2 text-left font-bold">Flag</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-t border-gray-300">
						<td class="border border-gray-300 px-3 py-2">0</td>
						<td class="border border-gray-300 px-3 py-2">https://serca.dev/one</td>
						<td class="border border-gray-300 px-3 py-2">Something kinda important</td>
						<td class="border border-gray-300 px-3 py-2">false</td>
						<td class="border border-gray-300 px-3 py-2">true</td>
						<td class="border border-gray-300 px-3 py-2">green</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-3 py-2">1</td>
						<td class="border border-gray-300 px-3 py-2">https://serca.dev/two</td>
						<td class="border border-gray-300 px-3 py-2">People dancing with a dog</td>
						<td class="border border-gray-300 px-3 py-2">true</td>
						<td class="border border-gray-300 px-3 py-2">false</td>
						<td class="border border-gray-300 px-3 py-2">grey</td>
					</tr>
					<tr>
						<td class="border border-gray-300 px-3 py-2">2</td>
						<td class="border border-gray-300 px-3 py-2">https://serca.dev/three</td>
						<td class="border border-gray-300 px-3 py-2">Kids swimming in a pool</td>
						<td class="border border-gray-300 px-3 py-2">false</td>
						<td class="border border-gray-300 px-3 py-2">false</td>
						<td class="border border-gray-300 px-3 py-2">red</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- API -->
	<section id="api" class="mb-10">
		<h2 class="mb-2 text-xl text-purple-800">📦 API</h2>
		<p>The API is not yet public. More info will be provided as development progresses.</p>
	</section>

	<!-- Final Note -->
	<div class="mt-12 text-center text-gray-500 italic">
		<p>SQL is magic...</p>
	</div>
</div>
