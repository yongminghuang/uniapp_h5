<template>
	<page-meta :page-style="'overflow:'+(isShowPageMeta?'hidden':'visible')"></page-meta>
	<view>
		<view class="top_warp"></view>
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
			<view class="all_count_warp">
				<label>共{{data.allQuestionNum}}题</label>
			</view>
			<view class="extra_info_warp" v-if="data.locQuestionNum >0">
				<label class="">(含{{data.locQuestionNum}}道{{city}}地方题)</label>
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
	</view>
</template>

<script>
	import {
		toSkillPage
	} from '../../../common/page-route';
	import {
		getArrayClassId
	} from '../../../common/request';
	export default {
		data() {
			return {
				subject: "科目一",
				selectedCarType: '小车',
				isShowCarTypePopup: false,
				isShowSwitchSubjectPoppup: false,
				isShowPageMeta: false,
				data: {
					"allQuestionNum": 0,
					"locQuestionNum": 0,
					"index": 0,
					"classifyNo": "0",
					"classifyIds": ["1415565933356777786"]
				},
				isLearned: false,
				subjectInt: 1,
			}
		},
		onLoad(option) {
			// this.currentCityObj = this.$store.state.vuex_user_cityinfo;
			this.carTypeAction();
			if (this.$util.subject() == 4) {
				this.subject = "科目四";
			} else if (this.$util.subject() == 5) {
				this.subject = "扣满12分";
			}
			this.queryData();
			var subject = option.subject
			if (!this.$util.isNullVal(subject)) {
				this.subjectInt = parseInt(subject)
				if (this.subjectInt == 4) {
					this.subject = "科目四";
				} else {
					this.subject = "科目一";
				}
			}
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
				if (this.$util.subject() == 4) {
					this.subject = "科目四";
				} else {
					this.subject = "科目一";
				}
				if (originSubject != this.subject) {
					this.queryData();
				}
			},
			queryData() {
				var carType = this.$util.carType();
				const subject = this.$util.subject();
				const cityNo = this.$util.cityNo(this);
				if (subject == 5) {
					carType = 1
				}
				let params = {
					carType: carType,
					subject: subject,
					cityNo: cityNo,
				}
				this.$u.api.lrjkQueryClassify(params).then(res => {
					if (res.code == 200) {
						this.data = res.body;
						this.getSaveLearnedData();
					}
				})
			},
			getSaveLearnedData() {
				let saveData = uni.getStorageSync(this.data.classifyIds.join("-"));
				if (saveData) {
					this.isLearned = saveData.current;
				}
			},
			// 车型弹窗组件状态变化
			carTypePopupChangeAction(value) {
				this.isShowPageMeta = value;
			},
			startLearn() {
				toSkillPage(this.data.classifyIds, true, this.subjectInt)
			},
			resume() {
				let saveData = {
					current: 0,
					hadLearnedList_1000: Array(1000).fill(0),
					hadLearnedList_2000: Array(1000).fill(0),
					learnedList: Array(2000).fill(0),
				}
				uni.setStorageSync(this.data.classifyIds.join("-"), saveData);
				this.startLearn();
			}
		}
	}
</script>

<style lang="scss">
	.top_warp {
		width: 100%;
		height: 120rpx;
		background: #237ded;
	}

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
				font-size: 30rpx;
				color: #666666;
			}

			.content {
				font-size: 30rpx;
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
		}
	}
</style>