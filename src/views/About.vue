<template>
	<section class="about" id="about">
		<div class="left">
			<h2 class="heading-2">Обо мне</h2>
			<p class="text text-xl">Фронтенд-разработчик, создаю удобные и&nbsp;визуально аккуратные интерфейсы.
				Пишу как на&nbsp;чистом HTML/CSS/JS, так и&nbsp;на&nbsp;Vue. Использую современные инструменты
				сборки, препроцессоры и&nbsp;анимации. Люблю чистый код, внимание к&nbsp;деталям и&nbsp;плавные переходы,
				улучшающие пользовательский опыт.</p>
			<div class="about-features">
				<div class="feature-item">
					<i class="fas fa-code"></i>
					<p>Опыт разработки 3 года</p>
				</div>
				<div class="feature-item">
					<i class="fas fa-user-check"></i>
					<p>Организованный и автономный</p>
				</div>
				<div class="feature-item">
					<i class="fas fa-heart"></i>
					<p>Люблю программировать</p>
				</div>
				<div class="feature-item">
					<i class="fas fa-graduation-cap"></i>
					<p>Постоянно учусь</p>
				</div>
				<div class="feature-item">
					<i class="fas fa-star"></i>
					<p>Склонный к перфекционизму</p>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="right__content">
				<img src="/files/dubrovin_photo.png" alt="Dubrovin photo">
				<div class="social-links">
					<a class="social-links__item" href="https://t.me/makdu1" title="Telegram"><i class="fab fa-telegram-plane"></i></a>
					<a class="social-links__item" href="https://instagram.com/mksm.17/" title="Instagram"><i class="fab fa-instagram"></i></a>
					<a class="social-links__item" href="https://vk.com/h0lloway" title="VK"><i class="fab fa-vk"></i></a>
					<a class="social-links__item" href="mailto:gvozdb27@gmail.com" title="Email"><i class="fas fa-envelope"></i></a>
					<a class="social-links__item" href="https://hh.ru/resume/d0e43871ff098babda0039ed1f616d666f7147" title="hh"><b>hh</b></a>
					<a class="social-links__item" href="files/Dubrovin_resume.pdf" download title="CV"><b>CV</b></a>
				</div>
			</div>
			<div class="navigation-btns">
				<router-link to="/" class="btn-main">
					<i class="fa fa-arrow-left"></i>
					<span>Главная</span>
				</router-link>
				<router-link to="/skills" class="btn-main">
					<span>Навыки</span>
					<i class="fa fa-arrow-right"></i>
				</router-link>
			</div>
			<Footer />
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Footer from '../components/Footer.vue'

const show = ref(false)

onMounted(() => {
	requestAnimationFrame(() => {
		show.value = true
	})
})
</script>
