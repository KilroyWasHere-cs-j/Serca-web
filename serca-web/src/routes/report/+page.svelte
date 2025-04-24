<script>
	import Navbar from '../../components/Navbar.svelte';

	let email = '';
	let issueDescription = '';
	let issueCategory = 'General';
	let formStatus = '';

	async function handleSubmit(event) {
		event.preventDefault();

		if (!email || !issueDescription) {
			formStatus = 'Please fill in all required fields.';
			return;
		}

		try {
			const response = await fetch('/api/data/report', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					issueCategory,
					issueDescription
				})
			});

			const data = await response.json();

			if (!response.ok) {
				formStatus = `Error: ${data.error || 'Something went wrong.'}`;
				return;
			}

			formStatus = 'Thank you for your report!';
			email = '';
			issueDescription = '';
		} catch (error) {
			formStatus = 'Could not submit the report. Please try again later.';
			console.error('Submission Error:', error);
		}
	}
</script>

<Navbar />

<div class="page-wrapper">
	<div class="report-box">
		<h1>Report an Issue with Content</h1>
		<p class="intro">
			The internet isn't always perfect. We try to keep search results relevant and safe. If you
			find anything that shouldn't be here — let us know.
		</p>

		<form on:submit={handleSubmit}>
			<label for="email">Your Email (required):</label>
			<input id="email" type="email" bind:value={email} required placeholder="Your Email" />

			<label for="issueCategory">Issue Category:</label>
			<select id="issueCategory" bind:value={issueCategory}>
				<option value="General">General</option>
				<option value="Poor/Wrong Label">Poor/Wrong Label</option>
				<option value="Adult/Mature">Adult/Mature</option>
				<option value="Gore/Death">Gore/Death</option>
				<option value="Illegal">Illegal</option>
				<option value="Other">Other (Please specify)</option>
			</select>

			<label for="issueDescription">Description of the Issue (required):</label>
			<textarea
				id="issueDescription"
				bind:value={issueDescription}
				required
				placeholder="Describe the issue in detail"
			></textarea>

			<button class="submit-btn" type="submit">Submit Report</button>

			{#if formStatus}
				<p class="status">{formStatus}</p>
			{/if}
		</form>
	</div>
</div>

<style>
	body {
		background-color: #eee;
		color: #000;
		font-family: Verdana, Arial, sans-serif;
		margin: 0;
		padding: 0;
	}

	.page-wrapper {
		display: flex;
		justify-content: center;
		padding: 60px 20px;
		min-height: 100vh;
		background-color: #dcdcdc;
		overflow-y: auto;
	}

	.report-box {
		width: 600px;
		padding: 40px;
		background-color: #fff;
		border: 4px solid #000;
		box-shadow: 6px 6px 0px #aaa;
	}

	h1 {
		text-align: center;
		font-size: 36px;
		margin-bottom: 20px;
		text-transform: uppercase;
		border-bottom: 2px solid #000;
		padding-bottom: 10px;
	}

	.intro {
		font-size: 18px;
		margin-bottom: 20px;
	}

	label {
		display: block;
		margin: 20px 0 8px;
		font-size: 20px;
		font-weight: bold;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 14px;
		font-size: 18px;
		border: 2px solid #000;
		margin-bottom: 20px;
		background-color: #fff;
		color: #000;
	}

	textarea {
		min-height: 140px;
		resize: vertical;
	}

	input:focus,
	select:focus,
	textarea:focus {
		outline: 2px solid #000;
	}

	.submit-btn {
		width: 100%;
		padding: 14px;
		background-color: #000;
		color: #fff;
		border: 2px solid #000;
		font-size: 20px;
		font-weight: bold;
		text-transform: uppercase;
	}

	.submit-btn:hover {
		background-color: #333;
		cursor: pointer;
	}

	.status {
		margin-top: 20px;
		text-align: center;
		font-size: 18px;
		color: #000;
	}
</style>
