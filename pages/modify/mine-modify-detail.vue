<template>
	<view class="wrap">
		<uni-nav-bar height="88rpx" :border="false" fixed statusBar background-color="#247CEE">
			<template v-slot:left>
				<image class="back" src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_back_gray.png" @click="backAction"></image>
			</template>
			<template>
				<view class="title-view">
					<text class="title">我的纠错</text>
				</view>
			</template>
		</uni-nav-bar>
		<view class="content-view" v-if="item != null">
			<view class="row-wrap">
				<view class="time-view">
					<text class="time">{{item.createTime}}</text>
				</view>
				<view class="status-view" :class="item.operationResults == 0 ? '' : 'status-view-sel'">
					<text>{{item.operationResults == 0 ? '待处理' : '已处理'}}</text>
				</view>
				<view class="type-view">
					<text>{{item.type | typeFil}}</text>
				</view>
				<view class="text-view">
					<text>{{item.content}}</text>
				</view>
				<view class="result-view" v-if="item.operationResults == 1">
					<view class="result-title">处理结果：</view>
					<view class="result-text">{{item.notes}}</view>
				</view>
			</view>
			<view class="topic-wrap">
				<view class="title-wrap">
					<image :src="$util.ossImagePath('/learn/ic_question_type_0.png')" v-if="item.questionType==0">
					</image>
					<image :src="$util.ossImagePath('/learn/ic_question_type_1.png')" v-else-if="item.questionType==1">
					</image>
					<image :src="$util.ossImagePath('/learn/ic_question_type_2.png')" v-else></image>
					<text>{{item.title}}</text>
				</view>
				<view class="image-wrap" v-if="!$util.isNullVal(item.qImageUrl)">
					<image :src="item.picUrl" mode="widthFix"></image>
				</view>
				<view class="option-wrap">
					<view class="option-row">
						<view class="option-view">
							<image :src="$util.ossImagePath('/learn/icon_check_bg.png')"></image>
							<view class="option">A</view>
						</view>
						<view class="option-text">{{item.option1}}</view>
					</view>
					<view class="option-row">
						<view class="option-view">

							<image :src="$util.ossImagePath('/learn/icon_check_bg.png')"></image>
							<view class="option">B</view>
						</view>
						<view class="option-text">{{item.option2}}</view>
					</view>
					<view class="option-row" v-if="!$util.isNullVal(item.option3)">
						<view class="option-view">

							<image :src="$util.ossImagePath('/learn/icon_check_bg.png')"></image>
							<view class="option">C</view>
						</view>
						<view class="option-text">{{item.option3}}</view>
					</view>
					<view class="option-row" v-if="!$util.isNullVal(item.option4)">
						<view class="option-view">
							<image :src="$util.ossImagePath('/learn/icon_check_bg.png')"></image>
							<view class="option">D</view>
						</view>
						<view class="option-text">{{item.option4}}</view>
					</view>
				</view>
				<view class="answer-wrap">
					<view class="answer-view">
						<text>{{answer}}</text>
					</view>
					<view class="skill-view" v-if="item.type == 3">
						<view class="skill-tip-view">
							:src="$util.ossImagePath('/learn/line_left_tag.png')"
							<image :src="$util.ossImagePath('/learn/line_left_tag.png')"></image>
							<view>速记技巧</view>
						</view>
						<view class="skill">{{item.skillText}}</view>
						<image :src="item.skillPicUrl" v-if="!$util.isNullVal(item.skillImgUrl)" mode="widthFix"
							class="skill-img"></image>
					</view>
				</view>
			</view>
		</view>
		<view :style="spaceStyle"></view>
	</view>
</template>

<script>
	import {
		settingAnswer
	} from '../../common/logic.js'
	export default {
		data() {
			return {
				item: null,
				answer: '',
				spaceStyle: '',
			};
		},
		filters: {
			typeFil: function(value) {
				var typeStr = ''
				switch (value) {
					case 1:
						typeStr = '题干有误'
						break;
					case 2:
						typeStr = '答案有误'
						break;
					case 3:
						typeStr = '技巧不好用'
						break;
					case 4:
						typeStr = '图片不清晰'
						break;
					default:
						break;
				}
				return typeStr
			},
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom;
			this.spaceStyle = 'height:' + bottomSafeHeight + 'px;';
		},
		onLoad() {
			var that = this;
			const eventChannel = this.getOpenerEventChannel();
			// 监听videoObj事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('modifyObj', function(data) {
				that.item = data;
				that.answer = '答案：' + settingAnswer(parseInt(that.item.answer))
			})
		},
		methods: {
			backAction() {
				uni.navigateBack()
			},
		}
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
		}

		.content-view {
			.row-wrap {
				width: 710rpx;
				margin: 20rpx;
				position: relative;
				background-color: white;
				padding: 20rpx;
				border-radius: 10rpx;
				box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.5);

				.time-view {
					font-size: 24rpx;
				}

				.status-view {
					position: absolute;
					top: 0;
					right: 0;
					width: 150rpx;
					height: 50rpx;
					display: flex;
					background-color: #f5f5f5;

					text {
						margin: auto;
						color: black;
						font-size: 24rpx;
					}
				}

				.status-view-sel {
					background-color: #62D385;

					text {
						color: white;
					}
				}

				.type-view {
					margin-top: 40rpx;
					font-size: 28rpx;
					font-weight: bold;
				}

				.text-view {
					margin-top: 40rpx;
					font-size: 24rpx;
				}

				.result-view {
					margin-top: 40rpx;

					.result-title {
						font-size: 28rpx;
						font-weight: bold;
					}

					.result-text {
						margin-top: 40rpx;
						font-size: 24rpx;
					}
				}
			}

			.topic-wrap {
				padding: 40rpx 20rpx 40rpx 20rpx;

				.title-wrap {
					image {
						width: 72rpx;
						height: 36rpx;
						margin-right: 10rpx;
					}

					text {
						font-size: 30rpx;

					}
				}

				.image-wrap {
					width: 100%;
					margin-top: 20rpx;

					image {
						width: 100%;
					}
				}

				.option-wrap {
					margin-top: 20rpx;

					.option-row {
						display: flex;

						.option-view {
							display: flex;
							position: relative;
							margin: auto 0;

							image {
								width: 90rpx;
								height: 90rpx;
								margin: auto 0;
							}

							.option {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								font-size: 32rpx;
							}
						}

						.option-text {
							font-size: 32rpx;
							margin: auto 0 auto 20rpx;
						}
					}
				}

				.answer-wrap {
					margin-top: 20rpx;

					.answer-view {
						text {
							font-size: 36rpx;
							font-weight: bold;
						}
					}

					.skill-view {
						margin-top: 20rpx;

						.skill-tip-view {
							display: flex;

							image {
								width: 6rpx;
								height: 30rpx;
								margin: auto 0;
							}

							view {
								font-size: 32rpx;
								font-weight: bold;
								margin: auto 0 auto 20rpx;
							}
						}

						.skill {
							font-size: 30rpx;
							margin-top: 20rpx;
						}

						.skill-img {
							width: 100%;
							margin-top: 20rpx;
						}
					}
				}
			}
		}
	}
</style>