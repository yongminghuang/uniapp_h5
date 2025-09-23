<template>
	<view class="wrap">
		<view class="title">解绑账号</view>
		<view class="phone-view">
			<image class="icon" src="https://img.jx885.com/lrjk_uniapp/img/login/icon_login_phone.png"></image>
			<view class="phone">{{phone}}</view>
		</view>
		<view class="code-view">
			<image class="icon" src="https://img.jx885.com/lrjk_uniapp/img/login/icon_login_code.png"></image>
			<input type="number" v-model="code" placeholder="请输入验证码" maxlength="6"/>
			<view class="send-btn" v-if="isEnabled" @click="sendCodeAction">{{sendCodeStr}}</view>
			<view class="send-btn" v-else>{{sendCodeStr}}</view>
		</view>
		<view class="unbind-btn" @click="unbindAction">
			<text>解绑账号</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				code:'',
				sendCodeStr:'发送验证码',
				counter:60,
				isEnabled:true,
			};
		},
		onShow() {
			const user = uni.getStorageSync('user');
			var phone = user.phone
			if (!this.$util.isNullVal(phone)) {
				this.phone = phone
			}
		},
		methods: {
			sendCodeAction() {
				var that = this;
				let params = {
					phone: that.phone
				}
				that.isEnabled = false;
				that.$u.api.sendVerifyCode(params)
					.then(res => {
					if (res.code == 200) {
						uni.showToast({
							title:'发送成功',
							icon:'none'
						})
					  var interval = setInterval(() => {
						  that.counter -= 1;
						  if (that.counter > 0) {
							  that.sendCodeStr = that.counter + '秒可重发'
						  }else {
							  that.sendCodeStr = '发送验证码'
							  that.counter = 60
							  that.isEnabled = true
							  clearInterval(interval)
						  }
						}, 1000); // 每秒执行一次
					}else {
						that.isEnabled = true
					}
				})
			},
			unbindAction() {
				var that = this;
				if (that.$util.isNullVal(that.code)) {
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
					return
				}
				let params = {
					phone: that.phone,
					code:that.code
				}
				that.$u.api.unBindPhone(params).then(res => {
					if (res.code == 200) {
						const user = uni.getStorageSync('user');
						user.phone = ''
						uni.setStorageSync('user', user);
						uni.navigateTo({
							url:'/pages/login/sms-login?from=bind&delta=2'
						})
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
	.title {
		font-size: 50rpx;
		margin:60rpx 0 0 30rpx;
	}
	.phone-view {
		margin: 60rpx 20rpx 0 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #f5f5f5;
		display: flex;
		.icon {
			width: 40rpx;
			height: 40rpx;
			margin: auto 0 auto 20rpx;
		}
		.phone {
			margin: auto 0 auto 20rpx;
			font-size: 30rpx;
		}
	}
	.code-view {
		margin: 60rpx 20rpx 0 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #f5f5f5;
		display: flex;
		.icon {
			width: 40rpx;
			height: 40rpx;
			margin: auto 0 auto 20rpx;
		}
		input {
			margin: auto 0 auto 20rpx;
			font-size: 30rpx;
		}
		.send-btn {
			margin: auto 30rpx auto auto;
			font-size: 24rpx;
			color: #237ded;
		}
	}
	.unbind-btn {
		margin: 30rpx 40rpx 0 40rpx;
		height: 80rpx;
		display: flex;
		border-radius: 20rpx;
		background-color: #237ded;
		text {
			margin: auto;
			color: white;
			font-size: 28rpx;
		}
	}
}
</style>
