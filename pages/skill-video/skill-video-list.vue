<template>
	<view class="skill-video-view-wrap">
		<view class="subject-video-content" :style="{paddingBottom: !isVip ? '160rpx':'40rpx'}">
			<view class="subject-video-wrap" v-for="(item,index) in videoList" :key="index" @click="videoAction(index)">
				<!-- <view class="explain">技巧讲解</view> -->
				<text class="free_tip" v-if="!isVip && index <=3">免费</text>
				<image class="vip_tip" src="https://img.jx885.com/lrjk_uniapp/img/card/skill-vip.png"
					v-if="!isVip && index >3"></image>
				<view class="subject-video-img">
					<image :src="item.imgUrl" mode="scaleToFill"></image>
					<view class="subject-video-time-view">
						<view class="time">{{item.time}}</view>
					</view>
				</view>
				<view class="video-title">{{item.title}}</view>
			</view>
		</view>
		<view class="bottom_pay_wrap" v-if="!isVip">
			<view class="bottom_pay_btn_warp" @click="payAction">
				<view class="pay_money_wrap">
					<text class="pay_money_text">￥{{leftPrice}}</text>
					<!-- <text class="limit_text">{{limitTimeVip}}</text> -->
				</view>

				<text class="open_vip_text">开通永久会员免费看</text>
			</view>
		</view>
		<view :style="spaceStyle"></view>
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
				videoList: [],
				isVip: false,
				leftId: 0,
				leftPrice: 0,
				leftOriginalPrice: 0,

			};
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom;
			this.spaceStyle = 'background-color: #f3f7f9;height:' + bottomSafeHeight + 'px;';
		},
		onLoad() {
			var that = this;
			this.isVip = isVip(this)
			const eventChannel = this.getOpenerEventChannel();
			// 监听videoData事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('videoData', function(data) {
				that.videoList = data
			})
			if (!isVip(this, 1)) {
				this.getVipPrice()
			}
		},
		methods: {
			// 科一科四技巧视频单个技巧视频
			videoAction(index) {
				var that = this;
				uni.navigateTo({
					url: '/pages/skill-video/skill-video',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('videoData', that.videoList, index);
					}
				});
			},
			payAction() {
				let id = this.leftId;
				requestPay(this, id, () => {
					this.isVip = true;
				})
			},
			getVipPrice() {
				let that = this;
				getForeverPrice(this, (obj) => {
					that.leftId = obj.id
					that.leftPrice = obj.money
					that.leftOriginalPrice = obj.originalMoney
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f7f9;
	}

	.skill-video-view-wrap {
		height: 100%;

		.subject-video-content {
			display: flex;
			flex-wrap: wrap;

			.subject-video-wrap {
				position: relative;
				border-radius: 20rpx;
				width: 355rpx;
				height: 280rpx;
				text-align: center;
				background-color: white;
				margin: 10rpx;

				.explain {
					font-size: 30rpx;
					margin-top: 20rpx;
				}

				.free_tip {
					border-radius: 16rpx 16rpx 16rpx 0rpx;
					padding: 0 10rpx;
					color: #fff;
					position: absolute;
					left: 15rpx;
					z-index: 1;
					background-color: #327ee6;
				}

				.vip_tip {
					position: absolute;
					left: 15rpx;
					z-index: 1;
					width: 70rpx;
					height: 36rpx;
				}

				.subject-video-img {
					position: relative;
					// margin-top: 20rpx;

					image {
						width: 325rpx;
						height: 160rpx;
					}

					.subject-video-time-view {
						background-color: black;
						position: absolute;
						right: 17rpx;
						bottom: 10rpx;
						border-radius: 16rpx;
						padding: 0 10rpx;

						.time {
							font-size: 22rpx;
							color: white;
						}
					}
				}

				.video-title {
					margin: 20rpx 10rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					text-align: start;
				}
			}
		}
	}

	.bottom_pay_wrap {
		z-index: 10000;
		background: #ffffff;

		background-size: 100% 100%;
		// height: 326rpx;
		// height: auto !important;
		height: 140rpx;
		// min-height: 110rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.bottom_pay_btn_warp {
		margin-top: 21rpx;
		margin-bottom: 20rpx;
		width: 684rpx;
		height: 94rpx;
		align-self: center;
		background-color: #ED3C00;
		border-radius: 60rpx;
		display: flex;

		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;

		.pay_money_wrap {
			display: flex;
			flex-direction: row;
			align-items: end;

			.pay_money_text {
				justify-self: center;
				font-weight: 800;
				font-size: 47rpx;
				color: #FFFFFF;
			}

			.limit_text {
				justify-self: center;
				font-weight: 400;
				font-size: 24rpx;
				color: #FFFFFF;
				align-self: flex-end;
				margin-bottom: 8rpx;
				margin-left: 15rpx;
			}
		}


		.pay_hint_text {
			justify-self: center;
			font-weight: 400;
			font-size: 32rpx;
			color: #FFFFFF;
		}

		.open_vip_text {
			font-weight: 400;
			font-size: 32rpx;
			color: #FFFFFF;
		}
	}
</style>