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
	build: {
		rollupOptions: {
			onwarn(warning, warn) {
				if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
					return;
				}
				warn(warning);
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
