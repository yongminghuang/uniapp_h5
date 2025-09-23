<template>
	<page-meta :page-style="'overflow:'+(isShowPageMeta?'hidden':'visible')"></page-meta>
	<view class="wrap">
		<view class="video-view">
			<video :src="videoUrl" controls id="myVideo" :style="videoStyle" object-fit="fill" autoplay :direction="90"
				:title="videoTitle" @timeupdate="timeUpdatetAcion" @play="onVideoPlay">
			</video>
			<view class="vip-tip-view" v-if="!isVip">
				<view class="vip-view">
					<text>{{subject == 2 ? '科二' : '科三'}}</text>
				</view>
				<text class="tip">{{'可试看20秒，开通' + (subject == 2 ? '科二' : '科三') + '会员查看'}}</text>
			</view>
			<view class="mask-view" v-if="isShowMask">
				<view class="mask-content">
					<view class="open-vip-tip">{{'试看结束，开通' + (subject == 2 ? '科二' : '科三') + '会员可免费观看'}}</view>
					<view class="open-vip-view">
						<view class="reset-btn" @click="resetAction">
							<image src="https://img.jx885.com/lrjk_uniapp/img/course/ic_course_reset.png"></image>
							<text>重新试看</text>
						</view>
						<view class="open-vip-btn" @click="openAction">
							<text>{{'开通' + (subject == 2 ? '科二' : '科三') + '会员'}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="scrollViewStyle">
			<view class="banner-view" @click="openAction" v-if="!isVip">
				<image :src="bannerUrl"></image>
				<view class="nickname-view">
					<u-notice-bar mode="vertical" :list="nickNameList" type="none" :volume-icon="false" color="#ffffff"
						bg-color="#7eadf0" font-size="28" padding="10rpx 6rpx" border-radius="28"></u-notice-bar>
				</view>
			</view>
			<view class="html-view">
				<view class="title-view">
					<view class="text">图文讲解</view>
				</view>
				<mp-html container-style="padding:20rpx;" :content="article" :preview-img="false" :show-img-menu="false"
					:copy-link="false" :pause-video="false" :set-title="false"></mp-html>
			</view>
			<view :style="spaceStyle"></view>
		</scroll-view>
		<subject-open-vip-popup :isshow="isShowSubjectOpenVipPopup" :subject="subject"
			@closeAction="subjectOpenVipCloseAction" @changeAction="subjectOpenVipChangeAction">
		</subject-open-vip-popup>
	</view>
</template>

<script>
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
				nickNameList: []
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
			eventChannel.on('videoObj', function(data, subject) {
				that.videoUrl = data.videoUrlOss;
				that.videoTitle = data.videoTitle
				that.article = data.article
				that.subject = subject
				if (subject == 2) {
					that.bannerUrl = that.$util.ossImagePath('/subjectVideo/ic_video_detail_banner_k2.png')
				} else {
					that.bannerUrl = that.$util.ossImagePath('/subjectVideo/ic_video_detail_banner_k3.png')
				}
				that.getVipStatus();
			})
			this.initNickNameList();

		},
		methods: {
			getVipStatus() {
				var k2VipObj = this.$store.state.vuex_vip_k2;
				var k3VipObj = this.$store.state.vuex_vip_k3;

				this.isVip = isVip(this, 1)
				if (!this.isVip) {
					if (this.subject == 2 && !this.$util.isNullVal(k2VipObj)) {
						this.isVip = k2VipObj.isEnable
					} else if (this.subject == 3 && !this.$util.isNullVal(k3VipObj)) {
						this.isVip = k3VipObj.isEnable
					}
				}
				if (this.isVip && (this.videoContext != null)) {
					this.isShowMask = false;
					this.videoContext.play();
				}
			},
			initNickNameList() {
				var tempList = [];
				var list = ['青丝茧', '饕餮少女', '陪你演戏', '伸手明月', '杯酒挽歌', '忧伤', '花开一夜', '逃避', '一语呢喃', '流年絮语', '若即若离', '谶言'];
				for (var i = 0; i < list.length; i++) {
					var obj = list[i]
					obj = obj + '开通了全科会员'
					tempList.push(obj)
					if (i == list.length - 1) {
						this.nickNameList = tempList
					}
				}
			},
			timeUpdatetAcion(event) {
				let detail = event.detail;
				if (detail.currentTime > 20 && !this.isVip) {
					this.videoContext.pause();
					this.videoContext.exitFullScreen()
					this.isShowMask = true;
				}
			},
			onVideoPlay(event) {
				this.videoContext = uni.createVideoContext('myVideo', this);
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
				background-color: rgba(0, 0, 0, 1);
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

					.open-vip-tip {
						color: white;
						font-size: 30rpx;
						margin-bottom: 40rpx;
					}

					.open-vip-view {
						display: flex;

						.reset-btn {
							width: 180rpx;
							height: 60rpx;
							border: 2rpx solid white;
							border-radius: 30rpx;
							display: flex;
							margin-left: auto;

							image {
								margin: auto 8rpx auto 16rpx;
								width: 34rpx;
								height: 34rpx;
							}

							text {
								margin: auto 0;
								color: white;
								font-size: 24rpx;
							}
						}

						.open-vip-btn {
							display: flex;
							width: 220rpx;
							height: 60rpx;
							border-radius: 30rpx;
							margin-left: 40rpx;
							margin-right: auto;
							background: linear-gradient(to right, #FFD27A, #FFE3AC);

							text {
								margin: auto;
								color: black;
								font-size: 28rpx;
							}
						}
					}
				}
			}
		}

		.banner-view {
			position: relative;
			background-color: white;
			width: 100%;
			display: flex;
			padding: 20rpx;

			image {
				width: 710rpx;
				height: 165rpx;
			}

			.nickname-view {
				width: 320rpx;
				height: 60rpx;
				position: absolute;
				bottom: 40rpx;
				left: 64rpx;
			}
		}

		.html-view {
			background-color: white;
			margin-top: 10rpx;
			width: 100%;
			padding-top: 20rpx;

			.title-view {
				margin: 0 0 40rpx 20rpx;
				border-left: #f07733 solid 6rpx;
				display: flex;

				.text {
					margin-left: 20rpx;
					font-size: 32rpx;
					color: #333333;
					font-weight: bold;
					line-height: 32rpx;
				}
			}
		}
	}
</style>