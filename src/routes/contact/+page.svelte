<script lang="ts">
	let name = '';
	let email = '';
	let message = '';
	let sending = false;
	let submitted = false;
	let errorMessage = '';

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		errorMessage = '';

		if (!name.trim() || !email.trim() || !message.trim()) {
			errorMessage = 'Please fill in every field so I know how to reach you.';
			return;
		}

		sending = true;

		// Simulate sending a message. In production this could call an API or server action.
		await new Promise((resolve) => setTimeout(resolve, 900));

		sending = false;
		submitted = true;
		name = '';
		email = '';
		message = '';
	};
</script>

<svelte:head>
	<title>Contact | Raqui's Road</title>
	<meta
		name="description"
		content="Send Raqui a message about recipes, homemaking rhythms, or collaborative ideas."
	/>
</svelte:head>

<section class="bg-canvas text-ink-soft">
	<div class="mx-auto max-w-3xl px-4 py-16 lg:px-8">
		<div class="rounded-3xl border border-brand bg-card p-10 shadow-xl shadow-[rgba(76,44,39,0.05)]">
			<p class="text-xs uppercase tracking-[0.4em] text-muted">Say hello</p>
			<h1 class="mt-3 font-display text-4xl text-ink">Send a note to Raqui</h1>
			<p class="mt-4 text-lg">
				I read every message that comes through this form. Whether you have a recipe request, a
				testimony to share, or a collaboration idea, I’d love to hear it.
			</p>

			{#if submitted}
				<div
					class="mt-6 rounded-2xl border border-brand bg-panel/50 p-4 text-sm text-ink"
					role="status"
				>
					<p class="font-semibold text-ink">Message sent!</p>
					<p>I’ll reply as soon as I can. Thank you for writing.</p>
				</div>
			{/if}

			{#if errorMessage}
				<div class="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{errorMessage}
				</div>
			{/if}

			<form class="mt-8 space-y-6" on:submit={handleSubmit}>
				<div>
					<label class="text-sm font-semibold uppercase tracking-[0.3em] text-muted" for="name"
						>Name</label
					>
					<input
						id="name"
						class="mt-2 w-full rounded-2xl border border-brand bg-white/80 px-4 py-3 text-ink focus:border-[var(--accent)] focus:outline-none"
						type="text"
						placeholder="Your full name"
						bind:value={name}
						required
					/>
				</div>
				<div>
					<label class="text-sm font-semibold uppercase tracking-[0.3em] text-muted" for="email"
						>Email</label
					>
					<input
						id="email"
						class="mt-2 w-full rounded-2xl border border-brand bg-white/80 px-4 py-3 text-ink focus:border-[var(--accent)] focus:outline-none"
						type="email"
						placeholder="you@example.com"
						bind:value={email}
						required
					/>
				</div>
				<div>
					<label class="text-sm font-semibold uppercase tracking-[0.3em] text-muted" for="message"
						>Message</label
					>
					<textarea
						id="message"
						class="mt-2 min-h-[160px] w-full rounded-2xl border border-brand bg-white/80 px-4 py-3 text-ink focus:border-[var(--accent)] focus:outline-none"
						placeholder="How can I help?"
						bind:value={message}
						required
					></textarea>
				</div>
				<button
					class="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-70"
					type="submit"
					disabled={sending}
				>
					{sending ? 'Sending...' : 'Send message'}
				</button>
			</form>
		</div>
	</div>
</section>

