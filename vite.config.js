import { defineConfig } from 'vite'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	base: '/',
	plugins: [
		{
			name: 'inject-json-ld',
			transformIndexHtml(html) {
				const schema = readFileSync(resolve(__dirname, 'src/data/schema.json'), 'utf-8')
				return html.replace(
					'</head>',
					`\t<script type="application/ld+json">\n\t${schema.trim()}\n\t</script>\n</head>`
				)
			}
		},
		vue(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}']
			},
			manifest: {
				name: 'Maksim Dubrovin | Web Developer',
				short_name: 'MD Portfolio',
				description: 'Портфолио веб-разработчика Максима Дубровина',
				theme_color: '#0a0a0a',
				background_color: '#0a0a0a',
				display: 'standalone',
				start_url: '/',
				scope: '/',
				icons: [
					{
						src: '/icon-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icon-512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
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
