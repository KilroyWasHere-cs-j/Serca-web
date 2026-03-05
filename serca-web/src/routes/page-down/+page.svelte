<!-- Maintenance / Downtime Page -->
<main class="min-h-screen w-full bg-gray-100 px-4 py-10 font-sans text-gray-900">
	<div class="mx-auto flex w-full max-w-3xl flex-col items-center">
		<!-- Header card -->
		<section class="w-full rounded-2xl border border-gray-300 bg-blue-50 p-6 text-center shadow-sm">
			<h1 class="text-4xl font-bold text-blue-900 md:text-5xl">
				We’re currently fixing this website
			</h1>
			<p class="mt-3 text-base text-gray-700 md:text-lg">
				Watch the gear spin while we get things back up—or keep refreshing like a gremlin.
			</p>

			<!-- Actions -->
			<div class="mt-5 flex flex-wrap justify-center gap-2">
				<button
					class="rounded-xl border border-blue-800 bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800 hover:bg-blue-200"
					on:click={() => location.reload()}
				>
					Refresh
				</button>

				<a
					href="/"
					class="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-50"
				>
					Go Home
				</a>
			</div>
		</section>

		<!-- GIF card -->
		<section class="mt-6 w-full rounded-2xl border border-gray-300 bg-white p-4 shadow-sm">
			<div class="rounded-xl border border-gray-200 bg-gray-50 p-3">
				<img
					class="mx-auto h-auto w-full max-w-xl rounded-xl border border-gray-200"
					src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2drcnM2Y3ZjMXgxcjV0bnRpempiaW9kdGs5cHJpaW5xeHEwN2F3aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WHZef2JRSDCxTeoYH1/giphy.gif"
					alt="Spinning gear animation"
					loading="lazy"
				/>
			</div>

			<p class="mt-3 text-center text-xs text-gray-500">
				Status: maintenance mode
			</p>
		</section>
	</div>
</main>