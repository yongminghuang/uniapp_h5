<template>
	<page-meta :page-style="'overflow:'+(isShowPageMeta?'hidden':'visible')"></page-meta>
	<view class="wrap">
		<view class="header-view">
			<view class="row">
				<view class="left">头像</view>
				<view class="right">
					<image :src="$util.nullStr(headImgUrl,'https://img.jx885.com/lrjk_uniapp/img/mine/ic_default_avatar.png')" mode="aspectFit"
						class="img-avatar"></image>
				</view>
			</view>
			<view class="row" @click="nickNameAction">
				<view class="left">用户名</view>
				<view class="right">
					<view class="text nick-name">{{nickName}}</view>
					<image class="arrow" src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="row">
				<view class="left">懒人驾考ID</view>
				<view class="right">
					<view class="text user-id">{{userId}}</view>
				</view>
			</view>
		</view>
		<view class="account-view">
			<view class="account-tip">账号绑定</view>
			<view class="row" @click="phoneAction">
				<view class="left">
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/ic_left_line_phone.png" class="icon"></image>
					<view class="title">手机</view>
				</view>
				<view class="right">
					<view class="text">{{phone}}</view>
					<!-- <image class="arrow" src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png" mode="widthFix"></image> -->
				</view>
			</view>
			<view class="row">
				<view class="left">
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/ic_left_line_wx.png" class="icon"></image>
					<view class="title">微信</view>
				</view>
				<view class="right">
					<view class="text">{{wxStr}}</view>
					<!-- <image class="arrow" src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png" mode="widthFix"></image> -->
				</view>
			</view>
		</view>
		<nick-name-popup :isshow="isShowNickNamePopup" @closeAction="nickNameCloseAction"
			@changeAction="nickNameChangeAction">
		</nick-name-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headImgUrl: '',
				nickName: '',
				userId: '',
				phone: '',
				wxStr: '绑定微信',
				isBindPhone: false,
				isBindWx: false,
				isShowNickNamePopup: false,
				isShowPageMeta: false,
			};
		},
		onShow() {
			this.getUserInfo()
			var thirdInfoObj = this.$store.state.vuex_user_thirdinfo
			var wxXcxOpenId = thirdInfoObj.wxXcxOpenId
			if (!this.$util.isNullVal(wxXcxOpenId)) {
				this.wxStr = '已绑定'
				this.isBindWx = true
			}
		},
		methods: {
			nickNameCloseAction() {
				this.isShowNickNamePopup = false
				this.getUserInfo()
			},
			nickNameChangeAction(value) {
				this.isShowPageMeta = value;
			},
			nickNameAction() {
				this.isShowNickNamePopup = true
			},
			getUserInfo() {
				const user = uni.getStorageSync('user');
				if (!this.$util.isNullVal(user)) {
					this.headImgUrl = user.headImgUrl
					this.nickName = user.nickName
					this.phone = user.phone
					this.userId = user.id
					if (!this.$util.isNullVal(this.phone) && this.phone.length == 11) {
						this.isBindPhone = true
					} else {
						this.phone = "未绑定"
						this.isBindPhone = false
					}
				}
			},
			phoneAction() {
				// if (this.isBindPhone) {
				// 	uni.navigateTo({
				// 		url: '/pages/mine/safe-phone'
				// 	});
				// } else {
				// 	uni.navigateTo({
				// 		url: '/pages/login/sms-login?from=bind'
				// 	})
				// }
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eee;
	}

	.wrap {
		width: 100%;
		height: 100%;

		.header-view {
			margin-top: 20rpx;
			background-color: white;

			.row {
				display: flex;
				padding: 20rpx;
				border-bottom: 2rpx solid #f5f5f5;

				.left {
					font-size: 30rpx;
					margin: auto 0;
				}

				.right {
					margin-left: auto;
					display: flex;

					.img-avatar {
						width: 100rpx;
						height: 100rpx;
						margin-right: 60rpx;
					}

					.arrow {
						width: 40rpx;
						height: 40rpx;
					}

					.text {
						color: #666666;
					}

					.nick-name {
						margin-right: 20rpx;
					}

					.user-id {
						margin-right: 60rpx;
					}
				}
			}
		}

		.account-view {
			margin-top: 20rpx;
			background-color: white;

			.account-tip {
				font-size: 28rpx;
				padding: 20rpx;
				color: #999999;
			}

			.row {
				display: flex;
				padding: 20rpx;
				border-bottom: 2rpx solid #f5f5f5;

				.left {
					display: flex;
					font-size: 30rpx;

					.icon {
						width: 40rpx;
						height: 40rpx;
						margin: auto 0;
					}

					.title {
						margin: auto 0 auto 30rpx;
					}
				}

				.right {
					margin-left: auto;
					display: flex;

					.arrow {
						width: 40rpx;
						height: 40rpx;
						margin: auto 0 auto 20rpx;
					}

					.text {
						color: #666666;
						margin: auto 0;
					}
				}
			}
		}
	}
</style>