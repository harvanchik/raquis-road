import type { EntryGenerator, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import {
	CATEGORY_LABELS,
	CATEGORY_SLUGS,
	isCategorySlug,
	type CategorySlug
} from '$lib/utils/posts';
import { getAllPosts } from '$lib/utils/posts';

export const prerender = true;

export const entries: EntryGenerator = () =>
	CATEGORY_SLUGS.map((slug) => ({ category: slug }));

export const load = (async ({ params }) => {
	const slug = params.category.toLowerCase();
	if (!isCategorySlug(slug)) {
		throw error(404, 'Category not found');
	}

	const posts = await getAllPosts();
	const filtered = posts.filter((post) => post.categorySlug === slug);
	if (filtered.length === 0) {
		throw error(404, 'No posts available for this category yet.');
	}

	return {
		category: CATEGORY_LABELS[slug as CategorySlug],
		slug: slug as CategorySlug,
		posts: filtered
	};
}) satisfies PageServerLoad;

