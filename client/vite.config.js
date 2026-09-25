import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions'],
				additionalData: `@use '@/scss/variables.scss' as *; @use '@/scss/mixins.scss' as *;`,
			},
		},
	},
	server: {
		host: '0.0.0.0',
		port: 8888,
		hmr: {
			host: '192.168.18.4',
			port: 8888,
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
