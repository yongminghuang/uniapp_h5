<template>
	<view class="wrap">
		<uni-nav-bar :title="title" color='#fff' height="88rpx" :border="false" background-color="#237ded" fixed
			statusBar>
			<template v-slot:left>
				<uni-icons type="arrow-left" color="#fff" size="30" @click="toBack"></uni-icons>
			</template>
		</uni-nav-bar>
		<view>

			<swiper class="swiper" :duration="duration" :current="swiperIndex" :disable-programmatic-animation="true"
				@change="onChange" @animationfinish="onAnimationfinish" @touchstart="onTouchStart"
				:style="{height: `${scrollHeight}px` }" @touchend="onTouchEnd">
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<scroll-view class="scroll_view_warp" scroll-y="true">

						<view>
							<view class="title_layout">
								<!-- <mp-html :content="titleText(item)"></mp-html> -->

								<rich-text class="title_label" :nodes="titleText(item)" decoded></rich-text>
								<image class="image_question_type" :src="getQuestionType(item)" mode="widthFix">
								</image>

								<image v-if="item && item.newRuleFlag == 'Y'" class="image_new_rule_type"
									:src="$util.ossImagePath('/learn/ic_question_xg.png')" mode="widthFix">
								</image>
							</view>
							<view class="help_layout" v-if="item">
								<image class="help_listen_sill_icon"
									:src="$util.ossImagePath('/learn/ic_bottom_mic.png')" mode="widthFix">
								</image>
								<label class="help_listen_sill_text" @click="showExplanationPopupAction">听技巧</label>
								<image class="help_read_question_icon"
									:src="$util.ossImagePath('/learn/learn_voice_receive_anime_3.png')" mode="widthFix"
									v-if="!isPlayReadQuestion" @click="readQuestion">
								</image>

								<image class="help_read_question_icon_2" :src="voicePic" mode="widthFix"
									v-if="isPlayReadQuestion" @click="readQuestion">
								</image>
								<label class="help_read_question_text" @click="readQuestion(item)">读题</label>

								<image v-if="fromType != 0 && !item.isCollect" @click="addCollect(item)"
									class="help_collect_icon"
									:src="$util.ossImagePath('/learn/learn_left_collection_un.png')" mode="widthFix">
								</image>
								<label v-if="fromType != 0 &&!item.isCollect" @click="addCollect(item)"
									class="help_collect_text">收藏</label>
								<image v-if="fromType != 0 &&item.isCollect" @click="removeCollect(item)"
									class="help_collect_icon" :src="$util.ossImagePath('/learn/learn_left_delete.png')"
									mode="widthFix">
								</image>
								<label v-if="fromType != 0 &&item.isCollect" @click="removeCollect(item)"
									class="help_collect_text">取消收藏</label>
								<image v-if="fromType == 0" @click="removeError(item)" class="help_collect_icon"
									:src="$util.ossImagePath('/learn/icon_del_clear.png')" mode="widthFix">
								</image>
								<label v-if="fromType == 0 " @click="removeError(item)"
									class="help_collect_text">移除错题</label>
							</view>
							<!-- :src="$util.ossImagePath('/vip/bg_open_vip_top.png')" -->
							<image v-if="item && (item.qImageUrl || item.qimageUrl)" class="content_img"
								:src="getContentImg(item)" mode="scaleToFill">
							</image>
							<view class="option_wrap" v-if="item">
								<!-- v-for="(item,index) in item" v-bind:key="item.id" -->
								<view
									:class="item && item.option1 && item.option1.length  > 14 ? `space_height2`:`space_height`"
									v-if="item && item.option1"> </view>
								<view class="choose_layout" v-if="item && item.option1" @click="clickOption(item,1)">
									<view class="option_bg">
										<image :src="optionA(item)"></image>
										<label v-if="showOptionA(item)" class="option_label">A</label>
									</view>

									<label> {{item && item.option1}}</label>

								</view>
								<view
									:class="item && item.option2 && item.option2.length  > 14 && item.option1 && item.option1.length  > 14  ? `space_height2`:`space_height`"
									v-if="item && item.option2"> </view>
								<view
									:class="item && item.option2 && item.option2.length > 27 ? `choose_layout3`:item && item.option2 && item.option2.length > 14 ? `choose_layout2`:`choose_layout`"
									v-if="item && item.option2" @click="clickOption(item,2)">
									<view class="option_bg">
										<image :src="optionB(item)"></image>
										<label v-if="showOptionB(item)" class="option_label">B</label>
									</view>
									<label> {{item && item.option2}}</label>
								</view>
								<view
									:class="item && item.option3 && item.option3.length > 14 && item.option2 && item.option2.length  > 14  ? `space_height2`:`space_height`"
									v-if="item && item.option3"> </view>
								<view
									:class="item && item.option3 && item.option3.length > 27 ? `choose_layout3`:item && item.option3 && item.option3.length > 14 ? `choose_layout2`:`choose_layout`"
									v-if="item.option3" @click="clickOption(item,4)">
									<view class="option_bg">
										<image :src="optionC(item)"></image>
										<label v-if="showOptionC(item)" class="option_label">C</label>
									</view>
									<label> {{item && item.option3}}</label>

								</view>
								<view
									:class="item && item.option4 && item.option4.length> 14 && item.option3 && item.option3.length  > 14  ? `space_height2`:`space_height`"
									v-if="item && item.option4"> </view>
								<view
									:class="item && item.option4 && item.option4.length > 27 ? `choose_layout3`:item && item.option4 && item.option4.length > 14 ? `choose_layout2`:`choose_layout`"
									v-if="item.option4" @click="clickOption(item,8)">
									<view class="option_bg">
										<image :src="optionD(item)"></image>
										<label v-if="showOptionD(item)" class="option_label">D</label>
									</view>
									<label> {{item && item.option4}}</label>
								</view>

								<view
									:class="item.questionType == 2 && hasTwoOrMoreOptions(item.pick) ? `multiple_btn_mul`:`multiple_btn`"
									v-if="item.questionType == 2&& !isHadLearned()" @click="mulClick(item)">
									<label>确定</label>
								</view>


								<view class="answer_layout" v-if="item.answerResult > 0">
									<label> {{getAnswer(item.answer)}}</label>
								</view>
								<view class="category_skill_layout" v-if="item.answerResult > 0">

									<image class="line_tag" :src="$util.ossImagePath('/learn/line_left_tag.png')">
									</image>
									<label class="category_sikll_label">速记技巧</label>
									<view class="free_count_label" v-if="!isVip && freeTime > 0">
										<rich-text class="title_label">剩余{{freeTime}}次体验机会</rich-text>
									</view>
									<view class="free_count_label" v-if="!isVip && freeTime <= 0">
										<rich-text class="title_label">免费机会已用完</rich-text>
									</view>
									<view class="correction_warp" @click="toCorrection(item)">
										纠错
									</view>
								</view>
								<view class="learn_skill_layout" v-if="item.answerResult >0">
									<!-- <mp-html :content="skillText(item)"></mp-html> -->
									<rich-text class="title_label" :nodes="skillText(item)"></rich-text>
									<view class="no_vip_skill" v-if="!isVip && (!isContain(item.jkbdId))">
										<text @click="showExplanationPopupAction"> 开通会员看答题技巧</text>
									</view>
								</view>
								<view class="category_skill_layout" v-if="item.answerResult > 0">

									<image class="line_tag" :src="$util.ossImagePath('/learn/line_left_tag.png')">
									</image>
									<label class="category_sikll_label">官方解释</label>
								</view>
								<view class="office_text" v-if="item.officialExpl != null &&  item.answerResult > 0">
									<!-- <mp-html :content="item.officialExpl"></mp-html> -->
									<rich-text class="title_label" :nodes="officialExpl(item)"></rich-text>

								</view>
							</view>
						</view>


					</scroll-view>
				</swiper-item>
			</swiper>

			<uni-transition ref="ani" custom-class="transition" :mode-class="modeClass" :show="showLoveIcon">
				<!-- <text class="text">示例元素</text> -->

				<image class="love_icon" :src="$util.ossImagePath('/learn/answer_right_good.png')"></image>
			</uni-transition>

			<view class="bottom_bar" :style="{'bottom': `${bottomSafeHeight}px`}">
				<view class="bottom_icon_label" @click="clickPrevious">
					<image class="left_button" :src="$util.ossImagePath('/learn/ic_bottom_left.png')"></image>
					<label class="left_label">上一题</label>
				</view>
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
				<view class="bottom_mic_layout" @click="showExplanationPopupAction">

					<view class="imc_bg"></view>
					<image class="imc_icon" :src="$util.ossImagePath('/learn/ic_bottom_mic.png')"></image>
					<label>技巧讲解</label>
				</view>
				<view class="bottom_icon_label" @click="showLearnProgressPopupAction">

					<image :src="$util.ossImagePath('/learn/ic_bottom_menu.png')"></image>
					<label>{{current +1}}/{{getRuleListSize}}</label>
				</view>
				<view class="bottom_icon_label" @click="clickNext">
					<image :src="$util.ossImagePath('/learn/ic_bottom_right.png')"></image>
					<label>下一题</label>
				</view>
			</view>
			<view class="bottom_empty" :style="{'height': `${bottomSafeHeight}px`}"></view>

			<learn-progress-popup :isshow="isShowLearnProgressPopup" :ruleList_1000="ruleList_1000"
				:ruleList_2000="ruleList_2000" :ruleListSize="ruleListSize" :hadLearnedList_1000="hadLearnedList_1000"
				:current="current" :hadLearnedList_2000="hadLearnedList_2000" @clickNext="clickNext"
				@clickPosition="clickPosition" @clickPrevious="clickPrevious" @clearRecord="resume()"
				@closeAction="closeLearnProgressPopupAction" @showSkillAction='showExplanationPopupAction'>
			</learn-progress-popup>
			<skill-play-popup :isshow="isShowExplanationPopup" @closeAction="closeExplanationPopupAction"
				:skillData="datas_100[current] || null " @openVip="toOpenVIP" :isVip="isVip">
			</skill-play-popup>
			<end-question-popup :isshow="isShowEndQuestionPoppup" @closeAction="isShowEndQuestionPoppup = false;"
				@restart="resume" @toErrorPage="toErrorPage">
			</end-question-popup>
			<open-vip-popup :isshow="isShowOpenVipPopup" :title="openVipTitle" @paySuccessAction="paySuccessAction"
				@closeAction="closeOpenVipPopupAction">
			</open-vip-popup>


		</view>

	</view>
</template>

<script>
	import {
		carType,
		skillFreeQuestionIds,
		skillFreeTime,
		subject
	} from '../../../common/util';
	import {
		toColloctPage,
		toMyWrongPage,
		toSkillReuslt
	} from '../../common/page-route';
	import {
		isVip,
		ossImagePath
	} from '../../common/util';
	export default {
		data() {
			return {
				isFirstLoad: true,
				datas_100: Array(2000).fill({}),
				current: 0,

				learnedList: Array(2000).fill("0"),
				hadLearnedList_1000: Array(2000).fill(0), //0表示未练题，1表示练题正确，2表示练题错误
				hadLearnedList_2000: Array(1000).fill(0),
				ruleList_1000: [],
				ruleList_2000: [],
				ruleListSize: 0,
				isShowLearnProgressPopup: false,
				isShowExplanationPopup: false,
				isShowEndQuestionPoppup: false,
				isShowOpenVipPopup: false,
				innerAudioContext: null,
				timerId: null,
				picIndex: 0,
				isPlayReadQuestion: false,
				collectMap: {},
				isVip: false,
				freeTime: 0,
				freeQuestionIds: [],
				classifyIds: [],
				fromType: 0, //0错题页，1收藏题, underfined 是做题页，
				subject: 1,
				showLoveIcon: false,
				modeClass: 'fade',
				learnCount: 0,
				currentWrong: 0,
				title: '',
				isIosPlatform: false,
				scrollHeight: 0,
				bottomSafeHeight: 0,
				pages: 1,
				pageSize: 30,
				swiperList: [], // 轮播图数据列表
				swiperIndex: 0, // 轮播图当前位置
				isChange: false, // 是否切换
				topicIndex: 0, // 题目位置
				duration: 200, // 动画过渡时长
				showPopup: false, //弹窗是否显示
				startX: 0, // 触摸起始坐标
				isEdge: false, // 是否处于右边缘
				openVipTitle: "",
			}
		},
		onHide() {
			this.isShowExplanationPopup = false;
			this.stopAudio()
		},
		onUnload() {
			this.isShowExplanationPopup = false;
			this.stopAudio()
		},
		beforeDestroy() {
			this.isShowExplanationPopup = false;
			this.stopAudio()
		},
		destroyed() {
			this.isShowExplanationPopup = false;
			this.stopAudio()
		},
		onLoad(option) {
			const systemInfo = uni.getSystemInfoSync();
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			this.bottomSafeHeight = bottomSafeHeight;
			// systemInfo.screenHeight - uni.upx2px(120) - bottomSafeHeight - 200 60rpx
			let statusBarHeight = systemInfo.statusBarHeight
			const navBarHeight = 88; // 根据你的设置调整
			const bottomBarHeight = 120; // 根据你的设置调整
			this.scrollHeight = systemInfo.screenHeight - uni.upx2px(120) - bottomSafeHeight -
				uni.upx2px(60) - uni.upx2px(80) - statusBarHeight

			this.isIosPlatform = uni.getSystemInfoSync().platform == 'ios'
			this.freeTime = skillFreeTime()
			this.freeQuestionIds = skillFreeQuestionIds()
			this.fromType = option.fromType;
			this.title = option.title;
			if (this.fromType == 0 || this.fromType == 1) {
				this.getErrorCollectQuestionList();
				this.getCollectMap();
			} else if (this.fromType == 4) { //模拟考考题
				this.datas_100 = uni.getStorageSync("lastMkData");

				let tempList = this.datas_100;
				let list = [];

				let removeList = tempList.map(item => {
					list.push(0)
					return item
				})
				// that.ruleSize = list.length;
				this.ruleList_1000 = list;
				this.renderSwiper(0);
			} else if (this.fromType == 5) { //模拟考错题
				let lastMkData = uni.getStorageSync("lastMkData");
				let hadDoneList = uni.getStorageSync("lastMKErrorData");
				let tempList = [];
				let list = [];
				for (var i = 0, length = lastMkData.length; i < length; i++) {
					if (hadDoneList[i] == 1) {
						list.push(0)
						tempList.push(lastMkData[i])
					}
				}

				this.datas_100 = tempList;
				// that.ruleSize = list.length;
				this.ruleList_1000 = list;
				this.renderSwiper(0);
			} else {
				this.classifyIds = option.classify_ids.split(",");
				this.getSaveLearnedData();
				this.getCollectMap(() => {
					let currentPage = Math.ceil(this.current / this.pageSize);
					if (currentPage == 0) {
						currentPage = 1
					}
					this.queryQuestionList(currentPage);

					this.queryQuestionIdsWithNewRuleFlag();
				});
			}

			var subject = option.subject
			if (!this.$util.isNullVal(subject)) {
				this.subject = parseInt(subject)
			}
		},
		computed: {

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
			getRuleListSize() {
				//错题
				if (this.fromType == 0 || this.fromType == 1) {
					this.ruleListSize = this.datas_100.length;
					return this.datas_100.length;
				}
				let length_1000 = this.ruleList_1000.length ? this.ruleList_1000.length : 0;

				this.ruleListSize = length_1000;
				return this.ruleListSize;
			},

			getErrorCount() {
				return this.hadLearnedList_1000.filter(item => item === 1).length;
			},
			getRightCount() {
				return this.hadLearnedList_1000.filter(item => item === 2).length;
			},
		},
		onShow() {
			this.searchVipStatus();
		},
		methods: {
			getOption1Class(item) {
				if (!item || !item.option1) return 'choose_layout';
				if (item.option1.length > 27) return 'choose_layout3';
				if (item.option1.length > 14) return 'choose_layout2';
				return 'choose_layout';
			},
			getOption2Class(item) {
				if (!item || !item.option2) return 'choose_layout';
				if (item.option2.length > 27) return 'choose_layout3';
				if (item.option2.length > 14) return 'choose_layout2';
				return 'choose_layout';
			},
			getOption3Class(item) {
				if (!item || !item.option3) return 'choose_layout';
				if (item.option3.length > 27) return 'choose_layout3';
				if (item.option3.length > 14) return 'choose_layout2';
				return 'choose_layout';
			},
			getOption4Class(item) {
				if (!item || !item.option4) return 'choose_layout';
				if (item.option4.length > 27) return 'choose_layout3';
				if (item.option4.length > 14) return 'choose_layout2';
				return 'choose_layout';
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
			// 渲染 swiper
			renderSwiper(index) {

				let list = [];
				let current = 1;
				if (index - 1 >= 0) {
					var item1 = this.datas_100[index - 1];
					if (this.learnedList[index - 1] && item1) {

						item1["answerResult"] = parseInt(this.learnedList[index - 1]);
					}
					if (item1) {
						item1["isCollect"] = this.collectMap[item1.jkbdId] || false;
					}
					list.push(item1);
				} else {
					current = 0;
				}
				if (index >= 0) {
					var item1 = this.datas_100[index];
					if (this.learnedList[index] && item1) {
						item1["answerResult"] = parseInt(this.learnedList[index]);
					}
					if (item1) {
						item1["isCollect"] = this.collectMap[item1.jkbdId] || false;
						console.log("==" + item1.jkbdId + "，" + item1["isCollect"])
					}

					list.push(item1);
				}
				if (this.ruleListSize == 0) {
					this.ruleListSize = this.getAllSize();
				}
				var length = 0;
				if (this.ruleListSize == 0) {
					length = this.datas_100.length
				} else {
					length = Math.min(this.datas_100.length, this.ruleListSize)
				}

				if (index + 1 < length) {
					var item1 = this.datas_100[index + 1];
					if (this.learnedList[index + 1] && item1) {
						item1["answerResult"] = parseInt(this.learnedList[index + 1]);
					}
					if (item1) {
						item1["isCollect"] = this.collectMap[item1.jkbdId] || false;
					} else {
						let pages = Math.ceil((this.current + 2) / this.pageSize);
						this.queryQuestionList(pages);
					}
					list.push(item1);
				}

				this.duration = 0;

				setTimeout(() => {
					this.swiperList = list;
					this.swiperIndex = current;

					setTimeout(() => {
						this.duration = 200;
					}, 100)
				}, 50)
			},
			getAllSize() {
				//错题
				if (this.fromType == 0 || this.fromType == 1) {
					this.ruleListSize = this.datas_100.length;
					return this.datas_100.length;
				}
				let length_1000 = this.ruleList_1000.length ? this.ruleList_1000.length : 0;

				this.ruleListSize = length_1000;
				return this.ruleListSize;
			},
			// 轮播图切换
			onChange(e) {
				// 非触摸事件不做轮播图状态更新
				if (e.detail.source != "touch") return;

				// 标识已切换
				this.isChange = true;
				// 轮播图当前位置大于原来时则表示为下一题
				if (e.detail.current > this.swiperIndex) {
					// if (this.current >= this.ruleListSize - 1) {
					// 	this.current = this.ruleListSize - 1;
					// 	this.isShowEndQuestionPoppup = true;
					// 	this.isChange = false;
					// 	return
					// }
					this.current++;
				} else {
					// 轮播图当前位置小于原来时则表示为上一题
					this.current--;
				}

				// 更新轮播图位置数值，为更新时让 Vue 能监听到数据有改变
				this.swiperIndex = e.detail.current;

				let item = this.datas_100[this.current]

				if (!item) {
					let pages = Math.ceil((this.current + 1) / this.pageSize);
					this.queryQuestionList(pages);

				}
			},
			// 轮播图动画结束
			onAnimationfinish(e) {
				if (!this.isChange) return;

				this.isChange = false;
				let that = this;
				setTimeout(() => {
					that.renderSwiper(that.current);
				}, 10);

			},
			// 核心判断逻辑
			onTouchStart(e) {
				this.startX = e.touches[0].pageX
				let length = Math.min(this.datas_100.length, this.ruleListSize)
				this.isEdge = (this.current === length - 1)
				// console.log("isEdge:" + this.isEdge);
			},
			onTouchEnd(e) {
				// console.log('触发结束')

				if (!this.isEdge) return
				const moveX = e.changedTouches[0].pageX
				const deltaX = this.startX - moveX // 计算横向位移差
				// 当处于最后一个且向右滑动超过 50px
				if (deltaX > 50) {
					this.isShowEndQuestionPoppup = true;
				}
			},
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
			toErrorPage() {
				this.getErrorOrCollectCount(0)
			},
			getErrorOrCollectCount(type) {
				let params = {
					carType: carType(this),
					subject: subject(this),
					type: type
				}
				let that = this;
				this.$u.api.getErrorCollectCount(params)
					.then(res => {
						if (res.code == 200) {
							if (type == 0) {
								let errorCount = res.body;
								if (errorCount == 0) {
									uni.showToast({
										title: "还没错题哟"
									})
								} else {
									toMyWrongPage();
								}
							} else if (type == 1) {
								let collectCount = res.body;
								if (collectCount == 0) {
									uni.showToast({
										title: "还没收藏哟"
									})
								} else {
									toColloctPage()
								}
							}
						}
					})
			},
			playLoveAni() {
				this.showLoveIcon = true;
				this.$refs.ani.step({
					translateY: '-150px', // 向上移动150px
					scale: 2.5, // 放大2.5倍
					opacity: 0 // 透明度变为0，实现消失效果
				}, {
					timingFunction: 'ease',
					duration: 1000 // 动画持续时间为1秒
				});
				// 1秒后隐藏图标
				setTimeout(() => {
					this.showLoveIcon = false;
				}, 1000);
			},
			closeOpenVipPopupAction() {
				this.isShowOpenVipPopup = false;
				this.searchVipStatus()
			},
			searchVipStatus() {
				this.isVip = isVip(this)
			},
			toOpenVIP() {
				this.openVipTitle = "开通会员"
				this.isShowOpenVipPopup = true;
			},
			toBack() {
				//技巧练题
				if (this.fromType == 3) {
					toSkillReuslt(this.learnCount, this.currentWrong)
				} else {
					uni.navigateBack();
				}

			},
			getCollectMap(success) {
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
						success && success()
					})
			},
			addCollect(item) {
				this.collectMap[item.jkbdId] = true;
				item.isCollect = true;
				let params = {
					questionId: item.jkbdId,
					questionId2: item.id,
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
			addError(item) {
				if (this.fromType == 0 || this.fromType == 1) {
					return
				}
				let params = {
					questionId: item.jkbdId,
					questionId2: item.id,
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
			removeError(item) {
				// type 0错题 1收藏
				let params = {
					questionId: item.jkbdId,
					carType: carType(this),
					subject: subject(this),
					type: 0
				}
				this.datas_100.splice(this.current, 1)
				let that = this;
				this.$u.api.removeQuestion(params)
					.then(res => {
						if (res.code == 200) {
							if (this.datas_100.length == 0) {
								uni.navigateBack({
									delta: 100,
									success() {
										uni.showToast({
											title: '已无错题'
										})
									}
								})
							} else {
								this.renderSwiper(this.current)
							}
						}
					})
			},
			removeCollect(item) {

				this.collectMap[item.jkbdId] = false;
				item.isCollect = false;

				let params = {
					questionId: item.jkbdId,
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
			queryQuestionIdsWithNewRuleFlag() {
				let that = this;
				let params2 = {
					classifyIds: this.classifyIds
				}
				this.$u.api.queryQuestionIdsWithNewRuleFlag(params2)
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
							that.ruleList_1000 = list;
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
								// delete item.jkbdId
								// delete item.lrId
								if (item.newRuleFlag == "N") {
									list.push(0)
								} else {
									list.push(1)
								}
								return item
							})


							// that.ruleSize = list.length;
							that.ruleList_1000 = list;

							this.datas_100 = res.body;
							this.renderSwiper(0);
						}
					})
			},
			queryQuestionList(pageNumber) {
				if (pageNumber == 0) {
					pageNumber = 1
				}
				let params = {
					classifyIds: this.classifyIds,
					pageNum: pageNumber,
					pageSize: this.pageSize,
					type: 3
				}
				let that = this;
				this.$u.api.queryQuestion(params)
					.then(res => {
						if (res.code == 200) {
							if (this.isFirstLoad) {
								this.isFirstLoad = false;
								this.datas_100 = Array(res.body.total).fill(0)
							}

							let endIndex = this.pageSize + pageNumber * this.pageSize;
							for (let i = 0; i <= this.pageSize; i++) {
								let startIndex = i + (pageNumber - 1) * this.pageSize;
								let item = res.body.records[i];
								if (item) {
									item.isCollect =
										item.answerResult = 0;
								}
								this.datas_100.splice(startIndex, 1, item);
							}

							this.renderSwiper(this.current);

						}
					})
			},
			getOptionCheckBg(item, option) {
				if (item.questionType == 2) {
					if (!item || item.answerResult == 0) {
						if (item && this.isContainOption(item.pick, option)) {
							return ossImagePath('/learn/learn_left_right.png')
							// return "page_learnhttps://img.jx885.com/lrjk_uniapp/img/learn/learn_left_right.png"
						}
						return ossImagePath('/learn/icon_check_bg.png')
						// "page_learnhttps://img.jx885.com/lrjk_uniapp/img/learn/icon_check_bg.png"
					} else {
						// this.isHadLearned()
						if (item && this.isContainOption(item.answer, option)) {
							return ossImagePath('/learn/learn_left_right.png')
						} else if (item && this.isContainOption(item.answerResult, option)) {
							return ossImagePath('/learn/learn_left_err.png')
						}
						return ossImagePath('/learn/icon_check_bg.png')
						// return "page_learnhttps://img.jx885.com/lrjk_uniapp/img/learn/icon_check_bg.png"
					}
				} else {
					if (!item || item.answerResult == 0) {
						return ossImagePath('/learn/icon_check_bg.png')
						// "page_learnhttps://img.jx885.com/lrjk_uniapp/img/learn/icon_check_bg.png"
					} else {
						if (item && item.answer == option) {
							return ossImagePath('/learn/learn_left_right.png')
							// return "page_learnhttps://img.jx885.com/lrjk_uniapp/img/learn/learn_left_right.png"
						} else if (item.answerResult == option) {
							return ossImagePath('/learn/learn_left_err.png')
							// return "page_learnhttps://img.jx885.com/lrjk_uniapp/img/learn/learn_left_err.png"
						}
						return ossImagePath('/learn/icon_check_bg.png')
						// return "page_learnhttps://img.jx885.com/lrjk_uniapp/img/learn/icon_check_bg.png"
					}
				}
				return ossImagePath('/learn/icon_check_bg.png')

			},
			isShowOptionText(item, option) {
				if (item.questionType == 2) {
					if (!item.answerResult || item.answerResult == 0) {
						if (this.isContainOption(item.pick, option)) {
							return false
						} else {
							return true;
						}
					} else {
						if (this.isContainOption(item.answer, option)) {
							return false
						} else if (this.isContainOption(item.answerResult, option)) {
							return false
						}
						return true
					}

				} else {
					if (!item.answerResult || item.answerResult == 0) {
						return true;
					} else {
						if (item && item.answer == option) {
							return false
						} else if (item && item.answerResult == option) {
							return false
						}
						return true
					}
				}
			},
			readQuestion(item) {

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
				innerAudioContext.src = "https://img.jx885.com/lrjk" + item.audioUrl;
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
					this.renderSwiper(this.current)
					let item = this.datas_100[this.current]
					if (!item) {
						let pages = Math.ceil((this.current + 1) / this.pageSize);
						this.queryQuestionList(pages);
					}
				}
				this.saveLearnedData();
			},
			clickNext() {
				let origin = this.current;
				if (this.current >= this.ruleListSize - 1) {
					this.current = this.ruleListSize - 1;
					this.isShowEndQuestionPoppup = true;
				} else {
					this.current++;
				}
				if (origin != this.current) {
					this.stopAudio();
					this.renderSwiper(this.current)
					let item = this.datas_100[this.current]
					if (!item) {
						let pages = Math.ceil((this.current + 1) / this.pageSize);
						this.queryQuestionList(pages);
					}
				}
				this.saveLearnedData();
			},
			clickPosition(position) {
				let origin = this.current;
				this.current = position;
				if (origin != this.current) {
					this.stopAudio();
					this.renderSwiper(this.current)
					let item = this.datas_100[this.current]
					if (!item) {
						let pages = Math.ceil((this.current + 1) / this.pageSize);
						this.queryQuestionList(pages);
					}
					// else {
					// 	if (this.current + 1 < this.datas_100.length) {
					// 		let item = this.datas_100[this.current + 1]
					// 		if (!item) {
					// 			let pages = Math.ceil((this.current + 2) / this.pageSize);
					// 			this.queryQuestionList(pages);
					// 		} else {
					// 			this.renderSwiper(this.current)
					// 		}
					// 	} else {
					// 		this.renderSwiper(this.current)
					// 	}
					// }
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
			clickOption(item, answer) {
				console.log("clickOption:" + answer)

				if (this.hadLearnedList_1000[this.current] !== 0) {
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
					// console.log("clickOption pick:" + item.pick)
					this.$forceUpdate();

				} else {
					let isTrue = 1;
					if (item && answer == item.answer) {
						isTrue = 2;
					} else {
						this.currentWrong++;
						this.useFreeTime(item);
						this.addError(item);
					}
					// this.datas_100["answerResult"] = answer;
					// item["answerResult"] = answer;
					this.$set(item, 'answerResult', answer);
					this.learnedList.splice(this.current, 1, answer);
					this.hadLearnedList_1000.splice(this.current, 1, isTrue);
					this.saveLearnedData();
					this.learnCount++;
					//自动跳转
					if (isTrue == 2) {
						// this.playLoveAni();
						let that = this;
						setTimeout(function() {
							that.clickNext();
						}, 1000)
					}
				}
			},
			mulClick(item) {
				if (this.hadLearnedList_1000[this.current] !== 0) {
					return
				}
				let answer = item.pick
				let isTrue = 1;
				if (item && item.pick == item.answer) {
					isTrue = 2;
				} else {
					this.currentWrong++;
					this.useFreeTime(item);
					this.addError(item);
				}
				// this.datas_100["answerResult"] = answer;
				// item["answerResult"] = answer;
				this.$set(item, 'answerResult', answer);
				this.learnedList.splice(this.current, 1, answer);
				this.hadLearnedList_1000.splice(this.current, 1, isTrue);
				this.saveLearnedData();
				this.learnCount++;
				//自动跳转
				if (isTrue == 2) {
					// this.playLoveAni();
					let that = this;
					setTimeout(function() {
						that.clickNext();
					}, 1000)
				}
			},
			useFreeTime(item) {
				if (this.isVip) {
					return
				}
				//免费次数
				if (this.freeTime > 0 && !this.isContain(item.jkbdId)) {
					this.freeTime--;
					if (this.freeTime < 0) {
						this.freeTime = 0;
					}
					uni.setStorageSync("freeTime", this.freeTime);
					this.freeQuestionIds.push(item.jkbdId);
					uni.setStorageSync("freeQuestionIds", this.freeQuestionIds);
				}
			},
			getContentImg(item) {
				if (item && item.qimageUrl) {
					return "https://img.jx885.com/lrjk" + item.qimageUrl;
				}
				if (item && item.qImageUrl) {
					return "https://img.jx885.com/lrjk" + item.qImageUrl;
				}
				return ''
			},
			showLearnProgressPopupAction() {
				this.isShowLearnProgressPopup = true;
			},
			closeLearnProgressPopupAction() {
				this.isShowLearnProgressPopup = false;
			},
			paySuccessAction() {
				// this.isShowLearnProgressPopup = false;
				this.isShowExplanationPopup = false;
				this.isVip = true;
			},
			showExplanationPopupAction() {
				this.stopAudio();
				let item = this.datas_100[this.current]
				if (this.isVip) {
					this.isShowExplanationPopup = true;
				} else if (this.isContain(item.jkbdId)) {
					this.isShowExplanationPopup = true;
				} else {
					if (this.freeTime > 0) {
						this.useFreeTime(item)
						this.isShowExplanationPopup = true;
					} else {
						this.toOpenVIP()
						this.openVipTitle = "免费体验次数已用完"
					}

				}

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
				return "答案：" + text;
			},
			titleText(item) {
				if (item == undefined || item.title == undefined) {
					// return `&ensp;&ensp;&ensp;&ensp;` + (this.current + 1) + "、加载中...";
					if (this.isIosPlatform) {
						return `&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;` +
							`&ensp;&ensp;&ensp;` +
							(this.current + 1) + "、加载中..."
					} else {
						return `&ensp;&ensp;&ensp;&ensp;` + (this.current + 1) + "、加载中..."
					}
				}
				if (typeof item.title != "string" && !Array.isArray(item.title)) {
					return ""
				}
				if (item.newRuleFlag == "Y") {
					if (this.isIosPlatform) {
						return `&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;` + `&ensp;&ensp;&ensp;&ensp;&ensp;` +
							`&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;` +
							(this.current + 1) + '、' + item.title
					} else {
						return `&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;` + `&ensp;&ensp;` +
							(this.current + 1) + '、' + item.title
					}

				} else {
					if (this.isIosPlatform) {
						return `&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;` +
							`&ensp;&ensp;&ensp;` +
							(this.current + 1) + '、' + item.title
					} else {
						return `&ensp;&ensp;&ensp;&ensp;` + (this.current + 1) + '、' + item.title
					}
				}
			},

			skillText(item) {
				if (item == undefined || item.skillText == undefined) {
					return ""
				}
				if (typeof item.skillText != "string" && !Array.isArray(item.skillText)) {
					return ""
				}
				if (this.isVip || (item && this.isContain(item.jkbdId))) {
					return item.skillText;
				}
				if (item.skillText.length > 5) {
					return item.skillText.substring(0, 5) + "...";
				} else {
					return '看关键字答题...'
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
					url: '/pages/modify/modify?subject=' + that.subject + '&serialNumber=' + (that
							.current + 1) +
						'&isSkill=' + isSkill + '&questionId=' + item.id,
				})
			},
			resume() {
				let origin = this.current;
				this.current = 0;

				if (origin != this.current) {
					this.hadLearnedList_1000 = Array(2000).fill(0); //0表示未练题，1表示练题正确，2表示练题错误
					this.learnedList = Array(2000).fill("0");
					this.stopAudio();
					this.renderSwiper(this.current)
					let item = this.datas_100[this.current]
					if (!item) {
						let pages = Math.ceil((this.current + 1) / this.pageSize);
						this.queryQuestionList(pages);
					}
				}
				this.saveLearnedData();
			},
			saveLearnedData() {
				if (this.fromType == 0 || this.fromType == 1 || this.fromType == 4 || this.fromType == 5) {
					return;
				}
				let saveData = {
					current: this.current,
					hadLearnedList_1000: this.hadLearnedList_1000,
					hadLearnedList_2000: this.hadLearnedList_2000,
					learnedList: this.learnedList,
				}
				uni.setStorageSync(this.classifyIds.join("-"), saveData);
			},
			getSaveLearnedData() {
				if (this.fromType == 0 || this.fromType == 1 || this.fromType == 4 || this.fromType == 5) {
					return;
				}
				let saveData = uni.getStorageSync(this.classifyIds.join("-"));
				if (saveData) {
					this.current = saveData.current;
					this.hadLearnedList_1000 = saveData.hadLearnedList_1000;
					this.hadLearnedList_2000 = saveData.hadLearnedList_2000;
					this.learnedList = saveData.learnedList;
				}
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


		.scroll_view_warp {
			width: 100%;
			height: 100%;
			// background: #ea5c05;
		}

		.swiper {
			height: 1260rpx;
			width: 100%;
			// background-color: #727272;
			// height: 1260rpx;
			display: flex;
			flex-direction: column;
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
				font-size: 35rpx;
			}

			.help_read_question_icon {
				filter: invert(36%) sepia(100%) saturate(1488%) hue-rotate(185deg) brightness(101%) contrast(109%);
				width: 35rpx;
				height: 35rpx;
				margin-left: 50rpx;
				font-size: 35rpx;
			}

			.help_read_question_icon_2 {
				// filter: invert(36%) sepia(100%) saturate(1488%) hue-rotate(185deg) brightness(101%) contrast(109%);
				width: 35rpx;
				height: 35rpx;
				margin-left: 50rpx;
				fontfont-size: 35rpx;
			}

			.help_read_question_text {
				color: #0094ff;
				padding-left: 10rpx;
				font-size: 35rpx;
			}

			.help_collect_icon {
				filter: invert(36%) sepia(100%) saturate(1488%) hue-rotate(185deg) brightness(101%) contrast(109%);
				width: 35rpx;
				height: 35rpx;
				margin-left: 50rpx;
			}

			.help_collect_text {
				color: #0094ff;
				padding-left: 10rpx;
				font-size: 35rpx;
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



			.choose_layout {
				margin-left: 27rpx;
				width: 90%;
				margin-top: 0rpx;
				// margin-bottom: 10rpx;
				align-items: center;
				justify-content: start;
				display: flex;
				// height: auto !important;

				// min-height: 50rpx;
				// max-height: 200rpx;
				flex-direction: row;
				// position: relative;
				// max-height: 50vh;


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

			.choose_layout2 {
				margin-left: 27rpx;
				width: 90%;
				margin-top: 10rpx;
				// margin-bottom: 40rpx;
				align-items: center;
				justify-content: start;
				display: flex;
				// height: auto !important;

				// min-height: 50rpx;
				// max-height: 200rpx;
				flex-direction: row;
				// position: relative;
				// max-height: 50vh;


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

			.space_height {
				width: 100%;
				height: 40rpx;
				// background-color: #0094ff;

			}

			.space_height2 {
				width: 100%;
				height: 60rpx;
				// background-color: #0094ff;

			}

			.choose_layout3 {
				margin-left: 27rpx;
				width: 90%;
				margin-top: 10rpx;
				margin-bottom: 50rpx;
				align-items: center;
				justify-content: start;
				display: flex;
				// height: auto !important;

				// min-height: 50rpx;
				// max-height: 200rpx;
				flex-direction: row;
				// position: relative;
				// max-height: 50vh;


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

			.answer_layout {
				width: 90%;
				height: 80rpx;
				margin-left: 27rpx;
				background: #fff;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding-left: 20rpx;

				label {

					font-weight: bold;
					color: #212121;
					font-size: 42rpx;
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

			.category_skill_layout {
				margin-top: 30rpx;
				padding-left: 27rpx;
				display: flex;
				flex-direction: row;
				align-items: center;


				.category_sikll_label {
					margin: 0 20rpx;
					color: #212121;
					font-size: 40rpx;
					font-weight: bold;
				}

				.free_count_label {
					color: #727272;
					font-size: 35rpx;
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
					font-size: 35rpx;
				}
			}

			.learn_skill_layout {
				margin: 20rpx 27rpx;
				color: #727272;
				position: relative;
				font-size: 38rpx;

				.no_vip_skill {
					position: absolute;
					top: 0;
					right: 0;
					padding: 5rpx 10rpx;
					margin-right: 10rpx;
					background: #237ded;
					border-radius: 6.5rpx;
					color: #fff;
					text-align: center;
				}
			}


			.office_text {
				margin: 20rpx 27rpx;
				color: #727272;
				font-size: 38rpx;
			}
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
						font-size: 35rpx;
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
					bottom: 10rpx;
					margin-left: 30rpx;
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