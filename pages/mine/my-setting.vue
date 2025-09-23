<template>
	<view class="wrap">

		<uni-nav-bar left-icon="left" title="我的设置" :border="false" fixed statusBar @clickLeft="toBack" />

		<view class="body">
			<view class="other_coloumn" @click="aboutAction">
				<view class="other_row_left">
					<label>关于我们</label>
				</view>
				<view class="other_row_right">
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png" mode="widthFix">
					</image>
				</view>
			</view>
			<view class="other_coloumn" @click="safeAction">
				<view class="other_row_left">
					<label>账号与安全</label>
				</view>
				<view class="other_row_right">
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png" mode="widthFix">
					</image>
				</view>
			</view>
			<view class="other_coloumn" @click="privacyAction" v-if="false">
				<view class="other_row_left">
					<label>隐私设置</label>
				</view>
				<view class="other_row_right">
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png" mode="widthFix">
					</image>
				</view>
			</view>
		</view>
		<view class="btn_exit" v-if="false" @click="exit">
			退出登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
			}
		},
		onLoad() {
			const user = uni.getStorageSync('user');
			if (this.$util.isNullVal(user)) {
				this.isLogin = false
			} else {
				this.isLogin = true //user.isTemp == 0
			}
		},
		methods: {
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

			},
			toBack() {
				uni.navigateBack();
			},
			exit() {
				uni.setStorageSync('accessToken', '');
				uni.setStorageSync('user', '');
				uni.navigateBack({
					delta: 100
				});
			},
			aboutAction() {
				uni.navigateTo({
					url: '/pages/mine/about',
				});
			},
			privacyAction() {
				uni.navigateTo({
					url: '/pages/mine/privacy',
				});
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		width: 100%;
		height: 100%;
		background-color: #eee;
	}

	.back-view {
		display: flex;

		image {
			margin-left: 25rpx;
			padding: 5rpx;
			width: 25rpx;
		}

		text {
			font-size: 26rpx;
			margin: auto 0 auto 10rpx;
		}
	}

	.title-view {
		display: flex;
		margin: auto;

		.title {
			text-align: center;
			font-size: 36rpx;
			width: 100%;
			color: #000;
		}
	}

	.body {
		margin-top: 30rpx;
		width: 100%;
		background-color: #fff;

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

	.btn_exit {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 40rpx;
		width: 100%;
		height: 80rpx;
		background: #fff;
		text-align: center;
		font-size: 30rpx;
		color: #e5be57;
	}
</style>