// Пункты для страницы "Навыки"
export const skillsFeatures = [
	{
		icon: 'mdi:check-circle',
		text: 'Создаю надежные и\u00A0правильно работающие интерфейсы',
		detail:
			'Реализую систему элементов интерфейса с\u00A0удобным взаимодействием и\u00A0продуманной бизнес-логикой. Забочусь о\u00A0кроссбраузерности, безопасности и\u00A0обрабатываю возможные ошибки.'
	},
	{
		icon: 'mdi:lightning-bolt',
		text: 'Пишу современный и\u00A0производительный код',
		detail:
			'Использую ES6+, избегаю лишних перерисовок, слежу за\u00A0bundle size и\u00A0временем загрузки страницы.'
	},
	{
		icon: 'mdi:lightbulb',
		text: 'Выбираю простой способ решения задачи',
		detail:
			'Предпочитаю читаемый и\u00A0поддерживаемый код сложным абстракциям\u00A0— решение должно быть понятно любому в\u00A0команде.'
	},
	{
		icon: 'mdi:code-tags',
		text: 'Верстаю семантично, кроссбраузерно и\u00A0pixel-perfect',
		detail:
			'Использую правильные HTML-теги, проверяю в\u00A0разных браузерах и\u00A0точно реализую макет из\u00A0Figma.'
	},
	{
		icon: 'mdi:layers',
		text: 'Использую актуальные фреймворки, библиотеки и\u00A0инструменты',
		detail:
			'Vue\u00A03, Vite, Tailwind, GSAP\u00A0— выбираю инструменты под задачу и\u00A0слежу за\u00A0развитием экосистемы.'
	},
	{
		icon: 'mdi:auto-fix',
		text: 'Реализую адаптивный интерфейс и\u00A0анимации',
		detail:
			'Вёрстка работает на\u00A0любом экране от\u00A0320px до\u00A04K. Анимации плавные и\u00A0не\u00A0нагружают устройство.'
	},
	{
		icon: 'mdi:format-align-left',
		text: 'Соблюдаю единый стиль кода',
		detail:
			'ESLint\u00A0+ Prettier в\u00A0каждом проекте. Нейминг, структура файлов и\u00A0компонентов\u00A0— всё по\u00A0договорённым правилам.'
	},
	{
		icon: 'mdi:sync',
		text: 'Оптимизирую, тестирую и\u00A0рефакторю',
		detail:
			'Анализирую узкие места, улучшаю код после первой рабочей версии и\u00A0не\u00A0даю техническому долгу накапливаться.'
	},
	{
		icon: 'mdi:clipboard-check',
		text: 'Планирую и\u00A0декомпозирую задачи',
		detail:
			'Разбиваю большие задачи на\u00A0маленькие шаги, оцениваю сложность <br> и\u00A0нахожу зависимости до\u00A0начала работы.'
	}
]

// Категории навыков (аккордеон)
export const categories = [
	{
		title: 'Логика',
		open: true,
		items: [
			{ name: 'JavaScript', icon: 'cib:js' },
			{ name: 'Vue', icon: 'mdi:vuejs' }
		]
	},
	{
		title: 'Разметка',
		open: false,
		items: [
			{ name: 'HTML5', icon: 'devicon-plain:html5' },
			{ name: 'Blade', icon: 'simple-icons:laravel' },
			{ name: 'SVG', icon: 'ix:svg-document' }
		]
	},
	{
		title: 'Стили',
		open: false,
		items: [
			{ name: 'CSS3', icon: 'devicon-plain:css3' },
			{ name: 'Sass', icon: 'fa7-brands:sass' },
			{ name: 'Bootstrap', icon: 'ri:bootstrap-fill' },
			{ name: 'Tailwind', icon: 'mdi:tailwind' },
			{ name: 'GSAP', icon: 'simple-icons:greensock' },
			{ name: 'BEM', icon: 'file-icons:bem' }
		]
	},
	{
		title: 'Утилиты',
		open: false,
		items: [
			{ name: 'Git', icon: 'mdi:git' },
			{ name: 'npm', icon: 'mdi:npm' },
			{ name: 'Node', icon: 'mdi:nodejs' },
			{ name: 'Docker', icon: 'mdi:docker' },
			{ name: 'Vite', icon: 'file-icons:vite' },
			{ name: 'Webpack', icon: 'mdi:webpack' },
			{ name: 'Yarn', icon: 'fa6-brands:yarn' },
			{ name: 'ESLint', icon: 'mdi:eslint' },
			{ name: 'Prettier', icon: 'file-icons:prettier' }
		]
	},
	{
		title: 'Графические редакторы',
		open: false,
		items: [
			{ name: 'Figma', icon: 'proicons:figma' },
			{ name: 'Photoshop', icon: 'devicon-plain:photoshop' }
		]
	},
	{
		title: 'Поддерживаю',
		open: false,
		items: [
			{ name: 'jQuery', icon: 'devicon-plain:jquery' },
			{ name: 'Pug', icon: 'file-icons:pug' },
			{ name: 'Less', icon: 'cib:less' },
			{ name: 'Gulp', icon: 'devicon-plain:gulp' },
			{ name: 'Babel', icon: 'file-icons:babel' },
			{ name: 'PHP', icon: 'cib:php' },
			{ name: 'WordPress', icon: 'ic:baseline-wordpress' }
		]
	}
]
