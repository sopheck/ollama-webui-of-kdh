import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { Mode, plugin as markdown } from 'vite-plugin-markdown'

export default defineConfig({
	plugins: [sveltekit(),
		markdown({ mode: [Mode.HTML, Mode.TOC]})
	],
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version)
	}
});
