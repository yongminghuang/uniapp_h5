<template>
	<view class="page">
		<!-- header -->
		<view class="header">
			<view class="header-inner">
				<button class="back-btn" @click="goBack" aria-label="back">
					<image class="icon" :src="icons.chevronLeft" mode="aspectFit" />
				</button>
				<view class="title-wrap">
					<text class="title">{{ pageTitle }}</text>
				</view>
				<view class="header-spacer" />
			</view>
		</view>

		<!-- content -->
		<scroll-view class="content" scroll-y>
			<!-- hero -->
			<view class="card hero">
				<view class="hero-row">
					<view class="hero-left">
						<text class="hero-title">没时间刷题 就用速成200题</text>
						<view class="hero-sub">
							<text>精选题库 · 高频考点 ·省时省力</text>
							
						</view>
					</view>
					<view class="pill pill-hero">
						<text class="pill-text">98%通过率</text>
					</view>
				</view>
			</view>

			<!-- compare -->
			<view class="card compare">
				<text class="section-title">普通题库 vs 精选题库</text>
				<view class="grid2">
					<view class="compare-card normal">
						<text class="compare-label">普通题库</text>
						<view class="compare-big multi-line">
							<text>近2000题</text>
						
						</view>
						<view class="pill pill-normal">
							<image class="pill-icon" :src="icons.clock" mode="aspectFit" />
							<text class="pill-small">无重点，时间长</text>
						</view>
					</view>
					<view class="compare-card best">
						<view class="best-glow" />
						<view class="best-inner">
							<text class="compare-label">精选题库</text>
							<view class="compare-big best-big multi-line">
								<text>200题</text>
							</view>
							<view class="pill pill-best">
								<image class="pill-icon fire" :src="icons.fire" mode="aspectFit" />
								<text class="pill-small best-text">高频考点 省时省力</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- highlights -->
			<view class="card highlights">
				<text class="section-title">功能亮点</text>
				<view class="highlight-list">
					<view class="highlight-item blue">
						<image class="hi-icon" :src="icons.check" mode="aspectFit" />
						<text class="hi-text">200题高频考点覆盖：集中学习最核心、最常考的考点，拒绝无效刷题。</text>
					</view>
					<view class="highlight-item orange">
						<image class="hi-icon" :src="icons.bulb" mode="aspectFit" />
						<text class="hi-text">技巧学习更高效：每一题配有独家技巧讲解，轻松理解。</text>
					</view>
				</view>
			</view>

			<view class="spacer" />
		</scroll-view>

		<!-- bottom bar -->
		<view class="bottom-bar">
			<button class="cta" @click="start">立即解锁速成200题</button>
		</view>
	</view>
</template>

<script>
	import { callNative } from '@/common/native.js';

	const svgDataUrl = (svg) =>
		`data:image/svg+xml;utf8,${encodeURIComponent(svg)
			.replace(/%0A/g, '')
			.replace(/%20/g, ' ')}`;

	const mdi = {
		chevronLeft: svgDataUrl(
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>`
		),
		clock: svgDataUrl(
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6B7280"><path d="M12 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16m0-18a10 10 0 1 0 0 20 10 10 0 0 0 0-20m.5 5H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`
		),
		fire: svgDataUrl(
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E91927"><path d="M17.66 11.2c-.23-1.1-.83-2.2-1.86-3.3-.8-.86-1.54-1.58-1.78-2.75-.1-.48-.06-1.01.14-1.65-1.63.75-2.66 2.24-2.66 3.96 0 .28.03.56.08.83-.99-.74-2.01-1.53-2.5-2.73-.6 1.2-1.04 2.46-1.04 3.86 0 .35.03.69.1 1.03-1.2 1.27-1.86 2.83-1.86 4.6 0 3.65 2.98 6.6 6.66 6.6s6.66-2.95 6.66-6.6c0-1.42-.45-2.74-1.34-3.85M12 20.5c-2.34 0-4.24-1.9-4.24-4.24 0-1.02.36-1.99 1.02-2.76.55.74 1.34 1.34 2.22 1.72.11-1.17.66-2.18 1.5-2.96.17.99.7 1.83 1.41 2.53.62.6 1.09 1.23 1.09 2.2 0 2.34-1.9 4.24-4.24 4.24Z"/></svg>`
		),
		check: svgDataUrl(
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0B63F6"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8m4.59-11.41L10 15.17l-2.59-2.58L6 14l4 4l8-8z"/></svg>`
		),
		bulb: svgDataUrl(
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF6B00"><path d="M9 21h6v-1H9zm3-20a7 7 0 0 0-4 12.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.26A7 7 0 0 0 12 1m3 11.42-.5.36V16h-5v-3.22l-.5-.36A5 5 0 1 1 15 12.42"/></svg>`
		)
	};

	export default {
		data() {
			return {
				subject: '会计实务',
				icons: mdi
			};
		},
		computed: {
			pageTitle() {
				return `《${this.subject}》速成200题`;
			}
		},
		onLoad(options) {
			if (options && options.subject) this.subject = String(options.subject);
		},
		methods: {
			goBack() {
				try {
					callNative && callNative('WebViewFinish');
					return;
				} catch (e) {}
				uni.navigateBack();
			},
			start() {
				// 预留：与现有原生/业务对接
				try {
					callNative && callNative('onSpeedUnlockClick', { source: 'fast200', subject: this.subject });
				} catch (e) {}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, #0b63f6 0%, #2d8cff 45%, #f8fafd 100%);
		position: relative;
		overflow: hidden;
	}

	.header {
		position: sticky;
		top: 0;
		z-index: 20;
		background: transparent;
	}

	.header-inner {
		height: 88rpx;
		padding: 0 32rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.back-btn {
		width: 64rpx;
		height: 64rpx;
		padding: 0;
		margin: 0;
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.back-btn::after {
		border: none;
	}

	.icon {
		width: 48rpx;
		height: 48rpx;
	}

	.title-wrap {
		flex: 1;
		padding: 0 16rpx;
		text-align: center;
		min-width: 0;
	}

	.title {
		font-size: 28rpx;
		font-weight: 900;
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.header-spacer {
		width: 64rpx;
	}

	.content {
		flex: 1;
		padding: 32rpx 32rpx 180rpx;
		box-sizing: border-box;
	}

	.card {
		border-radius: 32rpx;
		background: #fff;
		overflow: hidden;
	}

	.hero {
		background: rgba(255, 255, 255, 0.15);
		border: 2rpx solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
		padding: 32rpx;
	}

	.hero-row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 24rpx;
	}

	.hero-left {
		min-width: 0;
	}

	.hero-title {
		font-size: 36rpx;
		font-weight: 900;
		color: #fff;
		line-height: 1.25;
	}

	.hero-sub {
		margin-top: 16rpx;
		font-size: 24rpx;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.8);
		display: flex;
		flex-direction: column;
		line-height: 1.35;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		border-radius: 999rpx;
	}

	.pill-hero {
		flex-shrink: 0;
		background: rgba(255, 255, 255, 0.2);
		border: 2rpx solid rgba(255, 255, 255, 0.25);
		padding: 12rpx 24rpx;
	}

	.pill-text {
		font-size: 22rpx;
		font-weight: 900;
		color: #fff;
	}

	.compare,
	.highlights {
		margin-top: 32rpx;
		padding: 32rpx;
		border: 2rpx solid #f1f5f9;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
	}

	.section-title {
		font-size: 26rpx;
		font-weight: 900;
		color: #111827;
		margin-bottom: 24rpx;
	}

	.grid2 {
		display: flex;
		gap: 24rpx;
	}

	.compare-card {
		flex: 1;
		border-radius: 32rpx;
		padding: 20rpx;
		box-sizing: border-box;
		min-width: 0;
	}

	.compare-card.normal {
		background: #f9fafb;
		border: 2rpx solid #e5e7eb;
	}

	.compare-card.best {
		position: relative;
		border: 2rpx solid #ffd27e;
		background: linear-gradient(135deg, #fff2cc 0%, #ffe08a 100%);
		overflow: hidden;
	}

	.best-glow {
		position: absolute;
		top: -64rpx;
		right: -64rpx;
		width: 192rpx;
		height: 192rpx;
		background: rgba(255, 179, 0, 0.2);
		border-radius: 999rpx;
		filter: blur(32rpx);
	}

	.best-inner {
		position: relative;
		z-index: 1;
	}

	.compare-label {
		font-size: 22rpx;
		font-weight: 900;
		color: #111827;
	}

	.compare-big {
		margin-top: 16rpx;
		font-size: 38rpx;
		font-weight: 900;
		color: #111827;
		line-height: 1.05;
	}

	.best-big {
		font-size: 42rpx;
		line-height: 1.05;
	}

	.multi-line {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.pill-normal {
		margin-top: 16rpx;
		gap: 8rpx;
		background: #fff;
		border: 2rpx solid #e5e7eb;
		padding: 10rpx 16rpx;
	}

	.pill-best {
		margin-top: 16rpx;
		gap: 8rpx;
		background: rgba(255, 255, 255, 0.7);
		border: 2rpx solid rgba(255, 255, 255, 0.6);
		padding: 10rpx 16rpx;
	}

	.pill-icon {
		width: 28rpx;
		height: 28rpx;
	}

	.pill-icon.fire {
		width: 28rpx;
		height: 28rpx;
	}

	.pill-small {
		font-size: 22rpx;
		font-weight: 800;
		color: #6b7280;
		white-space: nowrap;
		line-height: 1;
	}

	.best-text {
		color: #8a4b00;
		font-weight: 900;
	}

	.highlight-list {
		display: flex;
		flex-direction: column;
		gap: 16rpx;
	}

	.highlight-item {
		display: flex;
		align-items: flex-start;
		gap: 16rpx;
		border-radius: 24rpx;
		padding: 24rpx;
		border: 2rpx solid transparent;
	}

	.highlight-item.blue {
		background: #eff6ff;
		border-color: #dbeafe;
	}

	.highlight-item.orange {
		background: #fff7ed;
		border-color: #ffedd5;
	}

	.hi-icon {
		width: 36rpx;
		height: 36rpx;
		margin-top: 2rpx;
		flex-shrink: 0;
	}

	.hi-text {
		font-size: 24rpx;
		font-weight: 700;
		color: #1f2937;
		line-height: 1.6;
	}

	.bottom-bar {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 24rpx 32rpx;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-top: 2rpx solid #f3f4f6;
	}

	.cta {
		width: 100%;
		padding: 24rpx 0;
		border-radius: 32rpx;
		background: #e91927;
		color: #fff;
		font-weight: 900;
		font-size: 28rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
		transform: translateZ(0);
	}

	.cta::after {
		border: none;
	}

	.spacer {
		height: 1rpx;
	}
</style>

