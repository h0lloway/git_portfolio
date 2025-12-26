export function initAlphaBanner(selector = '#alpha-banner') {
	const banner = document.querySelector(selector);
	if (!banner) return;

	function closeBanner() {
		banner.remove();
		document.removeEventListener('click', handlePageClick);
	}

	function handlePageClick(e) {
		if (!banner.contains(e.target)) {
			closeBanner();
		}
	}

	const closeBtn = banner.querySelector('.close-btn');
	if (closeBtn) {
		closeBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			closeBanner();
		});
	}

	setTimeout(() => {
		document.addEventListener('click', handlePageClick);
	}, 0);
}
