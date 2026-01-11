import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Skills from '../views/Skills.vue'
import Portfolio from '../views/Portfolio.vue'
import Contacts from '../views/Contacts.vue'

export default createRouter({
	history: createWebHashHistory(), // 🔥 GH Pages
	routes: [
		{ path: '/', component: Home },
		{ path: '/about', component: About },
		{ path: '/skills', component: Skills },
		{ path: '/portfolio', component: Portfolio },
		{ path: '/contacts', component: Contacts }
	]
})