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

		</view>
		<!-- 模拟成绩展示 -->

		<view class="double-marquee-container">
			<!-- 第一行：恭喜消息 -->
			<view class="marquee-row">
				<view class="marquee-content" style="animation-duration: 15s;">
					<view class="marquee-item" v-for="(msg, index) in list1" :key="index">
						<image class="icon" src="/static/guide/ic_broadcast.png"></image>
						<text class="msg">{{ msg }}</text>
					</view>
					<!-- 复制一份，实现无缝 -->
					<view class="marquee-item" v-for="(msg, index) in list1" :key="index + list1.length">
						<image class="icon" src="/static/guide/ic_broadcast.png"></image>
						<text class="msg">{{ msg }}</text>
					</view>
				</view>
			</view>

			<!-- 第二行：系统通知 -->
			<view class="marquee-row">
				<view class="marquee-content" style="animation-duration: 18s;">
					<view class="marquee-item" v-for="(msg, index) in list2" :key="index">
						<image class="icon" src="/static/guide/ic_broadcast.png"></image>
						<text class="msg">{{ msg }}</text>
					</view>
					<!-- 复制一份 -->
					<view class="marquee-item" v-for="(msg, index) in list2" :key="index + list2.length">
						<image class="icon" src="/static/guide/ic_broadcast.png"></image>
						<text class="msg">{{ msg }}</text>
					</view>
				</view>
			</view>
		</view>


		<!-- 视频播放器 -->
		<view class="video-container">
			<video class="video-bg" id="myVideo"
				src="https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4"
				controls></video>
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
				current: 0, // 当前显示的轮播图索引
				// 第一行：恭喜类消息
				list1: [
					'恭喜「张三」模拟考试 98分！',
					'恭喜「李四」全科通过！',
					'恭喜「王五」刷题满1000道！'
				],
				// 第二行：通知类消息
				list2: [
					'新题库已上线，快去练习！',
					'周末直播课时间调整通知',
					'会员积分即将到期，请及时使用'
				]
			};
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: '驾考指南'
			});
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
		width: calc(100% - 48rpx);
		/* 计算宽度，减去左右边距的总和 */
		height: 300rpx;
		border-radius: 12rpx;
		overflow: hidden;
		margin: 0rpx 24rpx;
		// background: #eee;
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
		height: 100rpx;
		bottom: 0;
		left: 0;
		background: #e63737;
		color: white;
		padding: 20rpx;
		text-align: center;
		border-radius: 12rpx;

		font-size: 32rpx;
	}

	.double-marquee-container {
		width: 100%;
		overflow: hidden;
		background-color: #fff;
		border-radius: 12px;
		// box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		margin: 10px 0;
	}

	.marquee-row {
		height: 44px;
		display: flex;
		align-items: center;
		padding: 0 12px;
		background-color: #f8f9fa;
		// border-bottom: 1px solid #e9ecef;

		&:last-child {
			border-bottom: none;
		}

		&:first-child {
			border-radius: 12px 12px 0 0;
		}

		&:last-child {
			border-radius: 0 0 12px 12px;
		}
	}

	.marquee-content {
		display: flex;
		white-space: nowrap;
		animation: marquee 15s linear infinite;
		animation-delay: 0s;
		will-change: transform;
		justify-content: flex-start;
	}

	// ✅ 真正无缝的关键：移动 -50%
	@keyframes marquee {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-50%);
		}
	}

	.marquee-item {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		margin-right: 30px;
		padding: 6px 14px;
		// background-color: #e3f2fd;
		background: linear-gradient(to right, #FFEEC8, #FFFCF7);
		border-radius: 22px;
		font-size: 14px;
		color: #1976d2;

		.icon {
			width: 32rpx;
			height: 32rpx;
			margin-right: 6px;
			font-size: 16px;
		}

		.msg {
			font-weight: 500;
		}
	}
</style>