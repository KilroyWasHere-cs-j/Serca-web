<script lang="ts">
	import Navbar from '../../components/Navbar.svelte'; // Adjust if needed
</script>

<Navbar />

<!-- Background Section -->
<div
	class="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black px-6 py-16 font-sans text-white"
>
	<!-- Hero Section -->
	<section class="mx-auto mb-20 max-w-7xl text-center">
		<h1
			class="mb-6 text-5xl font-extrabold tracking-tight text-purple-300 drop-shadow-md md:text-6xl"
		>
			Abscissa Group
		</h1>
		<p class="mx-auto max-w-3xl text-xl text-gray-300 md:text-2xl">
			Building futuristic software solutions with intelligence, precision, and style.
		</p>
	</section>

	<!-- Info Grid -->
	<section class="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
		<!-- Card 1 -->
		<div
			class="rounded-xl border border-purple-500 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-105"
		>
			<h2 class="mb-4 text-2xl font-bold text-purple-400">AI & Automation</h2>
			<p class="text-gray-300">
				We specialize in intelligent automation tools that boost business efficiency and
				decision-making.
			</p>
		</div>

		<!-- Card 2 -->
		<div
			class="rounded-xl border border-purple-500 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-105"
		>
			<h2 class="mb-4 text-2xl font-bold text-purple-400">Custom Software</h2>
			<p class="text-gray-300">
				From startups to enterprise, we craft custom platforms tailored to your vision and workflow.
			</p>
		</div>

		<!-- Card 3 -->
		<div
			class="rounded-xl border border-purple-500 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-105"
		>
			<h2 class="mb-4 text-2xl font-bold text-purple-400">Innovation Lab</h2>
			<p class="text-gray-300">
				Where ideas meet execution—our R&D team explores tech frontiers like AR, blockchain, and
				neural interfaces.
			</p>
		</div>
	</section>

	<!-- Footer/CTA -->
	<!-- <section class="mt-32 text-center">
		<p class="mb-4 text-lg text-gray-400">Let’s build the future together.</p>
		<button
			class="rounded-full bg-purple-700 px-8 py-3 font-bold text-white shadow-lg transition duration-300 hover:bg-purple-600"
		>
			Contact Vudoo
		</button>
	</section> -->
</div>

<style>
	/* Optional: smooth background animation */
	body {
		background: black;
	}
</style>
