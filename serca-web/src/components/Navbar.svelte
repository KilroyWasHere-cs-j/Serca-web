<script lang="ts">
</script>

<div class="top-navbar">
	<a href="/">Home</a>
	<a href="/serca-search">Search</a>
	<a href="/sign-up">Sign-Up</a>
	<a href="/report">Report</a>
	<a href="/database">Database</a>
	<a href="/abscissa">Abscissa</a>
</div>

<style>
	.top-navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		gap: 10px;
		padding: 10px;
		background-color: #f4f4f4;
		border-bottom: 2px solid #000;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
		z-index: 1000;
		font-family: Verdana, Arial, sans-serif;
	}

	.top-navbar a {
		padding: 8px 12px;
		text-decoration: none;
		color: #000;
		background-color: #e0e0e0;
		border: 1px solid #aaa;
		border-radius: 4px;
		font-size: 14px;
	}

	.top-navbar a:hover {
		background-color: #c0c0c0;
		color: #000080;
	}
</style>
