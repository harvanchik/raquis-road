<script lang="ts">
	import 'virtual:pwa-assets/head';
	import '../app.css';

	let { children } = $props();

const navLinks = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/posts', label: 'Categories' },
	{ href: '/support', label: 'Support Me' }
];
</script>

<div class="min-h-screen bg-shell text-ink-soft">
	<header class="sticky top-0 z-30 border-b border-brand bg-card backdrop-blur">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-ink-soft lg:px-8">
			<a class="font-display text-2xl text-ink" href="/">
				Raqui<span class="text-accent">’</span>s Road
			</a>
			<nav class="hidden items-center gap-6 text-sm uppercase tracking-[0.3em] text-muted md:flex">
				{#each navLinks as link}
					<a class="transition hover:text-ink" href={link.href}>{link.label}</a>
				{/each}
			</nav>
			<a
				class="rounded-full border border-brand px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft transition hover:border-[var(--accent-strong)] hover:text-ink"
				href="/contact"
			>
				Say hello
			</a>
		</div>
	</header>

	<main>
		{@render children()}
	</main>

	<footer class="border-t border-brand bg-card">
		<div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-center text-sm text-muted md:flex-row md:items-center md:justify-between lg:px-8">
			<p>© {new Date().getFullYear()} Raqui’s Road. Family, faith, and food for the journey.</p>
			<div class="flex justify-center gap-4 text-xs uppercase tracking-[0.3em]">
				<a class="hover:text-ink" href="/about">About</a>
				<a class="hover:text-ink" href="/posts">Categories</a>
				<a class="hover:text-ink" href="/support">Support</a>
			</div>
		</div>
	</footer>
</div>
