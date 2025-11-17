import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/utils/posts';

export const prerender = true;

const PINNED_SLUGS = [
	{ categorySlug: 'kitchen', slug: 'weeknight-pasta-prayerful-pause' },
	{ categorySlug: 'travel', slug: 'autumn-weekend-blue-ridge-parkway' }
] as const;

export const load = (async () => {
	const posts = await getAllPosts();

	const pinnedKeys = new Set<string>();
	const pinned = PINNED_SLUGS.map((pin) => {
		const match = posts.find(
			(post) => post.slug === pin.slug && post.categorySlug === pin.categorySlug
		);
		if (match) {
			pinnedKeys.add(`${pin.categorySlug}/${pin.slug}`);
		}
		return match ?? null;
	}).filter((p): p is NonNullable<typeof p> => Boolean(p));

	const recent = posts.filter((post) => !pinnedKeys.has(`${post.categorySlug}/${post.slug}`));

	const categoriesMap = new Map<
		string,
		{
			label: string;
			slug: string;
			count: number;
		}
	>();

	for (const post of posts) {
		const existing = categoriesMap.get(post.categorySlug);
		if (existing) {
			existing.count += 1;
			continue;
		}
		categoriesMap.set(post.categorySlug, {
			label: post.category,
			slug: post.categorySlug,
			count: 1
		});
	}

	const categories = Array.from(categoriesMap.values()).sort((a, b) =>
		a.label.localeCompare(b.label)
	);

	return {
		pinned,
		recent,
		categories
	};
}) satisfies PageServerLoad;

