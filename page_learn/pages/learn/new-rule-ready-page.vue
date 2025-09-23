<template>
	<page-meta :page-style="'overflow:'+(isShowPageMeta?'hidden':'visible')"></page-meta>
	<view>

		<uni-card class="card_warp">
			<view class="card_row">
				<label class="hint">车型：</label>

				<label class="content" @click="this.isShowCarTypePopup = true">{{selectedCarType}}</label>
				<image class="eidt_icon" :src="$util.ossImagePath('/learn/edit_pencil.png')"
					@click="this.isShowCarTypePopup = true">
				</image>
			</view>
			<view class="card_row">
				<label class="hint">科目：</label>
				<label class="content" @click="this.isShowSwitchSubjectPoppup = true">{{subject}}</label>
				<image class="eidt_icon" :src="$util.ossImagePath('/learn/edit_pencil.png')"
					@click="this.isShowSwitchSubjectPoppup = true">
				</image>
			</view>
			<view class="card_row">
				<label class="hint">城市：</label>
				<label class="content" @click="cityAction">{{city}}</label>
				<image class="eidt_icon" :src="$util.ossImagePath('/learn/edit_pencil.png')" @click="cityAction">
				</image>
			</view>

			<view>
				<view class="btn_submit" @click="startLearn">{{isLearned ? "继续练习":"开始练习"}}</view>
			</view>
			<view>
				<view class="btn_submit2" v-if="isLearned" @click="resume">重新练题</view>
			</view>
		</uni-card>
		<car-type-popup :isshow="isShowCarTypePopup" @closeAction="isShowCarTypePopup = false;"
			@carTypeAction="carTypeAction" @changeAction="carTypePopupChangeAction">
		</car-type-popup>


		<subject-switch-popup :isshow="isShowSwitchSubjectPoppup" @closeAction="isShowSwitchSubjectPoppup = false;"
			@subjectAction="subjectAction" @changeAction="carTypePopupChangeAction">
		</subject-switch-popup>
		<view class="bottom_wrap">
			<view class="title_wrap">
				<view class="option_bg">问</view>
				<label>新规试题调整了哪些考点？</label>
			</view>
			<view class="content_wrap">
				<view class="option_bg">答</view>
				<label>根据最新《机动车驾驶培训教学与考试大纲》要求，调整了:</label>
			</view>
			<view class="answer_wrap">
				1、驾驶证电子版申领和使用规定<br>2、驾驶证违规申领及考试的法律责任<br>3、交通违法行为记分分值及执行规定<br>4、满分处理规定<br>5、记分减免规定
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBigClassIdBySubject
	} from '../../../common/request';
	import {
		subject
	} from '../../../common/util';
	import {
		toLearnPage
	} from '../../common/page-route';
	import {
		getArrayClassId,
		getBigClassId
	} from '../../common/request';
	export default {
		data() {
			return {
				subject: "科目一",
				selectedCarType: '小车',
				isShowCarTypePopup: false,
				isShowSwitchSubjectPoppup: false,
				isShowPageMeta: false,
				data: {
					"classifyId": "1509766479299293186",
					"classifyType": "newRegulations",
					"classifyName": "新规题目"
				},
				isLearned: false,

			}
		},
		onLoad() {
			// this.currentCityObj = this.$store.state.vuex_user_cityinfo;
			this.carTypeAction();
			if (this.$util.subject() == 4) {
				this.subject = "科目四";
			}
			this.queryData();
		},
		computed: {
			city() {
				this.queryData();
				// this.currentCityObj = this.$store.state.vuex_user_cityinfo;
				return this.$store.state.vuex_user_cityinfo.cityName;
			}
		},
		methods: {
			// 城市
			cityAction() {
				uni.navigateTo({
					url: '/pages/city/city'
				});
			},
			carTypeAction() {
				const obj = uni.getStorageSync('carTypeObj');
				this.selectedCarType = obj.title;
				this.queryData();
			},
			subjectAction() {
				let originSubject = this.subject;
				if (this.$util.subject(this) == 4) {
					this.subject = "科目四";
				} else {
					this.subject = "科目一";
				}
				if (originSubject != this.subject) {
					this.queryData();
				}
			},
			async queryData() {
				// try {
				// 	var sub = subject(this)
				// 	if (sub == 5) {
				// 		sub = 1;
				// 	}
				// 	let classifyObj = await getBigClassIdBySubject(this, "新规题目", sub);
				// 	if (classifyObj) {
				// 		this.data = classifyObj;
				// 		// toLearnPage([classifyObj.classifyId])
				// 	} else {
				// 		uni.showToast({
				// 			title: "无数据，请联系客服"
				// 		})
				// 	}
				// } catch (e) {
				// 	console.error(e)
				// }
			},
			getSaveLearnedData() {
				let saveData = uni.getStorageSync(this.data.classifyId);
				if (saveData) {
					this.isLearned = saveData.current;
				}
			},
			// 车型弹窗组件状态变化
			carTypePopupChangeAction(value) {
				this.isShowPageMeta = value;
			},
			async startLearn() {
				try {
					var sub = 1
					if (this.subject == "科目四") {
						sub = 4;
					}
					let classifyObj = await getBigClassIdBySubject(this, "新规题目", sub);
					if (classifyObj) {
						this.data = classifyObj;
						toLearnPage([this.data.classifyId], true, '新规题目')
					} else {
						uni.showToast({
							title: "无数据，请联系客服"
						})
					}
				} catch (e) {
					console.error(e)
				}

			},
			resume() {
				let saveData = {
					current: 0,
					hadLearnedList_1000: Array(1000).fill(0),
					hadLearnedList_2000: Array(1000).fill(0),
					learnedList: Array(2000).fill(0),
				}
				uni.setStorageSync(this.data.classifyId, saveData);
				this.startLearn();
			}
		}
	}
</script>

<style lang="scss">
	.card_warp {
		width: 90%;
		margin-top: 50rpx;
		border-radius: 10rpx;

		.card_row {
			margin-left: 100rpx;
			margin-top: 30rpx;
			display: flex;
			flex-direction: row;

			.hint {
				font-size: 40rpx;
				color: #666666;
			}

			.content {
				font-size: 40rpx;
				color: #000000;
				text-decoration: underline;
			}

			.eidt_icon {
				margin-left: 20rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}

		.all_count_warp {
			margin-top: 10rpx;
			margin-left: 200rpx;
			color: #666666;
			font-size: 30rpx;
		}

		.extra_info_warp {
			margin-top: 10rpx;
			margin-left: 200rpx;
			color: #666666;
			font-size: 30rpx;
		}


		.btn_submit {
			margin-top: 30rpx;
			height: 80rpx;
			border-radius: 20rpx;
			background: #237ded;
			width: 600rpx;
			margin-bottom: 40rpx;
			left: 27rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: white;
			font-size: 40rpx;
		}

		.btn_submit2 {
			margin-top: 30rpx;
			height: 80rpx;
			border-radius: 20rpx;
			border: 1px solid #237ded;
			background: #fff;
			width: 600rpx;
			margin-bottom: 40rpx;
			left: 27rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #237ded;
			font-size: 40rpx;
		}
	}

	.bottom_wrap {
		margin-top: 20rpx;
		margin-left: 27rpx;
		padding: 20rpx;
		background: #E9F3FF;
		width: 90%;
		margin-top: 50rpx;
		border-radius: 10rpx;

		.title_wrap {
			margin-left: 27rpx;
			margin-top: 20rpx;
			width: 90%;

			justify-content: start;
			align-items: center;
			display: flex;
			flex-direction: row;
			position: relative;

			.option_bg {
				// margin-left: 20rpx;
				width: 50rpx;
				height: 50rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				border-radius: 25rpx;
				background: #237ded;
				font-weight: bold;
				color: #fff;
				font-size: 28rpx;
			}

			label {
				font-weight: bold;
				margin-left: 10rpx;
				font-size: 35rpx;
			}
		}

		.content_wrap {
			margin-left: 27rpx;
			margin-top: 20rpx;
			width: 90%;

			justify-content: start;
			display: flex;
			flex-direction: row;
			position: relative;

			.option_bg {
				// margin-left: 20rpx;
				width: 50rpx;
				height: 50rpx;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				border-radius: 25rpx;
				background: #237ded;
				font-weight: bold;
				color: #fff;
				font-size: 28rpx;
			}

			label {
				margin-left: 10rpx;
				font-size: 30rpx;
			}
		}

		.answer_wrap {
			margin-top: 20rpx;
			margin-left: 60rpx;
			font-size: 28rpx;
		}
	}
</style>