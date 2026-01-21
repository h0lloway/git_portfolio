<template>
	<section id="contact" class="contact">
		<div class="left">
			<h2 class="heading-2">Контакты</h2>
			<p class="text text-xl">
				Открыт для предложений и&nbsp;сотрудничества. Напишите мне удобным способом.
			</p>

			<div class="contact-links">
				<a
					v-for="(item, i) in contactItems"
					:key="i"
					:href="item.href"
					class="contact-item"
					:target="item.external ? '_blank' : undefined"
				>
					<Icon :icon="item.icon" width="28" height="28" />
					<p>{{ item.label }}</p>
				</a>
			</div>

			<div class="contact-form">
				<div class="contact-form__fields">
					<div class="contact-form__row">
						<input type="text" placeholder="Имя" disabled />
						<input type="email" placeholder="Почта" disabled />
					</div>
					<textarea placeholder="Сообщение" rows="4" disabled></textarea>
					<button type="submit" class="btn-main" disabled>Отправить</button>
				</div>
				<div class="contact-form__overlay">
					<Icon icon="mdi:wrench-outline" width="36" height="36" />
					<p>В процессе</p>
				</div>
			</div>

			<div class="navigation-btns">
				<router-link to="/portfolio" class="btn-main">
					<Icon icon="mdi:arrow-left" />
					Портфолио
				</router-link>
			</div>
			<Footer />
		</div>

		<div class="right">
			<div class="map-container">
				<iframe
					src="https://yandex.ru/map-widget/v1/?ll=39.8693%2C47.2641&z=13&pt=39.8693%2C47.2641%2Cpm2rdl"
					width="100%"
					height="100%"
					frameborder="0"
					allowfullscreen
					loading="lazy"
				></iframe>
			</div>
		</div>
	</section>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import Footer from '../components/Footer.vue'

const contactItems = [
	{ icon: 'mdi:email-outline', label: 'gvozdb27@gmail.com', href: 'mailto:gvozdb27@gmail.com' },
	{ icon: 'mdi:telegram', label: 'Telegram', href: 'https://t.me/makdu1', external: true },
	{
		icon: 'mdi:briefcase-outline',
		label: 'hh.ru',
		href: 'https://hh.ru/resume/d0e43871ff098babda0039ed1f616d666f7147',
		external: true
	}
]
</script>

<style lang="scss">
@use '../scss/animations/contact' as contactAnimations;
</style>

<style lang="scss" scoped>
@use '../scss/contact';

.contact {
	.left {
		display: flex;
		flex-direction: column;
	}
	.contact-links {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		margin-top: 20px;
	}
	.contact-item {
		flex: 1 1 calc(50% - 15px);
		min-width: 140px;
		background-color: var(--bg-card);
		border-radius: 12px;
		padding: 18px 12px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		border: 1px solid var(--border-card);
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease,
			transform 0.3s ease;
		text-decoration: none;
		color: inherit;
		&:hover {
			background-color: var(--bg-card-hover);
			border-color: var(--border-card-hover);
		}
		svg {
			color: var(--text-primary);
		}
		p {
			font-size: 14px;
			color: var(--text-secondary);
			margin: 0;
		}
	}
	.contact-form {
		position: relative;
		margin-top: 30px;
	}
	.contact-form__fields {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.contact-form__row {
		display: flex;
		gap: 12px;
		input {
			flex: 1;
		}
	}
	.contact-form input,
	.contact-form textarea {
		background-color: var(--bg-card);
		border: 1px solid var(--border-card);
		border-radius: 8px;
		padding: 12px 14px;
		color: var(--text-secondary);
		font-size: 14px;
		font-family: inherit;
		resize: none;
		transition: border-color 0.3s ease;
		&::placeholder {
			color: var(--form-placeholder);
		}
		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
	}
	.contact-form button {
		align-self: flex-start;
		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
	.contact-form__overlay {
		position: absolute;
		inset: 0;
		background: var(--form-overlay);
		backdrop-filter: blur(2px);
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		color: var(--form-muted);
		svg {
			opacity: 0.6;
		}
		p {
			font-size: 13px;
			text-transform: uppercase;
			letter-spacing: 2px;
			margin: 0;
		}
	}
	.navigation-btns {
		margin-top: auto;
		padding-top: 30px;
	}
	.right {
		padding: 0 !important;
		overflow: hidden;
	}
	.map-container {
		position: relative;
		width: 100%;
		height: 100%;
		iframe {
			display: block;
			width: 100%;
			height: 100%;
			filter: grayscale(1);
		}
	}
}
@media (max-width: 768px) {
	.contact {
		.map-container {
			height: 600px;
		}
	}
}
@media (max-width: 600px) {
	.contact {
		.contact-item {
			flex: 1 1 100%;
		}
		.contact-form__row {
			flex-direction: column;
		}
	}
}
</style>
