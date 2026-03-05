<script lang="ts">
	// ---------------------------------------------
	// Report Page
	// - Matches your newer aesthetic: rounded-2xl cards, soft borders/shadows
	// - Uses Tailwind-first styling (minimal custom CSS)
	// - Adds better UX: disables submit while sending, clearer status styling,
	//   keeps category + description reset on success.
	// ---------------------------------------------

	import Navbar from '../../components/Navbar.svelte';

	// -------- Form state --------
	let email = '';
	let issueDescription = '';
	let issueCategory: string = 'General';

	// UI/UX state
	let formStatus = '';
	let statusKind: 'success' | 'error' | 'info' | '' = '';
	let submitting = false;

	// Optional: allow "Other" category to specify details
	// (You already have “Other (Please specify)”—this makes it actually possible.)
	let otherDetails = '';

	/**
	 * Submit handler
	 * - Validates required fields
	 * - POSTs to /api/data/report
	 * - Shows success/error status
	 */
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		// Quick client-side validation
		if (!email.trim() || !issueDescription.trim()) {
			formStatus = 'Please fill in all required fields.';
			statusKind = 'error';
			return;
		}

		// If user chose Other, encourage adding details
		if (issueCategory === 'Other' && !otherDetails.trim()) {
			formStatus = 'Please specify details for "Other".';
			statusKind = 'error';
			return;
		}

		submitting = true;
		formStatus = '';
		statusKind = '';

		try {
			const response = await fetch('/api/data/report', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email.trim(),
					issueCategory,
					issueDescription: issueCategory === 'Other'
						? `${issueDescription.trim()}\n\nOther details: ${otherDetails.trim()}`
						: issueDescription.trim()
				})
			});

			// Safer than response.json() if backend returns non-JSON error pages
			const text = await response.text();
			const data = text ? JSON.parse(text) : null;

			if (!response.ok) {
				formStatus = `Error: ${data?.error || 'Something went wrong.'}`;
				statusKind = 'error';
				return;
			}

			formStatus = 'Thank you for your report!';
			statusKind = 'success';

			// Reset form (keep category as-is, since it can be intentional)
			email = '';
			issueDescription = '';
			otherDetails = '';
		} catch (error) {
			formStatus = 'Could not submit the report. Please try again later.';
			statusKind = 'error';
			console.error('Submission Error:', error);
		} finally {
			submitting = false;
		}
	}
</script>

<Navbar />

<!-- Page shell (consistent with the rest of your site) -->
<main class="min-h-screen w-full bg-gray-100 px-4 py-10 font-sans text-gray-900">
	<div class="mx-auto w-full max-w-2xl">
		<!-- Header card -->
		<section class="rounded-2xl border border-gray-300 bg-blue-50 p-6 text-center shadow-sm">
			<h1 class="text-3xl font-bold text-blue-900">Report an Issue with Content</h1>
			<p class="mt-2 text-sm text-gray-700">
				The internet isn't always perfect. We try to keep results relevant and safe. If you find
				anything that shouldn’t be here — let us know.
			</p>
		</section>

		<!-- Form card -->
		<section class="mt-6 rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
			<form on:submit={handleSubmit} class="space-y-4">
				<!-- Email -->
				<div>
					<label for="email" class="mb-1 block text-sm font-bold text-gray-900">
						Your Email <span class="text-red-700">*</span>
					</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						placeholder="you@example.com"
						class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-black focus:outline-none focus:ring"
					/>
				</div>

				<!-- Category -->
				<div>
					<label for="issueCategory" class="mb-1 block text-sm font-bold text-gray-900">
						Issue Category
					</label>
					<select
						id="issueCategory"
						bind:value={issueCategory}
						class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring"
					>
						<option value="General">General</option>
						<option value="Technical/Bug">Technical/Bug</option>
						<option value="Account">Account</option>
						<option value="Vulnerability">Vulnerability</option>
						<option value="Poor/Wrong Label">Poor/Wrong Label</option>
						<option value="Adult/Mature">Adult/Mature</option>
						<option value="Gore/Death">Gore/Death</option>
						<option value="Illegal">Illegal</option>
						<option value="Request for help">Request help</option>
						<option value="Other">Other (Please specify)</option>
					</select>

					<!-- Optional "Other" details field -->
					{#if issueCategory === 'Other'}
						<div class="mt-3">
							<label for="otherDetails" class="mb-1 block text-sm font-bold text-gray-900">
								Other details <span class="text-red-700">*</span>
							</label>
							<input
								id="otherDetails"
								type="text"
								bind:value={otherDetails}
								placeholder="What category should this be?"
								class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-black focus:outline-none focus:ring"
							/>
						</div>
					{/if}
				</div>

				<!-- Description -->
				<div>
					<label for="issueDescription" class="mb-1 block text-sm font-bold text-gray-900">
						Description <span class="text-red-700">*</span>
					</label>
					<textarea
						id="issueDescription"
						bind:value={issueDescription}
						required
						placeholder="Describe the issue in detail (include the URL if possible)"
						class="min-h-[160px] w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-black focus:outline-none focus:ring"
					/>
					<p class="mt-1 text-xs text-gray-500">
						Tip: include the exact page/video URL and what you expected to see instead.
					</p>
				</div>

				<!-- Submit button -->
				<button
					type="submit"
					disabled={submitting}
					class="w-full rounded-xl border border-blue-800 bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if submitting}Submitting…{:else}Submit Report{/if}
				</button>

				<!-- Status message -->
				{#if formStatus}
					<div
						class="rounded-xl border p-3 text-sm"
						class:border-green-300={statusKind === 'success'}
						class:bg-green-50={statusKind === 'success'}
						class:text-green-900={statusKind === 'success'}
						class:border-red-300={statusKind === 'error'}
						class:bg-red-50={statusKind === 'error'}
						class:text-red-900={statusKind === 'error'}
					>
						{formStatus}
					</div>
				{/if}
			</form>
		</section>
	</div>
</main>