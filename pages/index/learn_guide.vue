<template>
	<view :class=" isShowBottom ? `container`:`container2`">
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
			<text>亲爱的学员，您好呀！专属你的驾考学习指南已上线，轻松拿证，懒人驾考与您一路相伴！</text>
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
				<view class="marquee-content" ref="row1">
					<view class="marquee-item" v-for="(msg, index) in list1" :key="index">
						<image class="icon" src="/static/guide/ic_broadcast.png"></image>
						<span class="msg-text-color-1">恭喜</span>
						<span class="msg-text-color-2">「{{ msg.userName }}」</span>
						<span class="msg-text-color-1">模拟考试 </span>
						<span class="msg-text-color-2">{{msg.score }}分</span>
					</view>
					<!-- 复制一份，实现无缝 -->
					<view class="marquee-item" v-for="(msg, index) in list1" :key="index + list1.length">
						<span class="msg-text-color-1">恭喜</span>
						<span class="msg-text-color-2">「{{ msg.userName }}」</span>
						<span class="msg-text-color-1">模拟考试 </span>
						<span class="msg-text-color-2">{{msg.score }}分</span>
					</view>
				</view>
			</view>

			<!-- 第二行：系统通知 -->
			<view class="marquee-row">
				<view class="marquee-content" ref="row2">
					<view class="marquee-item" v-for="(msg, index) in list2" :key="index">
						<image class="icon" src="/static/guide/ic_broadcast.png"></image>
						<span class="msg-text-color-1">恭喜</span>
						<span class="msg-text-color-2">「{{ msg.userName }}」</span>
						<span class="msg-text-color-1">模拟考试 </span>
						<span class="msg-text-color-2">{{msg.score }}分</span>
					</view>
					<!-- 复制一份 -->
					<view class="marquee-item" v-for="(msg, index) in list2" :key="index + list2.length">
						<image class="icon" src="/static/guide/ic_broadcast.png"></image>
						<span class="msg-text-color-1">恭喜</span>
						<span class="msg-text-color-2">「{{ msg.userName }}」</span>
						<span class="msg-text-color-1">模拟考试 </span>
						<span class="msg-text-color-2">{{msg.score }}分</span>
					</view>
				</view>
			</view>
		</view>


		<!-- 视频播放器 -->
		<view class="video-container">
			<video class="video-bg" id="myVideo" src="/static/guide/guide.mp4" controls></video>
		</view>

		<!-- 功能卡片 -->
		<view class="card-list">
			<!-- 技巧练题 -->
			<view class="card-item" @click="toSkillPage()">
				<image class="card-item-image" src="/static/guide/bg_skill.png" mode="widthFix"></image>

			</view>

			<!-- 直播讲题 -->
			<view class="card-item" @click="toLivePage()">
				<image class="card-item-image" src="/static/guide/bg_live.png" mode="widthFix"></image>
			</view>

			<!-- 模拟真实考场 -->
			<view class="card-item" @click="toMkExamPage()">
				<image class="card-item-image" src="/static/guide/bg_exam.png" mode="widthFix"></image>

			</view>
		</view>

		<!-- 底部会员引导 -->
		<view class="footer-banner" @click="toOpenVipPage()" v-if="isShowBottom">
			<text class="footer-text">欢迎您加入会员，开启一段专属的学习之旅！</text>
		</view>
	</view>
</template>

<script>
	import {
		callNative
	} from '../../common/native';

	export default {
		data() {
			return {
				isShowBottom: false,
				marqueeSpeedSet: false, // 新增标志位
				swiperList: [{
						image: '/static/guide/swiper_km1.png'
					},
					{
						image: '/static/guide/swiper_km4.png'
					}
				],
				current: 0, // 当前显示的轮播图索引
				// 第一行：恭喜类消息
				list1: [{
						"userName": "朝霞云彩",
						"score": 99
					},
					{
						"userName": "凹凸曼",
						"score": 97
					},
					{
						"userName": "XYD",
						"score": 96
					}
				],
				// 第二行：通知类消息
				list2: [{
						"userName": "朝霞云彩",
						"score": 99
					},
					{
						"userName": "凹凸曼",
						"score": 97
					},
					{
						"userName": "XYD",
						"score": 96
					},
					{
						"userName": "凉然、鎖心碎",
						"score": 96
					},
					{
						"userName": "高原凌峰",
						"score": 96
					},
					{
						"userName": "永恒",
						"score": 95
					},
				]
			};
		},
		mounted() {
			window.onload = () => {
				this.$nextTick(() => {
					this.adjustMarqueeSpeed('row1', this.list1);
					this.adjustMarqueeSpeed('row2', this.list2);
				});
			};
			// this.$nextTick(() => {
			// 	if (!this.marqueeSpeedSet) {
			// 		this.adjustMarqueeSpeed('row1', this.list1);
			// 		this.adjustMarqueeSpeed('row2', this.list2);
			// 		this.marqueeSpeedSet = true;
			// 	}
			// });
		},
		created() {
			let that = this;
			this.isShowBottom = option.showBottomOpenVip == "1"
			// window.showBottomOpenVip = (str) => {
			// 	alert("str:" + str)
			// 	console.log("iOS 主动推送的字符串：", str);
			// 	that.isShowBottom = str == "1"

			// };
		},
		onLoad(option) {
			let that = this;
			this.isShowBottom = option.showBottomOpenVip == "1"
			window.showBottomOpenVip = (str) => {
				// alert("str:" + str)
				console.log("iOS 主动推送的字符串：", str);
				that.isShowBottom = str == "1"

			};
			let params = {

			}

			this.$u.api.getBullect(params)
				.then(res => {
					// alert("res:" + res)
					// that.videoList = [];
					if (res.code == 200) {
						var list = res.body;
						var length = list.length;
						that.list1 = list.splice(0, length / 2);
						that.list2 = list.splice(-length / 2);

					}

				})
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: '驾考指南'
			});
		},
		methods: {
			getObject() {

			},
			goBack() {
				uni.navigateBack();
			},
			adjustMarqueeSpeed(refName, list) {
				const row = this.$refs[refName];
				if (!row) return;

				// ✅ 关键：使用 row.$el 获取原生 DOM 元素
				const rowElement = row.$el || row; // 兼容某些平台直接是 DOM 的情况

				// 现在可以正常使用 querySelectorAll
				const items = rowElement.querySelectorAll('.marquee-item');
				if (!items.length) return;

				// 计算第一份内容的总宽度
				const totalWidth = Array.from(items)
					.slice(0, list.length)
					.reduce((sum, el) => sum + el.offsetWidth, 0);

				// 获取 margin-right
				const firstItem = items[0];
				const style = getComputedStyle(firstItem);
				const marginRight = parseFloat(style.marginRight) || 0;
				const spacingWidth = marginRight * (list.length - 1);

				const contentWidth = totalWidth + spacingWidth;

				// 滚动速度（像素/秒）
				const scrollSpeed = 25000;
				const duration = contentWidth / scrollSpeed;
				console.log("duration:" + duration + ",contentWidth:" + contentWidth)

				// 设置 CSS 变量
				rowElement.style.setProperty('--duration', `${Math.max(8, duration)}s`);
			},
			toOpenVipPage() {
				callNative('toOpenVipPage')
			},
			toLivePage() {
				callNative('toLivePage')
			},
			toSkillPage() {
				callNative('toSkillPage')
			},
			toMkExamPage() {
				callNative('toTrueMockExamPage')
			},
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #f8f9fa;
		/* padding: 0 20rpx; */
		padding-bottom: 90rpx;
	}

	.container2 {
		background-color: #f8f9fa;
		/* padding: 0 20rpx; */
		padding-bottom: 30rpx;
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
		margin-top: 20rpx;
		// background: #eee;
	}


	.video-bg {
		width: 100%;
		height: 100%;
		object-fit: cover;
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
		// border-radius: 12rpx;

		font-size: 32rpx;
	}

	.double-marquee-container {
		// height: 55rpx;
		width: 100%;
		overflow: hidden;
		background-color: #fff;
		border-radius: 12px;
		// box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		gap: 15rpx; // 两行之间的间距，防止重叠
	}

	.marquee-row {
		// height: 44px;
		display: flex;
		align-items: center;
		// padding: 0 12rpx;
		background-color: #f8f9fa;
		// border-bottom: 1px solid #e9ecef;

		&:last-child {
			border-bottom: none;
		}

		&:first-child {
			border-radius: 12rpx 12rpx 0 0;
		}

		&:last-child {
			border-radius: 0 0 12rpx 12rpx;
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
		margin-right: 60rpx;
		padding: 0rpx 14rpx;
		// background-color: #e3f2fd;
		background: linear-gradient(to right, #FFEEC8, #FFFCF7);
		border-radius: 22px;
		font-size: 26rpx;
		color: #1976d2;

		.icon {
			width: 32rpx;
			height: 32rpx;
			margin-right: 6px;
			font-size: 16px;
		}

		.msg {}

		.msg-text-color-1 {
			color: #000000CC;
		}

		.msg-text-color-2 {
			color: #000000;
			font-weight: 500;
		}
	}
</style>