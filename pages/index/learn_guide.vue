<template>
	<view :class="isShowBottom ? 'container' : 'container2'">
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

		<!-- 双行跑马灯 -->
		<view class="double-marquee-container">
			<!-- 第一行：恭喜消息 -->
			<view class="marquee-row">
				<view class="marquee-content" ref="marqueeRow1">
					<view class="marquee-item" v-for="(msg, index) in list1" :key="index">
						<image class="icon" src="/static/guide/ic_broadcast.png"></image>
						<span class="msg-text-color-1">恭喜</span>
						<span class="msg-text-color-2">「{{ msg.userName }}」</span>
						<span class="msg-text-color-1">模拟考试 </span>
						<span class="msg-text-color-2">{{ msg.score }}分</span>
					</view>
					<!-- 复制一份 -->
					<view class="marquee-item" v-for="(msg, index) in list1" :key="index + list1.length">
						<image class="icon" src="/static/guide/ic_broadcast.png"></image>
						<span class="msg-text-color-1">恭喜</span>
						<span class="msg-text-color-2">「{{ msg.userName }}」</span>
						<span class="msg-text-color-1">模拟考试 </span>
						<span class="msg-text-color-2">{{ msg.score }}分</span>
					</view>
				</view>
			</view>

			<!-- 第二行：系统通知 -->
			<view class="marquee-row">
				<view class="marquee-content" ref="marqueeRow2">
					<view class="marquee-item" v-for="(msg, index) in list2" :key="index">
						<image class="icon" src="/static/guide/ic_broadcast.png"></image>
						<span class="msg-text-color-1">恭喜</span>
						<span class="msg-text-color-2">「{{ msg.userName }}」</span>
						<span class="msg-text-color-1">模拟考试 </span>
						<span class="msg-text-color-2">{{ msg.score }}分</span>
					</view>
					<view class="marquee-item" v-for="(msg, index) in list2" :key="index + list2.length">
						<image class="icon" src="/static/guide/ic_broadcast.png"></image>
						<span class="msg-text-color-1">恭喜</span>
						<span class="msg-text-color-2">「{{ msg.userName }}」</span>
						<span class="msg-text-color-1">模拟考试 </span>
						<span class="msg-text-color-2">{{ msg.score }}分</span>
					</view>
				</view>
			</view>
		</view>

		<!-- 视频播放器 -->
		<view class="video-container">
			<video class="video-bg" id="myVideo" src="/static/guide/guide.mp4" @play="onGuideVideoPlay"
				poster="https://img.jx885.com/lrjk/html/guide/static/guide/guide.mp4?x-oss-process=video/snapshot,t_1,f_jpg,w_1980,h_1110,m_fast"
				controls></video>
		</view>

		<!-- 功能卡片 -->
		<view class="card-list">
			<view class="card-item" @click="toSkillPage()">
				<image class="card-item-image" src="/static/guide/bg_skill.png" mode="widthFix"></image>
			</view>
			<view class="card-item" @click="toLivePage()">
				<image class="card-item-image" src="/static/guide/bg_live.png" mode="widthFix"></image>
			</view>
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
				marqueeAnimId1: null,
				marqueeAnimId2: null,
				marqueeSpeed: 0.8, // 控制滚动速度（像素/帧）
				swiperList: [{
						image: '/static/guide/swiper_km1.png'
					},
					{
						image: '/static/guide/swiper_km4.png'
					}
				],
				current: 0,
				list1: [{
						"userName": "朝霞云彩",
						"score": 99
					},
					{
						"userName": "凉然、鎖心碎",
						"score": 97
					},
					{
						"userName": "高原凌峰",
						"score": 96
					}
				],
				list2: [{
						"userName": "梦幻星辰",
						"score": 95
					},
					{
						"userName": "红尘过客",
						"score": 96
					},
					{
						"userName": "无可替玳",
						"score": 96
					},
					{
						"userName": "永恒",
						"score": 95
					}
				]
			};
		},
		mounted() {
			this.$nextTick(() => {
				// 延迟确保 DOM 渲染完成
				setTimeout(() => {
					this.startMarquee('marqueeRow1', this.list1);
					this.startMarquee('marqueeRow2', this.list2);
				}, 100);
			});
		},
		onLoad(option) {
			this.isShowBottom = option.showBottomOpenVip === "1";
			if (process.env.VUE_APP_PLATFORM === 'h5') {
				const urlParams = new URLSearchParams(window.location.search);
				this.isShowBottom = urlParams.get('showBottomOpenVip') === "1"; // 返回字符串 "0"
			}

			window.showBottomOpenVip = (str) => {
				console.log("iOS 主动推送的字符串：", str);
				this.isShowBottom = str === "1";
			};

			// 模拟异步获取数据（根据你的实际接口调整）
			let params = {}
			this.$u.api.getBullect(params).then(res => {
				if (res.code == 200) {
					const list = res.body;
					const len = list.length;
					this.list1 = list.slice(0, len / 2);
					this.list2 = list.slice(-len / 2);
					this.$nextTick(() => {
						setTimeout(() => {
							this.startMarquee('marqueeRow1', this.list1);
							this.startMarquee('marqueeRow2', this.list2);
						}, 100);
					});
				}
			});
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: '驾考学习指南'
			});
		},
		beforeDestroy() {
			// 清除动画，防止内存泄漏
			this.stopMarquee(1);
			this.stopMarquee(2);
		},
		methods: {
			waitForImagesLoaded(container) {
				const imgs = container.querySelectorAll('image, img');
				const promises = Array.from(imgs).map(img => {
					return new Promise(resolve => {
						if (img.complete) {
							resolve();
						} else {
							img.onload = img.onerror = () => resolve();
						}
					});
				});
				return Promise.all(promises);
			},

			startMarquee(refName, list) {
				const row = this.$refs[refName];
				if (!row) return;

				const content = row.$el || (row.length ? row[0] : row);
				const innerContent = content.querySelector('.marquee-content') || content;

				this.waitForImagesLoaded(innerContent).then(() => {
					const items = Array.from(innerContent.querySelectorAll('.marquee-item')).slice(0, list.length);
					if (items.length === 0) return;

					const totalWidth = items.reduce((sum, el) => {
						const style = getComputedStyle(el);
						return sum + el.offsetWidth + parseFloat(style.marginRight || 0);
					}, 0);

					// 清除之前的动画
					this.stopMarquee(refName.slice(-1));

					let position = 0;
					const animate = () => {
						position -= this.marqueeSpeed;
						if (position <= -totalWidth) position = 0;
						innerContent.style.transform = `translateX(${position}px)`;
						this[`marqueeAnimId${refName.slice(-1)}`] = requestAnimationFrame(animate);
					};

					animate();
				});
			},

			stopMarquee(id) {
				const key = `marqueeAnimId${id}`;
				if (this[key]) {
					cancelAnimationFrame(this[key]);
					this[key] = null;
				}
			},

			// 其他方法保持不变
			toOpenVipPage() {
				callNative('toOpenVipPage');
			},
			toLivePage() {
				callNative('toLivePage');
			},
			toSkillPage() {
				callNative('toSkillPage');
			},
			onGuideVideoPlay() {
				callNative('onGuideVideoPlay');
			},
			toMkExamPage() {
				callNative('toTrueMockExamPage');
			},
			goBack() {
				uni.navigateBack();
			}
		}
	};
</script>

<style lang="scss">
	// ===== 基础样式 =====
	.container {
		background-color: #f8f9fa;
		padding-bottom: 90rpx;
	}

	.container2 {
		background-color: #f8f9fa;
		padding-bottom: 30rpx;
	}

	.welcome {
		position: relative;
		border-radius: 12rpx;
		margin: 12rpx 16rpx;

		.welcome_bg {
			width: 100%;
			height: 128rpx;
		}

		text {
			position: absolute;
			z-index: 1;
			left: 0;
			top: 0;
			text-indent: 2em;
			margin: 24rpx;
			font-size: 28rpx;
			color: #344BA7;
			line-height: 1.5;
		}
	}

	.swiper_wrap {
		width: 100%;
		height: 280rpx;

		.swiper-item-image {
			width: 100%;
			height: 100%;
		}
	}

	.quick-learning {
		border-radius: 12rpx;
		padding: 20rpx;
	}

	// ===== 跑马灯样式 =====
	.double-marquee-container {
		width: 100%;
		overflow: hidden;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		gap: 15rpx;
	}

	.marquee-row {
		display: flex;
		align-items: center;
		background-color: #f8f9fa;

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
		will-change: transform;
		justify-content: flex-start;
		// ❌ 移除 CSS 动画，使用 JS 控制
	}

	.marquee-item {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		margin-right: 60rpx;
		padding: 0 14rpx;
		height: 50rpx;
		background: linear-gradient(to right, #FFEEC8, #FFFCF7);
		border-radius: 22px;
		font-size: 26rpx;
		color: #1976d2;

		.icon {
			width: 32rpx;
			height: 32rpx;
			margin-right: 6px;
		}

		.msg-text-color-1 {
			color: #000000CC;
		}

		.msg-text-color-2 {
			color: #000000;
			font-weight: 500;
		}
	}

	// ===== 其他样式 =====
	.video-container {
		// width: 750rpx;
		// height: 409.10rpx;
		// padding-bottom: 133.33%;
		width: 100%;
		height: 0;
		padding-bottom: 56.25%;
		/* 16:9 宽高比 */
		/* 16:9 宽高比，可根据需要调整 */
		position: relative;
		// border-radius: 12rpx;
		overflow: hidden;
		margin: 30rpx 0 0 0;
	}

	.video-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* 关键：铺满容器，裁剪多余部分 */
	}

	.card-list {
		display: flex;
		flex-direction: column;
		margin: 20px 24rpx;
		gap: 20rpx;
	}

	.card-item {
		position: relative;
		width: 100%;
		background: white;
		border-radius: 12rpx;
		overflow: hidden;
		margin-top: 10rpx;
	}

	.card-item-image {
		width: 100%;
		height: auto;
		display: block;
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
		font-size: 32rpx;
	}
</style>