// Маппинг технологий на Iconify иконки (монохромные)
// Редактируй значения здесь для смены иконок
// Поиск иконок: https://icon-sets.iconify.design/

export const techIcons = {
	// Языки и разметка
	HTML: 'devicon-plain:html5',
	CSS: 'devicon-plain:css3',
	Scss: 'fa6-brands:sass',
	JavaScript: 'cib:js',
	JS: 'cib:js',
	Js: 'cib:js',

	// Фреймворки и инструменты
	Vue: 'mdi:vuejs',
	'Vue Router': 'mdi:routes',
	'Composition API': 'mdi:function-variant',
	Vite: 'file-icons:vite',
	Gulp: 'devicon-plain:gulp',
	Nuxt: 'mdi:nuxt',
	Figma: 'proicons:figma',

	// Качество кода
	ESLint: 'mdi:eslint',
	Prettier: 'file-icons:prettier',
	PWA: 'mdi:cellphone-link',

	// Библиотеки
	Swiper: 'simple-icons:swiper',

	// UI компоненты
	Modal: 'mdi:window-maximize',
	Tabs: 'mdi:tab',
	Accordion: 'mdi:chevron-down-box',
	'Custom select': 'mdi:form-dropdown',
	'Range Slider': 'mdi:tune-variant'
}

// Иконка по умолчанию, если технология не найдена
export const defaultIcon = 'mdi:code-tags'

export function getTechIcon(tech) {
	return techIcons[tech] || defaultIcon
}
