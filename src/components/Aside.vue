<template>
  <aside>
    <div
      class="nav-overlay"
      :class="{ active: open }"
      @click="$emit('close')"
    ></div>

    <nav :class="{ open }">
      <div class="logo">
        <svg
          width="60"
          height="60"
          viewBox="0 0 30 30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="28"
            height="28"
            rx="4"
            ry="4"
            fill="#222"
            stroke="#fff"
            stroke-width="2"
            stroke-linejoin="miter"
          />
          <g
            style="transform: translateX(1.5px)"
            fill="none"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5,22 L5,8 L10,16 L15,8 L15,22" />
            <path
              d="M15,8 
								L15,22 
								C15,22 23,22 23,15 
								C23,8 15,8 15,8 Z"
            />
          </g>
        </svg>
      </div>

      <div class="nav-header">
        <button class="nav-back" @click="$emit('close')">
          <i class="fas fa-arrow-left"></i>
        </button>
      </div>

      <div class="nav-buttons" ref="navButtons">
        <div class="nav-indicator" ref="indicator"></div>

        <router-link to="/" class="nav-button">
          <i class="fas fa-home"></i>
        </router-link>
        <router-link to="/about" class="nav-button">
          <i class="fas fa-user"></i>
        </router-link>
        <router-link to="/skills" class="nav-button">
          <i class="fas fa-wrench"></i>
        </router-link>
        <router-link to="/portfolio" class="nav-button">
          <i class="fas fa-th-large"></i>
        </router-link>
        <router-link to="/contacts" class="nav-button">
          <i class="fas fa-envelope"></i>
        </router-link>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

/* ⬇️ ДОБАВЛЯЕМ ЭТО */
const props = defineProps({
  open: Boolean,
});

const route = useRoute();

const navButtons = ref(null);
const indicator = ref(null);

function moveIndicator() {
  if (!navButtons.value || !indicator.value) return;

  const buttons = navButtons.value.querySelectorAll(".nav-button");

  const activeButton = [...buttons].find((btn) =>
    btn.classList.contains("router-link-active")
  );

  if (!activeButton) return;

  indicator.value.style.height = `${activeButton.offsetHeight}px`;
  indicator.value.style.transform = `translateY(${activeButton.offsetTop}px)`;
}

/* 🔒 блокировка скролла body */
watch(
  () => props.open,
  (val) => {
    document.body.classList.toggle("open", val);
  }
);

onMounted(async () => {
  await nextTick();
  moveIndicator();
});

watch(
  () => route.path,
  async () => {
    await nextTick();
    moveIndicator();
  }
);
</script>
