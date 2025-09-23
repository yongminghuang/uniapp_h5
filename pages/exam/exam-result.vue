<template>
	<view class="wrap">
		<image class="bg_top_image" :src="$util.ossImagePath('/exam/bg_top.png')"></image>
		<view class="body_wrap" :style="{paddingTop:`${statusBarHeight}px`}">
			<view class="title_layout" :style="{
		 height: `${barHeight + statusBarHeight}px`, paddingTop:`${statusBarHeight}px` }">
				<view class="back_layout" @click="toBack">
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_back_gray.png" mode="widthFix"></image>
				</view>
				<text class="title-view">

				</text>
			</view>
			<view class="content_wrap">
				<view class="right_rate_wrap">
					<view class="rate_text"> {{score}} </view>
					<view class="rate_tip_text">{{scoreResult}}</view>
				</view>

				<view class="info_wrap">{{costTime}}</view>
			</view>
			<uni-card class="review_card" padding="30rpx 0rpx">
				<view class="review_wrap">
					<view class="icon_lable_wrap" @click="toReview">
						<image class="left_icon" :src="$util.ossImagePath('/exam/zzc00.png')"></image>
						<text>回顾试卷</text>
					</view>
					<view class="review_div"></view>
					<view class="icon_lable_wrap" @click="toError">
						<image class="left_icon" :src="$util.ossImagePath('/exam/zzc01.png')"></image>
						<text>本次错题</text>
					</view>

				</view>
			</uni-card>

			<view class="analyse_card" padding="0">
				<view class="analyse_title_wrap">
					<view class="left_exam_wrap">本次考试分析</view>
					<view class="right_exam_wrap" @click="restartExam">重新考试</view>
				</view>
				<view class="box_warp">
					<view class="box">
						<text class="top_text">{{noDoneCount}}</text>
						<text class="bottom_text">未答题</text>
					</view>
					<view class="box">
						<text class="top_text">{{rightRate}}%</text>
						<text class="bottom_text">{{rightRateHint}}</text>
					</view>
					<view class="box">
						<text class="top_text">99</text>
						<text class="bottom_text">答案速度</text>
					</view>

				</view>
				<view class="learn_btn" @click="toLearn">
					去练题，快速提分
				</view>
				<view class="btn_submit2" @click="toHistoryScore">历史成绩</view>
				<view class="learn_hint_text">今天多练80题，预计下次考试提升5分</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getArrayClassId,
	} from '../../common/request.js'
	import {
		toErrorPageFromMKExam,
		toExamPage,
		toMkRecordPage,
		toReviewMkExamPage,
		toSkillPage
	} from '../../common/page-route';
	export default {
		data() {
			return {
				statusBarHeight: 0,
				barHeight: 0,
				noDoneCount: 0,
				rightRate: 0,
				rightRateHint: "正确率低",
				speed: "快",
				score: 0,
				scoreResult: "不及格",
				costTime: "00分07秒",
				errorCount: 0,
			}
		},
		onLoad() {
			let data = uni.getStorageSync("lastMKScore");
			this.costTime = data.costTime;
			this.score = data.score;
			this.scoreResult = data.scoreResult;
			this.speed = data.speed;
			this.errorCount = data.errorCount;
			this.noDoneCount = data.allCount - data.rightCount - data.errorCount;
			if (data.rightCount + data.errorCount == 0) {
				this.rightRate = 0
			} else {
				this.rightRate = parseInt(data.rightCount * 100 / (data.rightCount + data.errorCount))
			}

			if (this.rightRate > 50) {
				this.rightRateHint = "正确率高";
			} else {
				this.rightRateHint = "正确率低";
			}
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			// 状态栏高度
			let statusBarHeight = systemInfo.statusBarHeight
			// 胶囊区域坐标
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// 导航栏的高度 = (胶囊底部高度-状态栏的高度)+(胶囊顶部高度-状态栏的高度)*2
			let navHeight = (menuButtonInfo.bottom - statusBarHeight) + (menuButtonInfo.top - statusBarHeight) * 2
			// 导航栏和状态栏的高度
			this.statusBarHeight = statusBarHeight
			this.barHeight = navHeight
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			async toLearn() {
				if (this.$util.isVip(this)) {
					uni.navigateTo({
						url: "/page_learn/pages/learn/skill-ready-page/skill-ready-page"
					})
				} else {
					let classIds = await getArrayClassId(this)
					if (classIds) {
						toSkillPage(classIds);
					}
				}
			},
			toHistoryScore() {
				toMkRecordPage();
			},
			restartExam() {
				toExamPage();
			},
			toReview() {
				toReviewMkExamPage();
			},
			toError() {
				if (this.errorCount == 0) {
					uni.showToast({
						title: "真棒，没有错题哟"
					})
					return;
				}
				toErrorPageFromMKExam()
			}
		},

	}
</script>

<style lang="scss">
	.wrap {
		position: relative;
		width: 100%;
	}

	.bg_top_image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 600rpx;
		z-index: -1;
	}

	.title_layout {
		position: fixed;
		background-color: transparent;
		display: flex;
		flex-direction: row;
		// height: calc(var(--status-bar-height) + 40rpx);
		width: 100%;
		left: 0;
		top: 0;
		// padding-top: calc(var(--status-bar-height) + 40rpx);
		justify-content: center;
		align-items: center;
		z-index: 2;
		// justify-content: center;
		// align-items: center;

		.back_layout {
			padding-left: 35rpx;
			padding-right: 10rpx;
			padding-top: 10rpx;

			image {
				width: 25rpx;
			}
		}

		.title-view {
			justify-content: center;
			align-items: center;
			text-align: center;
			font-size: 36rpx;
			width: 100%;
			color: #fff;
		}
	}

	.body_wrap {
		display: flex;
		flex-direction: column;
	}

	.content_wrap {
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		z-index: 1;

		.right_rate_wrap {
			margin-top: 50rpx;
			border-radius: 130rpx;
			border-width: 10rpx;
			border-color: #ffffff99;
			border-style: solid;
			width: 260rpx;
			height: 260rpx;
			justify-self: center;
			align-self: center;
			display: flex;
			flex-direction: column;

			.rate_text {
				margin-top: 40rpx;
				justify-self: center;
				align-self: center;
				color: #fff;
				font-size: 80rpx;
				font-weight: bold;
			}

			.rate_tip_text {
				margin-top: 10rpx;
				justify-self: center;
				align-self: center;
				color: #FFF;
				font-size: 36rpx;

			}
		}

		.info_wrap {
			margin-top: 20rpx;
			color: #fff;
			font-size: 28rpx;
			justify-self: center;
			align-self: center;
		}
	}

	.review_card {
		padding: 0;
		width: 700rpx;
		align-self: center;

	}

	.review_wrap {

		width: 600rpx;
		// height: 100rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		.icon_lable_wrap {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;

			.left_icon {
				width: 50rpx;
				height: 60rpx;
			}

			text {
				margin-left: 20rpx;
				color: #666666;
				font-weight: bold;
				font-size: 30rpx;
			}
		}

		.review_div {
			width: 2rpx;
			height: 80rpx;
			background: #f3f7f9;
		}
	}

	.analyse_card {
		margin-top: 50rpx;
		border-radius: 20rpx;
		width: 620rpx;
		align-self: center;
		box-shadow: 0 0 12px 0px #666666;
		padding-bottom: 50rpx;
		display: flex;
		flex-direction: column;
	}

	.analyse_title_wrap {
		background: #F3F3F399;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 70rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;

		.left_exam_wrap {
			margin-left: 20rpx;
			color: #06A9F9;
			font-size: 30rpx;
		}

		.right_exam_wrap {
			margin-right: 20rpx;
			border: 2rpx solid #06A9F9;
			border-radius: 50rpx;
			padding: 10rpx 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			color: #06A9F9;
			width: 120prx;
			height: 50rpx;
		}
	}

	.box_warp {
		margin-top: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;

		.box {
			width: 120rpx;
			height: 120rpx;
			background: #E2F5FF99;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;

			.top_text {
				color: #666666;
				font-size: 35rpx;
			}

			.bottom_text {
				color: #666666;
				font-size: 28rpx;
			}
		}
	}

	.learn_btn {
		margin-top: 30rpx;
		padding: 18rpx 0;
		width: 500rpx;
		align-self: center;
		border-radius: 50rpx;
		background: #06A9F9;
		color: #fff;
		justify-content: center;
		text-align: center;
		align-items: center;
		font-size: 35rpx;
	}

	.learn_hint_text {
		margin-top: 10rpx;
		color: #FC741B;
		font-size: 24rpx;
		align-self: center;
	}

	.btn_submit2 {
		align-self: center;
		margin-top: 20rpx;
		height: 80rpx;
		border-radius: 40rpx;
		border: 2px solid #969696;
		background: #fff;
		width: 500rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #969696;
	}
</style>