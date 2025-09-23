<template>
	<view class="warp">

		<image class="bg_top_image" src="https://img.jx885.com/lrjk_uniapp/img/vip/bg_open_vip_top2.png"></image>

		<view class="title_layout" :style="{ 'background-color': `rgba(0,0,0,${opacity})` ,
		 height: `${barHeight + statusBarHeight}px`, paddingTop:`${statusBarHeight}px` }">
			<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_back_gray.png" mode="widthFix" @click="toBack">
			</image>
			<text class="title-view">
				会员详情
			</text>
		</view>

		<view class="content">

			<view class="user_wrap">
				<image class="user_bg" src="https://img.jx885.com/lrjk_uniapp/img/vip/bg_vip_detail_user_info.png">
				</image>
				<image src="https://img.jx885.com/lrjk_uniapp/img/mine/ic_default_avatar.png" class="user_head"></image>
				<text class="user_type_text">{{vipName}}</text>
				<text class="username_text">{{nickname}}</text>
				<text class="phone_text">{{phone}}</text>
			</view>

			<view class="point_text">
				<image class="point" src="https://img.jx885.com/lrjk_uniapp/img/vip/ic_point.png"></image>
				<text>我的权益</text>
				<image class="point" src="https://img.jx885.com/lrjk_uniapp/img/vip/ic_point.png"></image>
			</view>

			<view class="profile_list" :style="isForeverVip ? 'margin-bottom: 120rpx;':'margin-bottom: 320rpx;'">
				<view class="profile_item" v-for="item in vip_profile_list" :key="item" @click="onItemClick(item)">
					<image class="profile_image"
						src="https://img.jx885.com/lrjk_uniapp/img/vip/bg_vip_info_profile.png"></image>
					<text class="profile_content">{{item.title}}</text>

					<view class="profile_unlocked" v-if="item.isUnlocked">
						<image src="https://img.jx885.com/lrjk_uniapp/img/vip/ic_vip_profile_unlocked.png"></image>
						<text>已解锁</text>
					</view>
					<view class="profile_locked" v-else>
						<image src="https://img.jx885.com/lrjk_uniapp/img/vip/ic_vip_profile_locked.png"></image>
						<text>点击升级</text>
					</view>
				</view>


			</view>

		</view>

		<view class="bottom_pay_wrap" :style="bottomStyle" v-if="!isForeverVip">
			<view class="div"></view>

			<view class="bottom_pay_btn_warp" @click="payAction">
				<view class="pay_money_wrap">
					<text class="pay_money_text">{{money}}</text>
					<text class="limit_text">{{limitTimeVip}}</text>
				</view>

				<text class="open_vip_text">{{openVipTip}}</text>
			</view>

			<view class="pay_option_and_button" v-if="false">
				<view class="pay_option">
					<image class="weixin_icon" :src="$util.ossImagePath('/vip/ic_weixin.png')"></image>
					<label class="weixin_pay_text">微信支付</label>
					<image class="weixin_checked" :src="$util.ossImagePath('/vip/ic_pay_option_check.png')"></image>
				</view>

			</view>

		</view>
		<view class="bottom-space" :style="bottomSpaceStyle"></view>
	</view>

</template>

<script>
	import {
		isIP
	} from 'net'
	import {
		toVIPUrl
	} from '../../common/page-route.js'
	import {
		getVipsInfo,
		requestPay
	} from '../../common/request.js'
	import {
		isVip,
		vipName
	} from '../../common/util.js'
	export default {
		data() {
			return {
				statusBarHeight: 0,
				barHeight: 0,
				vipName: "",
				nickname: '',
				phone: '',
				priceBgUrl: 'https://img.jx885.com/lrjk_uniapp/img/vip/price_bg.png',
				open_vip_list: [

				],
				vip_profile_list: [],

				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				scrollTop: 0,
				opacity: 0,
				phoneStr: '',
				bottomStyle: '',
				bottomSpaceStyle: '',
				selectedVipType: 2,
				money: '￥--',
				moneyId: 0,
				openVipTip: '',
				limitTimeVip: '升级永久会员',
				isForeverVip: false,
				isIosPlatform: false,
			}
		},
		onPageScroll(e) {
			if (e.scrollTop <= 30) {
				this.opacity = 0
			} else if (e.scrollTop > 30) {
				this.opacity = 1
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
			const userObj = uni.getStorageSync('user');
			this.isIosPlatform = uni.getSystemInfoSync().platform == 'ios'

			this.getVipProfileInfo();
			this.isForeverVip = isVip(this, 1)
			if (!this.isForeverVip) {
				this.getVipPrice();
			}

			if (userObj) {
				this.phoneStr = userObj.phone;
				this.nickname = userObj.nickName
			}

			if (isVip(this, 1)) {
				this.vipName = "永久VIP"
			} else if (isVip(this)) {
				this.vipName = vipName(this) + '会员'
			}

		},
		methods: {
			onItemClick(item) {
				switch (item.title) {
					case "永久使用":
					case "使用180天":
					case "使用30天":
						uni.showToast({
							title: '您已解锁',
							icon: 'none'
						})
						break;
					case "速记技巧":
					case "全部课程":
					case "速成题库":
					case "难题攻克":
					case "3小时精华课":
					case "科二视频教学":
					case "科三视频教学":
					case "速记卡片":
						if (!item.isUnlocked) {
							this.payAction()
							return
						}
						uni.navigateBack({
							delta: 10,
							// url: '/pages/index/index?title=' + item.title,
							success(e) {

								uni.$emit('launch', item.title)
								console.log("success:" + e)
							},
							fail(e) {
								console.log("fail:" + JSON.stringify(e))
							}
						})
						break;
					case "科一科四不过退款":
						if (!item.isUnlocked) {
							this.payAction()
							return
						}
						break;

				}
			},
			getVipPrice() {
				if (this.isIosPlatform) {
					this.limitTimeVip = "由于相关规范，IOS功能暂不可用"
					this.money = ''
					return
				}

				var that = this
				var userinfo = uni.getStorageSync('user')
				let params = {
					userId: userinfo.id
				}
				that.$u.api.renewMoney(params)
					.then(res => {
						if (res.code == 200) {
							var obj = res.body
							that.money = '￥' + obj.money
							that.moneyId = obj.id
						}
					})
			},
			getVipProfileInfo() {
				this.vip_profile_list = []
				if (isVip(this, 30)) {
					this.vip_profile_list.push({
						title: "速记卡片",
						isUnlocked: false
					})
					this.vip_profile_list.push({
						title: "科一科四不过退款",
						isUnlocked: false
					})
					this.vip_profile_list.push({
						title: "使用30天",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "速记技巧",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "科一课程",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "速成题库",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "考前密卷",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "难题攻克",
						isUnlocked: true
					})
				} else if (isVip(this, 180)) {
					this.vip_profile_list.push({
						title: "速记卡片",
						isUnlocked: false
					})
					this.vip_profile_list.push({
						title: "科一科四不过退款",
						isUnlocked: false
					})
					this.vip_profile_list.push({
						title: "使用180天",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "速记技巧",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "全部课程",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "速成题库",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "考前密卷",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "难题攻克",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "3小时精华课",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "科二视频教学",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "科三视频教学",
						isUnlocked: true
					})
				} else if (isVip(this, 1)) {
					this.vip_profile_list.push({
						title: "永久使用",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "速记技巧",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "全部课程",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "速成题库",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "考前密卷",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "难题攻克",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "3小时精华课",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "科二视频教学",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "科三视频教学",
						isUnlocked: true
					})
					this.vip_profile_list.push({
						title: "科一科四不过退款",
						isUnlocked: true
					})
				}

			},

			getRandom(min, max) {
				const floatRandom = Math.random()

				const difference = max - min

				// 介于 0 和差值之间的随机数
				const random = Math.round(difference * floatRandom)

				const randomWithinRange = random + min

				return randomWithinRange
			},
			toBack() {
				uni.navigateBack();
			},
			toVipWeb() {
				toVIPUrl()
			},

			payAction() {
				if (this.isIosPlatform) {
					return
				}
				requestPay(this, this.moneyId, () => {
					this.isForeverVip = true
					this.vipName = "永久VIP"
					this.getVipProfileInfo();
				})

			},
			async queryVips() {
				var isSuccess = await getVipsInfo(this)
				if (isSuccess) {
					this.toBack()
				}
			},
		},
		mounted() {
			this.open_vip_list = [];
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #000;
	}

	.bg_top_image {
		width: 100%;
		height: 700rpx;
	}

	.warp {
		position: relative;
		min-height: 100%;
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

	.content {
		position: absolute;
		display: flex;
		flex-direction: column;
		left: 0;
		top: 200rpx;
		width: 100%;

		.user_wrap {
			position: relative;
			width: 694rpx;
			height: 200rpx;
			margin-left: 28rpx;

			.user_bg {

				width: 100%;
				height: 200rpx;
			}

			.user_head {
				position: absolute;
				width: 100rpx;
				height: 100rpx;
				top: 76rpx;
				left: 43rpx;
				z-index: 1;
			}

			.user_type_text {
				position: absolute;
				color: #833310;
				font-size: 28rpx;
				font-weight: bold;
				top: 15rpx;
				right: 80rpx;
			}

			.username_text {
				position: absolute;
				font-weight: 500;
				font-size: 36rpx;
				color: #8D5C3B;
				left: 166rpx;
				top: 88rpx;
			}


			.phone_text {
				position: absolute;
				font-weight: 500;
				font-size: 36rpx;
				color: #8D5C3B;
				left: 166rpx;
				top: 130rpx;
			}
		}

		.point_text {
			justify-self: center;
			align-self: center;
			z-index: 1;
			margin-top: 93rpx;

			.point {
				width: 16rpx;
				height: 16rpx;
				margin-bottom: 10rpx;
				vertical-align: middle;
			}

			text {
				font-weight: 600;
				font-size: 54rpx;
				color: #F4DAB2;
				margin-left: 15rpx;
				margin-right: 15rpx;
			}
		}

		.profile_list {
			margin-left: 28rpx;
			margin-top: 51rpx;
			margin-bottom: 320rpx;

			.profile_item {
				position: relative;
				width: 694rpx;
				height: 154rpx;
				background: #FFFFFF;
				border-radius: 14rpx;
				margin-top: 28rpx;

				.profile_image {
					position: absolute;
					width: 100%;
					height: 100%;
				}

				.profile_content {
					position: absolute;
					font-weight: 600;
					font-size: 30rpx;
					color: #633C15;
					z-index: 1;
					left: 40rpx;
					top: 63rpx
				}

				.profile_unlocked {
					position: absolute;
					font-weight: 600;
					font-size: 30rpx;
					color: #633C15;
					z-index: 1;
					right: 33rpx;
					top: 45rpx;
					width: 180rpx;
					height: 64rpx;
					background: #E3D0B1;
					border-radius: 32rpx;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					image {
						width: 20.9rpx;
						height: 14.6rpx;
						margin-right: 6rpx;
					}
				}

				.profile_locked {
					position: absolute;
					font-weight: 600;
					font-size: 30rpx;
					color: #FFFFFF;
					z-index: 1;
					right: 33rpx;
					top: 45rpx;
					width: 222rpx;
					height: 64rpx;
					background: #ED3C00;
					border-radius: 32rpx;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					image {
						width: 22rpx;
						height: 26rpx;
						margin-right: 7rpx;
					}
				}
			}
		}

	}

	.bottom_empty_layout {
		width: 100%;
		height: 460rpx;
	}

	.bottom_pay_wrap {
		z-index: 1;
		background: #ffffff;

		background-size: 100% 100%;
		// height: 326rpx;
		height: auto !important;
		height: 130rpx;
		min-height: 130rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		display: flex;
		flex-direction: column;

		.div {
			width: 100%;
			height: 1rpx;
			background-color: #F8A43F;
		}

		.bottom_couple_layout {
			height: 60rpx;
			width: 100%;
			display: flex;
			flex-direction: row;
			margin-top: 6rpx;

			.bottom_couple_wrap {
				align-self: flex-end;
				margin: 0 auto;
				width: fit-content;
				height: 50rpx;
				padding-left: 26rpx;
				padding-top: 10rpx;
				padding-right: 26rpx;
				background: #FFD8B2;
				border-radius: 25rpx;

				margin-right: 22rpx;
				display: flex;
				flex-direction: row;

				.couple_tip {
					font-weight: 500;
					font-size: 24rpx;
					color: #ED3C00;
				}

				.ic_timer {

					margin-right: 10rpx;
					width: 22rpx;
					height: 28rpx;
				}

				.time_tip {
					background: #FFFFFF;
					border-radius: 4rpx;
					padding-left: 2rpx;
					padding-right: 2prx;
					height: 29rpx;
					font-size: 18rpx;
					margin-left: 5prx;
				}

				.time2_tip {
					background: #FFFFFF;
					border-radius: 4rpx;
					padding-left: 2rpx;
					height: 29rpx;
					padding-right: 2prx;
					font-size: 18rpx;
					margin-left: 10prx;
				}

				.time2_div {
					font-weight: 400;
					font-size: 18rpx;
					color: #6C615D;
				}
			}
		}

		.bottom_price_wrap {
			width: 100%;
			display: flex;
			margin-top: 20rpx;
			flex-direction: row;
			justify-content: space-evenly;

			.bottom_price_box {
				position: relative;
				display: flex;
				flex-direction: column;
				width: 222rpx;
				height: 110rpx;
				background: #FFFFFF;
				border-radius: 14rpx;
				border: 1px solid #9C9C9C;

				.vip_type_text {
					margin-top: 14rpx;
					font-weight: 500;
					font-size: 27rpx;
					align-self: center;
					color: #765029;
				}

				.vip_money_text {
					font-weight: 600;
					font-size: 40rpx;
					color: #DB7E51;
					align-self: center;
				}

				.vip_lock_bg {
					position: absolute;
					bottom: 0rpx;
					right: 0rpx;
					width: 35rpx;
					height: 35rpx;
					background: #ED6A00;
					border-radius: 14rpx 0rpx 14rpx 0rpx;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					image {
						width: 19rpx;
						height: 15rpx;
					}
				}
			}

			.bottom_price_selected_box {
				position: relative;
				display: flex;
				flex-direction: column;
				width: 222rpx;
				height: 110rpx;
				background: #FFEAD6;
				border-radius: 14rpx;
				border: 1px solid #ED6A00;

				.vip_type_text {
					margin-top: 14rpx;
					font-weight: 500;
					font-size: 27rpx;
					align-self: center;
					color: #765029;
				}

				.vip_money_text {
					font-weight: 600;
					font-size: 40rpx;
					color: #ED3C00;
					align-self: center;
				}

				.vip_lock_bg {
					position: absolute;
					bottom: 0rpx;
					right: 0rpx;
					width: 35rpx;
					height: 35rpx;
					background: #ED6A00;
					border-radius: 14rpx 0rpx 14rpx 0rpx;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					image {
						width: 19rpx;
						height: 15rpx;
					}
				}
			}
		}

		.bottom_pay_btn_warp {
			margin-top: 20rpx;
			width: 684rpx;
			height: 94rpx;
			align-self: center;
			background-color: #ED3C00;
			border-radius: 60rpx;
			display: flex;
			padding-left: 100rpx;
			padding-right: 100rpx;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.pay_money_wrap {
				display: flex;
				flex-direction: row;
				align-items: end;

				.pay_money_text {
					justify-self: center;
					font-weight: 800;
					font-size: 40rpx;
					color: #FFFFFF;
				}

				.limit_text {
					justify-self: center;
					font-weight: bold;
					font-size: 30rpx;
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
				font-weight: bold;
				font-size: 32rpx;
				color: #FFFFFF;
			}


		}

		.pay_option_and_button {

			width: 100%;
			height: 60rpx;
			display: flex;
			margin-top: 13rpx;
			flex-direction: row;

			.pay_option {
				display: flex;
				flex-direction: row;
				height: 50rpx;
				// justify-content: center;
				align-items: center;

				.weixin_icon {
					margin-left: 100rpx;
					width: 37rpx;
					height: 33rpx;
				}

				.weixin_pay_text {

					font-weight: 400;
					font-size: 28rpx;
					color: #32302F;
					line-height: 90rpx;
					margin-left: 15rpx;
				}

				.weixin_checked {
					width: 40rpx;
					height: 40rpx;
					margin-left: 15rpx;
				}
			}


		}



	}

	.bottom-space {
		position: fixed;
		width: 100%;
		bottom: 0;
		background-color: white;
	}
</style>