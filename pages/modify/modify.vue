<template>
	<view class="wrap">
		<uni-nav-bar height="88rpx" :border="false" fixed statusBar background-color="#247CEE">
			<template v-slot:left>
				<image class="back" src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_back_gray.png"
					@click="backAction"></image>
			</template>
			<template>
				<view class="title-view">
					<text class="title">纠错</text>
					<view class="mine-modify-view" @click="mineModifyAction">
						<text class="modify">我的纠错</text>
					</view>
				</view>
			</template>
		</uni-nav-bar>
		<view class="content-view">
			<view class="errorTypeTip">
				<text>报错类型</text>
			</view>
			<view class="option-bg">
				<view v-for="(item,index) in optionList" :key="index" class="option-wrap" @click="optionAction(item)">
					<view class="option-view">
						<image :src="$util.ossImagePath('/learn/ic_modify_sel.png')" v-if="item.isSelected"></image>
						<image :src="$util.ossImagePath('/learn/ic_modify_unsel.png')" v-else></image>
						<text>{{item.title}}</text>
					</view>
				</view>
			</view>
			<view class="feedback-view">
				<uni-easyinput type="textarea" v-model="feedback" placeholder="您的耐心指点,是我们前进的动力"
					placeholderStyle="font-size:30rpx;" maxlength="200" trim :inputBorder="false"></uni-easyinput>
				<view class="num-view">
					<text>{{feedback.length + '/200'}}</text>
				</view>
			</view>
			<view class="submit-view" @click="submitAction">
				<text>提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		subject
	} from '../../common/util';

	export default {
		data() {
			return {
				optionList: [],
				feedback: '',
				subject: 0,
				serialNumber: 0,
				isSkill: false,
				questionId: '',
				selectedId: 1,
			};
		},
		onLoad(option) {
			this.subject = subject(this) //parseInt(option.subject)
			this.serialNumber = parseInt(option.serialNumber)
			this.isSkill = option.isSkill == "true"
			this.questionId = option.questionId
			this.initOptionData();
		},
		methods: {
			initOptionData() {
				var list = []
				var model1 = {
					title: '题干有误',
					id: 1,
					isSelected: true,
				}
				list.push(model1)
				var model2 = {
					title: '答案有误',
					id: 2,
					isSelected: false,
				}
				list.push(model2)
				if (this.isSkill) {
					var model3 = {
						title: '技巧不好用',
						id: 3,
						isSelected: false,
					}
					list.push(model3)
				}
				var model4 = {
					title: '图片不清晰',
					id: 4,
					isSelected: false,
				}
				list.push(model4)
				this.optionList = list
			},
			backAction() {
				uni.navigateBack()
			},
			mineModifyAction() {
				uni.navigateTo({
					url: '/pages/modify/mine-modify-list'
				});
			},
			optionAction(item) {
				for (var i = 0; i < this.optionList.length; i++) {
					var obj = this.optionList[i]
					if (obj.id == item.id) {
						obj.isSelected = true
						this.selectedId = obj.id;
					} else {
						obj.isSelected = false
					}
				}
			},
			submitAction() {
				var that = this
				if (this.$util.isNullVal(this.feedback)) {
					uni.showToast({
						title: '请输入有效文字哦~',
						icon: 'none'
					});
					return
				}
				const carTypeObj = uni.getStorageSync('carTypeObj');
				const user = uni.getStorageSync('user');
				let params = {
					carType: carTypeObj.carType,
					course: that.subject,
					content: that.feedback,
					questionId: that.questionId,
					serialNumber: that.serialNumber,
					type: that.selectedId,
					userId: user.id
				}
				that.$u.api.createCorrectItem(params)
					.then(res => {
						if (res.code == 200) {
							uni.showToast({
								title: '提交完成，感谢您的反馈',
								icon: 'none'
							});
							setTimeout(function() {
								that.backAction()
							}, 3000);
						}
					})
			}
		},

	}
</script>

<style lang="scss">
	.wrap {
		width: 100%;
		height: 100%;
		background-color: #f4f7f9;

		.back {
			width: 20rpx;
			height: 36rpx;
		}

		.title-view {
			display: flex;
			width: 100%;
			color: white;
			position: relative;

			.title {
				margin: auto;
				font-size: 32rpx;
			}

			.mine-modify-view {
				display: flex;
				position: absolute;
				top: 24rpx;
				right: 36rpx;

				.modify {
					margin: auto;
					font-size: 28rpx;
				}
			}
		}

		.content-view {
			.errorTypeTip {
				padding: 20rpx;

				text {
					font-size: 30rpx;
				}
			}

			.option-bg {
				background-color: white;
				padding: 20rpx 0;

				.option-wrap {
					display: inline-block;
					width: 50%;
					margin-bottom: 40rpx;

					.option-view {
						display: flex;

						image {
							width: 35rpx;
							height: 32rpx;
							margin: auto 0 auto 20rpx;
						}

						text {
							font-size: 30rpx;
							margin: auto 0 auto 20rpx;
						}
					}
				}
			}

			.feedback-view {
				margin-top: 20rpx;
				background-color: white;
				padding: 10rpx 20rpx 10rpx 20rpx;

				.num-view {
					width: 100%;
					text-align: right;

					text {
						font-size: 24rpx;
						color: #666666;
					}
				}
			}

			.submit-view {
				margin: 60rpx 75rpx 0 75rpx;
				background-color: #13BAF9;
				display: flex;
				width: 600rpx;
				height: 80rpx;
				border-radius: 10rpx;

				text {
					font-size: 32rpx;
					color: white;
					margin: auto;
				}
			}
		}

		.uni-easyinput__content-textarea {
			font-size: 30rpx !important;
			height: 300rpx !important;
		}
	}
</style>