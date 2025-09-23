<template>
	<view>
		<view class="top_warp">
			<view class="avatar_wrap">
				<image class="avatar" :src="avatar" mode="widthFix"></image>
			</view>
			<view class="username_wrap">{{username}}</view>
			<view class="percent_wrap">
				<view class="percent_text" :style="{'color': `${passRateTextColor}`}">{{passRate}}</view>
				<view class="percent_symbol" :style="{'color': `${passRateTextColor}`}">%</view>
			</view>
		</view>
		<view class="pass_rate">预测考试通过率</view>
		<view class="bg_ready_tip">
			<image class="tip_icon" src="https://img.jx885.com/lrjk_uniapp/img/exam/icon_tips.png"></image>
			<view>请连续<span style="color: #FC6164;">3次95分以上</span>，再去考试！</view>
		</view>
		<view class="column_content">
			<view class="title_wrap">考试车型</view>
			<view class="content_wrap">{{getLearnCarType}}</view>
		</view>
		<view class="column_content">
			<view class="title_wrap">考试科目</view>
			<view class="content_wrap">{{subjectName}}</view>
		</view>
		<view class="column_content">
			<view class="title_wrap">考试时间</view>
			<view class="content_wrap">{{time}}分钟</view>
		</view>
		<view class="column_content">
			<view class="title_wrap">合格标准</view>
			<view class="content_wrap">90分</view>
		</view>
		<view class="column_content">
			<view class="title_wrap">出题规则</view>
			<view class="content_wrap">根据交管局出题规则</view>
		</view>
		<view class="score_rule_warp">计分规则：模拟考试下不能修改答案，每做错1道题扣{{deductPoint}}分，合格标准为90</view>
		<view>
			<view class="btn_submit" @click="toExam">全真模拟</view>
		</view>
		<view class="btn_submit2" @click="toRecord">模考记录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "未登录",
				time: 45,
				userinfo: {},
				avatar: "",
				subjectName: "科目一",
				deductPoint: 1,
				passRate: 0,
				passRateTextColor: "#FC6164",
			}
		},
		onLoad() {
			this.userinfo = uni.getStorageSync('user');
			if (this.userinfo && this.userinfo.nickName) {
				this.username = this.userinfo.nickName;
			}
			if (this.userinfo && this.userinfo.headImgUrl) {
				this.avatar = this.userinfo.headImgUrl;
			} else {
				this.avatar = "https://img.jx885.com/lrjk_uniapp/img/mine/ic_default_avatar.png";
			}
			let subject = this.$util.subject(this);
			if (subject == 1) {
				this.subjectName = "科目一";
			} else if (subject == 5) {
				this.subjectName = "满分学习";
			} else {
				this.subjectName = "科目四";
			}

			let carType = this.$util.carType(this)
			if (subject == 4 || carType == 4) {
				this.deductPoint = 2;
			} else {
				this.deductPoint = 1;
			}

			if (carType == 4) {
				this.time = 30;
			} else {
				this.time = 45;
			}

			this.getPassRate(subject);
		},
		computed: {
			getLearnCarType() {
				let carTypeObj = uni.getStorageSync('carTypeObj');
				return carTypeObj.title + "-" + carTypeObj.subTitle;
			}
		},
		methods: {
			getPassRate(subject) {
				let param = {
					subject: subject
				}
				this.$u.api.passRatePrediction(param).then(
					res => {
						if (res.code == 200) {
							this.passRate = res.body;
							if (this.passRate < 80) {
								this.passRateTextColor = "#FC6164";
							} else {
								this.passRateTextColor = "#237DED";
							}
						}
					});
			},
			toRecord() {
				uni.navigateTo({
					url: "/pages/exam/exam-record"
				})
			},
			toExam() {
				uni.navigateTo({
					url: "/pages/exam/exam-page"
				})
			}
		}
	}
</script>

<style lang="scss">
	.top_warp {
		padding-left: 100rpx;
		padding-top: 80rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
	}

	.avatar_wrap {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		padding: 1px;
		border: 2rpx solid #E8C872;
		display: flex;

		.head_avatar {
			width: 100%;
			height: 100%;
		}
	}

	.username_wrap {
		width: 300rpx;
		color: #333333;
		font-size: 35rpx;
		margin-left: 10rpx;
	}

	.percent_wrap {
		position: fixed;
		right: 150rpx;
		display: flex;
		flex-direction: row;

		.percent_text {
			color: #FC6164;
			font-size: 60rpx;
			align-self: flex-end;
		}

		.percent_symbol {
			align-self: flex-end;
			color: #FC6164;
			font-size: 40rpx;
			margin-bottom: 5rpx;
		}
	}

	.pass_rate {
		color: #969696;
		position: fixed;
		font-size: 25rpx;
		right: 100rpx;
	}

	.bg_ready_tip {
		background: #FFF3F3;
		border-radius: 30rpx;
		width: 500rpx;
		height: 80rpx;
		margin-top: 90rpx;
		margin-left: 100rpx;
		margin-bottom: 50rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #969696;
		font-size: 27rpx;

		.tip_icon {
			width: 30rpx;
			height: 30rpx;
			margin-left: 25rpx;
			margin-right: 30rpx;
			align-self: center;
		}
	}

	.column_content {
		margin-top: 20rpx;
		margin-left: 100rpx;
		display: flex;
		flex-direction: row;

		.title_wrap {
			color: #333333;
			font-size: 35rpx;
		}

		.content_wrap {
			margin-left: 100rpx;
			color: #666666;
			font-size: 35rpx;
		}
	}

	.score_rule_warp {
		margin-top: 30rpx;
		padding: 0 100rpx;
		color: #b3b3b3;
		font-size: 35rpx;
	}

	.btn_submit {
		margin-top: 30rpx;
		margin-left: 100rpx;
		height: 90rpx;
		border-radius: 40rpx;
		background: #237ded;
		width: 520rpx;
		margin-bottom: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 36rpx;
	}

	.btn_submit2 {
		margin-top: 30rpx;
		margin-left: 100rpx;
		height: 90rpx;
		border-radius: 40rpx;
		border: 2px solid #969696;
		background: #fff;
		width: 520rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #969696;
		font-size: 36rpx;
	}
</style>