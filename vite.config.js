import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { portfolioData } from './src/js/data.js'

export default defineConfig({
	base: '/git_portfolio/',
	plugins: [
		handlebars({
			partialDirectory: 'src/components',
			reloadOnPartialChange: true,
			context: {
				portfolioData
			}
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
