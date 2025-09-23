<template>
	<view class="wrap">
		<view class="video-view">
			<view class="video-view-wrap" :style="videoStyle">
				<video :src="videoUrl" controls id="myVideo" :show-fullscreen-btn="false" :style="videoStyle"
					object-fit="fill" autoplay>
				</video>

			</view>
			<view :style="spaceStyle" class="space-view">
				<view class="live-list-btn" :style="liveListBtnStyle" @click="isShowliveListPopup = true">
					<text>全部题目技巧直播</text>
				</view>
			</view>
		</view>
		<live-list-popup :isshow="isShowliveListPopup" :livelist="liveList" :tempcartype="tempCarType"
			:tempsubject="tempSubject" @closeAction="isShowliveListPopup = false;" @liveAction="liveAction"
			@refreshLiveList="refreshLiveList"></live-list-popup>
		<open-vip-popup :isshow="isShowOpenVipPopup" title="开通会员观看更多直播" @closeAction="closeOpenVipPopupAction">
		</open-vip-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl: '',
				spaceStyle: '',
				videoStyle: '',
				isShowliveListPopup: false,
				liveListBtnStyle: '',
				liveList: [],
				tempSubject: 0,
				tempCarType: 0,
				selId: 0,
				isVip: false,
				isShowOpenVipPopup: false,
			};
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			// 状态栏高度
			let statusBarHeight = systemInfo.statusBarHeight
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			// 胶囊区域坐标
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// 导航栏的高度 = (胶囊底部高度-状态栏的高度)+(胶囊顶部高度-状态栏的高度)*2
			let navHeight = (menuButtonInfo.bottom - statusBarHeight) + (menuButtonInfo.top - statusBarHeight) * 2
			// 导航栏和状态栏的高度
			let navAndStatusHeight = navHeight + statusBarHeight
			// 屏幕高度
			let screenHeight = systemInfo.screenHeight
			// 底部间距高度 单位px
			let spaceHeight = 50
			// 视频高度 单位px
			let videoHeight = screenHeight - navAndStatusHeight - spaceHeight - bottomSafeHeight
			this.spaceStyle = "background-color: #000;height:" + (spaceHeight + bottomSafeHeight) + 'px;'
			this.videoStyle = "width:100%;height:" + videoHeight + 'px;'
			this.liveListBtnStyle = "margin-bottom:" + (5 + bottomSafeHeight) + 'px;'
		},
		onLoad() {
			var that = this;
			const eventChannel = this.getOpenerEventChannel();
			// 监听videoObj事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('videoObj', function(data, tempSubject, tempCarType) {
				that.tempSubject = tempSubject;
				that.tempCarType = tempCarType;
				that.videoUrl = data.liveRtmpUrl;
				that.selId = data.id;
				that.getLiveList(that.tempCarType, that.tempSubject)
				uni.setNavigationBarTitle({
					title: data.title
				});
			})
		},
		onShow() {
			this.searchVipStatus()
		},
		methods: {
			closeOpenVipPopupAction() {
				this.isShowOpenVipPopup = false;
				this.searchVipStatus()
			},

			searchVipStatus() {
				this.isVip = this.isVip(this)
			},
			liveAction(item, index) {
				if (index != 0 && !this.isVip) {
					this.isShowOpenVipPopup = true
					return
				}
				this.videoUrl = item.liveRtmpUrl;
				uni.setNavigationBarTitle({
					title: item.title
				});
				for (var i = 0; i < this.liveList.length; i++) {
					var obj = this.liveList[i];
					if (obj.id == item.id) {
						obj.isSelected = true;
						this.selId = obj.id;
					} else {
						obj.isSelected = false;
					}

					this.liveList[i] = obj;
				}
			},
			refreshLiveList(carType, subject) {
				this.getLiveList(carType, subject)
			},
			getLiveList(carType, subject) {
				var that = this
				that.liveList = []
				let params = {
					carType: carType,
					subject: subject
				}
				that.$u.api.roomList(params)
					.then(res => {
						if (res.code == 200) {
							var liveTempList = []
							var list = res.body
							for (var i = 0; i < list.length; i++) {
								var obj = list[i]
								if ((obj.id != 1) && (obj.id != 3)) {
									obj.isSelected = that.selId == obj.id
									liveTempList.push(obj)
								}
								if (i == list.length - 1) {
									that.liveList = liveTempList
								}
							}
						}
					})
			},

		},
	}
</script>

<style lang="scss">
	.wrap {
		height: 100%;
		width: 100%;
		position: relative;

		.video-view {
			height: 100%;
			width: 100%;

			.video-view-wrap {
				display: flex;
				position: relative;
			}

			.space-view {
				display: flex;

				.live-list-btn {
					width: 90%;
					height: 50rpx;
					background-color: red;
					border-radius: 25rpx;
					margin: auto auto 5px auto;
					display: flex;

					text {
						font-size: 28rpx;
						margin: auto;
						color: white;
					}
				}
			}

		}
	}
</style>