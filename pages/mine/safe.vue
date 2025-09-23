<template>
	<view class="wrap">
		<view class="other_coloumn">
			<view class="other_row_left">
				<label>微信</label>
			</view>
			<view class="other_row_right">
				<view class="subtitle">{{wxSubtitle}}</view>
				<!-- <image src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png" mode="widthFix"></image> -->
			</view>
		</view>
		<view class="other_coloumn">
			<view class="other_row_left">
				<label>手机号</label>
			</view>
			<view class="other_row_right">
				<view class="subtitle">{{phoneSubtitle}}</view>
				<!-- <image src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png" mode="widthFix"></image> -->
			</view>
		</view>
		<view class="other_coloumn" @click="unregisterAction" v-if="false">
			<view class="other_row_left">
				<label>注销账号</label>
			</view>
			<view class="other_row_right">
				<image src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wxSubtitle: '',
				phoneSubtitle: '',
				isBindWx: false,
				isBindPhone: false,
			};
		},
		onShow() {
			var that = this
			const user = uni.getStorageSync('user');
			let params = {
				userId: user.id
			}
			that.$u.api.queryThirdInfo(params)
				.then(res => {
					if (res.code == 200) {
						that.$u.vuex('vuex_user_thirdinfo', res.body)
						let body = res.body
						var thirdInfoObj = this.$store.state.vuex_user_thirdinfo
						var wxXcxOpenId = body.wxUnionId
						if (!this.$util.isNullVal(wxXcxOpenId)) {
							this.wxSubtitle = '已绑定'
							if (body.nickname) {
								this.wxSubtitle += body.nickname
							}
							this.isBindWx = true
						}
					}
				})


			var phone = user.phone
			if (!this.$util.isNullVal(phone) && phone.length == 11) {
				this.phoneSubtitle = phone
				this.isBindPhone = true
			} else {
				this.phoneSubtitle = "未绑定"
				this.isBindPhone = false
			}
		},
		methods: {
			unregisterAction() {
				uni.navigateTo({
					url: '/pages/mine/unregister'
				});
			},
			phoneAction() {
				if (this.isBindPhone) {
					uni.navigateTo({
						url: '/pages/mine/safe-phone'
					});
				} else {
					uni.navigateTo({
						url: '/pages/login/sms-login?from=bind'
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		width: 100%;
		height: 100%;

		.other_coloumn {
			display: flex;
			padding: 20rpx;
			border-bottom: 2rpx solid #f5f5f5;

			.other_row_left {
				margin: auto 0;

				label {
					width: 250rpx;
					color: #212121;
					font-size: 32rpx;
				}
			}

			.other_row_right {
				margin: auto 0 auto auto;
				display: flex;

				.subtitle {
					margin: auto 20rpx auto 0;
					color: #666666;
				}

				image {
					margin: auto 0;
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>