<template>
	<view class="wrap">
		<image class="top_bg" src="https://img.jx885.com/lrjk_uniapp/img/card/bg_smart_card_top.png"></image>
		<view class="title_layout" :style="{ 'background-color': `rgba(0,0,0,${opacity})` ,
		 height: `${barHeight + statusBarHeight}px`, paddingTop:`${statusBarHeight}px` }">
			<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_back_gray.png" mode="widthFix" @click="toBack">
			</image>
			<text class="title-view">
				速记卡片
			</text>
		</view>

		<view class="content_wrap">
			<custom-swiper :swiper-list="list" :is-vip="isVip"></custom-swiper>
		</view>

		<view class="bottom_pay_wrap" :style="bottomStyle" v-if="!isVip">
			<view class="bottom_pay_btn_warp" @click="payAction">
				<view class="pay_money_wrap">
					<text class="pay_money_text">￥{{leftPrice}}</text>
					<!-- <text class="limit_text">{{limitTimeVip}}</text> -->
				</view>

				<text class="open_vip_text">开通永久会员解锁所有卡片</text>
			</view>
		</view>
		<view class="bottom-space" :style="bottomSpaceStyle"></view>
	</view>
</template>

<script>
	import {
		getForeverPrice,
		requestPay
	} from '../../../common/request';
	import {
		isVip
	} from '../../../common/util';
	import customSwiper from '@/components/blackmonth-swiper/index'
	export default {
		components: {
			customSwiper
		},
		data() {
			return {
				statusBarHeight: 0,
				barHeight: 0,
				bottomStyle: '',
				bottomSpaceStyle: '',
				payMoney: 98,
				list: [],
				leftId: 0,
				leftPrice: 0,
				leftOriginalPrice: 0,
				isVip: false,
				swiperList: [{
					type: 'image',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					type: 'image',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					type: 'image',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					type: 'image',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					type: 'image',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					type: 'image',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					type: 'image',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}, {
					type: 'image',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					type: 'image',
					imgUrl: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, ],
			}
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
			this.statusBarHeight = statusBarHeight
			this.barHeight = navHeight
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			this.bottomStyle = 'bottom:' + bottomSafeHeight + 'px;'
			this.bottomSpaceStyle = 'height:' + bottomSafeHeight + 'px;'

		},
		onLoad() {
			this.getSmartCardData();
			this.isVip = isVip(this, 1)
			if (!this.isVip) {
				this.getVipPrice()
			}
		},
		methods: {
			getSmartCardData() {
				let params = {
					pageNum: 1,
					pageSize: 200
				}
				this.$u.api.getSmartCard(params)
					.then(res => {
						if (res.code == 200) {
							this.list = res.body.records
							console.log("");
						}
					})
			},
			toBack() {
				uni.navigateBack();
			},
			payAction() {
				let id = this.leftId;
				requestPay(this, id, () => {
					toVipInfo(true)
				})
			},
			getVipPrice() {
				var that = this
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
		background-color: #FBD8A7;
	}

	.wrap {
		width: 100%;
		display: flex;
		flex-direction: column;

		.top_bg {
			width: 100%;
			height: 750rpx;

		}


		.title_layout {
			position: fixed;
			background-color: transparent;
			display: flex;
			flex-direction: row;
			// height: calc(var(--status-bar-height) + 40rpx);
			width: 100%;
			left: 0;
			top: 0;
			// padding-top: calc(var(--status-bar-height) + 40rpx);
			justify-content: center;
			align-items: center;
			z-index: 2;

			image {
				// margin-left: 25rpx;
				// padding: 5rpx;
				width: 25rpx;
				position: absolute;
				left: 25rpx;
			}

			text {
				text-align: center;
				font-size: 36rpx;
				width: 100%;
				color: #fff;
			}
		}

		.content_wrap {
			position: fixed;
			left: 0;
			top: 600rpx;
			width: 100%;
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


		.bottom-space {
			position: fixed;
			width: 100%;
			bottom: 0;
			background-color: white;
			z-index: 1;
		}
	}
</style>