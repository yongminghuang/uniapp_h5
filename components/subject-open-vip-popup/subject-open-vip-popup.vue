<template>
	<view>
		<uni-popup ref="popup" type="center" @maskClick="closeAction" @change="changeAction">
			<view class="wrap">
				<view class="top-view">
					<image src="https://img.jx885.com/lrjk_uniapp/img/video/ic_subject_vip_top.png" class="top-bg">
					</image>
					<view class="title">{{title}}</view>
					<view class="price-view">
						<text class="symbol">￥</text>
						<text class="price">{{price}}</text>
						<text class="unit">元</text>
						<text class="original-price-tip">{{originalPriceTip}}</text>
					</view>
					<view class="tip-view">{{desc}}</view>
				</view>
				<view class="bottom-view">
					<view class="pay-btn wechat-view-btn" @click="payAction">
						<image src="https://img.jx885.com/lrjk_uniapp/img/video/ic_subject_vip_wechat.png"
							class="pay-logo"></image>
						<text>微信支付</text>
						<image src="https://img.jx885.com/lrjk_uniapp/img/video/arrow_right_pressed.png" class="arrow">
						</image>
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
	import {
		isOriginPay
	} from '../../common/util.js';
	export default {
		name: "subject-open-vip-popup",
		props: {
			isshow: {
				type: Boolean,
				default: false
			},
			subject: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				price: '',
				originalPriceTip: '',
				title: '',
				desc: '',
				id: 0,
			};
		},
		watch: {
			isshow(newValue, oldValue) {
				if (this.isshow) {
					this.$refs.popup.open()
				}
			},
			subject(newValue, oldValue) {
				this.title = this.subject == 2 ? '购买科二视频教程' : '购买科三视频教程';
				this.getVipPrice()
			}
		},
		methods: {
			closeAction(value) {
				if (value == 1) {
					this.$refs.popup.close()
				}
				this.$emit('closeAction', value)
			},
			changeAction(e) {
				this.$emit('changeAction', e.show)
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
								if (obj.id == 3 && this.subject == 2) {
									this.price = obj.money
									this.originalPriceTip = '原价' + obj.originalMoney + '元'
									this.desc = obj.desc
									this.id = obj.id
								} else if (obj.id == 4 && this.subject == 3) {
									this.price = obj.money
									this.originalPriceTip = '原价' + obj.originalMoney + '元'
									this.desc = obj.desc
									this.id = obj.id
								}
							}
						}
					})
			},
			payAction() {
				var that = this
				requestPay(this, that.id, () => {
					that.queryVips();
				})
			},
			async queryVips() {
				var isSuccess = await getVipsInfo(this)
				if (isSuccess) {
					this.closeAction(1)
				}
			},

		}
	}
</script>

<style lang="scss">
	.wrap {
		width: 540rpx;

		.top-view {
			width: 100%;
			background-color: white;
			position: relative;

			.top-bg {
				width: 100%;
				height: 228rpx;
			}

			.title {
				position: absolute;
				left: 36rpx;
				top: 80rpx;
				color: #e0bf6a;
				font-size: 42rpx;
				font-weight: bold;
			}

			.price-view {
				display: flex;
				margin-top: 60rpx;

				text {
					color: #666666;
					font-size: 28rpx;
				}

				.symbol {
					margin: auto 0 10rpx 30rpx;
				}

				.price {
					color: #D32D1B;
					font-size: 60rpx;
					font-weight: bold;
					margin: auto 0 0 0;
				}

				.unit {
					margin: auto 0 10rpx 20rpx;
				}

				.original-price-tip {
					margin: auto 0 10rpx 20rpx;
					text-decoration: line-through;
					font-style: italic;
				}
			}

			.tip-view {
				font-size: 28rpx;
				color: #333333;
				padding: 10rpx 0 60rpx 30rpx;
			}
		}

		.bottom-view {
			padding: 30rpx;

			.wechat-view-btn {
				background-color: #00bc2a;
			}

			.pay-btn {
				display: flex;
				padding: 10rpx 0;
				border-radius: 10rpx;

				.pay-logo {
					width: 68rpx;
					height: 68rpx;
					margin: auto 0 auto 30rpx;
				}

				text {
					font-size: 30rpx;
					margin: auto 0 auto 20rpx;
					color: white;
				}

				.arrow {
					width: 35rpx;
					height: 35rpx;
					margin: auto 25rpx auto auto;
				}
			}

		}
	}
</style>