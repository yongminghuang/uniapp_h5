<template>
	<view>
		<view class="top_blue"></view>
		<uni-card class="pass_rate_card">
			<view class="predict_pass_rate_wrap">预测考试通过率</view>
			<view class=".pass_rate_wrap">{{passRate}}%</view>
		</uni-card>

		<view class="light_red_bg">
			<view class="pass_rate_text">{{passRateHint}}</view>
			<view class="to_learn_warp" @click="toLearn">去练题</view>
		</view>

		<uni-card>
			<view class="exam_situation_warp">
				<view class="exam_situation_text">模考情况</view>
				<view class="to_exam_wrap" @click="toExam">
					<view>去考试</view>
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/arrow_right_normal.png"></image>
				</view>
			</view>
			<view class="exam_data_wrap">
				<view class="exam_data_layout">
					<view class="content">{{examCount}}次</view>
					<view class="title">考试次数</view>
				</view>
				<view class="exam_data_layout">
					<view class="content">{{averageScore5}}分</view>
					<view class="title">近5次考试平均分</view>
				</view>
				<view class="exam_data_layout">
					<view class="content">{{passRate}}%</view>
					<view class="title">预测通过率</view>
				</view>
			</view>
		</uni-card>

		<uni-card>
			<view class="history_score_warp">
				<view class="history_score_text">历史成绩</view>
				<checkbox-group @change="onCheckbox">
					<checkbox class="checkbox_text" :checked="isChecked" style="transform:scale(0.8)"
						border-color="#8a8a8a">只看好成绩</checkbox>
				</checkbox-group>
			</view>
			<uni-list v-if="getList.length >0">
				<uni-list-item>
					<template slot="body" class="content_wrap">
						<view class="body_wrap" v-for="item  in getList" v-bind:key="item">
							<view class="score"> {{item.score}}分</view>
							<view class="time"> {{getTime(item)}}</view>
							<view class="time"> {{item.createTime.substring(0,10)}}</view>
							<view class="result"> {{getResult(item)}}</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<view class="record_tip_wrap">{{showMore}}</view>
		</uni-card>

	</view>
</template>

<script>
	import {
		getArrayClassId
	} from '../../common/request.js'
	import {
		toExamPage,
		toSkillPage
	} from '../../common/page-route.js'
	export default {
		data() {
			return {
				isChecked: false,
				passRate: 0,
				passRateTextColor: "#FC6164",
				passRateHint: "",
				listAll: [],
				list20: [],
				list5: [],
				goodScoreList: [],
				examCount: "-",
				averageScore5: 0,
			};
		},
		onLoad() {
			this.getPassRatePrediction();
			this.getMokaoRecord();
		},
		computed: {
			showMore() {
				if (this.isChecked) {
					if (this.goodScoreList && this.goodScoreList.length > 0) {
						return "仅显示近20条考试记录";
					} else {
						return "暂无记录";
					}
				} else {
					if (this.listAll && this.listAll.length > 0) {
						return "仅显示近20条考试记录";
					} else {
						return "暂无记录";
					}
				}
			},
			getList() {
				if (this.isChecked) {
					return this.goodScoreList;
				} else {
					return this.listAll;
				}
			}
		},
		methods: {
			toExam() {
				toExamPage(true)
			},
			onCheckbox() {
				this.isChecked = !this.isChecked;
			},
			getPassRatePrediction() {
				let subject = this.$util.subject(this);
				let param = {
					subject: subject
				}
				this.$u.api.passRatePrediction(param).then(
					res => {
						if (res.code == 200) {
							this.passRate = res.body;
							if (this.passRate < 80) {
								this.passRateTextColor = "#FC6164";
								this.passRateHint = `今天多练100题，预测通过率达到${this.passRate + 5}%`
							} else {
								this.passRateTextColor = "#237DED";
								this.passRateHint = `通过率较高，继续练题巩固吧！`
							}
						}
					});
			},
			getMokaoRecord() {
				let subject = this.$util.subject(this);
				let param = {
					subject: subject
				}
				this.$u.api.queryMkRecord(param).then(
					res => {
						if (res.code == 200) {
							this.listAll = res.body;
							this.examCount = this.listAll.length + "";
							this.list20 = this.listAll.slice(0, 20);
							this.list5 = this.listAll.slice(0, 5);
							if (Array.isArray(this.list5)) {
								this.averageScore5 = this.list5.reduce((a, b) => a + b, 0) / 5;
							}
							if (Number.isNaN(this.averageScore5)) {
								this.averageScore5 = 0
							}
							let tempGoodScoreList = this.listAll.filter(item =>
								item.score >= 75
							);
							this.goodScoreList = tempGoodScoreList.slice(0, 20);
						}
					});
			},
			getTime(item) {
				let timeArrays = item.costTime.split(":");
				if (timeArrays.length > 1) {
					return timeArrays[0] + "分" + timeArrays[1] + "秒";
				} else {
					return item.costTime;
				}
			},
			getResult(item) {
				if (item.score >= 90) {
					return "优秀学员"
				}
				if (item.score >= 75) {
					return "潜力学员"
				}
				return "不及格";
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
			}
		}
	}
</script>

<style lang="scss">
	.pass_rate_card {
		display: flex;
		flex-direction: column;
	}

	.predict_pass_rate_wrap {
		margin-top: 20rpx;
		text-align: center;
		font-weight: bold;
		font-size: 35rpx;
		color: #222222;
	}

	.pass_rate_wrap {
		margin-top: 30rpx;
		margin-bottom: 20rpx;
		text-align: center;
		font-size: 70rpx;
		color: #09A6FE;
	}

	.top_blue {
		position: fixed;
		top: 0;
		width: 100%;
		height: 150rpx;
		z-index: -1;
		background: #1C90F6;
	}

	.light_red_bg {
		margin-left: 27rpx;
		margin-right: 27rpx;
		padding: 15rpx 20rpx;
		background: #FFF3F3;
		align-items: center;
		border-radius: 15rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.pass_rate_text {
			font-size: 25rpx;
			color: #FE6063;
		}

		.to_learn_warp {
			font-size: 25rpx;
			border-radius: 30rpx;
			color: #fff;
			padding: 10rpx 20rpx;
			background: #FE6063;
		}
	}

	.exam_situation_warp {
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.exam_situation_text {
			color: #222222;
			font-weight: bold;
			font-size: 35rpx;

		}

		.to_exam_wrap {
			display: flex;
			flex-direction: row;
			color: #999999;
			font-size: 30rpx;
			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}

	.exam_data_wrap {
		margin-top: 30rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		.exam_data_layout {
			.content {
				text-align: center;
				color: #09A6FE;
				font-size: 40rpx;
			}

			.title {
				margin-top: 10rpx;
				color: #666666;
				font-size: 30rpx;
			}
		}
	}

	.history_score_warp {
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.history_score_text {
			color: #222222;
			font-weight: bold;
			font-size: 35rpx;

		}

		.checkbox_text {
			font-size: 35rpx;

		}

		.good_score_wrap {


			.good_score_checkbox {
				width: 50rpx;
				height: 50rpx;
				display: flex;
				flex-direction: row;
				color: #999999;
				font-size: 30rpx;
				align-items: center;
			}
		}
	}

	.content_wrap {
		width: 100%;

		.body_wrap {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: space-around;
			justify-content: space-evenly;

			.score {
				font-size: 30rpx;
				font-weight: bold;
			}

			.time {
				font-size: 30rpx;
			}

			.result {
				font-size: 30rpx;
				font-weight: bold;
				font-size: 30rpx;
			}
		}
	}

	.record_tip_wrap {
		color: #999999;
		font-size: 28rpx;
		margin-top: 20rpx;
		text-align: center;
	}
</style>