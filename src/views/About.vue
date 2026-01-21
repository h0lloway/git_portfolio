<template>
	<section id="about" class="about">
		<div class="left">
			<h2 class="heading-2">Обо мне</h2>
			<p class="text text-xl">
				Веб-разработчик, специализируюсь на&nbsp;вёрстке и&nbsp;разработке интерфейсов.
				Пишу семантичный адаптивный HTML/CSS/JS, работаю с&nbsp;Vue, интегрирую в&nbsp;различные платформы.
				Делаю интерфейсы понятными, аккуратными и&nbsp;готовыми к&nbsp;масштабированию.
			</p>
			<div class="about-features">
				<div v-for="(item, i) in aboutFeatures" :key="i" class="feature-item">
					<Icon :icon="item.icon" width="30" height="30" />
					<p>{{ item.text }}</p>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="right__content">
				<div
					ref="photoWrapRef"
					class="photo-wrap"
					@mouseenter="onMouseEnter"
					@mousemove="onMouseMove"
					@mouseleave="onMouseLeave"
				>
					<img src="/assets/img/dubrovin_photo.png" alt="Фото Максима Дубровина" draggable="false" />
				</div>
				<div class="social-links">
					<a
						v-for="link in socialLinks"
						:key="link.title"
						class="social-links__item"
						:href="link.email ? undefined : link.href"
						:title="link.title"
						:download="link.download || null"
						@click="handleLinkClick($event, link)"
					>
						<Icon v-if="link.icon" :icon="link.email && emailCopied ? 'mdi:content-copy' : link.icon" />
						<b v-else>{{ link.text }}</b>
					</a>
				</div>
			</div>
			<div class="navigation-btns">
				<router-link to="/" class="btn-main">
					<Icon icon="mdi:arrow-left" />
					<span>Главная</span>
				</router-link>
				<router-link to="/skills" class="btn-main">
					<span>Навыки</span>
					<Icon icon="mdi:arrow-right" />
				</router-link>
			</div>
			<Footer />
		</div>
	</section>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import Footer from '../components/Footer.vue'
import { Icon } from '@iconify/vue'
import { aboutFeatures, socialLinks } from '../data/about'

const photoWrapRef = ref(null)
const emailCopied = ref(false)
let emailTimer = null
let ticking = false

function handleLinkClick(event, link) {
	if (!link.email) return
	event.preventDefault()
	navigator.clipboard.writeText(link.email)
	emailCopied.value = true
	clearTimeout(emailTimer)
	emailTimer = setTimeout(() => { emailCopied.value = false }, 2000)
}

onBeforeUnmount(() => clearTimeout(emailTimer))

function onMouseEnter() {
	if (photoWrapRef.value) {
		photoWrapRef.value.style.transition = 'transform 0.15s ease-out'
	}
}

function onMouseMove(e) {
	if (!photoWrapRef.value || ticking) return

	ticking = true
	requestAnimationFrame(() => {
		if (!photoWrapRef.value) {
			ticking = false
			return
		}

		const rect = photoWrapRef.value.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top
		const centerX = rect.width / 2
		const centerY = rect.height / 2

		const rotateX = ((y - centerY) / centerY) * -10
		const rotateY = ((x - centerX) / centerX) * 10

		photoWrapRef.value.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
		ticking = false
	})
}

function onMouseLeave() {
	if (photoWrapRef.value) {
		photoWrapRef.value.style.transition = 'transform 0.4s ease-out'
		photoWrapRef.value.style.transform = 'rotateX(0) rotateY(0)'
	}
}
</script>

<style lang="scss">
@use '../scss/about';
@use '../scss/animations/about' as aboutAnimations;
</style>
