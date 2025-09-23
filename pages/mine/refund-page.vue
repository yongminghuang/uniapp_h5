<template>
	<view class="wrap">
		<uni-nav-bar height="88rpx" :border="false" background-color="#237ded" fixed statusBar>
			<template v-slot:left>
				<view class="back-view">
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_back_gray.png" mode="widthFix" @click="toBack"></image>
				</view>
			</template>
			<template>
				<view class="title-view">
					<text class="title">我要退款</text>
				</view>
			</template>
		</uni-nav-bar>
		
		<view class="apply-record" @click="applyRecordAction">
			<text class="record-tip">申\n请\n记\n录</text>
		</view>

		<text class=".text_forever_vip_hint" decode>
			{{ open_vip_hint }}</text>

		<view class="base_info_hint-wrap">
			<view class="base_info_decorate"></view>
			<text class="base_info_text">基本信息</text>
		</view>
		<view class="base_info_content_warp">
			<label class="hint_label">姓名</label>
			<input type="text" class="input_bg" maxlength="30" v-model="name" placeholder="请输入姓名"></input>

			<label class="hint_label">手机号码</label>
			<input type="text" class="input_bg" maxlength="11" v-model="phone" placeholder="请输入手机号"></input>

			<label class="hint_label">身份证号</label>
			<input type="text" class="input_bg" maxlength="18" v-model="identity_card" placeholder="请输入身份证号"></input>
		</view>

		<view class="gradles_hint-wrap">
			<view class="base_info_decorate"></view>
			<text class="base_info_text">成绩截图</text>
		</view>

		<view class="screenshot_tutorial_warp" @click="toWeb">
			<image class="screenshot_help_icon" src="https://img.jx885.com/lrjk_uniapp/img/mine/refund/icon_help.png"></image>
			<label class="screenshot_label">截图教程</label>
		</view>

		<view class="grades_content_warp">
			<view class="item_photo_wrap">
				<label class="phonto_hint_label">不合格截图：</label>
				<image class="upload_image" :src="upload_image_1 ? upload_image_1 : 'https://img.jx885.com/lrjk_uniapp/img/mine/refund/bg_plus.png'" @click="getPictureAction(1)">
				</image>
				<view class="example_image_wrap" @click="previewImageAction(1)">
					<image class="example_image" :src="example_1"></image>
					<view class="example-view">
						<label class="example_text">示例图</label>
						<image class="example_search" src="https://img.jx885.com/lrjk_uniapp/img/mine/refund/search.png"></image>
					</view>
				</view>
			</view>
			<view class="item_photo_wrap">
				<label class="phonto_hint_label">个人资料截图：</label>
				<image class="upload_image" :src="upload_image_2 ? upload_image_2 : 'https://img.jx885.com/lrjk_uniapp/img/mine/refund/bg_plus.png'" @click="getPictureAction(2)">
				</image>
				<view class="example_image_wrap" @click="previewImageAction(2)">
					<image class="example_image" :src="example_2"></image>
					<view class="example-view">
						<label class="example_text">示例图</label>
						<image class="example_search" src="https://img.jx885.com/lrjk_uniapp/img/mine/refund/search.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="item_photo_wrap">
				<label class="phonto_hint_label">订单截图：</label>
				<image class="upload_image" :src="upload_image_3 ? upload_image_3 : 'https://img.jx885.com/lrjk_uniapp/img/mine/refund/bg_plus.png'" @click="getPictureAction(3)">
				</image>
				<view class="example_image_wrap" @click="previewImageAction(3)">
					<image class="example_image" :src="example_3"></image>
					<view class="example-view">
						<label class="example_text">示例图</label>
						<image class="example_search" src="https://img.jx885.com/lrjk_uniapp/img/mine/refund/search.png" mode="widthFix"></image>
					</view>
					
				</view>
			</view>

		</view>
		<view class="btn_submit" @click="onSubmit">确认提交</view>

		<view class="bottom_empty_layout"></view>

	</view>
</template>

<script>
	import {
		isNullVal
	} from '../../common/util'
	export default {
		data() {
			return {
				userinfo: [],
				isTempVip: true,
				name: "",
				phone: "",
				identity_card: "",
				upload_image_1: "",
				upload_image_2: "",
				upload_image_3: "",
				example_1: 'https://img.jx885.com/lrjk/content/img/refund/3.png',
				example_2: 'https://img.jx885.com/lrjk/content/img/refund/5.png',
				example_3: 'https://img.jx885.com/lrjk/content/img/refund/6.png',
				open_vip_hint: '&ensp;&ensp;&ensp;&ensp;尊贵的永久会员，您享受不过包退服务，若您参加科一、科四正式考试未通过，可申请退款',
			}
		},
		onShow() {
			this.userinfo = uni.getStorageSync('user')
			this.url = uni.getStorageSync('url')
			let collect = uni.getStorageSync('collect')
			this.collectNum = collect.length
		},
		onPageScroll(e) {

		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			toWeb() {
				uni.navigateTo({
					url: '/pages/mine/web-page',
					success: function(res) {
						res.eventChannel.emit('web-page', {
							url: 'https://img.jx885.com/lrjk/content/text/html/refund.html',
							title: '成绩截图教程'
						})
					}
				});
			},
			onSubmit() {
				if (this.$util.isNullVal(this.name)) {
					uni.showToast({
						title:'请输入姓名',
						icon:'none'
					})
					return
				}
				if (this.$util.isNullVal(this.phone)) {
					uni.showToast({
						title:'请输入手机号',
						icon:'none'
					})
					return
				}
				if (!this.$u.test.mobile(this.phone)) {
					uni.showToast({
						title:'您的手机号有误，请重新填写',
						icon:'none'
					})
					return
				}
				if (this.$util.isNullVal(this.identity_card)) {
					uni.showToast({
						title:'请输入身份证号',
						icon:'none'
					})
					return
				}
				if (!this.$u.test.idCard(this.identity_card)) {
					uni.showToast({
						title:'您的身份证有误，请重新填写',
						icon:'none'
					})
					return
				}
				if (this.$util.isNullVal(this.upload_image_1)) {
					uni.showToast({
						title:'请上传不合格截图',
						icon:'none'
					})
					return
				}
				if (this.$util.isNullVal(this.upload_image_2)) {
					uni.showToast({
						title:'请上传个人资料截图',
						icon:'none'
					})
					return
				}
				if (this.$util.isNullVal(this.upload_image_3)) {
					uni.showToast({
						title:'请上传订单截图',
						icon:'none'
					})
					return
				}
				var picUrl = this.upload_image_1 + ',' + this.upload_image_2 + ','  + this.upload_image_3
	
				var that = this
				let params = {
					idCard:this.identity_card,
					phone:this.phone,
					scoreUrl:picUrl,
					userName:this.name
				}
				that.$u.api.saveRefundApply(params)
					.then(res => {
					if (res.code == 200) {
						 uni.showToast({
						 	title:'已提交退款申请',
							icon:'none'
						 })
						var timeout = setTimeout(function() {
							clearTimeout(timeout)
							that.toBack();
						 }, 3000);
						
					}else {
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
			getPictureAction(value) {
				var that = this
				uni.chooseMedia({
				  count: 1,
				  mediaType: ['image'],
				  sourceType: ['album'],
				  sizeType:['compressed'],
				  success(res) {
				      var list = res.tempFiles
					  if (list.length > 0) {
						  var filePath = list[0].tempFilePath
						  that.uploadImage(filePath,value)
					  }
				  },
				  fail(res) {
				  }
				})
			},
			
			uploadImage(filePath,value) {
				var that = this
				var domain = this.$u.http.config.baseUrl;
				uni.uploadFile({
					url: domain + '/qnmApp/app/view/ossFile/upload',  
					name: 'file',
					filePath:filePath,
					header:{
						'X-Access-Token' : uni.getStorageSync('accessToken')
					},
					formData: {
						fileName:'file.jpg',
						mimeType:'image/jpg'
					},
					success(uploadFileRes){
						var data = uploadFileRes.data
						if (!that.$util.isNullVal(data)) {
							var obj = JSON.parse(data);
							if (obj.code == 200) {
								var imgUrl = obj.result
								if (value == 1) {
									that.upload_image_1 = imgUrl
								}else if (value == 2) {
									that.upload_image_2 = imgUrl
								}else {
									that.upload_image_3 = imgUrl
								}
							}
						}
					},
					fail(res) {
						console.log(res);
					}
				});
			},
			
			previewImageAction(value) {
				var url = ""
				if (value == 1) {
					url = this.example_1
				}else if (value == 2) {
					url = this.example_2
				}else if (value == 3) {
					url = this.example_3
				}
				// 预览图片
				uni.previewImage({
					urls: [url],
					showmenu:false,
					success(res) {
					},
					fail(res) {
					}
				});
			},
			applyRecordAction() {
				uni.navigateTo({
					url:'/pages/refund/refund-apply-record-list'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f7f9;
	}

	.wrap {
		display: flex;
		flex-direction: column;
		position: relative;
	}
	
	.apply-record {
		position: fixed;
		right: 40rpx;
		bottom: 150rpx;
		background-color: white;
		z-index: 100;
		width: 60rpx;
		height: 180rpx;
		display: flex;
		border-radius: 30rpx;
		box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.5);
		.record-tip {
			color: #333;
			font-size: 28rpx;
			margin: auto;
		}
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
			color: #fff;
		}
	}

	.text_forever_vip_hint {
		padding-left: 27rpx;
		padding-right: 27rpx;
		margin-top: 30rpx;
		font-size: 30rpx;
		color: #0000008A
	}

	.base_info_hint-wrap {
		position: absolute;
		top: 300rpx;
		left: 27rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		.base_info_decorate {
			width: 10rpx;
			height: 45rpx;
			background: #237ded;
		}

		.base_info_text {
			font-weight: bold;
			margin-left: 10rpx;
		}
	}

	.base_info_content_warp {
		position: absolute;
		top: 365rpx;
		border-radius: 20rpx;
		width: 670rpx;
		height: 450rpx;
		background: #fff;
		margin-left: 27rpx;
		padding-top: 15rpx;
		padding-left: 27rpx;

		padding-bottom: 15rpx;
		display: flex;
		flex-direction: column;

		.hint_label {
			margin-top: 5rpx;
			color: #333333;
			font-size: 30rpx;
		}

		.input_bg {
			margin-top: 5rpx;
			width: 642rpx;
			border-radius: 30rpx;
			border: 1px solid #F7F7F7;
			height: 100rpx;
			text-align: center;
			font-size: 30rpx;
		}
	}

	.screenshot_tutorial_warp {
		position: absolute;
		top: 900rpx;
		right: 27rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		.screenshot_help_icon {
			width: 35rpx;
			height: 35rpx;
		}

		.screenshot_label {
			font-size: 30rpx;
			margin-left: 10rpx;
			color: #237ded;
		}
	}

	.gradles_hint-wrap {
		position: absolute;
		top: 900rpx;
		left: 27rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		.base_info_decorate {
			width: 10rpx;
			height: 45rpx;
			background: #237ded;
		}

		.base_info_text {
			font-weight: bold;
			margin-left: 10rpx;
		}
	}


	.grades_content_warp {
		position: absolute;
		top: 970rpx;

		border-radius: 20rpx;
		width: 670rpx;
		height: 465rpx;
		background: #fff;
		margin-left: 27rpx;
		padding-top: 15rpx;
		padding-left: 27rpx;

		padding-bottom: 15rpx;
		display: flex;
		flex-direction: column;

		.item_photo_wrap {
			margin-top: 5rpx;
			display: flex;
			flex-direction: row;

			.phonto_hint_label {
				width: 210rpx;
				margin-top: 5rpx;
				text-align: end;
				color: #333333;
				font-size: 30rpx;
			}

			.upload_image {
				width: 150rpx;
				height: 150rpx;
			}

			.example_image_wrap {
				position: relative;
				width: 118rpx;
				height: 100rpx;
				margin-top: 20rpx;
				margin-left: 10rpx;
				display: flex;
				flex-direction: column;
				border:1rpx solid #ececec;
				padding: 6rpx;

				.example_image {
					width: 100rpx;
					height: 100rpx;
				}
				
				.example-view {
					display: flex;
					margin-top: 10rpx;
					
					.example_text {
						font-size: 20rpx;
						margin: auto 0 auto auto;
					}
					.example_search {
						margin: auto auto auto 4rpx;
						width: 25rpx;
						height: 25rpx;
					}
				}

				

			}
		}
	}

	.btn_submit {
		height: 100rpx;
		position: absolute;
		top: 1500rpx;
		border-radius: 20rpx;
		background: #237ded;
		width: 697rpx;
		margin-bottom: 50rpx;
		left: 27rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.bottom_empty_layout {
		width: 100%;
		height: 50rpx;
		position: absolute;
		top: 1600rpx;
	}
</style>