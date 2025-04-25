<script>
	import Navbar from '../../components/Navbar.svelte';
	import * as CryptoJS from 'crypto-js';

	let username = 'WEB';
	let email = '';
	let key = '';
	let success = false;
	let showSuccess = false;

	async function handleSubmit() {
		let result = await createUser();
	}

	async function createUser() {
		console.log('Pushing data to backend');
		let ekey = encryptKey(key);
		console.log(ekey);
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
			success = true;
			showSuccess = true;
		} else {
			console.error('Signup failed:', data.message);
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
	<h1>Inorder to use our services, you must sign up.</h1>
</div>

{#if success && showSuccess}
	<div class="text-red m-4 flex w-full flex-col justify-center p-4">
		<h1 class="flex justify-center text-4xl text-green-600">Signup Successful!!</h1>
	</div>
{/if}

{#if !success && showSuccess}
	<div class="text-red m-4 flex w-full flex-col justify-center p-4">
		<h1 class="flex justify-center text-4xl text-red-600">Signup Failed!!</h1>
	</div>
{/if}

<div class="page-wrapper">
	<form on:submit|preventDefault={handleSubmit} class="signup-form">
		<h2>Signup</h2>

		<h1>Email:</h1>
		<input type="email" placeholder="Email" bind:value={email} required />

		<p class="note">Don't use a temp email. We use your email for contact & verification.</p>

		<h1>Password Key:</h1>
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
