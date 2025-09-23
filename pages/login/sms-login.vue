<template>
	<view>
		<view class="title">
			<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_back_gray.png" mode="widthFix" @click="toBack(0)"></image>
			<text class="title-view">

			</text>
		</view>
		<view class="middle_layout">
			<label class="login_title_text">{{isBindPhone?'绑定账号':'登录/注册'}}</label>
			<label class="login_hint_text">未注册手机号验证后即可完成登录</label>
			<view class="phone_layout">
				<image class="phone_icon" src="https://img.jx885.com/lrjk_uniapp/img/login/icon_login_phone.png"></image>

				<input class="phone_input" type="number" maxlength="11" placeholder="请输入手机号" v-model="phoneValue"
					@input="clearInput" />
				<image class="phone_clean" v-if="showClearIcon" @click="clearIcon" src="https://img.jx885.com/lrjk_uniapp/img/login/ic_clean.png">
				</image>
			</view>
			<view class="layout_div"></view>
			<view class="sms_layout">
				<image class="sms_icon" src="https://img.jx885.com/lrjk_uniapp/img/login/icon_login_code.png"></image>

				<input class="sms_input" placeholder="请输入验证码" v-model="smsValue" type="number" maxlength="6"/>
				<label class="sms_btn" v-if="!count_down && isEnabled" @click="getMsgCode">发送验证码</label>
				<label class="sms_btn" v-else-if="!count_down && !isEnabled">发送验证码</label>
				<label class="sms_btn_press" v-else>{{ count_down }}秒可重发</label>
			</view>
			<view class="layout_div"></view>

			<view class="login_btn" @click="smsLogin">
				{{isBindPhone?'绑定账号':'登录'}}
			</view>
			<view class="privacy_layout">
				<label class="agree_text" v-if="!isBindPhone">
					<checkbox :checked="this.isCheckPrivacy" color="#FFCC33"
						@change="this.isCheckPrivacy = !this.isCheckPrivacy" />阅读并同意
				</label>
				<label class="user_privacy_text">《用户协议》</label>
				<label>、</label>
				<label class="user_privacy_text">《隐私协议》</label>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showClearIcon: false,
			phoneValue: '',
			smsValue: '',
			count_down: '',
			isBindPhone:false,
			isEnabled:true,
			delta:1,//返回页面层级，默认1
		};
	},
	onLoad(option) {
		var from = option.from
		var delta = option.delta
		if (!this.$util.isNullVal(from) && from == 'bind') {
			this.isBindPhone = true
		}
		if(!this.$util.isNullVal(delta)) {
			this.delta = parseInt(delta)
		}
	},
	methods: {
		clearInput: function (event) {
			if (event.detail.value.length > 0) {
				this.showClearIcon = true;
			} else {
				this.showClearIcon = false;
			}
		},
		clearIcon: function () {
			this.phoneValue = '';
			this.showClearIcon = false;
		},
		smsLogin: function () {
			if (this.phoneValue.length < 11) {
				uni.showToast({
					title: '请输入正确手机号码',
					duration: 1500
				});
				return;
			}
			if (this.smsValue.length == 0) {
				uni.showToast({
					title: '请输入验证码',
					duration: 1500
				});
				return;
			}
			if (this.isBindPhone) {
				var that = this;
				let params = {
					phone: that.phoneValue,
					code:that.smsValue,
				}
				that.$u.api.bindPhone(params)
					.then(res => {
					if (res.code == 200) {
						const user = uni.getStorageSync('user');
						user.phone = that.phoneValue
						uni.setStorageSync('user', user);
						that.toBack(1)
					}
				})
			}

		},
		// 倒计时
		countDown() {
			this.timer = setInterval(() => {
				this.count_down = this.count_down - 1
				if (this.count_down < 10) this.count_down = '0' + this.count_down
				if (this.count_down <= 0) {
					clearInterval(this.timer)
					this.count_down = ''
					this.isEnabled = true;
				}
			}, 1000)
		},
		// 点击获取验证码时开始倒计时
		getMsgCode() {
			if (this.phoneValue.length < 11) {
				uni.showToast({
					title: '请输入正确手机号码',
					duration: 1500
				});
				return;
			}
			var that = this;
			that.isEnabled = false;
			let params = {
				phone: that.phoneValue
			}
			that.$u.api.sendVerifyCode(params)
				.then(res => {
				if (res.code == 200) {
					uni.showToast({
						title:'发送成功',
						icon:'none'
					})
					// 请求接口获取验证码，然后倒计时
					that.count_down = 60 // 倒数60秒
					that.countDown()
				}else {
					this.isEnabled = true;
				}
			})
			
		},
		toBack(value) {
			if (value == 0) {
				uni.navigateBack()
			}else {
				var that = this
				uni.navigateBack({
					delta: that.delta 
				});
			}
			
		}
	}
}
</script>

<style lang="scss">
.title {
	position: absolute;
	background-color: transparent;
	display: flex;
	flex-direction: row;
	height: 45rpx;
	width: 100%;
	left: 0;
	top: 80rpx;
	justify-content: center;
	align-items: center;

	image {
		margin-left: 25rpx;
		padding: 5rpx;
		width: 25rpx;

	}

	text {
		text-align: center;
		font-size: 36rpx;
		width: 100%;
		color: #fff;
	}
}

.middle_layout {
	margin-top: 400rpx;
	display: flex;
	padding-left: 30rpx;
	padding-right: 30rpx;
	flex-direction: column;

	.login_title_text {
		font-size: 55rpx;
		font-weight: bold;
		color: #000;
	}

	.login_hint_text {
		margin-top: 20rpx;
		font-size: 30rpx;
		color: #343434;
	}

	.phone_layout {
		margin-top: 50rpx;
		display: flex;
		flex-direction: row;

		.phone_icon {
			margin-top: 5rpx;
			width: 40rpx;
			height: 40rpx;
		}

		.phone_input {
			margin-left: 10rpx;
			width: 500rpx;

		}

		.phone_clean {
			width: 35rpx;
			height: 35rpx;
		}
	}

	.layout_div {
		margin-top: 10rpx;
		width: 100%;
		height: 1rpx;
		background: #e5e5e5;
	}

	.sms_layout {
		margin-top: 50rpx;
		display: flex;
		flex-direction: row;

		.sms_icon {
			margin-top: 5rpx;
			width: 40rpx;
			height: 40rpx;
		}

		.sms_input {
			margin-left: 10rpx;
			width: 400rpx;

		}

		.sms_btn {
			font-size: 30rpx;
			color: #999999;
			width: 200rpx;
			height: 60rpx;
		}

		.sms_btn_press {
			font-size: 30rpx;
			color: #237ded;
			width: 200rpx;
		}
	}

	.login_btn {
		margin: auto;
		margin-top: 50rpx;
		width: 90%;
		height: 80rpx;
		border-radius: 20rpx;
		background: #237ded;
		text-align: center;
		color: #fff;
		padding-top: 15rpx;
	}
}

.privacy_layout {
	margin: auto;
	margin-top: 20rpx;

	.agree_text {
		font-size: 30rpx;
	}

	.user_privacy_text {
		font-size: 30rpx;
		color: #237ded;
	}
}
</style>
