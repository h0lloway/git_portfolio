<template>
	<section class="skills" id="skills">
		<div class="left">
			<h2 class="heading-2">Навыки</h2>
			<div class="text text-xl">
				<p>Разрабатываю сайты и&nbsp;лендинги, верстаю письма любой сложности.</p>
				<p>Любимый стек&nbsp;&mdash; Vue + Vite + Blade: позволяет создавать динамичные интерфейсы и&nbsp;выстраивать удобную структуру проекта.</p>
			</div>
			<div class="skills-features">
				<div class="skills-feature-item">
					<i class="fas fa-check-circle"></i>
					<p>Создаю надежные и&nbsp;правильно работающие интерфейсы</p>
				</div>
				<div class="skills-feature-item">
					<i class="fas fa-bolt"></i>
					<p>Пишу современный и&nbsp;производительный код</p>
				</div>
				<div class="skills-feature-item">
					<i class="fas fa-lightbulb"></i>
					<p>Выбираю простой способ решения задачи</p>
				</div>
				<div class="skills-feature-item">
					<i class="fas fa-code"></i>
					<p>Верстаю семантично, кроссбраузерно и&nbsp;pixel-perfect</p>
				</div>
				<div class="skills-feature-item">
					<i class="fas fa-layer-group"></i>
					<p>Использую актуальные фреймворки, библиотеки и&nbsp;инструменты</p>
				</div>
				<div class="skills-feature-item">
					<i class="fas fa-magic"></i>
					<p>Реализую адаптивный интерфейс и&nbsp;анимации</p>
				</div>
				<div class="skills-feature-item">
					<i class="fas fa-align-left"></i>
					<p>Соблюдаю единый стиль кода</p>
				</div>
				<div class="skills-feature-item">
					<i class="fas fa-sync-alt"></i>
					<p>Оптимизирую, тестирую и&nbsp;рефакторю</p>
				</div>
				<div class="skills-feature-item">
					<i class="fas fa-tasks"></i>
					<p>Планирую и&nbsp;декомпозирую задачи</p>
				</div>
			</div>
		</div>

		<div class="right">
			<div class="skills-list accordion">
				<div
					v-for="(category, i) in categories"
					:key="i"
					class="skill-category item"
					:aria-expanded="category.open"
				>
					<button
						class="skill-category-btn"
						:aria-expanded="category.open"
						@click="toggle(i)"
					>
						<span>{{ category.title }}</span>
						<i
							class="fas fa-chevron-right chev"
							:class="{ open: category.open }"
						></i>
					</button>

					<transition
						name="accordion"
						@enter="enter"
						@leave="leave"
					>
						<div
							v-show="category.open"
							class="skill-items panel"
						>
							<div class="skill-items__wrap inner">
								<div
									v-for="(skill, j) in category.items"
									:key="j"
									class="skill-item"
								>
									<i :class="skill.icon"></i>
									<p>{{ skill.name }}</p>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>
			
			<div class="right__btns navigation-btns">
				<router-link to="/about" class="btn-main">
					<i class="fa fa-arrow-left"></i>
					<span>Обо мне</span>
				</router-link>
				<router-link to="/portfolio" class="btn-main">
					<span>Портфолио</span>
					<i class="fa fa-arrow-right"></i>
				</router-link>
			</div>
		</div>
	</section>
</template>


<script setup>
import { reactive } from 'vue';
import { categories as initialCategories } from '../data/skills';

const categories = reactive(initialCategories);

function toggle(index) {
	categories[index].open = !categories[index].open;
}

/* === Анимация высоты (аналог твоего JS) === */
function enter(el) {
	el.style.height = '0';
	el.offsetHeight;
	el.style.height = el.scrollHeight + 'px';
}

function leave(el) {
	el.style.height = el.scrollHeight + 'px';
	el.offsetHeight;
	el.style.height = '0';
}
</script>

<style>
	.accordion-enter-active,
	.accordion-leave-active {
		transition: height 0.3s ease;
		overflow: hidden;
	}

	.accordion-enter-from,
	.accordion-leave-to {
		height: 0;
	}

	.chev {
		transition: transform 0.3s ease;
	}

	.chev.open {
		transform: rotate(90deg);
	}
</style>