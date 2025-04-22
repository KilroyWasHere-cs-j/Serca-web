<script>
	export let error;
	export let status;
</script>

{#if status == 404}
	<h1>Page Not Found</h1>
	<p>Sorry, we couldn't find the page you're looking for.</p>
{:else if status == 500}
	<div class="h-srceen w-screen">
		<h1 class="m-8 flex justify-center text-6xl">500</h1>
		<p class="m-8 flex justify-center text-2xl">
			Sorry it seems our servers went out to lunch. If this issue persists contact us.
			<br /> at gmtower1@proton.me
		</p>
	</div>
{:else}
	<div class="h-screen w-screen">
		<h1 class="m-8 flex justify-center text-6xl">Status {status}</h1>
		<p class="m-8 flex justify-center text-2xl">
			{error?.message ?? 'Something has happened that we did not plan for...'}
		</p>
		<div class="flex justify-center">
			<img
				src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHF6YTgxZmh6c2F3NjAyOTY4bjV5Yzl3N3dyYXAwdjYxMGhvaWp4MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BT4ygwV9vgwAU/giphy.gif"
				alt="Well even our fun gif isn't working"
			/>
		</div>
	</div>
{/if}
