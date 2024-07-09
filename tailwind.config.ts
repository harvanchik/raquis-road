import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				cormorant: ['Cormorant Garamond', 'serif']
			}
		}
	},

	plugins: [require('@tailwindcss/typography'), require('tailwindcss-textshadow')]
} as Config;
