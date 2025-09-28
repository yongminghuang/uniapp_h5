<template>
	<view class="container">
		<!-- 顶部导航 -->
		<!-- 	<view class="header">
			<view class="back" @click="goBack">
				<text class="iconfont">&#xe600;</text>
			</view>
			<text class="title">驾考学习指南</text>
		</view> -->

		<!-- 欢迎语 -->
		<view class="welcome">
			<image class="welcome_bg" src="/static/guide/top_bg.png"></image>
			<text>亲爱的学员，您好呀！专属你的驾考学习指南已上线，轻松拿证，偶人驾考与您一路相伴！</text>
		</view>

		<!-- 快速学习流程 -->
		<view class="quick-learning">
			<swiper class="swiper_wrap" :current="current" indicator-dots="true" autoplay="true">
				<swiper-item v-for="(item, index) in swiperList" :key="index">

					<image class="swiper-item-image" :src="item.image" mode="scaleToFill" />

				</swiper-item>
			</swiper>
			<!-- <text class="quick-title">快速学习</text>
			<view class="steps">
				<view class="step-item active">
					<text class="step-num">1</text>
					<text class="step-text">速成500题</text>
				</view>
				<text class="arrow">→</text>
				<view class="step-item">
					<text class="step-num">2</text>
					<text class="step-text">模拟考试</text>
				</view>
				<text class="arrow">→</text>
				<view class="step-item">
					<text class="step-num">3</text>
					<text class="step-text">视频夜宴</text>
				</view>
				<text class="arrow">→</text>
				<view class="step-item">
					<text class="step-num">4</text>
					<text class="step-text">技巧练习</text>
				</view>
			</view> -->
		</view>

		<!-- 模拟成绩展示 -->
		<view class="score-list">
			<view class="score-item">
				<text class="score-label">恭喜「真正经」模拟考试 100分</text>
			</view>
			<view class="score-item">
				<text class="score-label">恭喜「龙哥大大」模拟考试 96分</text>
			</view>
		</view>

		<!-- 视频播放器 -->
		<view class="video-container">
			<image src="/static/video-placeholder.jpg" mode="aspectFill" class="video-bg"></image>
			<view class="video-overlay">
				<text class="play-btn">▶</text>
			</view>
			<view class="video-progress">
				<text class="time-left">00:16</text>
				<view class="progress-bar">
					<view class="progress"></view>
				</view>
				<text class="time-right">00:30</text>
			</view>
		</view>

		<!-- 功能卡片 -->
		<view class="card-list">
			<!-- 技巧练题 -->
			<view class="card-item">
				<image class="card-item-image" src="/static/guide/bg_skill.png" mode="widthFix"></image>

			</view>

			<!-- 直播讲题 -->
			<view class="card-item">
				<image class="card-item-image" src="/static/guide/bg_live.png" mode="widthFix"></image>
			</view>

			<!-- 模拟真实考场 -->
			<view class="card-item">
				<image class="card-item-image" src="/static/guide/bg_exam.png" mode="widthFix"></image>

			</view>
		</view>

		<!-- 底部会员引导 -->
		<view class="footer-banner">
			<text class="footer-text">欢迎您加入会员，开启一段专属的学习之旅！</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [{
						image: '/static/guide/swiper_km1.png'
					},
					{
						image: '/static/guide/swiper_km4.png'
					}
				],
				current: 0 // 当前显示的轮播图索引
			};
		},
		methods: {
			goBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #f8f9fa;
		/* padding: 0 20rpx; */
		padding-bottom: 90rpx;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
		background: #ffffff;
		border-bottom: 1rpx solid #e5e5e5;
		padding: 0 20rpx;
	}

	.back {
		font-size: 40rpx;
		color: #333;
	}

	.title {
		font-weight: bold;
		font-size: 36rpx;
		color: #333;
	}

	.welcome {
		position: relative;
		border-radius: 12rpx;
		margin: 12rpx 16rpx;

		/* background: linear-gradient(135deg, #e6f7ff, #d6f2ff); */

		.welcome_bg {
			/* 	position: absolute;
			z-index: -1; */
			width: 100%;
			height: 128rpx;
		}

		text {
			position: absolute;
			z-index: 1;
			left: 0rpx;
			top: 0rpx;
			text-indent: 2em;
			margin: 24rpx;
			/* padding-left: 20rpx;
			padding-right: 20rpx; */
			/* margin: 20rpx 20rpx; */
			font-size: 14rpx;
			text-align: start;
			color: #344BA7;
			font-size: 28rpx;
			line-height: 1.5;
		}

	}

	.swiper_wrap {
		width: 100%;
		height: 280rpx;

		/* 根据内容设置Swiper的高度 */
		.swiper-item-image {
			width: 100%;
			height: 100%;
		}
	}




	.quick-learning {

		/* background: #007aff; */
		border-radius: 12rpx;
		padding: 20rpx;
		color: white;
	}

	.quick-title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 10rpx;
	}

	.steps {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10rpx;
	}

	.step-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10rpx;
		border-radius: 8rpx;
		background: rgba(255, 255, 255, 0.2);
	}

	.step-item.active {
		background: rgba(255, 255, 255, 0.4);
	}

	.step-num {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background: white;
		color: #007aff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
	}

	.step-text {
		margin-top: 5rpx;
		font-size: 24rpx;
		color: white;
	}

	.arrow {
		font-size: 32rpx;
		color: white;
	}

	.score-list {
		margin: 20rpx 0;
		display: flex;
		flex-wrap: wrap;
		gap: 10rpx;
	}

	.score-item {
		background: #fff;
		border-radius: 8rpx;
		padding: 10rpx 20rpx;
		box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
		font-size: 24rpx;
		color: #555;
	}

	.video-container {
		position: relative;
		width: 100%;
		height: 300rpx;
		border-radius: 12rpx;
		overflow: hidden;
		margin: 20rpx 0;
		background: #eee;
	}

	.video-bg {
		width: 100%;
		height: 100%;
	}

	.video-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.3);
		color: white;
		font-size: 60rpx;
	}

	.video-progress {
		position: absolute;
		bottom: 10rpx;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		color: white;
		font-size: 24rpx;
	}

	.progress-bar {
		flex: 1;
		height: 6rpx;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 3rpx;
		margin: 0 10rpx;
		overflow: hidden;
	}

	.progress {
		width: 30%;
		height: 100%;
		background: #007aff;
	}

	.card-list {

		display: flex;
		flex-direction: column;
		margin: 20px 24rpx;
		gap: 20rpx;
		/* 推荐使用 gap 代替 margin-bottom */
	}

	.card-item {
		position: relative;
		width: 100%;
		// height: 110rpx;
		background: white;
		border-radius: 12rpx;
		padding: 0rpx;
		// margin-bottom: 20rpx;
		// margin-left: 24rpx;
		// margin-right: 24rpx;
		margin-top: 10rpx;
		overflow: hidden;
		/* 确保图片圆角显示正常 */
		// box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
	}

	.card-item-image {
		width: 100%;
		height: auto;
		display: block;
		/* 消除图片底部间隙 */
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.card-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}

	.tag {
		background: #007aff;
		color: white;
		padding: 4rpx 12rpx;
		border-radius: 12rpx;
		font-size: 20rpx;
	}

	.card-body {
		margin-bottom: 10rpx;
	}

	.desc {
		color: #666;
		font-size: 24rpx;
	}

	.card-footer {
		text-align: right;
	}

	.more {
		color: #007aff;
		font-size: 24rpx;
	}

	.footer-banner {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		background: #e63737;
		color: white;
		padding: 20rpx;
		text-align: center;
		border-radius: 12rpx;

		font-size: 28rpx;
	}
</style>