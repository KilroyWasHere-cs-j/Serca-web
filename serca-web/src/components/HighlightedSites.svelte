<script>
	// An array of cool URLs
	export let coolLinks = [
		{
			title: 'Papytane',
			url: 'https://www.papytane.com/mp4/',
			note: 'This is a collection of what seem like home videos and family trips in French speaking contries'
		}
		// {
		// 	title: 'The Old Internet',
		// 	url: 'https://theoldnet.com/',
		// 	note: 'A cool collection of old archived websites'
		// },
		// { title: '4chan', url: 'https://www.4chan.org', note: 'Well this was cool til it got hacked' },
		// {
		// 	title: 'Craigslist',
		// 	url: 'https://www.craigslist.org',
		// 	note: 'This is a modern site that looks old'
		// },
		// {
		// 	title: 'ASCII Art Archive',
		// 	url: 'https://www.asciiart.eu',
		// 	note: 'ASCII art is cool, man...'
		// }
	];
</script>

<div class="links-container">
	<div class="links-title">Cool Links from the Early Web</div>
	<p>As we find cool new links to checkout. Follow at your own risk.</p>
	<ul class="links-list">
		{#each coolLinks as { title, url, note }}
			<li class="link-item">
				<a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
				<p>{note}</p>
			</li>
		{/each}
	</ul>
</div>

<style>
	/* Similar early web-style typography and design */
	:global(body) {
		font-family: 'Courier New', Courier, monospace;
		background-color: #f2f2f2;
		color: #333;
		margin: 0;
		padding: 0;
	}

	.links-container {
		width: 80%;
		margin: 50px auto;
		padding: 20px;
		background-color: #fff;
		border: 2px solid #ddd;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.links-title {
		font-size: 24px;
		font-weight: bold;
		color: #2b2b2b;
		text-transform: uppercase;
		margin-bottom: 20px;
		border-bottom: 2px solid #ddd;
		padding-bottom: 10px;
	}

	.links-list {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.link-item {
		padding: 8px;
		font-size: 16px;
		border-bottom: 1px solid #ddd;
	}

	.link-item a {
		color: #0066cc;
		text-decoration: underline;
	}

	.link-item a:hover {
		color: #003366;
	}

	/* Additional spacing for the container */
	.links-container {
		border-radius: 4px;
		padding: 15px;
	}
</style>
