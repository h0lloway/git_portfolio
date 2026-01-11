<template>
  <div v-if="visible" ref="banner" id="alpha-banner" class="alpha-banner">
    <i class="fa-solid fa-flask"></i>
    <span>Дизайн и функционал ещё дорабатываются</span>
    <button class="close-btn" aria-label="Закрыть" @click.stop="closeBanner">
      &times;
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const visible = ref(true);
const banner = ref(null);

function closeBanner() {
  visible.value = false;
  removeListener();
}

function handlePageClick(e) {
  if (banner.value && !banner.value.contains(e.target)) {
    closeBanner();
  }
}

function removeListener() {
  document.removeEventListener("click", handlePageClick);
}

onMounted(() => {
  // аналог setTimeout(..., 0)
  setTimeout(() => {
    document.addEventListener("click", handlePageClick);
  }, 0);
});

onBeforeUnmount(() => {
  removeListener();
});
</script>
