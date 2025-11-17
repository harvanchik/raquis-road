import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/utils/posts';

export const prerender = true;

export const load = (async () => {
	const posts = await getAllPosts();
	const categories = Array.from(
		new Map(
			posts.map((post) => [
				post.categorySlug,
				{ label: post.category, slug: post.categorySlug, count: 0 }
			])
		).values()
	);

	for (const post of posts) {
		const cat = categories.find((c) => c.slug === post.categorySlug);
		if (cat) cat.count += 1;
	}

	return {
		posts,
		categories
	};
}) satisfies PageServerLoad;

