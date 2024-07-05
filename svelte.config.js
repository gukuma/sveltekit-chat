import adapter from '@sveltejs/adapter-cloudflare-workers';
import { vitePreprocess } from '@sveltejs/kit/vite';
import wasm from 'vite-plugin-wasm';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [wasm()],
			resolve: {
				extensions: ['.js', '.ts', '.py']
			}
		}
	}
};

export default config;
