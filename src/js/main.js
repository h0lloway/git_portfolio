import { initTabs } from './functions/tabs.js';
import { initMobileNav } from './functions/mobileNav.js';
import { initHeaderScroll } from './functions/headerScroll.js';
import { initPortfolioFilter } from './functions/portfolioFilter.js';
import { initSkillsAccordion } from './functions/skillsAccordion.js';
import { initGreetingByTime } from './functions/greetingByTime.js';
import { initAlphaBanner } from './functions/alphaBanner.js';
import { initPortfolioModal } from './functions/modal.js';


document.addEventListener('DOMContentLoaded', () => {
	initMobileNav();
	initTabs();
	initHeaderScroll();
	initPortfolioFilter();
	initSkillsAccordion();
	initGreetingByTime('#hi');
	initAlphaBanner('#alpha-banner');
	initPortfolioModal();
});

document.addEventListener('click', e => {
	const btn = e.target.closest('[data-open-tab]');
	if (!btn) return;

	document.dispatchEvent(
		new CustomEvent('open-tab', {
			detail: btn.dataset.openTab
		})
	);
});


const slides = document.querySelectorAll('#slider i');
let current = 0;

function showNext() {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[current].classList.add('active');
  current = (current + 1) % slides.length;
}

showNext();
setInterval(showNext, 1500); // смена каждые 1 секунду