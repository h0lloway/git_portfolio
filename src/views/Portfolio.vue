<template>
	<section class="portfolio">
		<div class="portfolio__wrap">
			<div class="portfolio__top">
				<div class="portfolio__heading">
				<h2 class="heading-2">Портфолио</h2>
				<span
					class="portfolio__hint"
					:class="{ 'tooltip-active': hintActive }"
					data-tooltip="Некоторые проекты без NDA, над которыми я работал и которые могу показать 👀"
					data-tooltip-position="bottom"
					aria-label="Некоторые проекты без NDA, над которыми я работал и которые могу показать 👀"
					@click.stop="toggleHint"
				>
					<Icon icon="ph:chat-circle-dots-bold" width="32" height="32" />
				</span>
			</div>
				<ul ref="filterList" class="portfolio__list-filter list-filter">
					<li ref="indicator" class="list-filter__indicator no-transition"></li>
					<li
						v-for="item in filters"
						:key="item"
						:ref="(el) => setItemRef(el, item)"
						class="list-filter__item"
						:class="{ active: activeFilter === item }"
						@click="setFilter(item)"
					>
						{{ labels[item] }}
					</li>
				</ul>
				<ul class="portfolio__list">
					<PortfolioCard
						v-for="(card, index) in filteredPortfolio"
						:key="activeFilter + '-' + card.id"
						:data="card"
						:index="index"
					/>
				</ul>
			</div>
			<button
				v-show="showScrollBtn"
				class="scroll-top-btn"
				aria-label="Наверх"
				@click="scrollToTop"
			>
				<Icon icon="mdi:arrow-up" />
			</button>
			<div class="navigation-btns">
				<router-link to="/skills" class="btn-main">
					<Icon icon="mdi:arrow-left" />
					Навыки
				</router-link>
				<router-link to="/contacts" class="btn-main">
					Контакты
					<Icon icon="mdi:arrow-right" />
				</router-link>
			</div>
			<Footer />
		</div>
	</section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import PortfolioCard from '../components/PortfolioCard.vue'
import Footer from '../components/Footer.vue'
import { portfolioData } from '../data/portfolio'

const filters = ['all', 'html', 'email', 'vue']

const labels = {
	all: 'Все работы',
	html: 'Сайты',
	email: 'Письма',
	vue: 'Vue-приложения'
}

const route = useRoute()
const activeFilter = ref(localStorage.getItem('portfolio-filter') || 'html')

const filterList = ref(null)
const indicator = ref(null)
const itemRefs = new Map()

function setItemRef(el, key) {
	if (el) itemRefs.set(key, el)
}

const filteredPortfolio = computed(() => {
	if (activeFilter.value === 'all') return portfolioData
	return portfolioData.filter((item) => item.type === activeFilter.value)
})

function moveIndicator(filter) {
	const el = itemRefs.get(filter)
	if (!el || !indicator.value || !filterList.value) return

	const rect = el.getBoundingClientRect()
	const parentRect = filterList.value.getBoundingClientRect()

	indicator.value.style.width = rect.width + 'px'
	indicator.value.style.transform = `translateX(${rect.left - parentRect.left + filterList.value.scrollLeft}px)`
}

async function setFilter(filter) {
	activeFilter.value = filter
	localStorage.setItem('portfolio-filter', filter)
	await nextTick()
	moveIndicator(filter)
}

const hintActive = ref(false)

function toggleHint() {
	hintActive.value = !hintActive.value
}

function closeHint() {
	hintActive.value = false
}

const showScrollBtn = ref(false)
let ticking = false

function onScroll() {
	if (!ticking) {
		requestAnimationFrame(() => {
			showScrollBtn.value = window.scrollY > 600
			ticking = false
		})
		ticking = true
	}
}

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
	const queryFilter = route.query.filter
	if (queryFilter && filters.includes(queryFilter)) {
		activeFilter.value = queryFilter
		localStorage.setItem('portfolio-filter', queryFilter)
	}
	await nextTick()
	moveIndicator(activeFilter.value)
	requestAnimationFrame(() => {
		indicator.value.classList.remove('no-transition')
	})
	window.addEventListener('scroll', onScroll, { passive: true })
	document.addEventListener('click', closeHint)
	onScroll()
})

onUnmounted(() => {
	window.removeEventListener('scroll', onScroll)
	document.removeEventListener('click', closeHint)
})
</script>

<style lang="scss">
@use '../scss/portfolio';
@use '../scss/animations/portfolio' as portfolioAnimations;

.scroll-top-btn {
	position: fixed;
	bottom: 30px;
	right: 30px;
	z-index: 50;
	width: 48px;
	height: 48px;
	border-radius: 50%;
	background-color: var(--bg-btn);
	color: var(--text-primary);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: 0.3s ease;
	svg {
		width: 24px;
		height: 24px;
	}
	@media (hover: hover) {
		&:hover {
			background-color: var(--bg-btn-hover);
		}
	}
	@media (max-width: 768px) {
		bottom: 20px;
		right: 20px;
		width: 42px;
		height: 42px;
	}
	@media (max-width: 500px) {
		bottom: 15px;
		right: 15px;
	}
}

.portfolio__heading {
	position: relative;
	z-index: 2;
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 0.5em;

	.heading-2 {
		margin-bottom: 0;
	}
}

.portfolio__hint {
	display: flex;
	align-items: center;
	color: var(--text-secondary);
	cursor: default;

	&[data-tooltip]::after {
		white-space: normal;
		width: 240px;
		text-align: left;
		left: auto;
		right: 0;
		transform: translateY(-4px);
		transition:
			opacity 0.2s ease,
			visibility 0.2s ease,
			transform 0.2s ease;
	}

	&.tooltip-active[data-tooltip]::after,
	&[data-tooltip]:hover::after {
		transform: translateY(0);
	}
}

.list-filter {
	position: relative;
	display: flex;
	&__item {
		padding: 10px 20px;
		cursor: pointer;
		position: relative;
		z-index: 1;
		&.active {
			color: var(--text-white);
		}
	}
	&__indicator {
		position: absolute;
		bottom: 0;
		background: var(--bg-indicator);
		height: 5px;
		border-radius: 8px;
		&:not(.no-transition) {
			transition:
				transform 0.3s ease,
				width 0.3s ease;
		}
	}
}
</style>
