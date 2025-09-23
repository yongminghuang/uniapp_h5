<template>
	<view class="wrap">
		<view class="other_coloumn" @click="privacyAction">
			<view class="other_row_left">
				<label>隐私政策</label>
			</view>
			<view class="other_row_right">
				<image src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="other_coloumn" @click="safeAction">
			<view class="other_row_left">
				<label>账号安全</label>
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
				isLogin: false,
			};
		},
		onLoad() {
			const user = uni.getStorageSync('user');
			if (this.$util.isNullVal(user)) {
				this.isLogin = false
			} else {
				this.isLogin = true; //user.isTemp == 0
			}
		},
		methods: {
			privacyAction() {
				uni.navigateTo({
					url: '/pages/mine/web-page',
					success: function(res) {
						res.eventChannel.emit('web-page', {
							url: 'https://img.jx885.com/lrjk/html/privacy/privacy.html',
							title: '隐私政策'
						})
					}
				});
			},
			safeAction() {
				if (this.isLogin) {
					uni.navigateTo({
						url: '/pages/mine/safe'
					});
				} else {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
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

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>