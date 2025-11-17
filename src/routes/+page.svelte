<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { pinned, recent, categories } = data;

	const formatDate = (value: Date | string) =>
		new Date(value).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
</script>

<svelte:head>
	<title>Raqui's Road | Home</title>
	<meta
		name="description"
		content="Family-friendly recipes, homemaking rhythms, and faith-filled travels from Raqui's Road."
	/>
</svelte:head>

<section class="bg-canvas text-ink-soft">
	<div class="mx-auto max-w-6xl px-4 py-16 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-[1.85fr_1fr]">
			<div class="space-y-12">
				<section
					class="rounded-3xl border border-brand bg-card p-8 shadow-xl shadow-[rgba(76,44,39,0.05)]"
				>
					<p class="text-xs font-semibold uppercase tracking-[0.4em] text-muted">Pinned</p>
					<h2 class="mb-6 font-display text-3xl text-ink">Stories I'm keeping close</h2>
					<div class="flex gap-6 pt-1 overflow-x-auto pb-4 scrollbar-soft snap-x snap-mandatory">
						{#each pinned as post}
							<a
								class="group flex min-w-[260px] flex-col rounded-2xl border border-brand bg-panel p-5 transition hover:-translate-y-1 hover:border-[var(--accent)] hover:bg-card md:min-w-[320px] snap-start"
								href={`/${post.categorySlug}/${post.slug}`}
							>
								<p class="text-xs uppercase tracking-widest text-muted">
									{post.category}
								</p>
								<h3 class="mt-2 font-display text-2xl text-ink">{post.title}</h3>
								<p class="mt-3 text-sm text-ink-soft">
									{post.excerpt}
								</p>
								<div class="mt-4 flex flex-wrap items-center justify-between text-xs text-muted">
									<span>{formatDate(post.date)}</span>
									<span>{post.readingTime} min read</span>
								</div>
							</a>
						{/each}
					</div>
				</section>

				<section class="space-y-6">
					<div class="flex items-center justify-between">
						<h2 class="font-display text-2xl text-ink">Most Recent Notes</h2>
						<a
							class="text-sm font-semibold text-accent underline-offset-4 hover:underline"
							href="/posts"
						>
							View archive
						</a>
					</div>

					<div class="space-y-5">
						{#each recent as post}
							<a
								class="group block rounded-2xl border border-brand bg-card p-6 transition hover:-translate-y-1 hover:border-[var(--accent)]"
								href={`/${post.categorySlug}/${post.slug}`}
							>
								<div
									class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-muted"
								>
									<span>{post.category}</span>
									<span class="h-px flex-1 bg-[var(--border)]"></span>
									<span>{formatDate(post.date)}</span>
									<span>·</span>
									<span>{post.readingTime} min read</span>
								</div>
								<h3 class="mt-3 font-display text-2xl text-ink group-hover:text-accent">
									{post.title}
								</h3>
								{#if post.subtitle}
									<p class="mt-1 text-sm uppercase tracking-widest text-muted">
										{post.subtitle}
									</p>
								{/if}
								<p class="mt-4 text-ink-soft">{post.excerpt}</p>
								<div class="mt-4 flex flex-wrap gap-2 text-xs text-muted">
									{#each post.tags as tag}
										<span class="rounded-full bg-panel px-3 py-1">#{tag}</span>
									{/each}
								</div>
							</a>
						{/each}
					</div>
				</section>
			</div>

			<aside
				class="space-y-8 rounded-3xl border border-brand bg-card p-8 shadow-xl shadow-[rgba(76,44,39,0.05)] lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto scrollbar-soft"
			>
				<div>
					<h3 class="font-display text-xl text-ink">Categories</h3>
					<p class="text-sm text-muted">Browse Raqui's favorite rhythms</p>
					<ul class="mt-4 space-y-3">
						{#each categories as category}
							<li>
								<a
									class="flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-ink-soft transition hover:border-[var(--accent)] hover:bg-panel"
									href={`/categories/${category.slug}`}
								>
									<span>{category.label}</span>
									<span class="text-sm text-muted">{category.count}</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<div
					id="support-raqui"
					class="rounded-3xl border border-brand bg-gradient-to-br from-[var(--card)] via-[var(--panel)] to-[var(--canvas)] p-6 text-center"
				>
					<p class="text-xs uppercase tracking-[0.4em] text-muted">Support my blogs</p>
					<h3 class="mt-3 font-display text-2xl text-ink">Send a coffee or prayer</h3>
					<p class="mt-3 text-sm text-ink-soft">
						Every note, download, and shared recipe keeps Raqui's Road rolling. Your kindness fuels
						the stories.
					</p>
					<a
						class="mt-5 inline-flex items-center justify-center rounded-full bg-accent px-6 py-2 font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-accent-strong"
						href="/support#support-options"
					>
						Give a gift
					</a>
				</div>
			</aside>
		</div>
	</div>
</section>
