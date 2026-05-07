<template>
	<section id="home" class="home">
		<div class="left">
			<h1 class="left-title">
				<div class="left-title__hello">
					<p>{{ greeting }}</p>
					<HandWave />
				</div>
				<span class="left-title__second">{{ $t('home.i') }} </span>
				<span class="left-title__third"><i style="font-style: normal">Максим</i></span>
				<span class="left-title__fours">,</span>
				<div class="left-title__fifth"><strong>{{ $t('home.role') }}</strong></div>
			<div class="left-title__subtitle">{{ $t('home.subtitle') }}</div>
			</h1>
			<router-link to="/portfolio" class="btn-main btn-portfolio">
				<Icon icon="ph:squares-four-bold" width="30" height="30" />
				<span>{{ $t('home.btn_portfolio') }}</span>
			</router-link>
			<router-link to="/contacts" class="btn-main btn-contacts">
				<Icon icon="ph:envelope-bold" width="30" height="30" />
				<span>{{ $t('home.btn_contacts') }}</span>
			</router-link>
		</div>
		<div class="right">
			<div class="laptop-wrap">
				<div
					ref="laptopRef"
					class="laptop"
					@mouseenter="onMouseEnter"
					@mousemove="onMouseMove"
					@mouseleave="onMouseLeave"
				>
					<div class="laptop-screen">
						<div class="slider">
							<Icon
								v-for="(item, index) in sliderIcons"
								:key="index"
								:icon="item.icon"
								:class="{ active: index === currentSlide }"
								width="100"
								height="100"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="navigation-btns">
				<router-link to="/about" class="btn-main">
					<span>{{ $t('home.btn_about') }}</span>
					<Icon icon="ph:arrow-right-bold" width="20" height="20" />
				</router-link>
			</div>
			<Footer />
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Footer from '../components/Footer.vue'
import HandWave from '../components/HandWave.vue'
import { Icon } from '@iconify/vue'
import { sliderIcons } from '../data/home.js'

const { t } = useI18n()

const greeting = computed(() => {
	const hour = new Date().getHours()
	if (hour < 6) return t('home.greeting_night')
	if (hour < 12) return t('home.greeting_morning')
	if (hour < 17) return t('home.greeting_day')
	return t('home.greeting_evening')
})

const currentSlide = ref(0)
let intervalId = null

function nextSlide() {
	currentSlide.value = (currentSlide.value + 1) % sliderIcons.length
}

const laptopRef = ref(null)
let ticking = false

function onMouseEnter() {
	if (laptopRef.value) {
		laptopRef.value.style.transition = 'transform 0.3s ease-out'
	}
}

function onMouseMove(e) {
	if (!laptopRef.value || ticking) return

	ticking = true
	requestAnimationFrame(() => {
		if (!laptopRef.value) {
			ticking = false
			return
		}

		const rect = laptopRef.value.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		const centerX = rect.width / 2
		const centerY = rect.height / 2

		const rotateX = ((y - centerY) / centerY) * -15
		const rotateY = ((x - centerX) / centerX) * 15

		laptopRef.value.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
		ticking = false
	})
}

function onMouseLeave() {
	if (laptopRef.value) {
		laptopRef.value.style.transition = 'transform 0.6s ease-out'
		laptopRef.value.style.transform = 'rotateX(0) rotateY(0)'
	}
}

onMounted(() => {
	setTimeout(() => {
		intervalId = setInterval(nextSlide, 1500)
	}, 100)
})

onUnmounted(() => {
	if (intervalId) {
		clearInterval(intervalId)
		intervalId = null
	}
})
</script>

<style lang="scss">
@use '../scss/animations/home';
</style>
