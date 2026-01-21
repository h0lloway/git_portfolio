<template>
	<header class="header">
		<router-link to="/" class="logo">
			<svg width="60" height="60" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
				<rect
					x="1"
					y="1"
					width="28"
					height="28"
					rx="4"
					ry="4"
					:fill="logoFill"
					:stroke="logoStroke"
					stroke-width="2"
					stroke-linejoin="miter"
				/>
				<g
					style="transform: translateX(1.5px)"
					fill="none"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M5,22 L5,8 L10,16 L15,8 L15,22" :stroke="logoStroke" fill="none" />
					<path
						d="M15,8
								L15,22
								C15,22 23,22 23,15
								C23,8 15,8 15,8 Z"
						:stroke="logoStroke"
						fill="none"
					/>
				</g>
			</svg>
		</router-link>

		<div class="header-right">
			<button class="theme-toggle" aria-label="Сменить тему" @click="toggleTheme">
				<Icon :icon="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" width="24" height="24" />
			</button>
			<button class="burger" @click="$emit('toggle-menu')">
				<Icon icon="mdi:menu" width="24" height="24" />
			</button>
		</div>
	</header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { initHeaderScroll } from '../js/functions/headerScroll.js'

defineEmits(['toggle-menu'])

const isDark = ref(document.documentElement.getAttribute('data-theme') !== 'light')

const logoFill = computed(() => isDark.value ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)')
const logoStroke = computed(() => isDark.value ? '#fff' : '#1a1a1a')

function toggleTheme() {
	const newTheme = isDark.value ? 'light' : 'dark'
	document.documentElement.setAttribute('data-theme', newTheme)
	localStorage.setItem('theme', newTheme)
	isDark.value = !isDark.value
	window.dispatchEvent(new window.CustomEvent('theme-changed', { detail: { isDark: isDark.value } }))
}

function onThemeChanged(e) {
	isDark.value = e.detail.isDark
}

onMounted(() => {
	initHeaderScroll()
	window.addEventListener('theme-changed', onThemeChanged)
})

onUnmounted(() => {
	window.removeEventListener('theme-changed', onThemeChanged)
})
</script>
