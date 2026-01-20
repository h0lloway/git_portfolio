<template>
	<header class="header">
		<button
			class="burger"
			@click="$emit('toggle-menu')"
		>
			<i class="fas fa-bars"></i>
		</button>

		

		<div class="logo">
			<svg width="60" height="60" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
				<!-- Квадрат с темным фоном -->
				<rect x="1" y="1" width="28" height="28" rx="4" ry="4" fill="#222" stroke="#fff"
					stroke-width="2" stroke-linejoin="miter" />

				<!-- Логотип MD с светлой обводкой -->
				<g style="transform: translateX(1.5px);" fill="none" stroke="" stroke-width="2" stroke-linecap="round"
					stroke-linejoin="round">
					<!-- Буква M -->
					<path d="M5,22 L5,8 L10,16 L15,8 L15,22" stroke="#fff" fill="none"/>

					<!-- Буква D, правая палка M = левая стенка D -->
					<path d="M15,8 
								L15,22 
								C15,22 23,22 23,15 
								C23,8 15,8 15,8 Z" stroke="#fff" fill="none"/>
				</g>
			</svg>
		</div>
	</header>
</template>

<script setup>
import { onMounted } from 'vue'
import { initHeaderScroll } from '../js/functions/headerScroll.js';

onMounted(() => {
  initHeaderScroll();
})
</script>