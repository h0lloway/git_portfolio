import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import prettierConfig from 'eslint-config-prettier'

export default [
	{
		ignores: ['dist/**', 'node_modules/**', '*.config.js']
	},
	js.configs.recommended,
	...vue.configs['flat/recommended'],
	prettierConfig,
	{
		languageOptions: {
			globals: {
				document: 'readonly',
				window: 'readonly',
				localStorage: 'readonly',
				setTimeout: 'readonly',
				setInterval: 'readonly',
				clearTimeout: 'readonly',
				clearInterval: 'readonly',
				requestAnimationFrame: 'readonly',
				IntersectionObserver: 'readonly'
			}
		},
		rules: {
			'vue/multi-word-component-names': 'off',
			'vue/no-v-html': 'warn',
			'vue/require-default-prop': 'off',
			'vue/require-explicit-emits': 'warn',
			'vue/attributes-order': 'warn',
			'vue/first-attribute-linebreak': 'off',
			'vue/block-order': 'warn'
		}
	}
]
