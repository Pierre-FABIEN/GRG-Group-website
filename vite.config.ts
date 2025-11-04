import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { paraglide } from '@inlang/paraglide-js-adapter-sveltekit/vite'
import { defineConfig } from 'vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],

	optimizeDeps: {
		exclude: ['@node-rs/argon2', '@node-rs/bcrypt']
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},

	server: {
		port: 2000,
		watch: {
			usePolling: true,
			interval: 1000
		}
	},

	preprocess: [vitePreprocess()],

	clearScreen: false
});
