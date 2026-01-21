<template>
	<footer class="footer">
		<p class="copyright">
			© 2026, разработано <a href="https://github.com/h0lloway" target="_blank">мной</a> с
			<Icon icon="mdi:heart" />
		</p>
		<div class="tech-icons">
			<a href="https://vuejs.org/" target="_blank">
				<Icon icon="mdi:vuejs" width="20" height="20" />
			</a>
			<a href="https://iconify.design/" target="_blank">
				<Icon icon="line-md:iconify2" width="20" height="20" />
			</a>
		</div>
	</footer>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>

<style lang="scss" scoped>
.footer {
	text-align: center;
	padding: 1rem 0;
	font-size: 0.9rem;
	.copyright {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.3rem;
		a {
			text-decoration: underline;
		}
	}
	.tech-icons {
		margin-top: 0.5rem;
		display: flex;
		justify-content: center;
		gap: 1rem;
		font-size: 1.3rem;
	}
	svg {
		transition: transform 0.2s ease;
		&:hover {
			transform: scale(1.1);
		}
	}
}
</style>
