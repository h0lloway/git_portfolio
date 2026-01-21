<template>
	<aside>
		<div class="nav-overlay" :class="{ active: open }" @click="$emit('close')"></div>

		<nav :class="{ open }">
			<div class="logo">
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
						:stroke="logoStroke"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M5,22 L5,8 L10,16 L15,8 L15,22" />
						<path
							d="M15,8
				L15,22
				C15,22 23,22 23,15
				C23,8 15,8 15,8 Z"
						/>
					</g>
				</svg>
			</div>

			<div class="nav-header">
				<button class="nav-back" @click="$emit('close')">
					<Icon icon="ph:arrow-left-bold" width="30" height="30" />
				</button>
			</div>

			<div ref="navButtons" class="nav-buttons">
				<div ref="indicatorEl" class="nav-indicator no-transition"></div>

				<router-link to="/" class="nav-button" data-tooltip="Главная">
					<Icon icon="ph:house-bold" width="36" height="36" />
				</router-link>
				<router-link to="/about" class="nav-button" data-tooltip="Обо мне">
					<Icon icon="ph:user-bold" width="36" height="36" />
				</router-link>
				<router-link to="/skills" class="nav-button" data-tooltip="Навыки">
					<Icon icon="ph:wrench-bold" width="36" height="36" />
				</router-link>
				<router-link to="/portfolio" class="nav-button" data-tooltip="Портфолио">
					<Icon icon="ph:squares-four-bold" width="36" height="36" />
				</router-link>
				<router-link to="/contacts" class="nav-button" data-tooltip="Контакты">
					<Icon icon="ph:envelope-bold" width="36" height="36" />
				</router-link>
			</div>

			<button class="theme-toggle" aria-label="Сменить тему" @click="toggleTheme">
				<Icon :icon="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" width="28" height="28" />
			</button>
		</nav>
	</aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const props = defineProps({
	open: Boolean
})

defineEmits(['close'])

const route = useRoute()

const navButtons = ref(null)
const indicatorEl = ref(null)

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
	window.addEventListener('theme-changed', onThemeChanged)
})

onUnmounted(() => {
	window.removeEventListener('theme-changed', onThemeChanged)
})

/* === КАРТА МАРШРУТОВ → КНОПОК === */
const routeMap = [
	{ match: (path) => path === '/', to: '/' },
	{ match: (path) => path.startsWith('/about'), to: '/about' },
	{ match: (path) => path.startsWith('/skills'), to: '/skills' },
	{ match: (path) => path.startsWith('/portfolio'), to: '/portfolio' },
	{ match: (path) => path.startsWith('/contacts'), to: '/contacts' }
]

/* === НАХОДИМ КНОПКУ ДЛЯ ТЕКУЩЕГО ROUTE === */
function getActiveButton() {
	if (!navButtons.value) return null

	const path = route.path

	const rule = routeMap.find((r) => r.match(path))
	if (!rule) return null

	return navButtons.value.querySelector(`.nav-button[href="#${rule.to}"]`)
}

/* === ДВИЖЕНИЕ ИНДИКАТОРА === */
function moveIndicator() {
	const activeButton = getActiveButton()
	if (!activeButton || !indicatorEl.value) return

	indicatorEl.value.style.height = `${activeButton.offsetHeight}px`

	indicatorEl.value.style.transform = `translateY(${activeButton.offsetTop}px)`
}

/* 🔒 блокировка body */
watch(
	() => props.open,
	(val) => {
		document.body.classList.toggle('open', val)
	}
)

/* === ИНИЦИАЛИЗАЦИЯ БЕЗ TRANSITION === */
onMounted(async () => {
	await nextTick()

	moveIndicator()

	// ВКЛЮЧАЕМ АНИМАЦИЮ ТОЛЬКО ПОСЛЕ ПЕРВОГО PAINT
	window.addEventListener('load', () => {
		indicatorEl.value.classList.remove('no-transition')
	})
})

/* === РЕАКЦИЯ НА СМЕНУ ROUTE === */
watch(
	() => route.path,
	async () => {
		await nextTick()
		moveIndicator()
	}
)
</script>
