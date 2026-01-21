export function initHeaderScroll(headerSelector = '.header', hideOffset = 100) {
	const header = document.querySelector(headerSelector)
	if (!header) return

	let lastScrollY = window.scrollY

	window.addEventListener('scroll', () => {
		if (window.innerWidth > 768) return

		const currentScroll = window.scrollY

		if (currentScroll > lastScrollY && currentScroll > hideOffset) {
			header.style.transform = 'translateY(-100%)'
		} else {
			header.style.transform = 'translateY(0)'
		}

		lastScrollY = currentScroll
	})
}
