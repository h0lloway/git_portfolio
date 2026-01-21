<template>
	<Header @toggle-menu="toggleMenu" />
	<Aside :open="isMobileNavOpen" @close="closeMenu" />
	<main>
		<router-view />
	</main>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import Header from './components/Header.vue'
import Aside from './components/Aside.vue'

const isMobileNavOpen = ref(false)
const route = useRoute()

function toggleMenu() {
	isMobileNavOpen.value = !isMobileNavOpen.value
}
function closeMenu() {
	isMobileNavOpen.value = false
}
watch(() => route.path, closeMenu)

onMounted(() => {
	const preloader = document.getElementById('preloader')
	if (preloader) {
		setTimeout(() => {
			preloader.classList.add('hide')
			setTimeout(() => preloader.remove(), 600)
		}, 500)
	}
})
</script>
