<template>
	<view class="wrap">
		<view class="ios_tip" v-if="!hadToken">功能规划中，敬请期待</view>
		<view class="ios_tip" v-if="hadToken && isIosPlatform && !isVip">根据相关运营规范，IOS暂不支持会员功能</view>
		<view class="subject-one-page" v-if="hadToken &&(!isIosPlatform || isVip)">
			<!-- 	<uni-nav-bar height="120rpx" :border="false" fixed statusBar background-color="#ffffff">
				<template>
				
				</template>
			</uni-nav-bar> -->

			<view class="tab-wrap" :style="{ 
		 height: `${barHeight + statusBarHeight}px`, paddingTop:`${statusBarHeight + 10}px` }">
				<view class="tab-view-wrap" @click="switchTab(0)">
					<view :class="tabSelectedItem == 0 ? 'tab-title' : 'tab-title-nor'">考点讲解</view>
					<image class="tab-bottom-icon" src="https://img.jx885.com/lrjk_uniapp/img/card/course_tab_down.png"
						v-if="tabSelectedItem == 0">
					</image>
				</view>
				<view class="tab-view-wrap" @click="switchTab(1)">
					<view :class="tabSelectedItem == 1 ? 'tab-title' : 'tab-title-nor'">精品课</view>
					<image class="tab-bottom-icon" src="https://img.jx885.com/lrjk_uniapp/img/card/course_tab_down.png"
						v-if="tabSelectedItem == 1">
					</image>
				</view>
				<view class="tab-view-wrap" @click="skillAction()">
					<view class="tab-title-nor">小视频</view>
				</view>
				<view class="tab-view-wrap">
					<view class="tab-title-nor2">考点讲解</view>
				</view>
			</view>

			<view class="exam-point-view" :style="examHeaderViewStyle" v-if="tabSelectedItem == 0">
				<view class="header-view">
					<view class="step-view" :class="stepIndex == 1 ? 'step-view-sel' : '' " @click="stepAction(1)">
						<text>速学简单题</text>
						<image v-if="stepIndex == 1"
							src="https://img.jx885.com/lrjk_uniapp/img/course/ic_course_stepbg_sel.png"></image>
						<image v-else src="https://img.jx885.com/lrjk_uniapp/img/course/ic_course_stepbg_unsel.png">
						</image>
						<view class="step-text">第一步</view>
					</view>
					<view class="step-view" :class="stepIndex == 2 ? 'step-view-sel' : '' " @click="stepAction(2)">
						<text>搞定重难点</text>
						<image v-if="stepIndex == 2"
							src="https://img.jx885.com/lrjk_uniapp/img/course/ic_course_stepbg_sel.png"></image>
						<image v-else src="https://img.jx885.com/lrjk_uniapp/img/course/ic_course_stepbg_unsel.png">
						</image>
						<view class="step-text">第二步</view>
					</view>
					<view class="step-view step-view-last" :class="stepIndex == 3 ? 'step-view-sel' : '' "
						@click="stepAction(3)">
						<text>考前易错题</text>
						<image v-if="stepIndex == 3"
							src="https://img.jx885.com/lrjk_uniapp/img/course/ic_course_stepbg_sel.png"></image>
						<image v-else src="https://img.jx885.com/lrjk_uniapp/img/course/ic_course_stepbg_unsel.png">
						</image>
						<view class="step-text">第三步</view>
					</view>
				</view>
				<view class="subject-one-video-view">
					<view class="subject-one-video-wrap" v-for="(item,index) in videoList" :key="index"
						:class="item.isShowLastPlay?'subject-one-video-wrap-sel':''" @click="videoAction(item)">
						<view class="last-play-view" v-if="item.isShowLastPlay">
							<text>上次播放</text>
							<image src="https://img.jx885.com/lrjk_uniapp/img/course/ic_course_play.png"></image>
						</view>
						<view class="subject-video-img">
							<image :src="item.cover" mode="aspectFill"></image>
							<view class="subject-video-time-view">
								<view class="time">{{item.duration}}</view>
							</view>
						</view>
						<view class="video-title">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view class="course-view" :style="headerViewStyle" v-if="tabSelectedItem == 1">


				<view class="course-swiper">
					<swiper>
						<swiper-item v-for="(item,index) in bannerList" :key="index">
							<image :src='item.bannerUrl' mode="aspectFill" @click="fineAction(item.proCourse)"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="subject-more-view">
					<text class="subject-skill">课程列表</text>
					<text class="subject-more" @click="myCourseAction">我的课程 ></text>
				</view>

				<view class="subject-video-content">

					<view class="subject-video-wrap" v-for="(item,index) in fineCourseList" :key="index"
						@click="fineAction(item)">
						<!-- <view class="explain">技巧讲解</view> -->
						<text class="free_tip" v-if="!isBuy(item)">付费课程</text>
						<view class="buyed_tip" v-else>
							<image src="https://img.jx885.com/lrjk_uniapp/img/video/ic_my_couse_lock.png"></image>
							<text>已解锁</text>
						</view>
						<view class="subject-video-img">
							<image :src="item.coverUrl" mode="widthFix"></image>
							<view class="subject-video-time-view">
								<view class="time">{{item.time}}</view>
							</view>
						</view>
						<view class="course-title-wrap">
							<view class="course-title">{{item.name}}</view>
							<view class="learn-btn">

								<image class="learn_iv"
									src="https://img.jx885.com/lrjk_uniapp/img/card/ic_fine_course_edit.png"></image>
								<text>立即学习</text>
							</view>
						</view>

					</view>

				</view>
			</view>
		</view>
		<!-- <login-popup :isshow="isShowLoginPopup" @closeAction="isShowLoginPopup = false;">
		</login-popup> -->
	</view>
</template>

<script>
	import {
		isVip
	} from '../../common/util';

	export default {
		data() {
			return {
				headerViewStyle: '',
				examHeaderViewStyle: '',
				stepIndex: 1,
				videoList: [],
				skillVideoList: [],
				isLogin: false,
				isShowLoginPopup: false,
				statusBarHeight: 0,
				barHeight: 0,
				bottomStyle: '',
				bottomSpaceStyle: '',
				tabSelectedItem: 1,
				bannerList: [],
				fineCourseList: [],
				isVip: false,
				is180Vip: false,
				isForeverVip: false,
				goodList: [],
				isIosPlatform: false,
				hadToken: "",
			}
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			this.isIosPlatform = systemInfo.platform == 'ios'
			// 状态栏高度
			let statusBarHeight = systemInfo.statusBarHeight;
			this.headerViewStyle = 'top:' + (statusBarHeight + 50) + 'px;';
			// 'top:' + (barHeight + statusBarHeight) + 'px;';
			this.examHeaderViewStyle = 'top:' + (statusBarHeight + uni.upx2px(78)) + 'px;';
			// 胶囊区域坐标
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// 导航栏的高度 = (胶囊底部高度-状态栏的高度)+(胶囊顶部高度-状态栏的高度)*2
			let navHeight = (menuButtonInfo.bottom - statusBarHeight) + (menuButtonInfo.top - statusBarHeight) * 2
			// 导航栏和状态栏的高度
			this.statusBarHeight = statusBarHeight
			this.barHeight = navHeight
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			this.bottomStyle = 'bottom:' + bottomSafeHeight + 'px;'
			this.bottomSpaceStyle = 'height:' + bottomSafeHeight + 'px;'
		},
		// 下拉刷新回调
		onPullDownRefresh() {
			this.getVideoList()
			this.getBannerList()
			this.getFineCourseList()
		},
		onLoad() {
			uni.$on('user', this.getUserInfo);
		},
		onUnload() {
			uni.$off('user');
		},
		onShow() {
			this.hadToken = uni.getStorageSync('accessToken')
			// console.log("======hadToken:" + this.hadToken)
			this.isVip = isVip(this);
			this.is180Vip = isVip(this, 180)
			this.isForeverVip = isVip(this, 1)
			var courseLastPlayObj = this.$store.state.vuex_course_lastplay
			if (!this.$util.isNullVal(courseLastPlayObj)) {
				this.stepIndex = courseLastPlayObj.stepIndex;
			}
			if (!this.hadToken) {
				return
			}
			this.getUserInfo(1)
			this.getVideoList()
			this.getBannerList();
			this.getFineCourseList()
			//获取购买商品的数据
			this.getBuyGoodList()
		},
		methods: {
			isBuy(item) {
				if (item.subject == 1) {
					return this.isVip || this.goodList.indexOf(item.commodityId) > -1
				}
				if (item.subject == 4) {
					return this.isForeverVip || this.is180Vip || this.goodList.indexOf(item.commodityId) > -1
				}
				return false
			},
			getBuyGoodList() {
				var that = this
				let params = {}
				that.$u.api.queryUserCommodity(params)
					.then(res => {
						if (res.code == 200) {
							this.goodList = res.body;
						}
					})
			},
			// 获取用户信息
			getUserInfo(value) {
				const user = uni.getStorageSync('user');
				if (this.$util.isNullVal(user)) {
					this.isLogin = false
				} else {
					this.isLogin = true; //user.isTemp == 0
				}
				if (this.$util.isNullVal(value)) {
					this.getVideoList()
					this.getBannerList()
					this.getFineCourseList()
				}
			},
			getVideoList() {
				var that = this
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				var courseLastPlayObj = that.$store.state.vuex_course_lastplay
				let params = {
					category: that.stepIndex
				}
				that.$u.api.getVideoList(params)
					.then(res => {
						that.videoList = [];
						if (res.code == 200) {
							var videoTempList = []
							var list = res.body
							for (var i = 0; i < list.length; i++) {
								let obj = list[i]
								if (!that.$util.isNullVal(courseLastPlayObj)) {
									obj.isShowLastPlay = courseLastPlayObj.id == obj.id
								}
								videoTempList.push(obj)
								if (i == list.length - 1) {
									that.videoList = videoTempList
									uni.stopPullDownRefresh()
								}
							}
						}

					})
			},
			getFineCourseList() {
				var that = this
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}

				let params = {
					pageNum: 1,
					pageSize: 10,
				}
				that.$u.api.getFineCourse(params)
					.then(res => {
						if (res.code == 200) {
							this.fineCourseList = res.body.records;
						}
					})
			},

			getBannerList() {
				var that = this
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}

				let params = {
					category: that.stepIndex
				}
				that.$u.api.getBannerList(params)
					.then(res => {
						if (res.code == 200) {
							this.bannerList = res.body
						}

					})
			},

			videoAction(item) {
				var obj = {
					stepIndex: this.stepIndex,
					id: item.id
				}
				this.$u.vuex('vuex_course_lastplay', obj)
				uni.navigateTo({
					url: '/pages/course/course-video',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('videoObj', item);
					},
					fail: function(e) {
						console.log("=== e:" + e)
					}
				});
			},
			stepAction(value) {
				this.stepIndex = value;
				this.getVideoList()
			},
			switchTab(index) {
				this.tabSelectedItem = index;
			},
			fineAction(item) {
				if (item && item.hasSubList == 1) {
					uni.navigateTo({
						url: '/pages/course/find-sub-course',
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('videoObj', item);
						},
						fail: function(e) {
							console.log("=== e:" + e)
						}
					});
				} else {
					uni.navigateTo({
						url: '/pages/course/fine-course',
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('videoObj', item);
						},
						fail: function(e) {
							console.log("=== e:" + e)
						}
					});
				}

			},
			myCourseAction() {
				let that = this;
				uni.navigateTo({
					url: '/pages/course/my-course',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('videoData', that.skillVideoList, 0);
					}
				});
			},
			skillAction() {
				if (this.skillVideoList && this.skillVideoList.length > 0) {
					var that = this;
					uni.navigateTo({
						url: '/pages/skill-video/skill-video',
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('videoData', that.skillVideoList, 0);
						}
					});
				} else {
					this.getSkillVideo();
				}

			},
			getSkillVideo() {
				let params = {}
				var that = this;
				that.$u.api.queryShortVideoList(params)
					.then(res => {
						if (res.code == 200) {

							var list = res.body
							for (var i = 0; i < list.length; i++) {
								var obj = list[i]
								obj.imgUrl = that.$util.imgDomainUrl() + '/' + obj.cover
								obj.time = that.$util.convertSecondsToTime(obj.duration)
								obj.videoUrl = that.$util.imgDomainUrl() + '/' + obj.url

								that.skillVideoList.push(obj)
							}

							that.skillAction();
						}

					})
			}

		}
	}
</script>

<style lang="scss">
	.wrap {
		width: 100%;
		height: 100%;

		.ios_tip {
			width: 100%;
			margin-top: 500rpx;
			text-align: center;
			justify-content: center;
			align-items: center;
		}

		.subject-one-page {
			height: 100%;

			.title-view {
				display: flex;
				font-size: 36rpx;
				margin: auto;
				color: white;
			}

			.tab-wrap {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				position: fixed;
				z-index: 100;
				left: 0;
				top: 0;

				background-color: #fff;

				.tab-view-wrap {
					height: 70rpx;
					display: flex;
					flex-direction: column;


					.tab-title {
						font-weight: 500;
						font-size: 38rpx;
						color: #000000;
					}

					.tab-title-nor {
						font-weight: 500;
						font-size: 36rpx;
						color: #8B8B8B;
					}

					.tab-title-nor2 {
						font-weight: 500;
						font-size: 36rpx;
						color: #fff;
					}

					.tab-bottom-icon {
						width: 124rpx;
						height: 15rpx;
						margin-top: 10rpx;
						justify-self: center;
						align-self: center;
					}

				}

			}

			.exam-point-view {
				background-color: white;
				width: 100%;
				position: absolute;
				display: flex;
				flex-direction: column;

				.header-view {
					position: fixed;
					// position: -webkit-sticky;
					display: flex;
					flex-direction: row;
					padding-top: 30rpx;
					width: 100%;
					z-index: 2;
					height: 110rpx;
					background-color: #fff;


					.step-view {
						border-radius: 38rpx;
						padding: 16rpx 32rpx;
						height: 70rpx;
						position: relative;
						background-color: #E9F1FD;
						margin-left: auto;

						text {
							font-size: 32rpx;
							color: #247CEE;
						}

						image {
							position: absolute;
							width: 90rpx;
							height: 20rpx;
							left: 0;
							top: 0;
						}

						.step-text {
							position: absolute;
							left: 22rpx;
							top: 0;
							font-size: 16rpx;
							color: white;
						}
					}

					.step-view-last {
						margin-right: auto;
					}

					.step-view-sel {
						background-color: #2f7cf7;

						text {
							color: white;
						}
					}
				}

				.subject-one-video-view {
					background-color: #f4f7f9;
					margin-top: 110rpx;
					padding-top: 10rpx;
					// box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);

					.subject-one-video-wrap {
						overflow: hidden;
						border-radius: 20rpx;
						display: inline-block;
						width: 350rpx;
						text-align: center;
						background-color: white;
						margin: 10rpx;
						position: relative;

						.last-play-view {
							position: absolute;
							top: 0;
							left: 0;
							z-index: 1;
							background-color: #2f7cf7;
							display: flex;
							padding: 6rpx 6rpx 6rpx 16rpx;

							text {
								font-size: 24rpx;
								color: white;
							}

							image {
								width: 20rpx;
								height: 20rpx;
								margin: auto 10rpx;
							}
						}

						.subject-video-img {
							position: relative;
							display: flex;

							image {
								width: 100%;
								height: 400rpx;
							}

							.subject-video-time-view {
								position: absolute;
								bottom: 20rpx;
								right: 20rpx;
								background-color: rgba(0, 0, 0, 0.6);
								padding: 0 16rpx;
								border-radius: 18rpx;

								.time {
									color: white;
									font-size: 26rpx;
								}
							}
						}

						.video-title {
							margin: 10rpx 10rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							-webkit-line-clamp: 1;
							display: -webkit-box;
							-webkit-box-orient: vertical;
						}
					}

					.subject-one-video-wrap-sel {
						border: 2rpx solid #2f7cf7;
					}
				}

			}

			.course-view {
				background-color: white;

				position: absolute;
				display: flex;
				flex-direction: column;
				// padding: 20rpx;
				// display: flex;
				// flex-direction: column;

				.course-swiper {

					margin-left: 34rpx;
					width: 682rpx;
					height: 300rpx;
					// background: #FFE5C1;
					margin-top: 20rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.subject-more-view {
					display: flex;
					width: 100%;
					margin-top: 20rpx;
					padding-left: 30rpx;
					padding-top: 10rpx;
					padding-right: 10rpx;
					flex-direction: row;
					justify-content: space-between;

					.subject-skill {
						font-weight: bold;
						font-size: 40rpx;
						color: #000000;
					}

					.subject-more {
						font-size: 26rpx;
						color: #666666;
						margin-top: 10rpx;
					}
				}

				.subject-video-content {
					// background-color: #f3f7f9;
					padding-bottom: 30rpx;
					// flex-wrap: wrap;
					display: flex;
					margin-left: 34rpx;
					width: 682rpx;
					flex-direction: column;
					align-items: center;


					.course-title-wrap {
						width: 100%;
						height: 100rpx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						padding-left: 30rpx;
						padding-right: 30rpx;

						.course-title {
							font-weight: 400;
							font-size: 30rpx;
							color: #000000;

						}

						.learn-btn {
							display: flex;
							flex-direction: row;
							width: 180rpx;
							height: 60rpx;
							border-radius: 20rpx;
							color: #fff;
							align-items: center;
							justify-content: center;
							background-color: #ED3C00;

							.learn_iv {
								width: 25rpx;
								height: 30rpx;
							}

							text {
								margin-left: 10rpx;
								color: #fff;
								font-size: 26rpx;
							}
						}
					}


					.subject-video-wrap {
						position: relative;
						border-radius: 20rpx;
						margin-top: 40rpx;
						width: 100%;
						height: 360rpx;
						text-align: center;
						// background-color: white;
						background: #F8F8F8;
						box-shadow: -1rpx 4rpx 14rpx 0rpx rgba(188, 144, 108, 0.22);
						border-radius: 14rpx;


						.explain {
							font-size: 30rpx;
							margin-top: 20rpx;
						}

						.free_tip {
							border-radius: 16rpx 16rpx 16rpx 0rpx;
							padding: 10rpx 20rpx;
							color: #fff;
							position: absolute;
							left: 0rpx;
							z-index: 1;
							background-color: #ED3C00;
						}

						.buyed_tip {
							border-radius: 16rpx 16rpx 16rpx 0rpx;
							padding: 10rpx 20rpx;
							color: #fff;
							position: absolute;
							left: 0rpx;
							z-index: 1;
							background-color: #007DED;
							display: flex;
							align-items: center;
							flex-direction: row;

							image {

								width: 25rpx;
								height: 16rpx;
							}

							text {
								margin-left: 10rpx;
							}
						}

						.subject-video-img {
							position: relative;

							image {
								width: 100%;
								height: 160rpx;
							}

							.subject-video-time-view {
								background-color: black;
								position: absolute;
								right: 17rpx;
								bottom: 10rpx;
								border-radius: 16rpx;
								padding: 0 10rpx;

								.time {
									font-size: 22rpx;
									color: white;
								}
							}
						}


					}
				}

			}


		}
	}
</style>