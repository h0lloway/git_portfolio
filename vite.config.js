import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import handlebars from 'vite-plugin-handlebars'

export default defineConfig({
	base: '/git_portfolio/',
	plugins: [
		vue(),
		handlebars({
			partialDirectory: 'src/components',
			reloadOnPartialChange: true,
		}),
	],
	server: {
		watch: {
			usePolling: true
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: ''
			}
		}
	}
})
