import { portfolioData } from '../data.js';

export function initPortfolioModal() {
  const overlay = document.getElementById('portfolio-overlay');
  const modal = document.getElementById('portfolio-modal');

  const desktopImg = modal.querySelector('.device__img--desktop');
  const mobileImg = modal.querySelector('.device__img--mobile');
  const link = modal.querySelector('.modal__link');

  // Заголовки и инфо
  const titleEl = modal.querySelector('.modal__title');
  const subtitleEl = modal.querySelector('.modal__subtitle');
  const taskEl = modal.querySelector('.modal__info-item.task p');
  const solutionEl = modal.querySelector('.modal__info-item.solution p');
  const stackEl = modal.querySelector('.modal__stack');

  const closeBtn = modal.querySelector('.modal__close');

  function preload(src) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = resolve;
      img.src = src;
    });
  }

  function openModal(project) {
    // сброс старых данных
    desktopImg.src = '';
    mobileImg.src = '';
    titleEl.textContent = '';
    subtitleEl.textContent = '';
    taskEl.textContent = '';
    solutionEl.textContent = '';
    stackEl.innerHTML = '';

    // preload картинок
    Promise.all([
      preload(project.desktopImg),
      preload(project.mobileImg)
    ]).then(() => {
      desktopImg.src = project.desktopImg;
      mobileImg.src = project.mobileImg;

      titleEl.textContent = project.title;
      subtitleEl.textContent = project.subtitle;
      taskEl.textContent = project.task;
      solutionEl.textContent = project.solution;

      // вставляем стек
      project.stack.forEach(tech => {
        const li = document.createElement('li');
        li.textContent = tech;
        stackEl.appendChild(li);
      });

      link.href = project.link;

      overlay.classList.add('modal-overlay--visible');
      modal.classList.add('modal--visible');
      document.body.style.overflow = 'hidden';
    });
  }

  document.addEventListener('click', (e) => {
    const card = e.target.closest('[data-portfolio-id]');
    if (!card) return;

    const project = portfolioData.find(item => item.id === card.dataset.portfolioId);
    if (!project) return;

    openModal(project);
  });

  function closeModal() {
    overlay.classList.remove('modal-overlay--visible');
    modal.classList.remove('modal--visible');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
