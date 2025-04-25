<script>
	import Navbar from '../../components/Navbar.svelte';
	import * as CryptoJS from 'crypto-js';

	let username = 'WEB';
	let email = '';
	let key = '';
	let success = false;
	let showSuccess = false;

	async function handleSubmit() {
		console.log('📨 Submitting form data...');
		let result = await createUser();
	}

	async function createUser() {
		console.log('🔐 Encrypting key...');
		let ekey = encryptKey(key);
		console.log('ekey:', ekey);

		const res = await fetch('/api/data/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, email, ekey })
		});

		const data = await res.json();

		if (res.ok) {
			console.log('✅ Signup successful');
			success = true;
			showSuccess = true;
		} else {
			console.error('❌ Signup failed:', data.message);
			success = false;
			showSuccess = true;
		}
	}

	function encryptKey(key) {
		let hash = CryptoJS.SHA256(key);
		return hash.toString();
	}
</script>

<Navbar />

<div class="notice">
	<h1>📋 To use the service, please sign up below.</h1>
</div>

{#if success && showSuccess}
	<div class="banner success">
		<h1>✅ Signup Successful!!</h1>
	</div>
{/if}

{#if !success && showSuccess}
	<div class="banner fail">
		<h1>⚠️ Signup Failed. Please try again.</h1>
	</div>
{/if}

<div class="page-wrapper">
	<form on:submit|preventDefault={handleSubmit} class="signup-form">
		<h2>Signup</h2>

		<label for="email">📧 Email:</label>
		<input type="email" id="email" bind:value={email} required />

		<p class="note">No temp emails please. We use this to contact you.</p>

		<label for="key">🔑 Password Key:</label>
		<input type="password" id="key" bind:value={key} required />

		<p class="note">This is like your password. Keep it safe.</p>

		<button type="submit">Submit 📨</button>
	</form>
</div>

<style>
	body {
		background-color: #f2f2f2;
		color: #222;
		font-family: 'Helvetica', 'Arial', sans-serif;
		margin: 0;
	}

	.notice {
		margin: 2rem auto;
		max-width: 800px;
		background-color: #fefefe;
		border: 1px solid #ccc;
		padding: 20px;
		text-align: center;
		font-size: 18px;
	}

	.page-wrapper {
		display: flex;
		justify-content: center;
		padding: 60px 20px;
		background-color: #e6e6e6;
		min-height: 100vh;
	}

	.signup-form {
		width: 400px;
		padding: 30px;
		background-color: #ffffff;
		border: 2px solid #999;
		box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
	}

	h2 {
		text-align: center;
		font-size: 24px;
		margin-bottom: 20px;
		border-bottom: 1px solid #ccc;
		padding-bottom: 10px;
	}

	label {
		display: block;
		margin-top: 20px;
		font-weight: bold;
		font-size: 16px;
	}

	input {
		width: 100%;
		padding: 10px;
		border: 1px solid #aaa;
		font-size: 16px;
		background-color: #fafafa;
		margin-top: 5px;
	}

	.note {
		font-size: 14px;
		color: #555;
		margin-top: 6px;
	}

	button {
		width: 100%;
		padding: 12px;
		background-color: #444;
		color: #fff;
		border: none;
		font-size: 16px;
		margin-top: 25px;
		font-weight: bold;
	}

	button:hover {
		background-color: #000;
		cursor: pointer;
	}

	.banner {
		margin: 20px auto;
		padding: 16px;
		text-align: center;
		font-size: 18px;
		font-weight: bold;
		width: 90%;
		max-width: 600px;
		border: 1px solid;
	}

	.success {
		background-color: #e0ffe0;
		color: #006400;
		border-color: #006400;
	}

	.fail {
		background-color: #ffe0e0;
		color: #8b0000;
		border-color: #8b0000;
	}
</style>
