<template>
	<div class="browser-window">
		<div class="browser-window__bar">
			<div class="browser-window__dots"></div>
			<div class="browser-window__menu"></div>
		</div>
		<div class="browser-window__content">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
.browser-window {
	position: relative;
	width: 100%;
	border-radius: 8px;
	overflow: hidden;
	background: var(--browser-bg);
	box-shadow: 0 4px 24px var(--shadow-color);
	&__bar {
		position: relative;
		height: 28px;
		background: var(--browser-bar);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 12px;
	}
	&__dots {
		display: flex;
		align-items: center;
		gap: 6px;
		&::before,
		&::after {
			content: '';
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: var(--browser-dots);
		}
		&::before {
			box-shadow:
				16px 0 0 var(--browser-dots),
				32px 0 0 var(--browser-dots);
		}
		&::after {
			display: none;
		}
	}
	&__menu {
		display: flex;
		flex-direction: column;
		gap: 3px;
		&::before,
		&::after {
			content: '';
			width: 16px;
			height: 2px;
			background: var(--browser-dots);
			border-radius: 1px;
		}
		&::before {
			box-shadow: 0 5px 0 var(--browser-dots);
		}
	}
	&__content {
		position: relative;
		width: 100%;
		height: calc(100% - 28px);
		overflow: hidden;
		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: top;
		}
	}
}
</style>
