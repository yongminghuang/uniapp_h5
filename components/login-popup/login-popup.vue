<template>
	<view>
		<uni-popup ref="popup" type="bottom" @maskClick="closeAction" :safe-area="false">
			<view class="wrap">
				<view class="top_layout">
					<view class="title">登录获取技巧</view>
					<image class="close" src="https://img.jx885.com/lrjk_uniapp/img/login/bg_dialog_close.png"
						@click="closeAction"></image>
				</view>
				<view class="middle_layout">
					<view class="weixinLogin_layout">
						<button class="weixin_text" v-if="isCheckPrivacy" @click="decryptPhoneNumber"
							@agreeprivacyauthorization="agreePrivacyAuthAction">微信快捷登录</button>
						<button class="weixin_text" v-else @click="loginByWeixin">微信快捷登录</button>
					</view>
					<view class="privacy_layout">
						<view class="agree_text">
							<checkbox-group @change="checkChangeAction">
								<checkbox :checked="isCheckPrivacy" color="#FFCC33">阅读并同意</checkbox>
								<label class="user_privacy_text" @click.stop="protocolAction">《用户协议》</label>
								<label>、</label>
								<label class="user_privacy_text" @click.stop="privacyAction">《隐私协议》</label>
							</checkbox-group>
						</view>
					</view>
				</view>
				<!-- 	<view class="bottom_layout">
					<view class="sms_layout">
						<image class="sms_icon" src="https://img.jx885.com/lrjk_uniapp/img/login/icon_ali_dx.png" @click="loginSms"></image>
						<label class="sms_text" @click="loginSms">验证码</label>
					</view>
				</view> -->
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		isProdEnv
	} from "../../common/util.js";
	import GravityEngine from "../../utils/gravityengine.wx.min.js";
	export default {
		name: "login-popup",
		props: {
			isshow: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				isCheckPrivacy: false,
			};
		},
		watch: {
			isshow(newValue, oldValue) {
				if (this.isshow) {
					this.$refs.popup.open()
				} else {
					this.$refs.popup.close()
				}
			}
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
			checkChangeAction() {
				this.isCheckPrivacy = !this.isCheckPrivacy
			},
			initGravityEngine(openid) {
				if (!openid) {
					return
				}
				const user = uni.getStorageSync('user');
				let mode = "debug"
				if (isProdEnv()) {
					mode = "none"
				}
				const config = {
					accessToken: "FtMUtpRZKI1O4zxfnVfjwA8DieokvlYB", // 项目通行证，在：网站后台-->设置-->应用列表中找到Access Token列 复制（首次使用可能需要先新增应用）
					clientId: user.id, // 用户唯一标识，如产品为小程序，则必须填用户openid（注意，不是小程序的APPID！！！）
					debugMode: mode, // 是否开启测试模式，开启测试模式后，可以在 网站后台--设置--元数据--事件流中查看实时数据上报结果。（测试时使用，上线之后一定要关掉，改成none或者删除）
				};
				const ge = new GravityEngine(config);
				ge.setupAndStart();
				let account = uni.getAccountInfoSync();
				let version = parseInt(uni.getAppBaseInfo().appVersionCode)
				ge.initialize({
						name: user.nickName,
						version: version,
						openid: openid,
						enable_sync_attribution: true,
					})
					.then((res) => {
						console.log("initialize success " + res);
					})
					.catch((err) => {
						console.log("initialize failed, error is " + err);
					});
			},
			agreePrivacyAuthAction(value) {
				debugger
			},
			decryptPhoneNumber(value) {
				// var code = value.detail.code
				// if (this.$util.isNullVal(code)) {
				// 	return
				// }
				var that = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let params = {
							code: loginRes.code
						}
						that.$u.api.wxLogin(params)
							.then(res => {
								if (res.code == 200) {
									if (res.body != null) {
										uni.setStorageSync('accessToken', res.body.accessToken)
										uni.setStorageSync('user', res.body.user)
										that.initGravityEngine(res.body.openid)
										uni.$emit('user')
										that.closeAction();
									}
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'error'
									});
								}
							})

					},
					fail(e) {
						uni.showToast({
							icon: "none",
							title: e.errMsg,
						});
						console.log("login fail:" + e)
					}
				});
			},
			closeAction() {
				this.$emit('closeAction')
			},
			loginByWeixin() {
				var that = this;
				if (!this.isCheckPrivacy) {
					uni.showModal({
						content: "同意《用户协议》和《隐私协议》并继续登录",
						showCancel: true,
						success: function(res) {
							if (res.confirm) {
								that.isCheckPrivacy = true;
							} else if (res.cancel) {
								that.closeAction()
							}
						}
					});
					return
				}
			},
			loginSms() {
				uni.navigateTo({
					url: '/pages/login/sms-login',
					success: function(res) {

					}
				});

			}
		}

	}
</script>

<style lang="scss">
	.wrap {
		background-color: white;
		width: 100%;
		height: 500rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		position: relative;
		display: flex;
		flex-direction: column;

		.top_layout {
			display: flex;
			flex-direction: row;
			justify-content: center;

			.title {
				font-size: 35rpx;
				font-weight: bold;
				align-content: center;
				margin: auto;
				justify-content: center;
				margin-top: 20rpx;

			}

			.close {
				position: absolute;
				width: 38rpx;
				height: 38rpx;
				align-content: end;
				right: 30rpx;
				top: 20rpx;
			}
		}

		.middle_layout {
			margin-top: 140rpx;
			position: relative;
			display: flex;
			flex-direction: column;


			.weixinLogin_layout {
				margin: auto;
				text-align: center;
				border-radius: 40rpx;

				width: 80%;
				// height: 70rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.weixin_text {
					background-color: #39C868;
					color: #FFF;
					width: 100%;
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
		}

		.bottom_layout {

			// position: absolute;
			// bottom: 30rpx;

			.sms_layout {
				width: 250rpx;
				margin-left: 250rpx;
				margin-right: auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-items: center;

				.sms_icon {
					width: 70rpx;
					height: 70rpx;
				}

				.sms_text {
					color: #000;
					font-size: 30rpx;
				}
			}



		}
	}
</style>