<script lang="ts">
	import Navbar from '../../components/Navbar.svelte';
</script>

<Navbar />

<div
	style="
		max-width: 100%;
		margin: 0 auto;
		padding: 40px 20px;
		font-family: 'Courier New', Courier, monospace;
		color: #333;
		background-color: white;
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
		box-shadow: none;
	"
>
	<!-- Header -->
	<div style="text-align: center; margin-bottom: 40px;">
		<h1 style="font-size: 2rem; color: #003366;">SercaDB</h1>
		<p style="font-size: 1rem; font-style: italic; color: #666;">
			"Built for storing video descriptions, capable of storing pie recipes."
		</p>
	</div>

	<!-- Table of Contents -->
	<div
		style="background-color: #f9f9f9; border: 1px solid #e0e0e0; padding: 20px; margin-bottom: 40px; border-radius: 8px;"
	>
		<h2 style="font-size: 1.2rem; color: #006666;">🧭 Table of Contents</h2>
		<ul style="list-style-type: disc; padding-left: 1rem; color: #003366;">
			<li><a href="#overview">Overview</a></li>
			<li><a href="#architecture">Architecture Overview</a></li>
			<li><a href="#api">API</a></li>
		</ul>
	</div>

	<!-- Overview -->
	<section id="overview" style="margin-bottom: 40px;">
		<h2 style="font-size: 1.4rem; color: #6A1B9A;">💾 Overview</h2>
		<p>
			We are managing an expanding database that links media URLs to automatically generated
			descriptions. As our AI engines produce new descriptions for media content, we continuously
			update the database.
		</p>
	</section>

	<!-- Architecture Overview -->
	<section id="architecture" style="margin-bottom: 40px;">
		<h2 style="font-size: 1.4rem; color: #6A1B9A;">🛠️ Architecture Overview</h2>
		<p style="line-height: 1.8; color: #444;">
			Serca's database is a centralized cloud-hosted PostgreSQL DB with a Sqlx-powered Rust API.
		</p>

		<h3 style="font-size: 1.2rem; margin-top: 2rem;">Data Table Peek</h3>
		<p>This is a snippet of our database (dummy data):</p>

		<div style="overflow-x: auto; margin-top: 1rem;">
			<table style="min-width: 600px; border-collapse: collapse; font-size: 14px;">
				<thead>
					<tr style="background-color: #f2f2f2;">
						<th>ID</th>
						<th>URL</th>
						<th>Description</th>
						<th>Special one</th>
						<th>Special two</th>
						<th>Flag</th>
					</tr>
				</thead>
				<tbody>
					<tr
						><td>0</td><td>https://serca.dev/one</td><td>Something kinda important</td><td>false</td
						><td>true</td><td>green</td></tr
					>
					<tr
						><td>1</td><td>https://serca.dev/two</td><td>People dancing with a dog</td><td>true</td
						><td>false</td><td>grey</td></tr
					>
					<tr
						><td>2</td><td>https://serca.dev/three</td><td>Kids swimming in a pool</td><td>false</td
						><td>false</td><td>red</td></tr
					>
				</tbody>
			</table>
		</div>
	</section>

	<!-- API -->
	<section id="api">
		<h2 style="font-size: 1.4rem; color: #6A1B9A;">📦 API</h2>
		<p>The API is not yet public. More info will be provided as development progresses.</p>
	</section>

	<!-- Final Note -->
	<div style="text-align: center; margin-top: 40px;">
		<p style="font-style: italic; color: #777;">SQL is magic...</p>
	</div>
</div>

<style>
	a {
		color: #006666;
		text-decoration: none;
	}

	a:hover {
		color: #003366;
		text-decoration: underline;
	}

	table,
	th,
	td {
		border: 1px solid #999;
		padding: 8px;
		text-align: left;
	}

	th {
		font-weight: bold;
	}
</style>
