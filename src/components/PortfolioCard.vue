<template>
	<li
		ref="cardRef"
		class="portfolio__list-item item-portf"
		:class="[data.type, { 'is-visible': isVisible }]"
		@click="open"
		@mouseenter="onMouseEnter"
		@mousemove="onMouseMove"
		@mouseleave="onMouseLeave"
	>
		<div ref="bodyRef" class="item-portf__body">
			<BrowserWindow>
				<div class="item-portf__img">
					<div v-if="!isLoaded" class="item-portf__skeleton"></div>
					<img
						v-if="shouldLoad"
						:src="data.desktopImg"
						:alt="`${data.subtitle} — ${data.title}`"
						:class="{ loaded: isLoaded }"
						@load="onImageLoad"
					/>
				</div>
			</BrowserWindow>

			<div class="item-portf__glass">
				<span class="item-portf__subtitle">{{ data.subtitle }}</span>
				<span class="item-portf__title">{{ data.title }}</span>
				<Icon icon="mdi:arrow-right" class="item-portf__icon" />
			</div>
		</div>
	</li>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import BrowserWindow from './BrowserWindow.vue'

const router = useRouter()
const cardRef = ref(null)
const bodyRef = ref(null)
const isVisible = ref(false)
const shouldLoad = ref(false)
const isLoaded = ref(false)

let observer = null
let loadTimeout = null

const props = defineProps({
	data: Object,
	index: Number
})

// === 3D Tilt ===
function onMouseEnter() {
	if (bodyRef.value) {
		bodyRef.value.style.transition = 'transform 0.15s ease-out'
	}
}

function onMouseMove(e) {
	if (!bodyRef.value || !cardRef.value) return

	const rect = cardRef.value.getBoundingClientRect()
	const x = e.clientX - rect.left
	const y = e.clientY - rect.top
	const centerX = rect.width / 2
	const centerY = rect.height / 2

	const rotateX = ((y - centerY) / centerY) * -8
	const rotateY = ((x - centerX) / centerX) * 8

	bodyRef.value.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

function onMouseLeave() {
	if (bodyRef.value) {
		bodyRef.value.style.transition = 'transform 0.4s ease-out'
		bodyRef.value.style.transform = 'rotateX(0) rotateY(0)'
	}
}

// === Intersection Observer ===
onMounted(() => {
	observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				const delay = props.index * 100

				loadTimeout = setTimeout(() => {
					shouldLoad.value = true
					isVisible.value = true
				}, delay)

				observer.disconnect()
			}
		},
		{ rootMargin: '50px' }
	)

	if (cardRef.value) {
		observer.observe(cardRef.value)
	}
})

onUnmounted(() => {
	if (observer) observer.disconnect()
	if (loadTimeout) clearTimeout(loadTimeout)
})

function onImageLoad() {
	isLoaded.value = true
}

function open() {
	router.push({
		name: 'PortfolioProject',
		params: { id: props.data.id }
	})
}
</script>

<style lang="scss" scoped>
.item-portf {
	opacity: 0;
	transform: translateY(20px);
	transition:
		opacity 0.4s ease,
		transform 0.4s ease;
	&.is-visible {
		opacity: 1;
		transform: translateY(0);
	}
	&__img {
		position: relative;
		width: 100%;
		height: 100%;
		img {
			opacity: 0;
			transition:
				opacity 0.3s ease,
				transform 0.5s ease-out;
			&.loaded {
				opacity: 1;
			}
		}
	}
	&__skeleton {
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, var(--skeleton-from) 25%, var(--skeleton-mid) 50%, var(--skeleton-from) 75%);
		background-size: 200% 100%;
		animation: skeleton-loading 1.5s infinite;
	}
}
@keyframes skeleton-loading {
	0% {
		background-position: 200% 0;
	}
	100% {
		background-position: -200% 0;
	}
}
</style>
