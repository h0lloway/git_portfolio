<script setup>
import { watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  project: Object,
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

watch(
  () => props.isOpen,
  (val) => {
    document.body.style.overflow = val ? "hidden" : "";
  }
);

function onKey(e) {
  if (e.key === "Escape") emit("close");
}

onMounted(() => window.addEventListener("keydown", onKey));
onUnmounted(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <div
    v-if="isOpen"
    class="modal-overlay modal-overlay--visible"
    @click.self="emit('close')"
  >
    <div class="modal modal--visible">
      <button class="modal__close" aria-label="Закрыть" @click="emit('close')">
        ×
      </button>

      <div class="modal__header">
        <div class="descr">
          <h2 class="modal__title">{{ project.title }}</h2>
          <p class="modal__subtitle">{{ project.subtitle }}</p>
        </div>

        <a
          class="btn-main modal__link"
          :href="project.link"
          target="_blank"
          rel="noopener"
        >
          <span>Смотреть</span>
          <i class="fa-solid fa-eye"></i>
        </a>
      </div>

      <div class="modal__content">
        <div class="device device--browser">
          <svg viewBox="0 0 800 500" class="device__frame" aria-hidden="true">
            <rect width="800" height="500" rx="14" fill="#e3e3e3" />
            <rect y="44" width="800" height="456" fill="#ffffff" />

            <circle cx="22" cy="22" r="6" fill="#b0b0b0" />
            <circle cx="42" cy="22" r="6" fill="#b0b0b0" />
            <circle cx="62" cy="22" r="6" fill="#b0b0b0" />

            <rect x="760" y="16" width="18" height="3" fill="#b0b0b0" />
            <rect x="760" y="22" width="18" height="3" fill="#b0b0b0" />
            <rect x="760" y="28" width="18" height="3" fill="#b0b0b0" />
          </svg>
          <img
            class="device__img device__img--desktop"
            :src="project.desktopImg"
            alt="Desktop preview"
          />
        </div>

        <div class="device device--phone">
          <svg viewBox="0 0 250 500" class="device__frame" aria-hidden="true">
            <rect width="250" height="500" rx="32" fill="#e3e3e3" />
            <rect
              x="15"
              y="60"
              width="220"
              height="380"
              rx="22"
              fill="#ffffff"
            />
            <rect x="90" y="24" width="70" height="6" rx="3" fill="#b0b0b0" />
          </svg>
          <img
            class="device__img device__img--mobile"
            :src="project.mobileImg"
            alt="Mobile preview"
          />
        </div>
      </div>

      <div class="modal__info">
        <div class="modal__info-item task">
          <h3>Задача</h3>
          <p>{{ project.task }}</p>
        </div>

        <div class="modal__info-item solution">
          <h3>Решение</h3>
          <p>{{ project.solution }}</p>
        </div>

        <div class="modal__info-item modal__info-item--stack">
          <h3>Стек</h3>
          <ul class="modal__stack">
            <li v-for="tech in project.stack" :key="tech">
              {{ tech }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
