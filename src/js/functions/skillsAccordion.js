export function initSkillsAccordion() {
    const items = document.querySelectorAll('.skill-category');

    function open(item) {
        const panel = item.querySelector('.skill-items');
        item.setAttribute('aria-expanded', 'true');
        item.querySelector('.skill-category-btn').setAttribute('aria-expanded', 'true');

        panel.style.height = '0px';
        panel.offsetHeight;
        panel.style.height = 'auto';
        const height = panel.scrollHeight + 'px';
        panel.style.height = '0px';
        panel.offsetHeight;
        panel.style.height = height;
    }

    function close(item) {
        const panel = item.querySelector('.skill-items');
        item.setAttribute('aria-expanded', 'false');
        item.querySelector('.skill-category-btn').setAttribute('aria-expanded', 'false');

        panel.style.height = panel.scrollHeight + 'px';
        panel.offsetHeight;
        panel.style.height = '0px';
    }

    items.forEach(item => {
        const btn = item.querySelector('.skill-category-btn');
        const panel = item.querySelector('.skill-items');
        const isOpen = item.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
            panel.style.transition = 'none';
            panel.style.height = 'auto';
            const h = panel.scrollHeight + 'px';
            panel.style.height = h;
            panel.offsetHeight;
            panel.style.transition = '';
            panel.style.height = 'auto';
        } else {
            panel.style.height = '0px';
        }

        btn.addEventListener('click', () => {
            item.getAttribute('aria-expanded') === 'true'
                ? close(item)
                : open(item);
        });

        panel.addEventListener('transitionend', e => {
            if (e.propertyName !== 'height') return;
            if (item.getAttribute('aria-expanded') === 'true') {
                panel.style.height = 'auto';
            }
        });
    });
}
