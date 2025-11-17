<script lang="ts">
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const { post } = data;

	const formatDate = (value: Date | string) =>
		new Date(value).toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
</script>

<svelte:head>
	<title>{post.title} | Raqui's Road</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<article class="bg-canvas text-ink-soft">
	<div class="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
		<nav class="text-sm text-muted">
			<a class="hover:text-ink" href="/">Home</a>
			<span class="px-2 text-[var(--border)]">›</span>
			<a class="hover:text-ink" href="/posts">Posts</a>
			<span class="px-2 text-[var(--border)]">›</span>
			<span>{post.category}</span>
		</nav>

		<header class="mt-6 rounded-3xl border border-brand bg-card p-8 shadow-xl shadow-[rgba(76,44,39,0.05)]">
			<p class="text-xs uppercase tracking-[0.4em] text-muted">{post.category}</p>
			<h1 class="mt-4 font-display text-4xl text-ink">{post.title}</h1>
			{#if post.subtitle}
				<p class="mt-2 text-sm uppercase tracking-widest text-muted">{post.subtitle}</p>
			{/if}
			<div class="mt-6 flex flex-wrap gap-4 text-sm text-ink-soft">
				<span>By {post.author}</span>
				<span>{formatDate(post.date)}</span>
				<span>{post.readingTime} min read</span>
				{#if post.location}
					<span>{post.location}</span>
				{/if}
			</div>
			<div class="mt-4 flex flex-wrap gap-2 text-xs text-muted">
				{#each post.tags as tag}
					<span class="rounded-full bg-panel px-3 py-1">#{tag}</span>
				{/each}
			</div>
		</header>

		<section class="prose prose-lg mx-auto mt-10 max-w-none rounded-3xl border border-brand bg-card p-10 text-ink-soft prose-headings:text-ink prose-strong:text-ink [&_p]:mb-6 [&_p]:text-lg [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand [&_blockquote]:pl-4 [&_blockquote]:italic">
			<div>
				{@html post.html}
			</div>
		</section>

		<section
			id="support-raqui"
			class="mt-12 rounded-3xl border border-brand bg-gradient-to-r from-[var(--card)] via-[var(--panel)] to-[var(--canvas)] p-8 text-center shadow-lg shadow-[rgba(76,44,39,0.06)]"
		>
			<p class="text-xs uppercase tracking-[0.4em] text-muted">Support my blogs</p>
			<h2 class="mt-3 font-display text-3xl text-ink">Help Raqui keep the road bright</h2>
			<p class="mt-4 text-sm text-ink-soft">
				If this post encouraged you, consider sharing it, praying for our family adventures, or
				sponsoring the next cup of road-trip coffee. Your support means the world.
			</p>
			<div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
				<a
					class="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-accent-strong"
					href="/support"
				>
					Send a gift
				</a>
				<a
					class="rounded-full border border-brand px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-ink-soft transition hover:border-[var(--accent)] hover:text-ink"
					href="/contact"
				>
					Say hello
				</a>
			</div>
		</section>
	</div>
</article>

