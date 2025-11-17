<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { posts, categories } = data;

	const formatDate = (value: Date | string) =>
		new Date(value).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
</script>

<svelte:head>
	<title>Raqui's Road | Posts</title>
	<meta
		name="description"
		content="Browse every post from Raqui's Road, from the kitchen to the open road."
	/>
</svelte:head>

<section class="bg-canvas text-ink-soft">
	<div class="mx-auto max-w-5xl px-4 py-14 lg:px-8">
		<div class="rounded-3xl border border-brand bg-card p-8 text-center shadow-xl shadow-[rgba(76,44,39,0.05)]">
			<p class="text-xs uppercase tracking-[0.4em] text-muted">Archive</p>
			<h1 class="mt-3 font-display text-4xl text-ink">Every stop on Raqui's Road</h1>
			<p class="mt-3 text-sm text-ink-soft">
				Choose a category or wander through the full collection of homemaking, kitchen, travel,
				and food reflections.
			</p>
			<div class="mt-6 flex flex-wrap justify-center gap-3">
				<span class="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white">
					All Posts
				</span>
				{#each categories as category}
					<a
						class="rounded-full border border-brand px-5 py-2 text-sm font-semibold text-muted transition hover:border-[var(--accent)] hover:bg-panel"
						href={`/categories/${category.slug}`}
					>
						{category.label}
					</a>
				{/each}
			</div>
		</div>

		<div class="mt-10 grid gap-6">
			{#each posts as post}
				<a
					class="rounded-3xl border border-brand bg-card p-6 transition hover:-translate-y-1 hover:border-[var(--accent)]"
					href={`/${post.categorySlug}/${post.slug}`}
				>
					<div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
						<span>{post.category}</span>
						<span class="h-px flex-1 bg-[var(--border)]"></span>
						<span>{formatDate(post.date)}</span>
						<span>·</span>
						<span>{post.readingTime} min read</span>
					</div>
					<h2 class="mt-3 font-display text-3xl text-ink">{post.title}</h2>
					{#if post.subtitle}
						<p class="mt-1 text-sm uppercase tracking-widest text-muted">{post.subtitle}</p>
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
	</div>
</section>

