<script lang="ts">
	import type { PostSummary } from '$lib/utils/posts';

	const { error, status } = $props<{
		error: App.Error & { data?: { suggestions?: PostSummary[] } };
		status: number;
	}>();

	const suggestions = error?.data?.suggestions ?? [];
	const heading =
		status === 404
			? 'This stop is missing'
			: 'Something unexpected happened on the road';
	const description =
		status === 404
			? error?.message ?? 'The post you’re looking for may have moved.'
			: 'Please refresh the page or try again in a moment.';
</script>

<section class="bg-canvas text-ink-soft">
	<div class="mx-auto max-w-4xl px-4 py-20 lg:px-8">
		<div class="rounded-3xl border border-brand bg-card p-10 text-center shadow-xl shadow-[rgba(76,44,39,0.05)]">
			<p class="text-xs uppercase tracking-[0.4em] text-muted">{status}</p>
			<h1 class="mt-3 font-display text-4xl text-ink">{heading}</h1>
			<p class="mt-4 text-lg">{description}</p>
			<div class="mt-8 flex flex-wrap justify-center gap-3">
				<a
					class="rounded-full border border-brand px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-ink-soft transition hover:border-[var(--accent)] hover:text-ink"
					href="/"
				>
					Back home
				</a>
				<a
					class="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-accent-strong"
					href="/posts"
				>
					View all posts
				</a>
			</div>

			{#if suggestions.length}
				<div class="mt-10 text-left">
					<p class="text-xs uppercase tracking-[0.4em] text-muted">Try one of these</p>
					<ul class="mt-4 space-y-3">
						{#each suggestions as suggestion}
							<li class="rounded-2xl border border-brand bg-panel/80 px-5 py-4 flex flex-col gap-1">
								<a
									class="font-display text-ink text-lg hover:text-accent"
									href={`/${suggestion.categorySlug}/${suggestion.slug}`}
								>
									{suggestion.title}
								</a>
								<p class="text-sm text-muted">{suggestion.excerpt}</p>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</section>

