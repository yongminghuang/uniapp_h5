<template>
	<view class="wrap">
		<view class="content">
			<view class="title">注销须知</view>
			<view class="row">在提交注销申请前，请仔细阅读以下通知</view>
			<view class="row">1、注销账号后，使用此手机和微信号将无法登陆懒人驾考系统。</view>
			<view class="row">2、注销账号后，账号内的个人资料（包括昵称、头像等无法找回）。</view>
			<view class="row">3、注销账号后，账号内的的虚拟资产（VIP会员）和增值服务（VIP课程等）都将无法继续使用，建议谨慎注销，避免损失。</view>
			<view class="unregister-btn" @click="unregisterAction">
				<text>注销账号</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			unregisterAction() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认注销？',
					confirmText:'确认',
					confirmColor:'#237ded',
					cancelColor:'#999999',
					success: function (res) {
						if (res.confirm) {
							that.logoutAccount();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			logoutAccount() {
				var that = this
				let params = {}
				that.$u.api.logoutAccount(params).then(res => {
					if (res.code == 200) {
						uni.clearStorage();
						uni.switchTab({
							url: '/pages/index/index'
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.wrap {
	width: 100%;
	height: 100%;
	background-color: #eeeeee;
	.content {
		width: 100%;
		padding: 20rpx;
		background-color: white;
		.title {
			font-size: 36rpx;
			margin-top: 60rpx;
		}
		.row {
			font-size: 30rpx;
			margin-top: 40rpx;
		}
		.unregister-btn {
			width: 100%;
			margin-top: 40rpx;
			height: 80rpx;
			display: flex;
			background-color: #237ded;
			border-radius: 40rpx;
			text {
				margin: auto;
				font-size: 30rpx;
				color: white;
			}
		}
	}
	
}
</style>
