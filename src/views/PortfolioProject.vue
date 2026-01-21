<template>
	<section class="portfolio-project">
		<div class="left">
			<div class="left-top">
				<router-link to="/portfolio" class="btn-main btn-back">
					<Icon icon="mdi:arrow-left" />
					<span>Портфолио</span>
				</router-link>

				<h1 class="heading-2">{{ project.title }}</h1>

				<p class="text text-xl">
					{{ project.shortDescription }}
					<template v-if="project.company">
						Разработан в
						<a :href="project.company.url" target="_blank" rel="noopener noreferrer" class="company-link">{{ project.company.name }}</a>.
					</template>
				</p>

				<div class="project-stack">
					<div v-for="tech in project.stack" :key="tech" class="stack-item">
						<Icon :icon="getTechIcon(tech)" />
						<p>{{ tech }}</p>
					</div>
				</div>

				<a
					:href="isDisabledLink ? undefined : project.link"
					:target="isDisabledLink ? undefined : '_blank'"
					:class="['btn-main', 'btn-watch', { 'btn-main--disabled': isDisabledLink }]"
					:tabindex="isDisabledLink ? -1 : undefined"
					@click="isDisabledLink && $event.preventDefault()"
				>
					<span>Смотреть</span>
					<Icon icon="mdi:eye-outline" />
				</a>
			</div>
		</div>

		<div class="right">
			<div class="devices">
				<!-- desktop -->
				<div class="device device--browser">
					<BrowserWindow>
						<img
							:class="['device__img', 'device__img--desktop', { 'device__img--email': project.type === 'email' }]"
							:src="project.desktopImg"
							:alt="`${project.subtitle} — ${project.title}, desktop`"
						/>
					</BrowserWindow>
				</div>

				<div class="device device--phone">
					<svg viewBox="0 0 250 500" class="device__frame" aria-hidden="true">
						<rect width="250" height="500" rx="32" class="device-frame-bg" />
						<rect x="15" y="60" width="220" height="380" rx="22" class="device-frame-screen" />
						<rect x="90" y="24" width="70" height="6" rx="3" class="device-frame-notch" />
					</svg>
					<img
						class="device__img device__img--mobile"
						:src="project.mobileImg"
						:alt="`${project.subtitle} — ${project.title}, mobile`"
					/>
				</div>
			</div>

			<Footer />
		</div>
	</section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { portfolioData } from '../data/portfolio'
import { getTechIcon } from '../data/techIcons'
import Footer from '../components/Footer.vue'
import BrowserWindow from '../components/BrowserWindow.vue'

const route = useRoute()
const projectId = route.params.id

// Найдём проект по id
const project = portfolioData.find((p) => p.id.toString() === projectId)
const isDisabledLink = computed(() => !project.link || project.link === '#')
</script>

<style lang="scss">
@use '../scss/animations/portfolio-project' as portfolioProjectAnimations;
</style>

<style lang="scss" scoped>
.portfolio-project {
	.left {
		position: relative;
		background: var(--bg-section-left);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.btn-back {
			align-self: flex-start;
			margin-bottom: 20px;
		}
		.company-link {
			color: var(--accent);
			text-decoration: underline;
			text-underline-offset: 3px;
			&:hover {
				opacity: 0.8;
			}
		}
		.btn-watch {
			display: flex;
			width: fit-content;
			margin: 48px auto 0;
		}
		.title {
			font-size: 48px;
			line-height: 1.1;
		}
		.subtitle {
			max-width: 420px;
			line-height: 1.6;
			color: var(--text-muted);
		}
		.project-stack {
			display: flex;
			flex-wrap: wrap;
			gap: 20px;
			margin-top: 20px;
		}
		.stack-item {
			flex: 1 1 calc(50% - 20px);
			min-width: 140px;
			background-color: var(--bg-card);
			border-radius: 12px;
			padding: 14px 10px;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			border: 1px solid var(--border-card);
			transition:
				background-color 0.3s ease,
				border-color 0.3s ease,
				transform 0.3s ease;
			&:hover {
				background-color: var(--bg-card-hover);
				border-color: var(--border-card-hover);
			}
			svg {
				width: 24px;
				height: 24px;
				margin-bottom: 8px;
			}
			p {
				font-size: 14px;
				color: var(--text-secondary);
				line-height: 1.3;
				white-space: nowrap;
			}
		}
	}
	.right {
		background: var(--bg-section-right);
		padding: 60px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		.devices {
			margin-bottom: 50px;
		}
	}
	@media (max-width: 1024px) {
		grid-template-columns: 1fr;
		.left {
			padding: 60px 40px;
			.subtitle {
				max-width: 100%;
			}
		}
		.right {
			padding: 40px 20px;
		}
	}
	@media (max-width: 767px) {
		.left {
			padding: 40px 20px;
			.title {
				font-size: 32px;
			}
			.project-stack {
				gap: 10px;
			}
		}
		.right {
			.devices {
				.device {
					&--phone {
						width: 180px;
					}
				}
			}
		}
	}
}
.device-frame-bg {
	fill: var(--browser-bar);
}
.device-frame-screen {
	fill: var(--browser-bg);
}
.device-frame-notch {
	fill: var(--browser-dots);
}
@media (max-width: 767px) {
	.stack-item {
		flex: 1 1 100%;
	}
}
</style>
