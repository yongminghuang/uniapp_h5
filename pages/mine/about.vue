<template>
	<view class="wrap">
		<!-- <image src="https://img.jx885.com/lrjk_uniapp/img/logo.png" class="logo"></image>
		<view class="name">懒人驾考</view>
		<view class="version">{{version}}</view> -->
		<view class="other-list">
			<view class="other_coloumn" @click="protocolAction">
				<view class="other_row_left">
					<label>用户协议</label>
				</view>
				<view class="other_row_right">
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="other_coloumn" @click="privacyAction">
				<view class="other_row_left">
					<label>隐私政策</label>
				</view>
				<view class="other_row_right">
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="other_coloumn" @click="vipAction">
				<view class="other_row_left">
					<label>会员协议</label>
				</view>
				<view class="other_row_right">
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="copyright-view" :style="copyrightViewStyle">
			<view class="name-view">懒人驾考</view>
			<view class="icp" @click="icpAction">ICP备案号：闽ICP备14020923号-4A ></view>
			<view class="copyright">Copyright© 2015-2024 All Rights Reserved</view>
		</view>
		<view :style="spaceStyle"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: "",
				spaceStyle: '',
				copyrightViewStyle: '',
			};
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom + 20
			this.spaceStyle = 'height:' + bottomSafeHeight + 'px;'
			this.copyrightViewStyle = 'bottom:' + bottomSafeHeight + 'px;'
		},
		onLoad() {
			var baseInfo = uni.getAppBaseInfo()
			this.version = 'v' + baseInfo.appVersion
		},
		methods: {
			protocolAction() {
				uni.navigateTo({
					url: '/pages/mine/web-page',
					success: function(res) {
						res.eventChannel.emit('web-page', {
							url: 'https://img.jx885.com/lrjk/html/protocol/index.html',
						})
					}
				});
			},
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
			vipAction() {
				uni.navigateTo({
					url: '/pages/mine/web-page',
					success: function(res) {
						res.eventChannel.emit('web-page', {
							url: 'https://img.jx885.com/lrjk/html/protocol/member/index.html',
							title: '会员协议'
						})
					}
				});
			},
			icpAction() {
				uni.navigateTo({
					url: '/pages/mine/web-page',
					success: function(res) {
						res.eventChannel.emit('web-page', {
							url: 'https://beian.miit.gov.cn',
						})
					}
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
		text-align: center;
		position: relative;

		.logo {
			width: 240rpx;
			height: 240rpx;
			margin-top: 100rpx;
		}

		.name {
			margin-top: 20rpx;
			font-size: 32rpx;
		}

		.version {
			margin-top: 16rpx;
			font-size: 28rpx;
		}

		.other-list {
			background-color: white;
			margin-top: 20rpx;

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

		.copyright-view {
			position: absolute;
			left: 0;
			bottom: 40;
			text-align: center;
			font-size: 28rpx;
			width: 100%;

			.name-view {
				color: #007aff;
			}

			.icp {
				margin-top: 20rpx;
				color: #666666;
			}

			.copyright {
				margin-top: 10rpx;
				color: #666666;
			}
		}
	}
</style>