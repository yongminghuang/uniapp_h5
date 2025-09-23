<template>
	<view>
		<uni-popup ref="popup" :safe-area="false" type="bottom" @maskClick="closeAction(0)" @change="changeAction">
			<view class="wrap">
				<view class="header">
					<view class="title-bg-view">
						<image src="https://img.jx885.com/lrjk_uniapp/img/live/ic_vip_warning.png"></image>
						<view class="title">{{title}}</view>
					</view>
					<uni-icons type="closeempty" class="close" size="30" color="#c8c8c8"
						@click="closeAction(1)"></uni-icons>
				</view>
				<view class="line-view"></view>
				<view class="content">
					<view class="equity-view">
						<image src="https://img.jx885.com/lrjk_uniapp/img/logo.png"></image>
						<text>{{equity}}</text>
					</view>
					<view class="price-view">
						<view class="price-wrap-view left-view" :class="vipType == 0?'price-wrap-view-sel':''"
							@click="switchVipType(0)">
							<view class="selected-bg" v-if="vipType == 0"></view>
							<view class="red-price-view">
								<text class="red-price">{{'￥' + leftPrice}}</text>
								<view class="recommend-view">
									<text>推荐</text>
								</view>
							</view>
							<view v-for="(str,index) in leftRecommendList" :key="index" class="recommend-wrap-view">
								<image src="https://img.jx885.com/lrjk_uniapp/img/live/ic_vip_rigth_blue.png"></image>
								<text :class="str.length> 5 ? 'small_text':'nors_text'">{{str}}</text>
							</view>
							<image v-if="vipType == 0"
								src="https://img.jx885.com/lrjk_uniapp/img/live/ic_vip_money_check.png"
								class="money_check">
							</image>
						</view>

						<view class="price-wrap-view middle-view" :class="vipType == 1?'price-wrap-view-sel':''"
							@click="switchVipType(1)">
							<view class="selected-bg" v-if="vipType == 1"></view>
							<view class="red-price-view">
								<text class="red-price">{{'￥' + middlePrice}}</text>

							</view>
							<view v-for="(str,index) in middleRecommendList" :key="index" class="recommend-wrap-view">
								<image src="https://img.jx885.com/lrjk_uniapp/img/live/ic_vip_rigth_gray.png"></image>
								<text :class="str.length> 5 ? 'small_text':'nors_text'">{{str}}</text>
							</view>
							<image v-if="vipType == 1"
								src="https://img.jx885.com/lrjk_uniapp/img/live/ic_vip_money_check.png"
								class="money_check">
							</image>
						</view>

						<view class="price-wrap-view right-view" :class="vipType == 2?'price-wrap-view-sel':''"
							@click="switchVipType(2)">
							<view class="selected-bg" v-if="vipType == 2"></view>
							<view class="red-price-view">
								<text class="red-price">{{'￥' + rightPrice}}</text>
							</view>
							<view v-for="(str,index) in rightRecommendList" :key="index" class="recommend-wrap-view">
								<image src="https://img.jx885.com/lrjk_uniapp/img/live/ic_vip_rigth_gray.png"></image>
								<text :class="str.length> 5 ? 'small_text':'nors_text'">{{str}}</text>
							</view>
							<image v-if="vipType == 2"
								src="https://img.jx885.com/lrjk_uniapp/img/live/ic_vip_money_check.png"
								class="money_check">
							</image>
						</view>
					</view>
					<view class="pay-view" v-if="false">
						<view class="wechat-pay-view">
							<image src="https://img.jx885.com/lrjk_uniapp/img/live/ic_vip_wx.png" class="wechat-logo">
							</image>
							<text>微信</text>
							<image src="https://img.jx885.com/lrjk_uniapp/img/live/ic_vip_check.png" class="vip_check">
							</image>
						</view>
					</view>
				</view>
				<view class="bottom-view" v-if="!isIosPlatform">
					<view class="favorable-price-view">
						<text class="favorable-tip">限时特惠：</text>
						<text
							class="favorable-pirce">{{vipType == 0?("￥" + leftPrice):(vipType == 1?("￥" + middlePrice):("￥" + rightPrice))}}</text>
						<text
							class="original-price">{{vipType == 0?("￥" + leftOriginalPrice):(vipType == 1?("￥" + middleOriginalPrice):("￥" + rightOriginalPrice))}}</text>
					</view>
					<view class="pay-btn" @click="payAction">
						<text>立即支付</text>
					</view>
				</view>

				<view class="ios-bottom-view" v-else>

					<view class="pay-btn">
						<text>由于相关规范，IOS功能暂不可用</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getVipsInfo,
		requestPay
	} from '../../common/request.js'
	export default {
		name: "open-vip-popup",
		props: {
			isshow: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				equity: '科一科四答题技巧+全部题目直播+不过退款',
				leftRecommendList: ['永久使用',
					'速记技巧',
					'全部课程',
					'速成题库',
					'考前密卷',
					'难题攻克',
					'速记卡片',
					'3小时精华课',
					'科二视频教学',
					'科三视频教学',
					'科一科四不过包退'
				],
				middleRecommendList: ['使用180天',
					'速记技巧',
					'全部课程',
					'速成题库',
					'考前密卷',
					'难题攻克',
					'3小时精华课',
					'科二视频教学',
					'科三视频教学'
				],
				rightRecommendList: ['使用30天',
					'速记技巧',
					'科一课程',
					'速成题库',
					'考前密卷',
					'难题攻克'
				],

				leftId: 0,
				middleId: 0,
				rightId: 0,
				leftPrice: 0,
				middlePrice: 0,
				rightPrice: 0,
				leftOriginalPrice: 0,
				middleOriginalPrice: 0,
				rightOriginalPrice: 0,
				vipType: 0, // 0:永久，1：180天，2:30天
				isIosPlatform: false,
			};
		},
		watch: {
			isshow(newValue, oldValue) {
				if (this.isshow) {
					this.isIosPlatform = uni.getSystemInfoSync().platform == 'ios'
					this.$refs.popup.open()
				}
			}
		},
		mounted() {
			this.getVipPrice()
		},
		methods: {
			async queryVips() {
				var isSuccess = await getVipsInfo(this)
				if (isSuccess) {
					this.closeAction(1)
				}
			},

			switchVipType(type) {
				this.vipType = type;
				if (type == 0) {
					this.equity = '科一科四答题技巧+全部题目直播+不过退款'
				} else if (type == 1) {
					this.equity = '使用180天'
				} else if (type == 2) {
					this.equity = '使用30天'
				}
			},

			closeAction(value) {
				if (value == 1) {
					this.$refs.popup.close()
				}
				this.$emit('closeAction')
			},
			paySuccessAction() {
				this.closeAction(1)
				this.$emit('paySuccessAction')
			},
			changeAction(e) {
				this.$emit('changeAction', e.show)
			},
			payAction() {
				if (uni.getSystemInfoSync().platform == 'ios') {
					uni.showToast({
						icon: "由于相关规范，IOS功能暂不可用",
						title: res.msg,
					});
					return
				}
				let id = this.vipType == 0 ? this.leftId : this.vipType == 2 ? this.rightId : this.middleId;
				requestPay(this, id, () => {
					this.paySuccessAction()
				})
			},
			getVipPrice() {
				var that = this
				let params = {}
				that.$u.api.queryVipList(params)
					.then(res => {
						if (res.code == 200) {
							var list = res.body
							for (var i = 0; i < list.length; i++) {
								var obj = list[i]
								if (obj.id == 1) {
									that.rightId = obj.id
									that.rightPrice = obj.money
									that.rightOriginalPrice = obj.originalMoney
								} else if (obj.id == 2) {
									that.leftId = obj.id
									that.leftPrice = obj.money
									that.leftOriginalPrice = obj.originalMoney
								} else if (obj.id == 29) {
									that.middleId = obj.id
									that.middlePrice = obj.money
									that.middleOriginalPrice = obj.originalMoney
								}
							}
						}
					})
			},
		}

	}
</script>

<style lang="scss">
	.wrap {
		background-color: white;
		width: 100%;

		.header {
			display: flex;
			position: relative;

			.title-bg-view {
				display: flex;
				margin: 20rpx auto;
				background: linear-gradient(to right, #237DED50, #FFF6E450);
				padding: 10rpx 30rpx 10rpx 20rpx;
				border-radius: 32rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin: auto 0;
				}

				.title {
					color: black;
					font-size: 32rpx;
					margin: auto 0 auto 20rpx;
				}
			}

			.close {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
			}
		}

		.line-view {
			background-color: #f4f7f9;
			height: 10rpx;
		}

		.content {
			.equity-view {
				margin: 20rpx 20rpx 0 20rpx;
				display: flex;

				image {
					width: 50rpx;
					height: 50rpx;
					margin: auto 0;
				}

				text {
					font-size: 30rpx;
					margin: auto 0 auto 20rpx;
				}
			}

			.price-view {
				margin-top: 50rpx;
				display: flex;

				.price-wrap-view {
					position: relative;
					border: 2rpx solid #ececec;
					width: 332rpx;
					height: 700rpx;
					border-radius: 10rpx;

					.selected-bg {
						position: absolute;
						left: 0;
						top: 0;
						height: 200rpx;
						width: 100%;
						background: linear-gradient(to top, #2893F300, #2893F340);
					}

					.red-price-view {
						display: flex;
						margin-top: 10rpx;
						margin-bottom: 30rpx;

						.red-price {
							color: red;
							font-size: 50rpx;
							margin-left: auto;
						}

						.recommend-view {
							background-color: #D32D1B;
							border-bottom-right-radius: 24rpx;
							border-top-left-radius: 24rpx;
							width: 96rpx;
							height: 48rpx;
							display: flex;
							margin: auto auto auto 20rpx;

							text {
								color: white;
								font-size: 30rpx;
								margin: auto;
							}
						}
					}

					.recommend-wrap-view {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-bottom: 16rpx;

						image {
							width: 24rpx;
							height: 24rpx;
							margin-right: 10rpx;
							// margin: auto 0 auto auto;
						}

						.nor_text {
							font-size: 26rpx;
							color: #4890e2;

						}

						.small_text {
							font-size: 22rpx;
							color: #4890e2;

						}

					}

					.money_check {
						width: 45rpx;
						height: 40rpx;
						position: absolute;
						right: 0;
						bottom: 0;
					}
				}

				.left-view {
					margin-left: 15rpx;
				}

				.middle-view {
					margin-left: 15rpx;

					.red-price {
						margin-right: auto;
					}

					.recommend-wrap-view {
						text {
							color: #868788;
						}

						.nor_text {
							font-size: 26rpx;
							color: #868788;

						}

						.small_text {
							font-size: 22rpx;
							color: #868788;

						}
					}
				}

				.right-view {
					margin-left: 15rpx;
					margin-right: 15rpx;

					.red-price {
						margin-right: auto;
					}

					.recommend-wrap-view {
						text {
							color: #868788;
						}

						.nor_text {
							font-size: 26rpx;
							color: #868788;

						}

						.small_text {
							font-size: 22rpx;
							color: #868788;

						}
					}
				}

				.price-wrap-view-sel {
					border-color: #4890e2;
				}
			}

			.pay-view {
				margin-top: 40rpx;

				.wechat-pay-view {
					display: flex;
					width: 50%;

					.wechat-logo {
						width: 38rpx;
						height: 38rpx;
						margin: auto 0 auto 30rpx;
					}

					text {
						font-size: 30rpx;
						color: #333333;
						margin: auto 0 auto 30rpx;
					}

					.vip_check {
						width: 40rpx;
						height: 40rpx;
						margin: auto 30rpx auto auto;
					}
				}
			}
		}

		.bottom-view {
			border-top: 2rpx solid #ececec;
			display: flex;
			padding: 10rpx 0;
			margin-top: 40rpx;

			.favorable-price-view {
				font-size: 30rpx;
				display: flex;

				.favorable-tip {
					color: #333333;
					margin: auto 0 auto 60rpx;
				}

				.favorable-pirce {
					color: red;
					margin: auto 0;
				}

				.original-price {
					color: #999999;
					margin: auto 0 auto 5rpx;
					text-decoration: line-through;
				}
			}

			.pay-btn {
				background-color: red;
				display: flex;
				padding: 20rpx 80rpx;
				border-radius: 16rpx;
				margin-left: auto;
				margin-right: 20rpx;

				text {
					margin: auto;
					color: white;
					font-size: 36rpx;
				}
			}
		}

		.ios-bottom-view {
			border-top: 2rpx solid #ececec;
			display: flex;
			padding: 10rpx 0;
			padding-bottom: 40rpx;
			margin-top: 40rpx;

			.pay-btn {
				background-color: red;
				display: flex;
				padding: 20rpx 80rpx;
				border-radius: 16rpx;
				margin-left: auto;
				margin-right: 20rpx;

				text {
					margin: auto;
					color: white;
					font-size: 36rpx;
				}
			}
		}
	}
</style>