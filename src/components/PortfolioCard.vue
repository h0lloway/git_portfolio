<template>
  <li
    class="portfolio__list-item item-portf"
    :class="data.type"
    @click="open"
  >
    <div class="item-portf__body">
      <div class="item-portf__browser-bar">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="item-portf__img">
        <img
          :src="data.img"
          alt="Скриншот работы"
        />
      </div>
    </div>
  </li>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  data: Object,
  index: Number,
});

function open() {
  router.push({
    name: "PortfolioProject",
    params: { id: props.data.id },
  });
}
</script>
