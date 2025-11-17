import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export type CategoryName = 'Kitchen' | 'Homemaking' | 'Travel' | 'Food';
export type CategorySlug = 'kitchen' | 'homemaking' | 'travel' | 'food';

export const CATEGORY_SLUGS: CategorySlug[] = ['kitchen', 'homemaking', 'travel', 'food'];
export const CATEGORY_LABELS: Record<CategorySlug, CategoryName> = {
	kitchen: 'Kitchen',
	homemaking: 'Homemaking',
	travel: 'Travel',
	food: 'Food'
};
export const isCategorySlug = (value: string): value is CategorySlug =>
	(CATEGORY_SLUGS as readonly string[]).includes(value);

export interface PostFrontmatter {
	title: string;
	subtitle?: string;
	date: Date;
	author: string;
	excerpt: string;
	tags: string[];
	category: CategoryName;
	location?: string;
	draft: boolean;
}

export interface PostSummary extends PostFrontmatter {
	slug: string;
	categorySlug: CategorySlug;
	readingTime: number;
}

export interface PostContent extends PostSummary {
	content: string;
	html: string;
}

const CONTENT_DIR = path.resolve('src/content');

marked.setOptions({
	gfm: true,
	mangle: false,
	headerIds: true
});

const toCategoryName = (slug: string): CategoryName => {
	if (!isCategorySlug(slug)) throw new Error(`Unsupported category folder: ${slug}`);
	return CATEGORY_LABELS[slug];
};

const assertFrontmatter = (
	data: Record<string, unknown>,
	categorySlug: CategorySlug
): Omit<PostSummary, 'slug' | 'categorySlug' | 'readingTime'> => {
	const category = (data.category as CategoryName | undefined) ?? toCategoryName(categorySlug);
	if (!category) throw new Error('Missing category in frontmatter');

	const title = data.title;
	const date = data.date;
	const author = data.author;
	const excerpt = data.excerpt;
	const tags = data.tags;

	if (typeof title !== 'string') throw new Error('Missing title in frontmatter');
	if (typeof date !== 'string') throw new Error(`Invalid date for ${title}`);
	if (typeof author !== 'string') throw new Error(`Missing author for ${title}`);
	if (typeof excerpt !== 'string') throw new Error(`Missing excerpt for ${title}`);

	const parsedDate = new Date(date);
	if (Number.isNaN(parsedDate.getTime())) throw new Error(`Invalid date value: ${date}`);

	const normalizedTags = Array.isArray(tags) ? tags.map(String) : [];
	const subtitle = typeof data.subtitle === 'string' ? data.subtitle : undefined;
	const location = typeof data.location === 'string' ? data.location : undefined;
	const draft = typeof data.draft === 'boolean' ? data.draft : false;

	return {
		title,
		subtitle,
		date: parsedDate,
		author,
		excerpt,
		tags: normalizedTags,
		category,
		location,
		draft
	};
};

const estimateReadingTime = (content: string) => {
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.round(words / 250));
	return minutes;
};

const parseFile = async (
	categorySlug: CategorySlug,
	slug: string
): Promise<PostContent | null> => {
	const filePath = path.join(CONTENT_DIR, categorySlug, `${slug}.md`);
	const file = await fs.readFile(filePath, 'utf-8');
	const parsed = matter(file);
	const frontmatter = assertFrontmatter(parsed.data, categorySlug);

	if (frontmatter.draft) return null;

	const content = parsed.content.trim();
	const html = await marked.parse(content);
	const readingTime = estimateReadingTime(content);

	return {
		...frontmatter,
		slug,
		categorySlug,
		readingTime,
		content,
		html
	};
};

const getAvailableFiles = async () => {
	const directories = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
	const tasks: Array<Promise<PostContent | null>> = [];

	for (const dir of directories) {
		if (!dir.isDirectory()) continue;
		if (!isCategorySlug(dir.name)) continue;
		const categorySlug = dir.name;
		const files = await fs.readdir(path.join(CONTENT_DIR, categorySlug));
		for (const filename of files) {
			if (!filename.endsWith('.md')) continue;
			const slug = filename.replace(/\.md$/, '');
			tasks.push(parseFile(categorySlug, slug));
		}
	}

	const results = await Promise.all(tasks);
	return results.filter((post): post is PostContent => Boolean(post));
};

export const getAllPosts = async (): Promise<PostSummary[]> => {
	const posts = await getAvailableFiles();
	return posts
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.map(({ content: _content, html: _html, ...summary }) => summary);
};

export const getPost = async (category: string, slug: string): Promise<PostContent> => {
	const lowered = category.toLowerCase();
	if (!isCategorySlug(lowered)) {
		throw new Error(`Unknown category: ${category}`);
	}
	const categorySlug = lowered;
	const post = await parseFile(categorySlug, slug);
	if (!post) {
		throw new Error(`Post not found: ${category}/${slug}`);
	}
	return post;
};

