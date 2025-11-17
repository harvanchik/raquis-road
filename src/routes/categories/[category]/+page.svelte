<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { posts, category, slug } = data;

	const formatDate = (value: Date | string) =>
		new Date(value).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
</script>

<svelte:head>
	<title>{category} Posts | Raqui's Road</title>
	<meta name="description" content={`Explore ${category} stories on Raqui's Road.`} />
</svelte:head>

<section class="bg-canvas text-ink-soft">
	<div class="mx-auto max-w-5xl px-4 py-14 lg:px-8">
		<header class="rounded-3xl border border-brand bg-card p-8 shadow-xl shadow-[rgba(76,44,39,0.05)]">
			<p class="text-xs uppercase tracking-[0.4em] text-muted">Category</p>
			<h1 class="mt-3 font-display text-4xl text-ink">{category}</h1>
			<p class="mt-3 text-sm text-ink-soft">
				Faithful reflections, recipes, and rhythms gathered under the {category.toLowerCase()} banner.
			</p>
			<div class="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-muted">
				<a class="rounded-full border border-brand px-4 py-2 hover:border-[var(--accent)] hover:bg-panel" href="/posts">
					All posts
				</a>
				<a class="rounded-full border border-brand px-4 py-2 hover:border-[var(--accent)] hover:bg-panel" href="/">
					Home
				</a>
			</div>
		</header>

		<div class="mt-10 grid gap-6">
			{#each posts as post}
				<a
					class="rounded-3xl border border-brand bg-card p-6 transition hover:-translate-y-1 hover:border-[var(--accent)]"
					href={`/${post.categorySlug}/${post.slug}`}
				>
					<div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
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

