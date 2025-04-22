<script>
	import FlareFlag from './FlareFlag.svelte';
	export let num = 0;
	export let url = '';
	export let description = '';
	export let mature = false; // The internet is a bad bad place we need ways to flag this stuff. You can have one or the other not both
	export let child = false;
</script>

<div class="m-8 flex flex-col space-y-4 border border-gray-600 bg-white p-8">
	<h1>Result {num}</h1>
	<h2>URL {url}</h2>
	<p>{description}</p>
	<FlareFlag name="clear" />
</div>
