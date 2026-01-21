<template>
	<section id="skills" class="skills">
		<div class="left">
			<h2 class="heading-2">Навыки</h2>
			<div class="text text-xl">
				<p>
					Разрабатываю
					<router-link to="/portfolio?filter=html">сайты и&nbsp;лендинги</router-link>,
					верстаю <router-link to="/portfolio?filter=email">письма</router-link> любой сложности.
				</p>
				<p>
					Любимый стек&nbsp;&mdash; Vue + Vite + Blade: позволяет создавать динамичные интерфейсы
					и&nbsp;выстраивать удобную структуру проекта.
				</p>
			</div>
			<div class="skills-features" :class="{ 'skills-features--expanded': showDetails }">
				<div v-for="(item, i) in skillsFeatures" :key="i" class="skills-features__item">
					<Icon :icon="item.icon" width="30" height="30" />
					<p>{{ item.text }}</p>
					<div class="skills-features__detail-wrap">
						<p class="skills-features__detail" v-html="item.detail"></p>
					</div>
				</div>
			</div>
			<button class="btn-main btn-details" @click="toggleDetails">
				<span>Подробнее</span>
				<Icon
					icon="mdi:chevron-down"
					class="btn-details__chev"
					:class="{ open: showDetails }"
				/>
			</button>
		</div>

		<div class="right">
			<div class="skills-list accordion">
				<div
					v-for="(category, i) in categories"
					:key="i"
					class="skill-category item"
					:aria-expanded="category.open"
				>
					<button class="skill-category-btn" :aria-expanded="category.open" @click="toggle(i)">
						<span>{{ category.title }}</span>
						<Icon icon="mdi:chevron-right" class="chev" :class="{ open: category.open }" />
					</button>

					<transition name="accordion" @enter="enter" @leave="leave">
						<div v-show="category.open" class="skill-items panel">
							<div class="skill-items__wrap inner">
								<div
									v-for="(skill, j) in category.items"
									:key="j"
									class="skill-item"
									:data-tooltip="skill.name"
									data-tooltip-position="top"
								>
									<Icon :icon="skill.icon" width="50" height="50" class="svg-icon" />
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>

			<div class="right__btns navigation-btns">
				<router-link to="/about" class="btn-main">
					<Icon icon="mdi:arrow-left" />
					<span>Обо мне</span>
				</router-link>
				<router-link to="/portfolio" class="btn-main">
					<span>Портфолио</span>
					<Icon icon="mdi:arrow-right" />
				</router-link>
			</div>
			<Footer />
		</div>
	</section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Footer from '../components/Footer.vue'
import { categories as initialCategories, skillsFeatures } from '../data/skills'
import { Icon } from '@iconify/vue'

const categories = reactive(initialCategories)
const showDetails = ref(false)

function toggleDetails() {
	showDetails.value = !showDetails.value
	if (showDetails.value) {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
}

function toggle(index) {
	categories[index].open = !categories[index].open
}
function enter(el) {
	el.style.height = '0'
	el.offsetHeight
	el.style.height = el.scrollHeight + 'px'
}
function leave(el) {
	el.style.height = el.scrollHeight + 'px'
	el.offsetHeight
	el.style.height = '0'
}
</script>

<style lang="scss">
@use '../scss/skills';
@use '../scss/animations/skills' as skillsAnimations;
</style>
