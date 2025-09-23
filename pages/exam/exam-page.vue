<template>
	<view class="wrap">
		<uni-nav-bar height="88rpx" :border="false" background-color="#FFF" fixed statusBar>
			<template v-slot:left>
				<uni-icons type="left" color="#9BA6BC" size="25" @click="toBack"></uni-icons>
			</template>

			<view class="title-view">
				<text class="title">倒计时 {{formattedMinutes}}:{{formattedSeconds}}</text>
			</view>

		</uni-nav-bar>
		<view>

			<swiper class="swiper" :style="{height: `${scrollHeight}px` }" :touchable="false" @change="onChange"
				:current="current">

				<swiper-item v-for="(item, index) in datas_100" :key="index">
					<scroll-view class="scroll_view_warp" :style="{height: `${scrollHeight}px` }" scroll-y="true">
						<view>
							<view class="title_layout">
								<!-- <mp-html :content="titleText(item)"></mp-html> -->

								<rich-text class="title_label" :nodes="titleText(item)" decoded></rich-text>
								<image class="image_question_type" :src="getQuestionType(item)" mode="widthFix">
								</image>

								<image v-if="item.newRuleFlag == 'Y'" class="image_new_rule_type"
									:src="$util.ossImagePath('/learn/ic_question_xg.png')" mode="widthFix">
								</image>
							</view>
							<view class="help_layout">

								<image class="help_read_question_icon"
									:src="$util.ossImagePath('/learn/learn_voice_receive_anime_3.png')" mode="widthFix"
									v-if="!isPlayReadQuestion" @click="readQuestion">
								</image>

								<image class="help_read_question_icon_2" :src="voicePic" mode="widthFix"
									v-if="isPlayReadQuestion" @click="readQuestion">
								</image>
								<label class="help_read_question_text" @click="readQuestion">读题</label>

								<!-- 	<image v-if="!isCollect" @click="addCollect()" class="help_collect_icon"
									src="https://img.jx885.com/lrjk_uniapp/img/learn/learn_left_collection_un.png" mode="widthFix">
								</image>
								<label v-if="!isCollect" @click="addCollect()" class="help_collect_text">收藏</label>
								<image v-if="isCollect" @click="removeCollect()" class="help_collect_icon"
									src="https://img.jx885.com/lrjk_uniapp/img/learn/learn_left_collection_un.png" mode="widthFix">
								</image>
								<label v-if="isCollect" @click="removeCollect()" class="help_collect_text">取消收藏</label>
							 -->
							</view>
							<!-- :src="$util.ossImagePath('/vip/bg_open_vip_top.png')" -->
							<image v-if="item.qImageUrl || item.qimageUrl" class="content_img"
								:src="getContentImg(item)" mode="widthFix">
							</image>
							<!-- v-for="(item,index) in item" v-bind:key="item.id" -->
							<view class="option_wrap">
								<view
									:class="item.option1 && item.option1.length > 14 ? `choose_layout2`:`choose_layout`"
									v-if="item.option1" @click="clickOption(item, 1)">
									<view class="option_bg">
										<image :src="optionA(item)"></image>
										<label v-if="showOptionA(item)" class="option_label">A</label>
									</view>

									<label> {{item.option1}}</label>

								</view>
								<view
									:class="item.option2 && item.option2.length > 14 ? `choose_layout2`:`choose_layout`"
									v-if="item.option2" @click="clickOption(item, 2)">
									<view class="option_bg">
										<image :src="optionB(item)"></image>
										<label v-if="showOptionB(item)" class="option_label">B</label>
									</view>
									<label> {{item.option2}}</label>
								</view>
								<view
									:class="item.option3 && item.option3.length > 14 ? `choose_layout2`:`choose_layout`"
									v-if="item.option3" @click="clickOption(item, 4)">
									<view class="option_bg">
										<image :src="optionC(item)"></image>
										<label v-if="showOptionC(item)" class="option_label">C</label>
									</view>
									<label> {{item.option3}}</label>

								</view>
								<view
									:class="item.option4 && item.option4.length > 14 ? `choose_layout2`:`choose_layout`"
									v-if="item.option4" @click="clickOption(item, 8)">
									<view class="option_bg">
										<image :src="optionD(item)"></image>
										<label v-if="showOptionD(item)" class="option_label">D</label>
									</view>
									<label> {{item.option4}}</label>
								</view>

								<view
									:class="item.questionType == 2 && hasTwoOrMoreOptions(item.pick) ? `multiple_btn_mul`:`multiple_btn`"
									v-if="item.questionType == 2&& !isHadLearned()" @click="mulClick(item)">
									<label>确定</label>
								</view>
							</view>
							<view class="answer_skill_layout">
								<view class="answer_layout" v-if="isHadLearn">
									<label decoded>答案<span
											style="color: #09A6FE; font-size: 30rpx;margin-right: 30rpx;">{{getAnswer(item.answer)}}</span>
										你选择<span v-if="getAnswer(item.answer) == getYourSelectedAnswer"
											style="color: #09A6FE; font-size: 30rpx; margin-left: 10rpx;">{{getYourSelectedAnswer}}</span>
										<span v-if="getAnswer(item.answer) != getYourSelectedAnswer"
											style="color: #FE6063; font-size: 30rpx; margin-left: 10rpx;">{{getYourSelectedAnswer}}</span>
									</label>
								</view>
								<view class="category_skill_layout" v-if="isHadLearn">

									<view class="category_skill_wrap">
										<label class="category_skill_label">本题技巧</label>
										<view class="vip_bg">

											<image class="vip_icon"
												:src="$util.ossImagePath('/fast-learn/bg_skill_vip.png')"></image>
											<label>VIP专享</label>
										</view>
									</view>

									<view>
										<view class="free_count_label" v-if="!isVip && freeTime > 0">
											<rich-text class="title_label">剩余{{freeTime}}次体验机会</rich-text>
										</view>
										<view class="free_count_label" v-if="!isVip && freeTime <= 0">
											<rich-text class="title_label">免费机会已用完</rich-text>
										</view>
									</view>

								</view>
								<view class="learn_skill_layout" v-if="isHadLearn">
									<!-- <mp-html :content="skillText(item)"></mp-html> -->
									<rich-text class="skill_explain" :nodes="skillText(item)"></rich-text>
									<view class="no_vip_skill" v-if="!isVip && !isContain(item.jkbdId)">
										<text @click="toOpenVIP"> 查看速记技巧</text>

										<image :src="$util.ossImagePath('/fast-learn/icon_skill_show_more.png')">
										</image>
									</view>
								</view>
							</view>
							<view class="category_skill_layout" v-if=" isHadLearn">

								<label class="category_office_label">官方解释</label>
								<view class="correction_warp" @click="toCorrection(item)">
									纠错
								</view>
							</view>
							<view class="office_text" v-if="item.officialExpl &&  isHadLearn">
								<!-- <mp-html :content="item.officialExpl"></mp-html> -->
								<rich-text class="title_label" :nodes="officialExpl(item)"></rich-text>

							</view>
							<view class="bottom_view"></view>
						</view>
					</scroll-view>
				</swiper-item>

			</swiper>

			<uni-transition ref="ani" custom-class="transition" :mode-class="modeClass" :show="showLoveIcon"
				:styles="{}" @change="handleTransitionChange">
				<!-- <text class="text">示例元素</text> -->

				<image class="love_icon" :src="$util.ossImagePath('/learn/answer_right_good.png')">
				</image>
			</uni-transition>

			<view class="bottom_bar" :style="{'bottom': `${bottomSafeHeight}px`}">
				<!-- <view class="bottom_icon_label" @click="clickPrevious">
					<image class="left_button" src="https://img.jx885.com/lrjk_uniapp/img/learn/ic_bottom_left.png"></image>
					<label class="left_label">上一题</label>
				</view> -->
				<view class="bottom_right_error_layout" @click="showLearnProgressPopupAction">
					<view class="right_error_layout">

						<image :src="$util.ossImagePath('/learn/learn_left_right.png')"></image>
						<label>{{getRightCount}}</label>
					</view>
					<view class="right_error_layout">
						<image :src="$util.ossImagePath('/learn/learn_left_err.png')"></image>
						<label>{{getErrorCount}}</label>
					</view>
				</view>

				<view class="bottom_pass_rate_label">
					<view class="pass_rate_label">{{getRightRate}}%</view>
					<label>正确率</label>
				</view>

				<view class="bottom_icon_label" @click="showLearnProgressPopupAction">
					<image :src="$util.ossImagePath('/learn/ic_bottom_menu.png')"></image>
					<label>{{current +1}}/{{getRuleListSize}}</label>
				</view>

				<view class="bottom_examover_label" @click="showExamOverTipPopAction">

					<image :src="$util.ossImagePath('/fast-learn/learn_left_exam_over.png')"></image>
					<label>交卷</label>
				</view>

				<view class="bottom_collect_label">
					<image v-if="!isCollect" @click="addCollect()" class="help_collect_icon"
						:src="$util.ossImagePath('/learn/learn_left_collection_un.png')" mode="widthFix">
					</image>
					<label v-if="!isCollect" @click="addCollect()" class="help_collect_text">收藏</label>
					<image v-if="isCollect" @click="removeCollect()" class="collect_icon"
						:src="$util.ossImagePath('/learn/learn_left_collection_un.png')" mode="widthFix">
					</image>
					<label v-if="isCollect" @click="removeCollect()" class="collect_text">收藏</label>
				</view>
				<!-- <view class="bottom_icon_label" @click="clickNext">
					<image src="https://img.jx885.com/lrjk_uniapp/img/learn/ic_bottom_right.png"></image>
					<label>下一题</label>
				</view> -->
			</view>
			<view class="bottom_empty" :style="{'height': `${bottomSafeHeight}px`}"></view>
			<skill-play-popup :isshow="isShowExplanationPopup" @closeAction="closeExplanationPopupAction"
				:skillData="item">
			</skill-play-popup>
			<exam-progress-popup :isshow="isShowLearnProgressPopup" :ruleList_1000="ruleList_1000"
				:ruleList_2000="ruleList_2000" :ruleListSize="ruleListSize" :hadLearnedList_1000="hadLearnedList_1000"
				:current="current" :hadLearnedList_2000="hadLearnedList_2000" @clickNext="clickNext"
				@clickPosition="clickPosition" @clickPrevious="clickPrevious"
				@closeAction="closeLearnProgressPopupAction" @addCollect="addCollect" @removeCollect="removeCollect"
				@toExamOver="examOverAction" :isCollect="isCollect">
			</exam-progress-popup>
			<end-question-popup :isshow="isShowEndQuestionPoppup" @closeAction="isShowEndQuestionPoppup = false;"
				@restart="resume">
			</end-question-popup>
			<exam-over-tip-popup :isshow="isShowExamOverTipPopUp" @closeAction="closeExamOverTipPopUp"
				:score="getRightRate" @examOverAction="examOverAction">
			</exam-over-tip-popup>
			<open-vip-popup :isshow="isShowOpenVipPopup" title="开通会员" @closeAction="closeOpenVipPopupAction">
			</open-vip-popup>

		</view>

	</view>
</template>

<script>
	import {
		toSkillReuslt
	} from '../../common/page-route';
	import {
		carType,
		isVip,
		ossImagePath,
		skillFreeQuestionIds,
		skillFreeTime,
		subject
	} from '../../common/util';
	export default {
		data() {
			return {
				mkData: [],
				datas_100: [],
				datas_200: [],
				datas_300: [],
				datas_400: [],
				datas_500: [],
				datas_600: [],
				datas_700: [],
				datas_800: [],
				datas_900: [],
				datas_1000: [],
				datas_1100: [],
				datas_1200: [],
				datas_1300: [],
				datas_1400: [],
				datas_1500: [],
				datas_1600: [],
				datas_1700: [],
				datas_1800: [],
				datas_1900: [],
				datas_2000: [],
				current: 0,
				// item: {},
				isCollect: false,
				isFetchDatas: Array(2000).fill(0), //0表示未获取，1表示已获取
				learnedList: Array(2000).fill("0"),
				hadLearnedList_1000: Array(1000).fill(0), //0表示未练题，1表示练题正确，2表示练题错误
				hadLearnedList_2000: Array(1000).fill(0),
				ruleList_1000: [],
				ruleList_2000: [],
				ruleListSize: 0,
				isShowLearnProgressPopup: false,
				isShowExplanationPopup: false,
				isShowEndQuestionPoppup: false,
				isShowExamOverTipPopUp: false,
				isShowOpenVipPopup: false,
				pageSize: 100,
				innerAudioContext: null,
				timerId: null,
				picIndex: 0,
				isPlayReadQuestion: false,
				collectMap: {},
				isVip: false,
				freeTime: 0,
				freeQuestionIds: [],
				fromType: 0, //0错题页，1收藏题, underfined 是做题页，
				subject: 1,
				countdownTime: 0, // 倒计时时间（单位：分钟）
				totalSecond: 0,
				totalTimeInSeconds: 0, // 总秒数
				formattedMinutes: '00', // 格式化的分钟数
				formattedSeconds: '00', // 格式化的秒数
				countdownInterval: null, // 倒计时的定时器
				showLoveIcon: false,
				modeClass: 'fade',
				scrollHeight: 0,
				isIosPlatform: false,
				bottomSafeHeight: 0,
			}
		},
		onLoad(option) {
			const systemInfo = uni.getSystemInfoSync();
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			this.bottomSafeHeight = bottomSafeHeight;
			// systemInfo.screenHeight - uni.upx2px(120) - bottomSafeHeight - 200 60rpx
			let statusBarHeight = systemInfo.statusBarHeight
			this.scrollHeight = systemInfo.screenHeight - uni.upx2px(120) - bottomSafeHeight - uni.upx2px(40) -
				statusBarHeight
			this.freeTime = skillFreeTime()
			this.freeQuestionIds = skillFreeQuestionIds()
			this.getCityMock();
			this.getCollectMap();
			let countTime = 45;
			if (this.$util.carType(this) == 4) {
				countTime = 30;
			}
			this.startCountdown(countTime);
			this.searchVipStatus();
			this.isIosPlatform = uni.getSystemInfoSync().platform == 'ios'

		},
		computed: {
			isHadLearn() {
				if (this.current < 1000) {
					return this.hadLearnedList_1000[this.current] != 0
				} else {
					return this.hadLearnedList_2000[this.current - 1000] != 0
				}
			},
			voicePic() {
				switch (this.picIndex) {
					case 1:
						return ossImagePath('/learn/learn_voice_receive_anime_1.png')

					case 2:
						return ossImagePath('/learn/learn_voice_receive_anime_2.png')

					case 3:
						return ossImagePath('/learn/learn_voice_receive_anime_3.png')

					case 4:
						return ossImagePath('/learn/learn_voice_receive_anime_4.png')

					default:
						return ossImagePath('/learn/learn_voice_receive_anime_5.png')

				}

			},
			getCurrentItemData() {
				if (this.current < 100) {
					this.item = this.datas_100[this.current];
				} else if (this.current < 200) {
					this.item = this.datas_200[this.current - 100];
				} else if (this.current < 300) {
					this.item = this.datas_300[this.current - 200];
				} else if (this.current < 400) {
					this.item = this.datas_400[this.current - 300];
				} else if (this.current < 500) {
					this.item = this.datas_500[this.current - 400];
				} else if (this.current < 600) {
					this.item = this.datas_600[this.current - 500];
				} else if (this.current < 700) {
					this.item = this.datas_700[this.current - 600];
				} else if (this.current < 800) {
					this.item = this.datas_800[this.current - 700];
				} else if (this.current < 900) {
					this.item = this.datas_900[this.current - 800];
				} else if (this.current < 1000) {
					this.item = this.datas_1000[this.current - 900];
				} else if (this.current < 1100) {
					this.item = this.datas_1100[this.current - 1000];
				} else if (this.current < 1200) {
					this.item = this.datas_1200[this.current - 1100];
				} else if (this.current < 1300) {
					this.item = this.datas_1300[this.current - 1200];
				} else if (this.current < 1400) {
					this.item = this.datas_1400[this.current - 1300];
				} else if (this.current < 1500) {
					this.item = this.datas_1500[this.current - 1400];
				} else if (this.current < 1600) {
					this.item = this.datas_1600[this.current - 1500];
				} else if (this.current < 1700) {
					this.item = this.datas_1700[this.current - 1600];
				} else if (this.current < 1800) {
					this.item = this.datas_1800[this.current - 1700];
				} else if (this.current < 1900) {
					this.item = this.datas_1900[this.current - 1800];
				} else {
					this.item = this.datas_2000[this.current - 1900];
				}
				if (this.item && this.item.jkbdId) {
					this.isCollect = this.collectMap[this.item.jkbdId];
				}

				return this.item
			},
			getRuleListSize() {
				let length_1000 = this.ruleList_1000.length ? this.ruleList_1000.length : 0;
				let length_2000 = this.ruleList_2000.length ? this.ruleList_2000.length : 0;
				this.ruleListSize = length_1000 + length_2000;
				return this.ruleListSize;
			},

			getErrorCount() {
				return this.hadLearnedList_1000.filter(item => item === 1).length +
					this.hadLearnedList_2000.filter(item => item === 1).length;
			},
			getRightCount() {
				return this.hadLearnedList_1000.filter(item => item === 2).length +
					this.hadLearnedList_2000.filter(item => item === 2).length;
			},
			isContainFreeQuestion() {
				return this.item && this.isContain(this.item.jkbdId)
			},
			getYourSelectedAnswer() {
				let answer = this.learnedList[this.current];
				var number = 0;
				if (typeof(answer) == 'string') {
					number = parseInt(answer)
				} else {
					number = answer
				}
				var text = "A";
				switch (number) {
					case 1:
						text = "A";
						break;
					case 2:
						text = "B";
						break;
					case 4:
						text = "C";
						break;
					case 8:
						text = "D";
						break;
					case 3:
						text = "AB";
						break;
					case 5:
						text = "AC";
						break;
					case 6:
						text = "BC";
						break;
					case 7:
						text = "ABC";
						break;
					case 9:
						text = "AD";
						break;
					case 10:
						text = "BD";
						break;
					case 11:
						text = "ABD";
						break;
					case 12:
						text = "CD";
						break;
					case 13:
						text = "ACD";
						break;
					case 14:
						text = "BCD";
						break;
					case 15:
						text = "ABCD";
						break;
					default:
						text = "A";
						break;

				}
				return text;
			},
			getRightRate() {
				let all = this.learnedList.filter(num => num > 0).length;
				let right = this.hadLearnedList_1000.filter(item => item === 2).length;
				if (all == 0) {
					return 0;
				}
				return parseInt(right * 100 / all);
			}
		},
		methods: {
			optionA(item) {
				return this.getOptionCheckBg(item, 1);
			},
			optionB(item) {
				return this.getOptionCheckBg(item, 2);
			},
			optionC(item) {
				return this.getOptionCheckBg(item, 4);
			},
			optionD(item) {
				return this.getOptionCheckBg(item, 8);
			},
			showOptionA(item) {
				return this.isShowOptionText(item, 1)
			},
			showOptionB(item) {
				return this.isShowOptionText(item, 2)
			},
			showOptionC(item) {
				return this.isShowOptionText(item, 4)
			},
			showOptionD(item) {
				return this.isShowOptionText(item, 8)
			},
			getQuestionType(item) {
				if (item.questionType == 1) {
					return ossImagePath('/learn/ic_question_type_1.png')
				} else if (item.questionType == 2) {
					return ossImagePath('/learn/ic_question_type_2.png')
				} else {
					return ossImagePath('/learn/ic_question_type_0.png')
				}
			},
			hasTwoOrMoreOptions(value) {
				if (value == undefined) {
					return false;
				}
				// 转换为二进制字符串（如 5 -> '101'）
				const binaryStr = value.toString(2);
				// 统计 '1' 的数量
				const count = (binaryStr.match(/1/g) || []).length;
				// 如果 '1' 的数量 ≥ 2，则返回 true
				return count >= 2;
			},
			isContainOption(item, option) {
				if (item == undefined) {
					return false;
				}
				return (item & option) !== 0;
			},
			isHadLearned() {
				if (this.hadLearnedList_1000[this.current] !== 0) {
					return true;
				}
				return false;
			},
			handleTransitionChange(e) {
				if (e.detail.visible === false) {
					this.showLoveIcon = false
				}
			},
			playLoveAni() {
				this.showLoveIcon = !this.showLoveIcon
				this.$refs.ani.step({
					translateY: '100px',
					scale: 2.5,
					opacity: 0
				}, {
					timingFunction: 'ease',
					duration: 500
				})
				let that = this;
				this.$refs.ani.run()
				setTimeout(function() {
					that.showLoveIcon = false;
					// that.current++;
					// that.clickNext();
				}, 500);

			},
			closeOpenVipPopupAction() {
				this.isShowOpenVipPopup = false;
				this.searchVipStatus()
			},
			searchVipStatus() {
				this.isVip = isVip(this)
			},
			toOpenVIP() {
				this.isShowOpenVipPopup = true;
			},
			toBack() {
				let length = this.hadLearnedList_1000.filter(item => item !== 0).length
				if (length == 0) {
					uni.navigateBack();
				} else {
					this.showExamOverTipPopAction();
				}

			},
			onChange(event) {
				let {
					current,
					source
				} = event.detail;
				// debugger
				if (source == 'touch') {
					this.current = current;
					this.item = this.datas_100[this.current]
					this.isCollect = this.collectMap[this.item.jkbdId] || false;
				}

			},
			getCollectMap() {
				let params = {
					carType: carType(this),
					subject: subject(this),
					// type: 1
				}
				let that = this;
				this.$u.api.queryList(params)
					.then(res => {
						if (res.code == 200) {
							let tempList = res.body;
							tempList.map(item => {
								that.collectMap[item.questionId] = true;
							})

						}
					})
			},
			getCostTime() {
				let costTimeNumber = this.totalSecond - this.totalTimeInSeconds;
				if (costTimeNumber > 60) {
					let min = parseInt(costTimeNumber / 60);
					let second = costTimeNumber % 60;
					let costTimeStr = "";
					if (min < 10) {
						costTimeStr += "0" + min;
					} else {
						costTimeStr += min;
					}
					costTimeStr += "分";
					if (second < 10) {
						costTimeStr += "0" + second;
					} else {
						costTimeStr += second;
					}
					costTimeStr += "秒";
					return costTimeStr;
				} else {
					let costTimeStr = "00分";
					if (costTimeNumber < 10) {
						costTimeStr += "0" + costTimeNumber;
					} else {
						costTimeStr += costTimeNumber;
					}
					costTimeStr += "秒";
					return costTimeStr;
				}
			},
			getCostTime2() {
				let costTimeNumber = this.totalSecond - this.totalTimeInSeconds;
				if (costTimeNumber > 60) {
					let min = parseInt(costTimeNumber / 60);
					let second = costTimeNumber % 60;
					let costTimeStr = "";
					if (min < 10) {
						costTimeStr += "0" + min;
					} else {
						costTimeStr += min;
					}
					costTimeStr += ":";
					if (second < 10) {
						costTimeStr += "0" + second;
					} else {
						costTimeStr += second;
					}

					return costTimeStr;
				} else {
					let costTimeStr = "00:";
					if (costTimeNumber < 10) {
						costTimeStr += "0" + costTimeNumber;
					} else {
						costTimeStr += costTimeNumber;
					}
					return costTimeStr;
				}
			},
			getScore() {
				let size = this.datas_100.length;
				let right = this.hadLearnedList_1000.filter(item => item === 2).length
				let score = 0;
				if (size == 100) {
					score = right;
				} else if (size == 50) {
					score = right * 2
				}
				if (score > 100) {
					score = 100;
				}
				return score;
			},
			uploadRecord() {
				let params = {
					subject: this.$util.subject(this),
					costTime: this.getCostTime2(),
					answerRight: this.hadLearnedList_1000.filter(item => item === 2).length,
					answerError: this.hadLearnedList_1000.filter(item => item === 1).length,
					score: this.getScore(),
					dataSize: this.datas_100.length,
					carType: this.$util.carType(this),
					modelTestType: 1,
				}

				this.$u.api.uploadRecord(params)
					.then(res => {
						if (res.code == 200) {

						}
					})
			},
			examOverAction() {
				let score = this.getScore();
				let scoreResult = "优秀";
				if (score < 90) {
					scoreResult = "不合格";
				} else if (score < 95) {
					scoreResult = "合格";
				} else {
					scoreResult = "优秀";
				}
				let speed = "快";
				if (this.totalSecond - this.totalTimeInSeconds > 30 * 60) {
					speed = "中";
				}
				let data = {
					score: score,
					scoreResult: scoreResult,
					costTime: this.getCostTime(),
					speed: speed,
					rightCount: this.hadLearnedList_1000.filter(item => item === 2).length,
					errorCount: this.hadLearnedList_1000.filter(item => item === 1).length,
					allCount: this.datas_100.length
				};
				uni.setStorageSync('lastMKErrorData', this.hadLearnedList_1000)
				uni.setStorageSync('lastMKScore', data)
				uni.setStorageSync('lastMkData', this.mkData)
				this.uploadRecord();
				uni.redirectTo({
					url: "/pages/exam/exam-result"
				})
			},
			addCollect() {
				this.collectMap[this.item.jkbdId] = true;
				this.isCollect = true;
				let params = {
					questionId: this.item.jkbdId,
					questionId2: this.item.id,
					carType: carType(this),
					subject: subject(this),
					type: 1,
					choose: 0,
				}
				let that = this;
				this.$u.api.saveQuestion(params)
					.then(res => {
						if (res.code == 200) {

							uni.showToast({
								title: "已存入收藏"
							})
						}
					})
			},
			addError() {
				if (this.fromType == 0 || this.fromType == 1) {
					return
				}
				let params = {
					questionId: this.item.jkbdId,
					questionId2: this.item.id,
					carType: carType(this),
					subject: subject(this),
					type: 0,
					choose: 0,
				}
				let that = this;
				this.$u.api.saveQuestion(params)
					.then(res => {
						if (res.code == 200) {

							uni.showToast({
								title: "错题已存入错题库"
							})
						}
					})
			},
			removeCollect() {

				this.isCollect = false;
				this.collectMap[this.item.jkbdId] = false;

				let params = {
					questionId: this.item.jkbdId,
					carType: carType(this),
					subject: subject(this),
					type: 1
				}
				let that = this;
				this.$u.api.removeQuestion(params)
					.then(res => {
						if (res.code == 200) {

						}
					})
			},

			getErrorCollectQuestionList() {
				let params = {
					carType: carType(this),
					subject: subject(this),
					type: this.fromType
				}
				let that = this;
				this.$u.api.errorCollectQueryQuestion(params)
					.then(res => {
						if (res.code == 200) {
							let tempList = res.body;
							let list = [];

							let removeList = tempList.map(item => {
								delete item.jkbdId
								delete item.lrId
								if (item.newRuleFlag == "N") {
									list.push(0)
								} else {
									list.push(1)
								}
								return item
							})
							// that.ruleSize = list.length;
							that.ruleList_1000 = list.slice(0, 1000);
							that.ruleList_2000 = list.slice(1000);

							this.datas_100 = res.body.slice(0, 100);
							this.datas_200 = res.body.slice(100, 200);
							this.datas_300 = res.body.slice(200, 300);
							this.datas_400 = res.body.slice(300, 400);
							this.datas_500 = res.body.slice(400, 500);
							this.datas_600 = res.body.slice(500, 600);
							this.datas_700 = res.body.slice(600, 700);
							this.datas_800 = res.body.slice(700, 800);
							this.datas_900 = res.body.slice(800, 900);
							this.datas_1000 = res.body.slice(900, 1000);
							this.datas_1100 = res.body.slice(1000, 1100);
							this.datas_1200 = res.body.slice(1100, 1200);
							this.datas_1300 = res.body.slice(1200, 1300);
							this.datas_1400 = res.body.slice(1300, 1400);
							this.datas_1500 = res.body.slice(1400, 1500);
							this.datas_1600 = res.body.slice(1500, 1600);
							this.datas_1700 = res.body.slice(1600, 1700);
							this.datas_1800 = res.body.slice(1700, 1800);
							this.datas_1900 = res.body.slice(1800, 1900);
							this.datas_2000 = res.body.slice(1900);
						}
					})
			},
			getCityMock() {
				let params = {
					carType: this.$util.carType(this),
					subject: this.$util.subject(this),
					cityNo: this.$util.cityNo(this),
				}
				let that = this;
				this.$u.api.cityMock(params)
					.then(res => {
						if (res.code == 200) {
							this.mkData = res.body;
							this.datas_100 = res.body;
							let list = [];
							let removeList = res.body.map(item => {
								list.push(0)
								return item
							})
							// that.ruleSize = list.length;
							that.ruleList_1000 = list.slice(0, 1000);
							that.ruleList_2000 = list.slice(1000);
						}
					})
			},
			startCountdown(inputTime) {

				// 设置倒计时时间
				this.countdownTime = inputTime;

				// 计算总秒数
				this.totalSecond = this.countdownTime * 60;
				this.totalTimeInSeconds = this.countdownTime * 60;

				// 初始化倒计时
				this.updateCountdown();

				// 每秒钟更新倒计时
				this.countdownInterval = setInterval(this.updateCountdown, 1000);
			},
			updateCountdown() {
				// 计算剩余分钟数和秒数
				const minutes = Math.floor(this.totalTimeInSeconds / 60);
				const seconds = this.totalTimeInSeconds % 60;

				// 格式化分钟数和秒数（保持两位数显示）
				this.formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
				this.formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

				// 减少剩余时间
				this.totalTimeInSeconds--;

				// 倒计时结束时停止更新
				if (this.totalTimeInSeconds < 0) {
					clearInterval(this.countdownInterval);
					this.formattedMinutes = '00';
					this.formattedSeconds = '00';
					// 倒计时结束后的操作
					// TODO: 添加倒计时结束后的逻辑
				}
			},
			getOptionCheckBg(item, option) {
				if (item.questionType == 2) {
					if (this.learnedList[this.current] == 0) {
						if (item && this.isContainOption(item.pick, option)) {
							return ossImagePath('/learn/learn_left_right.png')
						}
						return ossImagePath('/learn/icon_check_bg.png')
						// "page_learnhttps://img.jx885.com/lrjk_uniapp/img/learn/icon_check_bg.png"
					} else {
						// this.isHadLearned()
						if (item && this.isContainOption(item.answer, option)) {
							return ossImagePath('/learn/learn_left_right.png')
						} else if (item && this.isContainOption(item.pick, option)) {
							return ossImagePath('/learn/learn_left_err.png')
						}
						return ossImagePath('/learn/icon_check_bg.png')
						// return "page_learnhttps://img.jx885.com/lrjk_uniapp/img/learn/icon_check_bg.png"
					}
				} else {
					if (this.learnedList[this.current] == 0) {
						return ossImagePath('/learn/icon_check_bg.png')
					} else {
						if (this.item && this.item.answer == option) {
							return ossImagePath('/learn/learn_left_right.png')
						} else if (this.learnedList[this.current] == option) {
							return ossImagePath('/learn/learn_left_err.png')
						}
						return ossImagePath('/learn/icon_check_bg.png')
					}
				}
			},
			isShowOptionText(item, option) {
				if (item.questionType == 2) {
					if (this.learnedList[this.current] == 0) {
						if (this.isContainOption(item.pick, option)) {
							return false
						} else {
							return true;
						}
					} else {
						if (this.isContainOption(item.answer, option)) {
							return false
						} else if (this.isContainOption(item.pick, option)) {
							return false
						}
						return true
					}
				} else {
					if (this.learnedList[this.current] == 0) {
						return true;
					} else {
						if (item && item.answer == option) {
							return false
						} else if (this.learnedList[this.current] == option) {
							return false
						}
						return true
					}
				}
			},
			readQuestion() {

				if (this.innerAudioContext) {
					try {
						this.innerAudioContext.pause();
						this.innerAudioContext.destroy()
						this.innerAudioContext = null
					} catch (e) {
						console.error("readQuestion:" + e)
					}
				}
				this.innerAudioContext = uni.createInnerAudioContext();
				let innerAudioContext = this.innerAudioContext;
				innerAudioContext.autoplay = true;
				innerAudioContext.src = "https://img.jx885.com/lrjk" + this.item.audioUrl;
				innerAudioContext.onPlay(() => {
					this.isPlayReadQuestion = true;
					console.log('开始播放');
					this.stopTimer();
					this.startTimer();
				});
				innerAudioContext.onError((res) => {
					this.isPlayReadQuestion = false;
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				innerAudioContext.onStop(() => {
					console.log("onStop");
					this.isPlayReadQuestion = false;
					this.picIndex = 0;
					this.stopTimer();
				});
				innerAudioContext.onEnded(() => {
					console.log("onEnded");
					this.isPlayReadQuestion = false;
					this.picIndex = 0;
					this.stopTimer();
				});
				innerAudioContext.play();
			},
			stopAudio() {

				if (this.innerAudioContext) {
					this.innerAudioContext.stop();
				}
				this.isPlayReadQuestion = false;
				this.picIndex = 0;
				this.stopTimer();
			},
			startTimer() {
				let that = this;
				this.timerId = setInterval(() => {
					that.picIndex = (that.picIndex + 1) % 5;
				}, 200);
			},
			stopTimer() {
				if (this.timerId) {
					clearInterval(this.timerId);
				}
			},
			clickPrevious() {
				let origin = this.current;

				if (this.current <= 0) {
					this.current = 0;
				} else {
					this.current--;
				}
				if (origin != this.current) {
					this.stopAudio();
				}
				this.saveLearnedData();
			},
			clickNext() {
				let origin = this.current;
				if (this.current >= this.ruleListSize - 1) {
					this.current = this.ruleListSize - 1;
					this.isShowExamOverTipPopUp = true;
				} else {
					this.current++;
				}
				if (origin != this.current) {
					this.stopAudio();
				}
				this.saveLearnedData();
			},
			clickPosition(position) {
				let origin = this.current;
				this.current = position;
				if (origin != this.current) {
					this.stopAudio();
				}
				this.saveLearnedData();
			},
			isContain(element) {
				for (var i = 0; i < this.freeQuestionIds.length; i++) {
					if (this.freeQuestionIds[i] == element) {
						return true
					}
				}
				return false;
			},
			useFreeTime() {
				if (this.isVip) {
					return
				}
				//免费次数
				if (this.freeTime > 0 && !this.isContain(this.item.jkbdId)) {
					this.freeTime--;
					if (this.freeTime < 0) {
						this.freeTime = 0;
					}
					uni.setStorageSync("freeTime", this.freeTime);
					this.freeQuestionIds.push(this.item.jkbdId);
					uni.setStorageSync("freeQuestionIds", this.freeQuestionIds);
				}
			},
			mulClick(item) {
				if (this.current < 1000 && this.hadLearnedList_1000[this.current] !== 0) {
					return
				} else if (this.current >= 1000 && this.hadLearnedList_2000[this.current - 1000] !== 0) {
					return
				}
				let answer = item.pick
				let isTrue = 1;
				if (this.item && answer == this.item.answer) {
					isTrue = 2;

				} else {
					this.useFreeTime();
					this.addError();
				}
				this.learnedList.splice(this.current, 1, answer);
				if (this.current < 1000) {
					this.hadLearnedList_1000.splice(this.current, 1, isTrue);
				} else {
					this.hadLearnedList_2000.splice(this.current - 1000, 1, isTrue);
				}
				this.saveLearnedData();
				//自动切换题目
				if (isTrue == 2) {
					// this.playLoveAni();
					let that = this;
					setTimeout(function() {
						that.clickNext();
					}, 600)
				}
			},
			clickOption(item, answer) {
				if (this.current < 1000 && this.hadLearnedList_1000[this.current] !== 0) {
					return
				} else if (this.current >= 1000 && this.hadLearnedList_2000[this.current - 1000] !== 0) {
					return
				}
				if (item.questionType == 2) {
					if (item.pick == undefined) {
						item.pick = 0
					}
					if (this.isContainOption(item.pick, answer)) {
						let pick = item.pick - answer
						this.$set(item, 'pick', pick);
					} else {
						let pick = item.pick + answer
						this.$set(item, 'pick', pick);
					}

					this.$forceUpdate();
					return
				}
				let isTrue = 1;
				if (item && answer == item.answer) {
					isTrue = 2;

				} else {
					this.useFreeTime();
					this.addError();
				}
				this.learnedList.splice(this.current, 1, answer);
				if (this.current < 1000) {
					this.hadLearnedList_1000.splice(this.current, 1, isTrue);
				} else {
					this.hadLearnedList_2000.splice(this.current - 1000, 1, isTrue);
				}
				this.saveLearnedData();
				//自动切换题目
				if (isTrue == 2) {
					// this.playLoveAni();
					let that = this;
					setTimeout(function() {
						that.clickNext();
					}, 600)
				}
			},
			getContentImg(item) {
				if (item.qimageUrl) {
					return "https://img.jx885.com/lrjk" + item.qimageUrl;
				}
				if (item.qImageUrl) {
					return "https://img.jx885.com/lrjk" + item.qImageUrl;
				}
				return ''
			},
			showLearnProgressPopupAction() {
				this.isShowLearnProgressPopup = true;
			},
			showExamOverTipPopAction() {
				this.isShowExamOverTipPopUp = true;
			},
			closeLearnProgressPopupAction() {
				this.isShowLearnProgressPopup = false;
			},
			closeExamOverTipPopUp() {
				this.isShowExamOverTipPopUp = false;
			},
			showExplanationPopupAction() {
				this.stopAudio();
				this.isShowExplanationPopup = true;
			},
			closeExplanationPopupAction() {
				this.isShowExplanationPopup = false;
			},
			getAnswer(answer) {
				var text = "A";
				switch (answer) {
					case "1":
						text = "A";
						break;
					case "2":
						text = "B";
						break;
					case "4":
						text = "C";
						break;
					case "8":
						text = "D";
						break;
					case "3":
						text = "AB";
						break;
					case "5":
						text = "AC";
						break;
					case "6":
						text = "BC";
						break;
					case "7":
						text = "ABC";
						break;
					case "9":
						text = "AD";
						break;
					case "10":
						text = "BD";
						break;
					case "11":
						text = "ABD";
						break;
					case "12":
						text = "CD";
						break;
					case "13":
						text = "ACD";
						break;
					case "14":
						text = "BCD";
						break;
					case "15":
						text = "ABCD";
						break;
					default:
						text = "A";
						break;

				}
				return " " + text + " ";
			},
			titleText(item) {

				if (item == undefined || item.title == undefined) {
					return `&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;` + (this.current + 1);
				}
				if (typeof item.title != "string" && !Array.isArray(item.title)) {
					return ""
				}
				if (this.isIosPlatform) {
					return `&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;` +
						`&ensp;&ensp;&ensp;` + item.title
				}
				return `&ensp;&ensp;&ensp;&ensp;` + item.title
			},

			skillText(item) {
				if (item == undefined || item.skillText == undefined) {
					return ""
				}
				if (typeof item.skillText != "string" && !Array.isArray(item.skillText)) {
					return ""
				}
				if (this.isVip || (this.item && this.isContain(this.item.jkbdId))) {
					return item.skillText;
				}

				if (this.item.skillText && this.item.skillText.length > 6) {
					return item.skillText.substring(0, 5) + "...";
				} else {
					return '看关键字答题...';
				}
			},
			officialExpl(item) {
				if (item == undefined || item.officialExpl == undefined) {
					return ""
				}
				if (typeof item.skillText != "string" && !Array.isArray(item.officialExpl)) {
					return ""
				}
				return item.officialExpl;
			},
			//纠错
			toCorrection(item) {
				// 科目  serialNumber 题序 isSkill 是否有技巧（通过skillText判断）questionId 题目id
				// subject 注意考虑会员详情页  科一技巧练题和科四技巧练题进来 固定subject ，所以不能直接从缓存获取科目
				var that = this
				var isSkill = !this.$util.isNullVal(item.skillText)
				uni.navigateTo({
					url: '/pages/modify/modify?subject=' + that.subject + '&serialNumber=' + (that.current + 1) +
						'&isSkill=' + isSkill + '&questionId=' + item.id,
				})
			},
			resume() {
				this.current = 0;
				this.hadLearnedList_1000 = Array(1000).fill(0); //0表示未练题，1表示练题正确，2表示练题错误
				this.hadLearnedList_2000 = Array(1000).fill(0);
				this.learnedList = Array(2000).fill("0");
				this.saveLearnedData();
			},
			saveLearnedData() {

			},
			getSaveLearnedData() {


			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	scroll-view ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}


	.scroll_view_warp {
		width: 100%;
		height: 1260rpx;
		// background: #ea5c05;
	}

	.swiper {
		width: 100%;
		height: 1260rpx;
	}

	.title-view {
		display: flex;
		margin: auto;

		.title {
			text-align: center;
			font-size: 30rpx;
			width: 100%;
			color: #727272;
		}
	}

	.title_layout {
		margin: 20rpx 27rpx;

		.image_question_type {
			width: 70rpx;
			height: 35rpx;
			position: absolute;
			top: 42rpx;
		}

		.image_new_rule_type {
			width: 70rpx;
			height: 35rpx;
			position: absolute;
			top: 42rpx;
			left: 100rpx;
		}

		.title_label {
			width: 100%;
			font-weight: 500;
			font-size: 42rpx;
			line-height: 1.8;
		}
	}

	.help_layout {
		width: 100%;

		display: flex;
		flex-direction: row;
		align-items: center;

		.help_listen_sill_icon {
			width: 35rpx;
			height: 35rpx;
			margin-left: 50rpx;
		}

		.help_listen_sill_text {
			color: #ea5c05;
			padding-left: 10rpx;
		}

		.help_read_question_icon {
			filter: invert(36%) sepia(100%) saturate(1488%) hue-rotate(185deg) brightness(101%) contrast(109%);
			width: 35rpx;
			height: 35rpx;
			margin-left: 50rpx;
		}

		.help_read_question_icon_2 {
			// filter: invert(36%) sepia(100%) saturate(1488%) hue-rotate(185deg) brightness(101%) contrast(109%);
			width: 35rpx;
			height: 35rpx;
			margin-left: 50rpx;
		}

		.help_read_question_text {
			color: #0094ff;
			padding-left: 10rpx;
		}

		.help_collect_icon {
			// filter: invert(36%) sepia(100%) saturate(1488%) hue-rotate(185deg) brightness(101%) contrast(109%);
			filter: invert(50%) sepia(40%) saturate(1749%) hue-rotate(169deg) brightness(96%) contrast(103%);
			width: 35rpx;
			height: 35rpx;
			margin-left: 50rpx;
		}

		.help_collect_text {
			color: #0094ff;
			padding-left: 10rpx;
		}
	}

	.content_img {
		margin-left: 27rpx;
		margin-top: 30rpx;
		width: 675rpx;
		height: 318rpx;
	}

	.option_wrap {
		margin-top: 10rpx;
		display: flex;
		flex-direction: column;

		.choose_layout2 {
			margin-left: 27rpx;
			width: 90%;
			align-items: center;
			justify-content: start;
			display: flex;
			flex-direction: row;
			margin-top: 50rpx;
			margin-bottom: 30rpx;
			// position: relative;


			.option_bg {
				// margin-left: 20rpx;
				width: 90rpx;
				height: 90rpx;
				position: relative;
				display: flex;
				flex-direction: row;
				justify-content: start;
				align-items: center;

				image {
					position: absolute;
					top: 0;
					left: 0;
					width: 90rpx;
					height: 90rpx;
				}

				.option_label {
					margin-left: 35rpx;
					color: #727272;
					z-index: 1;
					font-size: 30rpx;
				}
			}

			label {
				position: absolute;
				margin-left: 100rpx;
				width: 580rpx;
				color: #212121;
				font-size: 42rpx;
			}
		}

		.choose_layout {
			margin-left: 27rpx;
			width: 90%;
			align-items: center;
			justify-content: start;
			display: flex;
			flex-direction: row;
			margin-top: 10rpx;
			margin-bottom: 10rpx;
			// position: relative;


			.option_bg {
				// margin-left: 20rpx;
				width: 90rpx;
				height: 90rpx;
				position: relative;
				display: flex;
				flex-direction: row;
				justify-content: start;
				align-items: center;

				image {
					position: absolute;
					top: 0;
					left: 0;
					width: 90rpx;
					height: 90rpx;
				}

				.option_label {
					margin-left: 35rpx;
					color: #727272;
					z-index: 1;
					font-size: 30rpx;
				}
			}

			label {
				position: absolute;
				margin-left: 100rpx;
				width: 580rpx;
				color: #212121;
				font-size: 42rpx;
			}
		}

	}

	.answer_skill_layout {
		background: #cccccc30;
		display: flex;
		flex-direction: column;
		margin: 0 27rpx;
	}

	.answer_layout {
		width: 90%;
		height: 80rpx;
		// margin-left: 27rpx;

		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 20rpx;

		label {

			font-weight: bold;
			color: #212121;
			font-size: 33rpx;
		}
	}

	.multiple_btn {
		width: 80%;
		height: 80rpx;
		margin-top: 30rpx;
		margin-left: 10%;
		background: #F5E5BC;
		border-radius: 10rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		label {
			color: #ffffff;
			font-size: 40rpx;
		}
	}

	.multiple_btn_mul {
		width: 80%;
		height: 80rpx;
		margin-top: 30rpx;
		margin-left: 10%;
		background: #E5BE57;
		border-radius: 10rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		label {
			color: #ffffff;
			font-size: 40rpx;
		}
	}


	.line_tag {
		width: 10rpx;
		height: 40rpx;
	}

	.category_office_label {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 20rpx 0rpx;
		color: #212121;
		font-size: 42rpx;
		font-weight: bold;
	}

	.category_skill_layout {
		margin-top: 20rpx;
		padding-left: 27rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.category_skill_wrap {
			display: flex;
			flex-direction: row;
		}

		.category_skill_label {

			color: #212121;
			font-size: 30rpx;
			font-weight: bold;
		}

		.vip_bg {
			width: 100rpx;
			height: 40rpx;
			color: #A05620;
			font-size: 20rpx;
			font-weight: bold;
			text-align: center;
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.vip_icon {
				position: absolute;
				left: 0;
				top: 0;
				width: 100rpx;
				height: 40rpx;
				z-index: -1;
			}
		}

		.free_count_label {
			color: #727272;
			font-size: 30rpx;
			margin-right: 27rpx;
		}

		.correction_warp {
			position: absolute;
			right: 10rpx;
			border-radius: 25rpx;
			border: 1px solid #E5E5E5;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 5rpx 20rpx;
			margin-right: 27rpx;
			text-align: center;
			color: #727272;
			font-size: 30rpx;
		}
	}

	.learn_skill_layout {
		margin: 20rpx 27rpx;
		color: #727272;
		font-size: 25rpx;
		position: relative;
		font-size: 36rpx;

		.skill_explain {
			width: 100%;
			color: #000;
			font-weight: bold;

		}

		.no_vip_skill {
			position: absolute;
			top: 0;
			right: 0;
			padding: 5rpx 30rpx;
			margin-right: 10rpx;
			background: linear-gradient(to right, #FEEED2, #F1D497);
			border-radius: 15rpx;
			color: #A05620;
			text-align: center;
			display: flex;
			flex-direction: row;
			font-size: 32rpx;

			image {
				margin-left: 10rpx;
				width: 32rpx;
				height: 26rpx;
				align-self: center;
			}
		}
	}

	.office_text {
		margin: 20rpx 27rpx;
		color: #727272;
		font-size: 40rpx;
	}

	.bottom_view {
		height: 120rpx;
		width: 100%;
		color: #727272;
		font-size: 40rpx;
	}

	.bottom_empty {
		position: fixed;
		bottom: 0;
		height: 0rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		background: #fff;
	}

	.bottom_bar {
		position: fixed;
		bottom: 0;
		height: 120rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		background: #fff;

		.bottom_right_error_layout {
			width: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.right_error_layout {

				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				image {
					width: 50rpx;
					height: 50rpx;
				}

				label {
					margin-left: 15rpx;
					color: #727272;
					font-size: 30rpx;
				}
			}
		}

		.bottom_mic_layout {
			width: 150rpx;
			display: flex;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;

			.imc_icon {
				position: absolute;
				top: -30rpx;
				left: 60rpx;
				filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(55deg) brightness(117%) contrast(101%);
				width: 60rpx;
				height: 60rpx;
			}

			.imc_bg {
				position: absolute;
				top: -60rpx;
				left: 30rpx;
				background: #237ded;
				border-radius: 60rpx;
				width: 120rpx;
				height: 120rpx;
			}


			label {
				position: absolute;
				text-align: center;
				align-self: center;
				bottom: 10rpx;
				color: #727272;
				font-size: 30rpx;
			}
		}

		.bottom_pass_rate_label {
			width: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;


			.pass_rate_label {
				color: #06A9F9;
				font-size: 35rpx;
				width: 50rpx;
				height: 50rpx;
				font-weight: bold;
			}

			label {
				margin-top: 5rpx;
				color: #727272;
				font-weight: bold;
				font-size: 30rpx;
			}
		}

		.bottom_examover_label {
			width: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			image {
				width: 50rpx;
				height: 50rpx;
			}

			label {
				margin-top: 5rpx;
				color: #727272;
				font-size: 30rpx;
			}
		}

		.bottom_collect_label {
			width: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.collect_icon {
				filter: invert(52%) sepia(95%) saturate(2688%) hue-rotate(170deg) brightness(102%) contrast(96%);
				width: 35rpx;
				height: 35rpx;
			}

			.collect_text {
				color: #06A9F9;
			}

			image {
				width: 50rpx;
				height: 50rpx;
			}

			label {
				margin-top: 5rpx;
				color: #727272;
				font-size: 30rpx;
			}
		}

		.bottom_icon_label {
			width: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			image {
				width: 50rpx;
				height: 50rpx;
			}

			label {
				margin-top: 5rpx;
				color: #727272;
				font-size: 30rpx;
			}
		}
	}

	.transition {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100px;
		height: 100px;
		position: absolute;
		top: 600rpx;
		left: 300rpx;
		z-index: 100;
	}

	.love_icon {
		width: 100rpx;
		height: 100rpx;
	}
</style>