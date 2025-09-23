<template>
	<page-meta :page-style="'overflow:'+(isShowPageMeta?'hidden':'visible')"></page-meta>
	<view class="wrap">
		<login-popup :isshow="isShowLoginPopup" @closeAction="isShowLoginPopup = false;">
		</login-popup>
		<car-type-popup :isshow="isShowCarTypePopup" @closeAction="isShowCarTypePopup = false;"
			@carTypeAction="carTypeAction" @changeAction="carTypePopupChangeAction">
		</car-type-popup>

		<uni-nav-bar height="88rpx" :border="false" background-color="transparent" fixed statusBar>
			<template v-slot:left>
				<!-- 	<view class="kf-view">
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_kf_white.png"></image>
					<text>客服</text>
				</view> -->
			</template>
			<template>
				<view class="title-view">
					<text class="title">我的</text>
				</view>
			</template>
		</uni-nav-bar>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<image :src="$util.ossImagePath('/mine/bg_mine_top.png')" class="bg_top_image"></image>


		<view class="content_top">
			<view class="userinfo_info_layout" v-if="isLogin" @click="infoAction">
				<!--:src="userinfo.avatarUrl ? userinfo.avatarUrl : 'https://img.jx885.com/lrjk_uniapp/img/mine/ic_default_avatar.png'" -->
				<image
					:src="$util.nullStr(userinfo.headImgUrl,'https://img.jx885.com/lrjk_uniapp/img/mine/ic_default_avatar.png')"
					mode=""></image>
				<view class="userAndPhone">
					<view class="username">
						{{ userinfo.nickName }}
					</view>
					<view class="phone">
						{{ userinfo.phone ? userinfo.phone : '' }}
					</view>
				</view>
			</view>
			<view v-else class="noLogin">
				<image src="https://img.jx885.com/lrjk_uniapp/img/mine/ic_default_avatar.png"></image>
				<view class="username" @click="this.isShowLoginPopup = true;">一键登录</view>
			</view>
			<!--  -->
			<view class="vip_layout" v-if="vipBtnStyle != 1" @click="vipAction">

				<label class="not_vip_hint">科一科四不过全额退款</label>
				<view class="vip_forver" v-if="vipBtnStyle == 2">
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_vip.png" mode="widthFix"></image>
					<label>永久会员</label>
				</view>
				<label class="buyButton" v-if="!isIosPlatform && vipBtnStyle == 0">点击购买</label>
			</view>

			<view v-else class="vip_temp_layout" @click="vipAction">
				<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_vip.png" mode="widthFix"></image>
				<view class="vip_temp">
					<label>{{vipType}}</label>
					<view class="vip_temp_out_date">{{'到期时间：' + onDate}}</view>
				</view>
				<label class="buyButton">会员升级</label>
			</view>

		</view>

		<view class="content_bottom">
			<view class="my_order">

				<view class="my_order_item">
					<view class="my_order_content" @click="toMyWrongTopic">
						<view class="first_line">我的错题</view>
						<view class="second_line">{{'共' + errorNum + '题'}}</view>
					</view>
					<view class="my_order_content" @click="toCollect">
						<view class="first_line">我的收藏</view>
						<view class="second_line">{{'共' + collectNum + '题'}}</view>
					</view>
					<view class="my_order_content" @click="toMockTestResult">
						<view class="first_line">模考成绩</view>
						<view class="second_line">{{'模考次数' + examNum}}</view>
					</view>
				</view>
			</view>
			<!--  -->
			<view class="div"></view>
			<view class="other">
				<view class="other_coloumn">
					<view class="other_row_left" @click="this.isShowCarTypePopup = true;">
						<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_mine_change.png" mode="widthFix">
						</image>
						<label>切换题库</label>
					</view>
					<view class="other_row_right" @click="this.isShowCarTypePopup = true;">
						<label>{{selectedCarType}}</label>
						<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_mine_enter_right.png"
							mode="widthFix"></image>
					</view>
				</view>

				<view class="other_coloumn" @click="addTearcher">
					<view class="other_row_left">
						<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_mine_wchart.png" mode="widthFix">
						</image>
						<label>客服中心</label>
					</view>
					<view class="other_row_right">
						<label></label>
						<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_mine_enter_right.png"
							mode="widthFix"></image>
					</view>
				</view>

				<!-- 	<view class="other_coloumn" @click="toRefund">
					<view class="other_row_left">
						<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_mine_order.png" mode="widthFix"></image>
						<label>我要退款</label>
					</view>
					<view class="other_row_right">
						<label></label>
						<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_mine_enter_right.png" mode="widthFix"></image>
					</view>
				</view> -->

				<view class="other_coloumn" @click="toSetting">
					<view class="other_row_left">
						<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_mine_setting.png" mode="widthFix">
						</image>
						<label>我的设置</label>
					</view>
					<view class="other_row_right">
						<label></label>
						<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_mine_enter_right.png"
							mode="widthFix"></image>
					</view>
				</view>

				<view class="other_coloumn" @click="showExitPop">
					<view class="other_row_left">
						<image src="https://img.jx885.com/lrjk_uniapp/img/mine/ic_mine_exit.png" mode="widthFix">
						</image>
						<label>退出登录</label>
					</view>
					<view class="other_row_right">
						<label></label>
						<!-- <image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_mine_enter_right.png" mode="widthFix"></image> -->
					</view>
				</view>
			</view>
		</view>
		<exit-popup :isshow="isShowExitPoppup" @closeAction="isShowExitPoppup = false;" @toLoginOut="toLoginOut">
		</exit-popup>

	</view>


</template>

<script>
	import {
		toMyWrongPage,
		toColloctPage,
		toMkRecordPage,
		toOpenVip,
		toVipInfo,
		toProblemPage
	} from '../../common/page-route'
	import {
		getVipsInfo
	} from '../../common/request.js'
	import {
		carType,
		isVip,
		onVipDate,
		vipName
	} from '../../common/util'
	import {
		subject
	} from '../../page_learn/common/util'
	import toast from '../../uview-ui/libs/function/toast'
	export default {
		data() {
			return {
				isShowExitPoppup: false,
				list: [{
						id: 1,
						url: 'https://img.jx885.com/lrjk_uniapp/img/my/order.png',
						name: '我的错题',
						content: '共0题',
					},
					{
						id: 2,
						url: 'https://img.jx885.com/lrjk_uniapp/img/my/pay.png',
						name: '我的收藏',
						content: '共0题',
					},
					{
						id: 3,
						url: 'https://img.jx885.com/lrjk_uniapp/img/my/getShop.png',
						name: '模拟成绩',
						content: '模考次数0',
					},
				],
				url: '',
				userinfo: [],
				collectNum: 0,
				isShowCarTypePopup: false,
				isShowLoginPopup: false,
				isShowPageMeta: false,
				selectedCarType: '',
				vipBtnStyle: null, // 0 开通vip  1 30天会员  2 永久会员
				onDate: '',
				isLogin: false,
				errorNum: 0,
				collectNum: 0,
				examNum: 0,
				vipType: '',
				isIosPlatform: false,
			}
		},

		onShow() {
			this.getUserInfo()
			this.url = uni.getStorageSync('url')
			let collect = uni.getStorageSync('collect')
			this.collectNum = collect.length
			this.initCarTypeData()
			this.queryVips()
		},
		created() {
			this.isIosPlatform = uni.getSystemInfoSync().platform == 'ios'
			uni.$on('user', this.getUserInfo);
		},
		destroyed() {
			uni.$off('user');
		},

		methods: {
			vipAction() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				if (isVip(this)) {
					toVipInfo()
				} else {
					if (!this.isIosPlatform) {
						toOpenVip()
					}
				}
			},
			// 查询Vip状态
			async queryVips() {
				let token = uni.getStorageSync('accessToken')
				if (token) {
					var isSuccess = await getVipsInfo(this)
					this.onDate = ""
					if (isSuccess) {
						if (isVip(this, 1)) {
							this.vipBtnStyle = 2
						} else if (isVip(this, 180) || isVip(this, 30)) {
							this.vipBtnStyle = 1
							this.onDate = onVipDate(this).substring(0, 11)
						} else {
							this.vipBtnStyle = 0
						}
						this.vipType = vipName(this)
					} else {
						this.vipBtnStyle = 0
					}
				}

			},
			showExitPop() {
				let token = uni.getStorageSync('accessToken', '');
				if (token) {
					this.isShowExitPoppup = true;
				} else {
					uni.showToast({
						title: '请先登录'
					})
				}

			},
			// 我的资料
			infoAction() {
				uni.navigateTo({
					url: '/pages/mine/mine-info',
				})
			},
			// 下拉刷新回调
			onPullDownRefresh() {

			},

			getUserInfo() {
				this.userinfo = uni.getStorageSync('user');
				if (this.$util.isNullVal(this.userinfo)) {
					this.isLogin = false
				} else {
					this.isLogin = true //this.userinfo.isTemp == 0
				}
				if (this.isLogin) {
					this.getErrorCollectCount(0)
					this.getErrorCollectCount(1)
					this.getExamCount()
				}
			},


			getErrorCollectCount(value) {
				var that = this
				const subject = uni.getStorageSync('subject');
				const carTypeObj = uni.getStorageSync('carTypeObj');
				let params = {
					carType: carTypeObj.carType,
					subject: subject,
					type: value
				}
				that.$u.api.getErrorCollectCount(params).then(res => {
					if (res.code == 200) {
						var body = res.body
						if (value == 0) {
							that.errorNum = body
						} else {
							that.collectNum = body
						}
					}
				})
			},

			getExamCount() {
				var that = this
				const subject = uni.getStorageSync('subject');
				let params = {
					subject: subject,
				}
				that.$u.api.queryMkRecord(params).then(res => {
					if (res.code == 200) {
						var examList = res.body
						that.examNum = examList.length
					}
				})
			},

			changImg() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths))
						uni.setStorageSync('url', res.tempFilePaths[0])
					},
				})
				this.onShow()
			},

			login() {
				console.log("====");
			},

			// 添加地址
			addAdress() {
				uni.chooseAddress({
					success(res) {
						console.log(res)
						uni.setStorageSync('address', res)
					},
				})
			},
			myCollect() {
				uni.navigateTo({
					url: '/pages/myCollect/myCollect',
				})
			},

			switchTopic() {

			},
			addTearcher() {
				toProblemPage()
			},
			toRefund() {
				var that = this
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				if (isVip(this, 1)) {
					let params = {
						pageSize: 10,
						pageNo: 1,
						userId: this.userinfo.id,
						status: 1
					}
					that.$u.api.queryRefundList(params)
						.then(res => {
							if (res.code == 200) {
								var list = res.result.records
								if (that.$util.isNullVal(list)) {
									uni.navigateTo({
										url: '/pages/mine/refund-page'
									})
								} else {
									uni.navigateTo({
										url: '/pages/refund/refund-apply-record-list'
									})
								}
							}
						})
				} else {
					uni.navigateTo({
						url: '/pages/mine/refund-no-vip-page',
					});
				}
			},
			toSetting() {
				uni.navigateTo({
					url: '/pages/mine/my-setting',
					success: function(res) {

					}
				});
			},
			toLoginOut() {

				uni.setStorageSync('accessToken', '');
				uni.setStorageSync('user', '');
				uni.$emit('user')
				uni.showToast({
					title: '已退出',
					icon: 'none'
				});
				this.vipBtnStyle = 0
				this.$u.vuex('vuex_vip_30', false)
				this.$u.vuex('vuex_vip_180', false)
				this.$u.vuex('vuex_vip_forever', false)
				this.$u.vuex('vuex_vip_name', null)
				this.$u.vuex('vuex_vip_k2', false)
				this.$u.vuex('vuex_vip_k3', false)
				this.$u.vuex('vuex_vip_outdata', '')

			},
			toMyWrongTopic() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				this.getErrorOrCollectCount(0)
			},
			toCollect() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				this.getErrorOrCollectCount(1)
			},
			getErrorOrCollectCount(type) {
				let params = {
					carType: carType(this),
					subject: subject(this),
					type: type
				}
				let that = this;
				this.$u.api.getErrorCollectCount(params)
					.then(res => {
						if (res.code == 200) {
							if (type == 0) {
								let errorCount = res.body;
								if (errorCount == 0) {
									uni.showToast({
										title: "还没错题哟"
									})
								} else {
									toMyWrongPage();
								}
							} else if (type == 1) {
								let collectCount = res.body;
								if (collectCount == 0) {
									uni.showToast({
										title: "还没收藏哟"
									})
								} else {
									toColloctPage()
								}
							}
						}
					})
			},
			toMockTestResult() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				toMkRecordPage();
			},
			toBuy() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				toOpenVip()

			},
			// 车型弹窗组件状态变化
			carTypePopupChangeAction(value) {
				this.isShowPageMeta = value;
			},
			// 车型
			carTypeAction() {
				const obj = uni.getStorageSync('carTypeObj');
				this.selectedCarType = obj.title;
				this.getErrorCollectCount(0)
				this.getErrorCollectCount(1)
			},
			// 初始化车型
			initCarTypeData() {
				const obj = uni.getStorageSync('carTypeObj');
				if (obj) {
					this.selectedCarType = obj.title;
				} else {
					this.selectedCarType = "小车";
					var item = {
						imgUrl: 'https://img.jx885.com/lrjk_uniapp/img/home/ic_cartype_car_sel.png',
						title: '小车',
						subTitle: 'C1/C2/C3',
						carType: 1,
					};
					uni.setStorageSync('carTypeObj', item);
				}
			},
		},

	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.exit_dialog_wrap {
		width: 600rpx;
		height: 350rpx;
		padding: 40rpx 0rpx;
		background: #f3f7f9ff;
		border-radius: 20rpx;
	}

	.kf-view {
		display: flex;

		image {
			width: 36rpx;
			height: 36rpx;
		}

		text {
			font-size: 26rpx;
			margin-left: 10rpx;
			color: #9FCAFF;
		}
	}

	.title-view {
		display: flex;
		margin: auto;

		.title {
			text-align: center;
			font-size: 36rpx;
			width: 100%;
			color: #fff;
		}
	}

	.status_bar {
		height: 350rpx; //var(--status-bar-height);
		width: 100%;
		background: #5DA5FF;
		position: absolute;
		top: 0;
	}

	.bg_top_image {
		width: 100%;
		height: 350rpx;
		position: absolute;
		top: var(--status-bar-height);

	}

	.div {
		width: 100%;
		height: 10rpx;
		background: #eee;
	}


	.content_top {
		z-index: 1;

		.noLogin {
			position: absolute;
			display: flex;
			flex-direction: row;
			// border-radius: 20rpx;
			width: 100%;
			height: 200rpx;

			image {
				margin-left: 27rpx;
				width: 85rpx;
				height: 85rpx;
			}

			.username {
				margin-left: 25rpx;
				color: #fff;
				font-size: 20px;
				font-weight: bold;
			}
		}

		.userinfo_info_layout {
			position: absolute;
			display: flex;
			flex-direction: row;
			align-items: left;
			left: 40rpx;

			border-radius: 20rpx;
			width: 90%;
			height: 250rpx;
			// background-color: #fff;

			image {
				margin-top: 0rpx;
				width: 85rpx;
				height: 85rpx;
				border-radius: 50%;
			}

			.userAndPhone {
				display: flex;
				flex-direction: column;
				margin-left: 15rpx;

				.username {
					margin-left: 15rpx;
					color: #fff;
					width: 500rpx;
					font-size: 16px;
					font-weight: bold;

				}

				.phone {
					margin-left: 15rpx;
					color: #fff;
					font-size: 14px;
				}
			}

			.select {
				display: flex;
				justify-content: space-between;

				view {
					padding: 0 40rpx;
				}
			}
		}

		.vip_layout {
			position: absolute;
			background: url('https://img.jx885.com/lrjk_uniapp/img/mine/bg_mine_vip.png');
			background-size: 100% 100%;

			width: 90%;
			margin-left: 5%;
			margin-top: 105rpx;
			height: 110rpx;
			border-radius: 20rpx;
			display: flex;
			flex-direction: row;
			-webkit-justify-content: space-between;
			justify-content: space-between;
			z-index: 1;

			.not_vip_hint {
				color: #ffdb95;
				margin-left: 10rpx;
				margin-top: 32rpx;
				font-size: 15px;
				margin-left: 50rpx;
				font-weight: bo;
			}

			.buyButton {
				width: 200rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 24rpx;
				margin-right: 40rpx;
				font-size: 14px;
				border-radius: 125rpx;
				font-weight: bold;
				background: linear-gradient(to right, #ffe3ac, #ffd27a);
			}

			.vip_forver {
				margin-top: 25rpx;
				margin-right: 20rpx;

				image {
					width: 50rpx;
				}

				label {
					margin-left: 10rpx;
					font-size: 14px;
					color: #ffdb95;
					font-weight: bold;
				}
			}
		}

		.vip_temp_layout {
			position: absolute;
			background: url('https://img.jx885.com/lrjk_uniapp/img/mine/bg_mine_vip.png');
			background-size: 100% 100%;
			width: 90%;
			margin-left: 5%;
			margin-top: 95rpx;
			height: 120rpx;
			border-radius: 20rpx;
			display: flex;
			z-index: 100;

			image {
				width: 50rpx;
				margin: 20rpx 0 auto 30rpx;
			}

			.vip_temp {
				margin-top: 20rpx;
				margin-left: 25rpx;

				label {
					font-size: 30rpx;
					color: #ffdb95;
					font-weight: bold;
				}
			}

			.vip_temp_out_date {
				font-size: 26rpx;
				color: #ffdb95;
			}

			.buyButton {
				width: 200rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 24rpx;
				margin-right: 40rpx;
				margin-left: auto;
				font-size: 14px;
				border-radius: 125rpx;
				font-weight: bold;
				background: linear-gradient(to right, #ffe3ac, #ffd27a);
			}
		}
	}

	.content_bottom {
		position: absolute;
		margin-top: 200rpx;
		width: 100%;

		.my_order {
			height: 200rpx;
			background-color: #fff;

			.my_order_item {
				padding-top: 2.5%;
				float: left;
				display: flex;
				flex-direction: row;

				.my_order_content {
					background: url('https://img.jx885.com/lrjk_uniapp/img/mine/bg_mine_tab.png') center center no-repeat;
					// background-size: 100% 100%;
					display: flex;
					flex-direction: column;
					margin-left: 27rpx;
					margin-top: 25rpx;
					padding-top: 28rpx;
					padding-bottom: 28rpx;
					width: 215rpx;
					align-items: center;
					justify-content: space-between;

					image {
						position: absolute;
						width: 100%;
						height: 50rpx;
					}

					.first_line {

						font-size: 30rpx;

					}

					.second_line {
						margin-top: 10rpx;
						font-size: 28rpx;
						color: #C19C74;
					}
				}
			}
		}

		.other {
			margin: 0rpx 0rpx;
			width: 100%;
			// border-radius: 20rpx;
			background-color: #fff;

			.other_coloumn {
				padding: 20rpx;
				// padding: 0rpx 27rpx;
				display: flex;
				flex-direction: row;
				-webkit-justify-content: space-between;
				justify-content: space-between;
				border-bottom: 1rpx solid #fff3f7f9;

				image {
					width: 17rpx;
				}

				.other_row_left {
					height: 70rpx;
					display: flex;
					align-items: center;

					image {
						width: 35rpx;
					}

					label {
						width: 250rpx;
						margin-left: 20rpx;
						font-size: 32rpx;
					}
				}

				.other_row_right {
					height: 60rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;

					image {
						width: 17rpx;
						margin-right: 20rpx;
					}

					label {
						color: #999999;
						padding-right: 25rpx;
						font-size: 28rpx;
					}
				}

				.other_our {
					height: 60rpx;
					padding: 20rpx 20rpx;
					display: flex;
					justify-content: space-between;

					image {
						width: 50rpx;
					}
				}
			}

		}
	}
</style>