<template>
  <section class="portfolio">
    <div class="portfolio__wrap">
      <h2 class="heading-2">Портфолио</h2>

      <!-- ФИЛЬТР -->
      <ul class="protfolio__list-filter list-filter" ref="filterContainer">
        <li
          v-for="item in filters"
          :key="item"
          class="list-filter__item"
          :class="{ active: activeFilter === item }"
          @click="setFilter(item)"
        >
          {{ labels[item] }}
        </li>

        <!-- горизонтальный индикатор -->
        <div class="filter-indicator" ref="indicator"></div>
      </ul>

      <!-- КАРТОЧКИ -->
      <ul class="portfolio__list">
        <PortfolioCard
          v-for="(card, index) in filteredPortfolio"
          :key="card.id"
          :data="card"
          :index="index"
          @open="openModal"
        />
      </ul>

		<div class="bottom-buttons">
			<router-link to="/skills" class="btn-main">
				<i class="fa fa-arrow-left"></i> 
				Навыки
			</router-link>
			<router-link to="/contacts" class="btn-main">
				Контакты 
				<i class="fa fa-arrow-right"></i>
			</router-link>
		</div>

      <!-- МОДАЛКА -->
      <PortfolioModal
        v-if="activeProject"
        :project="activeProject"
        :isOpen="isModalOpen"
        @close="closeModal"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import PortfolioCard from '../components/PortfolioCard.vue'
import PortfolioModal from '../components/PortfolioModal.vue'
import { portfolioData } from '../data/portfolio'

// =====================
// СОСТОЯНИЯ
// =====================
const activeFilter = ref('html') // активный фильтр по умолчанию
const isModalOpen = ref(false)
const activeProject = ref(null)

// =====================
// ФИЛЬТРЫ
// =====================
const filters = ['all', 'html', 'email', 'vue', 'js']
const labels = {
  all: 'Все',
  html: 'Верстка',
  email: 'Письма',
  vue: 'Vue',
  js: 'JavaScript'
}

// =====================
// ФИЛЬТРАЦИЯ
// =====================
const filteredPortfolio = computed(() => {
  if (activeFilter.value === 'all') return portfolioData
  return portfolioData.filter(item => item.type === activeFilter.value)
})

// =====================
// МОДАЛКА
// =====================
function openModal(project) {
  activeProject.value = project
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  activeProject.value = null
}

// =====================
// ИНДИКАТОР ФИЛЬТРА
// =====================
const filterContainer = ref(null)
const indicator = ref(null)

function moveIndicator() {
  if (!filterContainer.value || !indicator.value) return;

  const items = filterContainer.value.querySelectorAll('.list-filter__item')
  const activeItem = [...items].find(item => item.classList.contains('active'))

  if (!activeItem) return

  indicator.value.style.width = `${activeItem.offsetWidth}px`
  indicator.value.style.transform = `translateX(${activeItem.offsetLeft}px)`
}

// смена фильтра
function setFilter(filter) {
  activeFilter.value = filter
  moveIndicator()
}

// пересчёт индикатора при изменении activeFilter
watch(activeFilter, async () => {
  await nextTick()
  moveIndicator()
})

onMounted(async () => {
  await nextTick()
  moveIndicator()
})
</script>

<style scoped>
/* ====== ФИЛЬТР ====== */
.list-filter {
  position: relative;
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.list-filter__item {
  cursor: pointer;
  padding: 5px 10px;
  transition: color 0.3s;
}

.list-filter__item.active {
  color: #ff4c4c;
}

.filter-indicator {
  position: absolute;
  bottom: 0;
  height: 3px;
  background: #d2d2d27c;
  transition: all 0.3s ease;
}
</style>
