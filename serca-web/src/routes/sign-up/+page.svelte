<script>
	import Navbar from '../../components/Navbar.svelte';
	import * as CryptoJS from 'crypto-js';

	let username = '';
	let email = '';
	let key = '';

	async function handleSubmit() {
		console.log('Pushing data to backend');
		let ekey = encryptKey(key);
		const res = await fetch('/api/data/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, email, ekey })
		});

		const data = await res.json();

		if (res.ok) {
			console.log('Signup successful:', data);
		} else {
			console.error('Signup failed:', data.message);
		}
	}

	function encryptKey(key) {
		let hash = CryptoJS.SHA256(key);
		return hash.toString();
	}
</script>

<Navbar />

<div class="notice">
	<h1>
		Presently we aren't a paid platform — but soon we will be. We do record this info so we can
		reach out when we are.
	</h1>
</div>

<div class="page-wrapper">
	<form on:submit|preventDefault={handleSubmit} class="signup-form">
		<h2>Signup</h2>

		<label>Username:</label>
		<input type="text" placeholder="Username" bind:value={username} required />

		<p class="note">Emails and Keys are unique. Usernames are mostly for fun.</p>

		<label>Email:</label>
		<input type="email" placeholder="Email" bind:value={email} required />

		<p class="note">Don't use GuerrillaMail. We use your email for contact & verification.</p>

		<label>Password Key:</label>
		<input type="password" placeholder="Key" bind:value={key} required />
		<p class="note">This acts like a password. Used to verify your session later.</p>

		<button type="submit">Sign Up</button>
	</form>
</div>

<style>
	body {
		background-color: #eee;
		color: #000;
		font-family: Verdana, Arial, sans-serif;
		margin: 0;
	}

	.notice {
		margin: 2rem auto;
		max-width: 1000px;
		background-color: #fff8c4;
		padding: 20px;
		border: 2px solid #ccc;
		text-align: center;
		font-size: 20px;
		box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.1);
	}

	.page-wrapper {
		display: flex;
		justify-content: center;
		padding: 80px 20px;
		min-height: 100vh;
		background-color: #dcdcdc;
		overflow-y: auto;
	}

	.signup-form {
		width: 440px;
		padding: 40px;
		background-color: #ffffff;
		border: 4px solid #000;
		box-shadow: 6px 6px 0px #bbb;
	}

	h2 {
		text-align: center;
		font-size: 32px;
		text-transform: uppercase;
		margin-bottom: 32px;
		border-bottom: 2px solid #000;
		padding-bottom: 10px;
	}

	label {
		display: block;
		margin: 20px 0 8px;
		font-weight: bold;
		font-size: 20px;
	}

	input {
		width: 100%;
		padding: 12px;
		border: 2px solid #000;
		font-size: 18px;
		background-color: #fff;
		color: #000;
	}

	.note {
		font-size: 16px;
		color: #444;
		margin-top: 6px;
	}

	button {
		width: 100%;
		padding: 14px;
		background-color: #000;
		color: #fff;
		border: 2px solid #000;
		font-size: 20px;
		font-weight: bold;
		margin-top: 30px;
		text-transform: uppercase;
	}

	button:hover {
		background-color: #333;
		cursor: pointer;
	}
</style>
