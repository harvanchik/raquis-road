import type { EntryGenerator, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getAllPosts, getPost } from '$lib/utils/posts';

export const prerender = true;

export const entries: EntryGenerator = async () => {
	const posts = await getAllPosts();
	return posts.map((post) => ({ category: post.categorySlug, slug: post.slug }));
};

export const load = (async ({ params }) => {
	try {
		const post = await getPost(params.category, params.slug);
		return { post };
	} catch (err) {
		const suggestions = (await getAllPosts()).slice(0, 4);
		throw error(404, {
			message: 'Post not found',
			suggestions
		});
	}
}) satisfies PageServerLoad;

