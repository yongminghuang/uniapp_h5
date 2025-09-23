<template>
	<view class="wrap">
		<view class="video-view">
			<view class="video-view-wrap" :style="videoStyle">
				<video :src="videoUrl" controls autoplay id="myVideo" :show-fullscreen-btn="false" :style="videoStyle"
					object-fit="fill" @timeupdate="timeUpdatetAcion" @play="onVideoPlay">
				</video>
				<view class="speed-view">
					<view :class="isNormalSpeed?'select':'unselect'" @click="speedAction(true)">正常模式</view>
					<view :class="isNormalSpeed?'unselect':'select'" @click="speedAction(false)">慢速模式</view>
				</view>
			</view>
			<view :style="spaceStyle">
				<!-- <view class="vip-tip-view" v-if="!isVip">
					<view class="vip-view">
						<text>VIP</text>
					</view>
					<text class="tip">可试看2分钟，开通会员，6小时视频课带你快速通关</text>
				</view> -->
				<view class="bottom_pay_wrap" :style="bottomStyle" v-if="!isVip && !isBuyGood">
					<view class="bottom_pay_course_btn_warp" @click="payAction(courseData.commodityId)">
						<text class="pay_money_text"
							@click="payAction(courseData.commodityId)">￥{{courseData.money}}元直接购买</text>
						<!-- <text class="limit_text">{{limitTimeVip}}</text> -->
					</view>
					<view class="bottom_pay_btn_warp" @click="payAction(rightId)">
						<text class="pay_money_text" @click="payAction(rightId)">￥{{rightPrice}}元永久VIP解锁所有课程</text>
						<!-- <text class="limit_text">{{limitTimeVip}}</text> -->
					</view>
				</view>
			</view>
		</view>
		<view class="mask-view" v-if="isShowMask">
			<view class="mask-content">
				<view class="end-tip">试看结束了</view>
				<view class="open-vip-tip">开通会员可永久免费观看</view>
				<view class="open-vip-view">
					<view class="reset-btn" @click="resetAction">
						<image src="https://img.jx885.com/lrjk_uniapp/img/course/ic_course_reset.png"></image>
						<text>重新试看</text>
					</view>
					<view class="open-vip-btn" @click="openAction">
						<text>开通永久看</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getForeverPrice,
		requestPay
	} from '../../common/request';
	import {
		isVip
	} from '../../common/util';

	export default {
		data() {
			return {
				spaceStyle: '',
				videoStyle: '',
				videoUrl: '',
				videoContext: null,
				isNormalSpeed: true,
				isShowMask: false,
				isVip: false,
				courseData: null,
				rightPrice: 0,
				rightId: 0,
				isBuyGood: false,
			};
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			// 状态栏高度
			let statusBarHeight = systemInfo.statusBarHeight
			// 胶囊区域坐标
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// 导航栏的高度 = (胶囊底部高度-状态栏的高度)+(胶囊顶部高度-状态栏的高度)*2
			let navHeight = (menuButtonInfo.bottom - statusBarHeight) + (menuButtonInfo.top - statusBarHeight) * 2
			// 导航栏和状态栏的高度
			let navAndStatusHeight = navHeight + statusBarHeight
			// 屏幕高度
			let screenHeight = systemInfo.screenHeight
			// 底部间距高度 单位px
			let spaceHeight = 50
			// 视频高度 单位px
			let videoHeight = screenHeight - navAndStatusHeight - spaceHeight
			this.spaceStyle = "background-color: #000;height:" + spaceHeight + 'px;'
			this.videoStyle = "width:100%;height:" + videoHeight + 'px;'
		},
		onLoad() {
			var that = this;
			const eventChannel = this.getOpenerEventChannel();
			// 监听videoObj事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('videoObj', function(data) {
				that.videoUrl = data.videoUrl;
				that.courseData = data;
				uni.setNavigationBarTitle({
					title: data.courseName
				});

				that.searchVipStatus()
				if (!that.isVip) {
					that.getVipPrice();
					that.getBuyGoodList()
				}
			})
		},
		onShow() {
			this.searchVipStatus()
			if (this.isVip && (this.videoContext != null)) {
				this.isShowMask = false;
				this.videoContext.play();
			}
		},
		methods: {
			payAction(id) {
				requestPay(this, id, () => {
					this.isVip = true;
					this.isBuyGood = true;
				})
			},

			getBuyGoodList() {
				var that = this
				let params = {}
				that.$u.api.queryUserCommodity(params)
					.then(res => {
						if (res.code == 200) {
							var list = res.body;
							if (list.indexOf(that.courseData.commodityId) >= 0) {
								that.isBuyGood = true;
								that.isVip = true;
							}

						}
					})
			},
			getVipPrice() {
				let that = this;
				getForeverPrice(this, (obj) => {
					that.rightId = obj.id
					that.rightPrice = obj.money
				})
			},
			searchVipStatus() {
				if (this.courseData && this.courseData.subject == 1) {
					this.isVip = isVip(this)
				} else {
					this.isVip = isVip(this, 1) || isVip(this, 180)
				}

			},
			timeUpdatetAcion(event) {
				let detail = event.detail;
				if (detail.currentTime > 120 && !this.isVip) {
					this.videoContext.pause();
					this.isShowMask = true;
				}
			},
			onVideoPlay(event) {
				this.videoContext = uni.createVideoContext('myVideo', this);
			},
			speedAction(value) {
				this.isNormalSpeed = value;
				if (this.isNormalSpeed) {
					this.videoContext.playbackRate = 1.0;
				} else {
					this.videoContext.playbackRate = 0.8;
				}
			},
			resetAction() {
				this.videoContext.seek(0);
				this.videoContext.play();
				this.isShowMask = false;
			},
			openAction() {
				uni.navigateTo({
					url: '/pages/mine/openVip'
				});
			}

		}
	}
</script>

<style lang="scss">
	.wrap {
		height: 100%;
		width: 100%;
		position: relative;

		.video-view {
			height: 100%;
			width: 100%;

			.video-view-wrap {
				display: flex;
				position: relative;

				.speed-view {
					position: absolute;
					right: 20rpx;
					bottom: 100rpx;

					view {
						padding: 10rpx 20rpx;
						background-color: #fff;
						font-size: 28rpx;
						margin-bottom: 20rpx;
						border-radius: 30rpx;
					}

					.select {
						color: #fff;
						background-color: #247CEE;
					}

					.unselect {
						color: gray;
						background-color: #f5f5f5;
					}
				}
			}

			.vip-tip-view {
				padding: 20rpx;
				display: flex;
				background-color: rgba(0, 0, 0, 0.6);
				border-radius: 42rpx;

				.vip-view {
					background: linear-gradient(to right, #FFD27A, #FFE3AC);
					padding: 0 24rpx;
					border-radius: 26rpx;
					margin-left: auto;

					text {
						font-style: italic;
						font-size: 26rpx;
						font-weight: bold;
					}
				}

				.tip {
					font-size: 24rpx;
					color: white;
					margin: auto auto auto 10rpx;
				}
			}
		}

		.mask-view {
			background-color: rgba(0, 0, 0, 0.6);
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			display: flex;

			.mask-content {
				width: 100%;
				margin: auto;
				text-align: center;

				.end-tip {
					color: white;
					font-size: 30rpx;
					margin-bottom: 20rpx;
				}

				.open-vip-tip {
					color: white;
					font-size: 30rpx;
					margin-bottom: 40rpx;
				}

				.open-vip-view {
					display: flex;

					.reset-btn {
						width: 180rpx;
						height: 60rpx;
						border: 2rpx solid white;
						border-radius: 30rpx;
						display: flex;
						margin-left: auto;

						image {
							margin: auto 8rpx auto 16rpx;
							width: 34rpx;
							height: 34rpx;
						}

						text {
							margin: auto 0;
							color: white;
							font-size: 24rpx;
						}
					}

					.open-vip-btn {
						display: flex;
						width: 180rpx;
						height: 60rpx;
						border-radius: 30rpx;
						margin-left: 40rpx;
						margin-right: auto;
						background: linear-gradient(to right, #FFD27A, #FFE3AC);

						text {
							margin: auto;
							color: black;
							font-size: 28rpx;
						}
					}
				}
			}
		}


		.bottom_pay_wrap {
			z-index: 10000;
			background: #ffffff;

			background-size: 100% 100%;
			// height: 326rpx;
			height: auto !important;
			height: 110rpx;
			min-height: 110rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;

			.bottom_pay_course_btn_warp {
				margin-top: 21rpx;
				margin-bottom: 20rpx;
				width: 250rpx;
				height: 80rpx;
				align-self: center;
				background-color: #fff;
				border-width: 2rpx;
				// border-color: #f3f7f9;
				border-style: solid;
				border-radius: 60rpx;
				border-color: #797979;
				display: flex;

				flex-direction: row;
				justify-content: space-evenly;
				align-items: center;

				.pay_money_text {
					justify-self: center;
					font-size: 26rpx;
					color: #797979;
				}
			}

			.bottom_pay_btn_warp {
				margin-top: 21rpx;
				margin-bottom: 20rpx;
				width: 380rpx;
				height: 80rpx;
				align-self: center;
				background-color: #ED3C00;
				border-radius: 60rpx;
				display: flex;

				flex-direction: row;
				justify-content: space-evenly;
				align-items: center;

				.pay_money_text {
					justify-self: center;
					font-size: 26rpx;
					color: #FFFFFF;
				}
			}
		}
	}
</style>