<template>
  <li
    class="portfolio__list-item item-portf"
    :class="[data.type, { 'card-visible': visible }]"
    :style="animationStyle"
    @click="open"
    ref="cardRef"
  >
    <div class="item-portf__body">
      <div class="item-portf__browser-bar">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="item-portf__img">
        <img
          v-if="visible"
          :src="data.img"
          alt="Скриншот работы"
          loading="lazy"
        />
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

const props = defineProps({
  data: Object,
  index: Number,
});

const emit = defineEmits(["open"]);

const cardRef = ref(null);
const visible = ref(false);

function open() {
  emit("open", props.data);
}

// IntersectionObserver
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true;
        observer.disconnect();
      }
    },
    { rootMargin: "0px 0px -50px 0px", threshold: 0 }
  );

  if (cardRef.value) observer.observe(cardRef.value);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

// Стиль анимации: чередуем слева/справа по индексу
const animationStyle = computed(() => {
  const offsetX = props.index % 2 === 0 ? "-30px" : "30px";
  const offsetY = "20px";
  const delay = `${props.index * 100}ms`;
  return {
    "--offset-x": offsetX,
    "--offset-y": offsetY,
    "transition-delay": delay,
  };
});
</script>

<style scoped>
.portfolio__list-item {
  opacity: 0;
  transform: translate(var(--offset-x, 0), var(--offset-y, 20px));
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.portfolio__list-item.card-visible {
  opacity: 1;
  transform: translate(0, 0);
}
</style>
