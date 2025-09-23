<template>
	<page-meta :page-style="'overflow:'+(isShowPageMeta?'hidden':'visible')"></page-meta>
	<view class="wrap">
		<view class="video-view">
			<video :src="videoUrl" controls id="myVideo" :style="videoStyle" object-fit="contain" autoplay
				:direction="0" :title="videoTitle" @timeupdate="timeUpdatetAcion" @play="onVideoPlay"
				@pause='onVideoPause' @ended="onVideoEnd">
			</video>

			<view class="mask-view" v-if="isShowMask">
				<view class="mask-content">
					<view class="open-vip-tip">试看结束</view>

					<view class="open-vip-btn" @click="payAction(rightId)">
						<text>永久VIP免费看</text>
					</view>
				</view>
			</view>
		</view>
		<view class="subject-more-view">
			<text class="subject-skill">目录</text>
			<text class="subject-more">全屏播放效果更好哦！</text>
		</view>
		<scroll-view scroll-y="true" :style="scrollViewStyle">

			<view class="subject-list">
				<view v-for="(item,index) in list" :key="index">
					<view :class="isPlay == playing && index == current ? 'course_item_play':'course_item'"
						@click="toPlayOrPause(index,item)">
						<view class="title_wrap">
							<view class="title">{{item.title}}</view>
							<view class="subTitle">{{item.subTitle}}</view>
						</view>
						<view class="play_state">
							<image :src="getPlaySrc(item, index)">
							</image>
							<text v-if="isPlay && index == current ">暂停</text>
							<text v-else>播放</text>
						</view>

					</view>
				</view>
			</view>
		</scroll-view>

		<view class="bottom_pay_wrap" :style="bottomStyle" v-if="!isVip">
			<view class="bottom_pay_course_btn_warp" @click="payAction(courseData.commodityId)">
				<text class="pay_money_text"
					@click="payAction(courseData.commodityId)">￥{{courseData.money}}元直接购买</text>
				<!-- <text class="limit_text">{{limitTimeVip}}</text> -->
			</view>
			<view class="bottom_pay_btn_warp" @click="payAction(rightId)">
				<text class="pay_money_text" @click="payAction(rightId)">￥{{rightPrice}}元永久VIP解锁所有课程</text>
				<!-- <text class=" limit_text">{{limitTimeVip}}</text> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getForeverPrice,
		requestPay
	} from '../../common/request';
	import {
		isVip
	} from '../../common/util';

	export default {
		data() {
			return {
				videoUrl: '',
				isVip: false,
				isShowMask: false,
				videoContext: null,
				videoStyle: '',
				videoTitle: '',
				subject: 0,
				isShowSubjectOpenVipPopup: false,
				isShowPageMeta: false,
				bannerUrl: '',
				article: '',
				spaceStyle: '',
				scrollViewStyle: '',
				nickNameList: [],
				list: [], //[1, 1, 1, 1]
				current: 0,
				isPlay: 0,
				isPlayEnd: false,
				courseData: null,
				rightPrice: 0,
				rightId: 0,
				isBuyGood: false,
				playing: 1,
				pause: 2,
				stop: 0,
			};
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			// 状态栏高度
			let statusBarHeight = systemInfo.statusBarHeight
			// 胶囊区域坐标
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			// 导航栏的高度 = (胶囊底部高度-状态栏的高度)+(胶囊顶部高度-状态栏的高度)*2
			let navHeight = (menuButtonInfo.bottom - statusBarHeight) + (menuButtonInfo.top - statusBarHeight) * 2
			// 导航栏和状态栏的高度
			let navAndStatusHeight = navHeight + statusBarHeight
			// 屏幕高度
			let screenHeight = systemInfo.screenHeight
			// 视频高度 单位px
			let videoHeight = 200
			this.videoStyle = "width:100%;height:" + videoHeight + 'px;'
			this.spaceStyle = 'height:' + bottomSafeHeight + 'px;'
			this.scrollViewStyle = 'height:' + (screenHeight - navAndStatusHeight - videoHeight) + 'px;'
		},
		onLoad() {
			var that = this;
			const eventChannel = this.getOpenerEventChannel();
			// 监听videoObj事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('videoObj', function(data) {
				that.courseData = data;
				that.getVipStatus();
				that.getList(data.id)
				if (that.courseData.subject == 1) {
					that.isVip = isVip(that)
				} else {
					that.isVip = isVip(that, 1) || isVip(that, 180)
				}
				if (!that.isVip) {
					that.getVipPrice();
					that.getBuyGoodList()
				}
			})


		},
		methods: {
			getPlaySrc(item, index) {

				if (this.isPlay == this.playing && index == this.current) {
					return 'https://img.jx885.com/lrjk_uniapp/img/course/vip_chapter_play_pause.png';
				} else if (this.isPlay == this.pause && index == this.current) {
					return 'https://img.jx885.com/lrjk_uniapp/img/card/vip_chapter_play_sel.png';
				} else {
					return 'https://img.jx885.com/lrjk_uniapp/img/card/vip_chapter_play_unsel.png';
				}

			},
			payAction(id) {
				requestPay(this, id, () => {
					this.isVip = true;
					this.isBuyGood = true;
				})
			},

			getBuyGoodList() {
				var that = this
				let params = {}
				that.$u.api.queryUserCommodity(params)
					.then(res => {
						if (res.code == 200) {
							var list = res.body;
							if (list.indexOf(this.courseData.commodityId) >= 0) {
								this.isBuyGood = true;
								this.isVip = true;
							}
						}
					})
			},
			getVipPrice() {
				let that = this;
				getForeverPrice(this, (obj) => {
					that.rightId = obj.id
					that.rightPrice = obj.money
				})
			},
			toPlayOrPause(index, item) {
				if (index == this.current) {
					if (this.videoContext) {
						if (this.isPlay == this.playing) {
							this.videoContext.pause();
						} else {
							this.videoContext.play();
						}
					}
				} else {
					this.current = index;
					var data = this.list[this.current];
					this.videoUrl = data.videoUrl;
					this.videoTitle = data.subTitle
					this.article = data.title
					if (this.videoContext) {
						this.videoContext.play();
					}

				}
			},
			getList(id) {
				let params = {
					courseId: id
				}
				var that = this;
				that.$u.api.getSubFineList(params)
					.then(res => {
						if (res.code == 200) {
							this.list = res.body;
							if (this.list && this.list.length > 1) {
								this.current = 0;
								var data = this.list[0];
								that.videoUrl = data.videoUrl;
								that.videoTitle = data.subTitle
								that.article = data.title

							}
						}
					})
			},
			getVipStatus() {

				this.isVip = isVip(this, 1) || isVip(this, 180)

				if (this.isVip && (this.videoContext != null)) {
					this.isShowMask = false;
					this.videoContext.play();
				}
			},

			timeUpdatetAcion(event) {
				let detail = event.detail;
				if (detail.currentTime > 120 && !this.isVip) {
					this.videoContext.pause();
					this.videoContext.exitFullScreen()
					this.isShowMask = true;
				}
			},
			onVideoPlay(event) {
				this.videoContext = uni.createVideoContext('myVideo', this);
				this.isPlay = this.playing;
			},
			onVideoPause(event) {
				this.isPlay = this.pause;
			},
			onVideoEnd(event) {
				this.isPlay = this.stop;
			},
			resetAction() {
				this.videoContext.seek(0);
				this.videoContext.play();
				this.isShowMask = false;
			},
			openAction() {
				this.isShowSubjectOpenVipPopup = true
			},
			subjectOpenVipCloseAction(value) {
				if (value == 1) {
					this.getVipStatus();
				}
				this.isShowSubjectOpenVipPopup = false
			},
			subjectOpenVipChangeAction(value) {
				this.isShowPageMeta = value;
			},

		}
	}
</script>

<style lang="scss">
	.wrap {
		width: 100%;
		height: 100%;
		background-color: #f4f7f9;

		.video-view {
			width: 100%;
			position: relative;
			display: flex;

			.vip-tip-view {
				position: absolute;
				left: 30rpx;
				bottom: 90rpx;
				padding: 6rpx 20rpx;
				display: flex;
				background-color: rgba(0, 0, 0, 0.6);
				border-radius: 28rpx;

				.vip-view {
					background: linear-gradient(to right, #FFD27A, #FFE3AC);
					padding: 0 12rpx;
					border-radius: 22rpx;
					margin-left: auto;

					text {
						font-style: italic;
						font-size: 26rpx;
						font-weight: bold;
					}
				}

				.tip {
					font-size: 24rpx;
					color: white;
					margin: auto auto auto 10rpx;
				}
			}

			.mask-view {
				background-color: rgba(0, 0, 0, 0.498);
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				display: flex;

				.mask-content {
					width: 100%;
					margin: auto;
					text-align: center;
					// display: flex;
					// flex-direction: column;
					// align-items: center;
					// justify-content: center;

					.open-vip-tip {
						color: #D1CC9F;
						font-size: 30rpx;
						margin-bottom: 40rpx;
					}



					.open-vip-btn {
						display: flex;
						width: 350rpx;
						height: 70rpx;
						border-radius: 30rpx;
						margin-left: auto;
						margin-right: auto;
						background: linear-gradient(to right, #F9DBC0, #F0B18E);

						text {
							margin: auto;
							color: black;
							font-size: 28rpx;
						}
					}
				}
			}
		}

		.subject-more-view {
			display: flex;
			margin: 30rpx 30rpx;

			.subject-skill {
				font-weight: bold;
				font-size: 44rpx;
				color: #000000;
			}

			.subject-more {
				font-size: 26rpx;
				color: #666666;
				margin: auto 0 auto auto;
			}
		}

		.subject-list {
			// background-color: #ffff;
			width: 100%;
			height: 500rpx;

			.course_item {
				width: 90%;
				margin-top: 30rpx;
				margin-left: 5%;
				border-radius: 50rpx;
				border-width: 2rpx;
				border-color: #E3E3E4;
				border-style: solid;
				height: 150rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20rpx 50rpx;


				.title_wrap {
					display: flex;
					flex-direction: column;
					align-self: center;

					.title {
						color: #000000;
						font-size: 30rpx;
						font-weight: bold;
					}

					.subTitle {
						color: #605D60;
						font-size: 25rpx;
						margin-top: 20rpx;
						font-size: 30rpx;
					}
				}

				.play_state {
					display: flex;
					flex-direction: column;
					align-self: center;

					image {
						width: 50rpx;
						height: 50rpx;
					}

					text {
						color: #605D60;
						font-size: 25rpx;
						margin-top: 10rpx;
					}
				}

			}

			.course_item_play {
				width: 90%;
				margin-top: 30rpx;
				margin-left: 5%;
				border-radius: 50rpx;
				border-width: 2rpx;
				border-color: #05A5FE;
				border-style: solid;
				height: 150rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 20rpx 50rpx;


				.title_wrap {
					display: flex;
					flex-direction: column;
					align-self: center;

					.title {
						color: #10AEFF;
						font-size: 30rpx;
						font-weight: bold;
					}

					.subTitle {
						color: #605D60;
						font-size: 25rpx;
						margin-top: 20rpx;
						font-size: 30rpx;
					}
				}

				.play_state {
					display: flex;
					flex-direction: column;
					align-self: center;

					image {
						width: 50rpx;
						height: 50rpx;
					}

					text {
						color: #10AEFF;
						font-size: 25rpx;
						margin-top: 10rpx;
					}
				}

			}
		}

		.bottom_pay_wrap {
			z-index: 10000;
			background: #ffffff;

			background-size: 100% 100%;
			// height: 326rpx;
			height: auto !important;
			height: 110rpx;
			min-height: 110rpx;
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;

			.bottom_pay_course_btn_warp {
				margin-top: 21rpx;
				margin-bottom: 20rpx;
				width: 250rpx;
				height: 80rpx;
				align-self: center;
				background-color: #fff;
				border-width: 2rpx;
				// border-color: #f3f7f9;
				border-style: solid;
				border-radius: 60rpx;
				border-color: #797979;
				display: flex;

				flex-direction: row;
				justify-content: space-evenly;
				align-items: center;

				.pay_money_text {
					justify-self: center;
					font-size: 26rpx;
					color: #797979;
				}
			}

			.bottom_pay_btn_warp {
				margin-top: 21rpx;
				margin-bottom: 20rpx;
				width: 380rpx;
				height: 80rpx;
				align-self: center;
				background-color: #ED3C00;
				border-radius: 60rpx;
				display: flex;

				flex-direction: row;
				justify-content: space-evenly;
				align-items: center;

				.pay_money_text {
					justify-self: center;
					font-size: 26rpx;
					color: #FFFFFF;
				}
			}
		}
	}
</style>