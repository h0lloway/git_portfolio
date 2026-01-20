<template>
	<Header @toggle-menu="toggleMenu" />

	<AlphaBanner />

	<Aside
		:open="isMobileNavOpen"
		@close="closeMenu"
	/>

	<main>
		<router-view />
	</main>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import AlphaBanner from './components/AlphaBanner.vue'

const isMobileNavOpen = ref(false)
const route = useRoute()

function toggleMenu() {
	isMobileNavOpen.value = !isMobileNavOpen.value
}

function closeMenu() {
	isMobileNavOpen.value = false
}

/* закрываем меню при переходе по роутам */
watch(() => route.path, closeMenu)
</script>
