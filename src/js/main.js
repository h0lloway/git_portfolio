import { createApp } from 'vue'
import App from '../App.vue'
import router from '../router'
import { i18n } from '../i18n/index.js'

// Предзагрузка иконок (офлайн)
import '../icons/bundle.js'

import '../scss/style.scss'

createApp(App).use(router).use(i18n).mount('#app')
