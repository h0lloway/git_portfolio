<template>
  <section class="portfolio">
    <div class="portfolio__wrap">
      <div class="portfolio__top">
        <h2 class="heading-2">Портфолио</h2>

        <!-- ФИЛЬТР -->
        <ul class="portfolio__list-filter list-filter">
          <li
            v-for="item in filters"
            :key="item"
            class="list-filter__item"
            :class="{ active: activeFilter === item }"
            @click="setFilter(item)"
          >
            {{ labels[item] }}
          </li>
        </ul>

        <!-- КАРТОЧКИ -->
        <ul class="portfolio__list">
          <PortfolioCard
            v-for="(card, index) in filteredPortfolio"
            :key="card.id"
            :data="card"
            :index="index"
          />
        </ul>
      </div>

      <div class="navigation-btns">
        <router-link to="/skills" class="btn-main">
          <i class="fa fa-arrow-left"></i> Навыки
        </router-link>
        <router-link to="/contacts" class="btn-main">
          Контакты
          <i class="fa fa-arrow-right"></i>
        </router-link>
      </div>

      <Footer />
    </div>
  </section>
</template>


<script setup>
import { ref, computed } from "vue";
import PortfolioCard from "../components/PortfolioCard.vue";
import Footer from "../components/Footer.vue";
import { portfolioData } from "../data/portfolio";

const filters = ["all", "html", "email", "vue"];

const labels = {
  all: "Все",
  html: "Верстка",
  email: "Письма",
  vue: "Vue",
};

// ===== Состояние =====
const activeFilter = ref("html");

// ===== Фильтрация карточек =====
const filteredPortfolio = computed(() => {
  if (activeFilter.value === "all") return portfolioData;
  return portfolioData.filter((item) => item.type === activeFilter.value);
});

// ===== Смена фильтра =====
function setFilter(filter) {
  activeFilter.value = filter;
}
</script>
