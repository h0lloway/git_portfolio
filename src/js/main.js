import { createApp } from 'vue'
import App from '../App.vue'
import router from '../router'

// Предзагрузка иконок (офлайн)
import '../icons/bundle.js'

import '../scss/style.scss'

createApp(App).use(router).mount('#app')
