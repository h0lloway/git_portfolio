<template>
  <footer class="footer">
    <p class="copyright">
      © 2026, разработано мной с 
      <i class="fas fa-heart"></i>
    </p>
    <div class="tech-icons">
      <i class="fab fa-vuejs" title="Vue.js"></i>
      <i class="fas fa-bolt" title="Vite"></i>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: 1rem 0;
  font-size: 0.9rem;
}

.footer .tech-icons {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  font-size: 1.3rem;
}

.footer i {
  transition: transform 0.2s ease;
}

.footer i:hover {
  transform: scale(1.1); /* Лёгкий hover эффект */
}
</style>
