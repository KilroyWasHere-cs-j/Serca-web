<script lang="ts">
	// ---------------------------------------------
	// Signup Page
	// - Matches your newer aesthetic (cards, rounded-2xl, soft borders/shadows)
	// - Tailwind-first (no heavy custom CSS)
	// - Better UX:
	//   • disables submit while sending
	//   • safe JSON parsing
	//   • clear success/error banners
	//   • basic client validation + trimming
	// - Keeps your existing API contract: POST /api/data/submit { username, email, ekey }
	//
	// NOTE: hashing on the client is obfuscation, not real password security.
	// ---------------------------------------------

	import Navbar from '../../components/Navbar.svelte';
	import * as CryptoJS from 'crypto-js';

	// -------- Form state --------
	let username: string = 'WEB';
	let email: string = '';
	let key: string = '';

	// -------- UI state --------
	let submitting = false;

	let showStatus = false;
	let statusKind: 'success' | 'error' | '' = '';
	let statusMessage = '';

	/**
	 * Hash the key so the raw key isn't transmitted.
	 * NOTE: This is not secure auth by itself.
	 */
	function encryptKey(rawKey: string): string {
		return CryptoJS.SHA256(rawKey).toString();
	}

	/**
	 * Safe JSON parse so we don't explode if the server returns HTML/text on errors.
	 */
	function safeJsonParse(text: string) {
		if (!text) return null;
		try {
			return JSON.parse(text);
		} catch {
			return null;
		}
	}

	/**
	 * Submits the form to create a user.
	 */
	async function handleSubmit() {
		if (submitting) return;

		// Reset banner
		showStatus = false;
		statusKind = '';
		statusMessage = '';

		const lemail = email.trim();
		const lkey = key.trim();

		// Basic required checks (HTML required already does most of this)
		if (!lemail || !lkey) {
			showStatus = true;
			statusKind = 'error';
			statusMessage = 'Please fill in all required fields.';
			return;
		}

		submitting = true;

		try {
			// Build payload
			const ekey = encryptKey(lkey);

			const res = await fetch('/api/data/submit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, email: lemail, ekey })
			});

			const text = await res.text();
			const data = safeJsonParse(text);

			if (!res.ok) {
				// Your backend seems to return data.message sometimes; also support data.error
				const msg = data?.message || data?.error || `Signup failed (${res.status})`;
				showStatus = true;
				statusKind = 'error';
				statusMessage = msg;
				return;
			}

			// Success
			showStatus = true;
			statusKind = 'success';
			statusMessage = 'Signup successful! You can now use the service.';

			// Reset form fields
			email = '';
			key = '';
		} catch (err) {
			console.error('Signup error:', err);
			showStatus = true;
			statusKind = 'error';
			statusMessage = 'Could not submit signup. Please try again later.';
		} finally {
			submitting = false;
		}
	}
</script>

<Navbar />

<main class="min-h-screen w-full bg-gray-100 px-4 py-10 font-sans text-gray-900">
	<div class="mx-auto w-full max-w-2xl">
		<!-- Header card -->
		<section class="rounded-2xl border border-gray-300 bg-blue-50 p-6 text-center shadow-sm">
			<h1 class="text-3xl font-bold text-blue-900">Signup</h1>
			<p class="mt-2 text-sm text-gray-700">
				To use the service, create an account below. We use your email to contact you about access and updates.
			</p>
		</section>

		<!-- Status banner -->
		{#if showStatus}
			<div
				class="mt-4 rounded-2xl border p-4 text-sm shadow-sm"
				class:border-green-300={statusKind === 'success'}
				class:bg-green-50={statusKind === 'success'}
				class:text-green-900={statusKind === 'success'}
				class:border-red-300={statusKind === 'error'}
				class:bg-red-50={statusKind === 'error'}
				class:text-red-900={statusKind === 'error'}
			>
				{statusMessage}
			</div>
		{/if}

		<!-- Form card -->
		<section class="mt-6 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
			<form on:submit|preventDefault={handleSubmit} class="space-y-4">
				<!-- Email -->
				<div>
					<label for="email" class="mb-1 block text-sm font-bold text-gray-900">
						Email <span class="text-red-700">*</span>
					</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						placeholder="you@example.com"
						class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-black focus:outline-none focus:ring"
					/>
					<p class="mt-1 text-xs text-gray-500">No temp emails please. We use this to contact you.</p>
				</div>

				<!-- Key / Password -->
				<div>
					<label for="key" class="mb-1 block text-sm font-bold text-gray-900">
						Password Key <span class="text-red-700">*</span>
					</label>
					<input
						id="key"
						type="password"
						bind:value={key}
						required
						placeholder="••••••••"
						class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-black focus:outline-none focus:ring"
					/>
					<p class="mt-1 text-xs text-gray-500">This is like your password. Keep it safe.</p>
				</div>

				<!-- Submit -->
				<button
					type="submit"
					disabled={submitting}
					class="w-full rounded-xl border border-blue-800 bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if submitting}Submitting…{:else}Submit{/if}
				</button>

				<!-- Tiny note -->
				<p class="text-center text-xs text-gray-500">
					By signing up, you agree not to use Serca for illegal activity.
				</p>
			</form>
		</section>
	</div>
</main>