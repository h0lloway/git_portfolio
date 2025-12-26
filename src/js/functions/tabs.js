import { closeMobileNav } from './mobileNav.js';

export function initTabs(
	buttonsSelector = '.nav-button',
	sectionsSelector = 'main section',
	indicatorSelector = '.nav-indicator'
) {
	const buttons = document.querySelectorAll(buttonsSelector);
	const sections = document.querySelectorAll(sectionsSelector);
	const indicator = document.querySelector(indicatorSelector);

	if (!buttons.length || !sections.length) return;

	function moveIndicator(button) {
		if (!indicator || !button) return;
		const isDesktop =
			getComputedStyle(button.parentElement).flexDirection === 'column';
		if (!isDesktop) return;
		indicator.style.height = `${button.offsetHeight}px`;
		indicator.style.transform = `translateY(${button.offsetTop}px)`;
	}

	function openTab(tabId) {
		buttons.forEach(btn => btn.classList.remove('active'));
		sections.forEach(sec => {
			sec.classList.remove('active');
			sec.querySelectorAll('.fade-in').forEach(el => el.classList.remove('active'));
		});

		const btn = document.querySelector(`${buttonsSelector}[data-target="${tabId}"]`);
		if (btn) {
			btn.classList.add('active');
			moveIndicator(btn);
		}

		const section = document.getElementById(tabId);
		if (!section) return;
		section.classList.add('active');

		setTimeout(() => {
			section.querySelectorAll('.fade-in').forEach(el => el.classList.add('active'));
		}, 50);

		// ⚡ Если открыт таб портфолио — инициализируем фильтр
		if (tabId === 'portfolio') {
			import('./portfolioFilter.js').then(module => {
				module.initPortfolioFilter();
			});
		}

		if (window.innerWidth <= 768) closeMobileNav();
	}


	buttons.forEach(button => {
		button.addEventListener('click', () => {
			openTab(button.dataset.target);
		});
	});

	document.addEventListener('click', e => {
		const btn = e.target.closest('[data-open-tab]');
		if (!btn) return;
		openTab(btn.dataset.openTab);
	});

	const activeBtn = document.querySelector(`${buttonsSelector}.active`);
	if (activeBtn) moveIndicator(activeBtn);
}
