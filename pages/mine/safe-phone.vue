<template>
	<view class="wrap">
		<view class="other_coloumn">
			<view class="other_row_left">
				<label>已绑定手机号</label>
			</view>
			<view class="other_row_right">
				<view class="subtitle">{{phoneSubtitle}}</view>
			</view>
		</view>
		<text class="change-phone" @click="phoneAction">我需要更换绑定的手机号</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneSubtitle:'',
			};
		},
		onShow() {
			const user = uni.getStorageSync('user');
			var phone = user.phone
			if (!this.$util.isNullVal(phone)) {
				this.phoneSubtitle = phone
			}
		},
		methods: {
			phoneAction() {
				uni.navigateTo({
					url: '/pages/mine/unbind-phone'
				});
			}
		}
	}
</script>

<style lang="scss">
.wrap {
	width: 100%;
	height: 100%;
	position: relative;
	background-color: #eee;
	.other_coloumn {
		display: flex;
		padding: 20rpx;
		border-bottom: 2rpx solid #f5f5f5;
		background-color: white;
		margin-top: 10rpx;
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
		text-align: center;
	.change-phone {
		transform: translate(-50%, -50%);
		position: absolute;
		bottom: 150rpx;
		left: 50%;
		font-size: 30rpx;
		color: #666666;
	}
}
</style>
