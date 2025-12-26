let nav, burger, backBtn, overlay;

export function initMobileNav(
	navSelector = 'nav',
	burgerSelector = '.burger',
	backSelector = '.nav-back',
	overlaySelector = '.nav-overlay'
) {
	nav = document.querySelector(navSelector);
	burger = document.querySelector(burgerSelector);
	backBtn = document.querySelector(backSelector);
	overlay = document.querySelector(overlaySelector);

	if (!nav || !burger || !backBtn || !overlay) return;

	burger.addEventListener('click', openMobileNav);
	backBtn.addEventListener('click', closeMobileNav);
	overlay.addEventListener('click', closeMobileNav);

	window.addEventListener('resize', () => {
		if (window.innerWidth > 768) closeMobileNav();
	});
}

export function openMobileNav() {
	if (window.innerWidth > 768) return;
	nav.classList.add('open');
	overlay.classList.add('active');
	document.body.classList.add('open');
}

export function closeMobileNav() {
	if (!nav) return;
	nav.classList.remove('open');
	overlay.classList.remove('active');
	document.body.classList.remove('open');
}
