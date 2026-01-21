import { createRouter, createWebHashHistory } from 'vue-router'
import { hit } from '../js/metrika.js'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Skills from '../views/Skills.vue'
import Portfolio from '../views/Portfolio.vue'
import Contacts from '../views/Contacts.vue'
import PortfolioProject from '../views/PortfolioProject.vue'

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{ path: '/', component: Home },
		{ path: '/about', component: About },
		{ path: '/skills', component: Skills },
		{ path: '/portfolio', component: Portfolio },
		{ path: '/contacts', component: Contacts },
		{
			path: '/portfolio/:id',
			name: 'PortfolioProject',
			component: PortfolioProject
		}
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}
		return { top: 0 }
	}
})

router.afterEach(() => {
	hit(window.location.href, document.title)
})

export default router
