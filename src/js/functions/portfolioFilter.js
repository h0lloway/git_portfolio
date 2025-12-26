export function initPortfolioFilter(
  filterSelector = '.list-filter__item',
  portfolioSelector = '.portfolio__list > li',
  indicatorSelector = '.filter-indicator',
  parentSection = document.getElementById('portfolio') // секция портфолио
) {
  const filters = parentSection.querySelectorAll(filterSelector);
  const items = parentSection.querySelectorAll(portfolioSelector);
  const indicator = parentSection.querySelector(indicatorSelector);

  if (!filters.length || !items.length || !indicator) return;

  // Относительное позиционирование родителя
  filters[0].parentElement.style.position = 'relative';

  function moveIndicator(btn) {
    indicator.style.width = `${btn.offsetWidth}px`;
    indicator.style.transform = `translateX(${btn.offsetLeft}px)`;
  }

  function filterItems(filterId) {
    items.forEach(item => {
      if (filterId === 'all' || item.classList.contains(filterId)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function openFilter(filterId) {
    filters.forEach(f => f.classList.remove('active'));
    const btn = Array.from(filters).find(f => f.dataset.id === filterId);
    if (!btn) return;

    btn.classList.add('active');
    filterItems(filterId);
    moveIndicator(btn);
  }

  // Клики по фильтрам
  filters.forEach(f => f.addEventListener('click', () => openFilter(f.dataset.id)));

  // Инициализация по умолчанию
  const defaultBtn = Array.from(filters).find(f => f.dataset.id === 'html') || filters[0];
  defaultBtn.classList.add('active');
  filterItems(defaultBtn.dataset.id);
  moveIndicator(defaultBtn);
}
