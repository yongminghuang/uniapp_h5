<template>
	<view class="wrap">
		<swiper vertical class="video-swiper" :current="current" @change="changeAction">
			<swiper-item v-for="(item,index) in videoList" :key="index" :item-id="item.id">
				<video v-if="current == index" :src="item.videoUrl" controls :show-fullscreen-btn="false"
					:style="videoStyle" object-fit="fill" @play="onVideoPlay(index)" @pause="onVideoPause(index)"
					@timeupdate="timeUpdatetAcion" :id="'myVideo-' + index" autoplay>
				</video>
				<view class="video-tool-view">
					<view class="zan-btn" @click="zanAction">
						<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_video_like.png" v-if="isZan"></image>
						<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_video_unlike.png" v-else></image>
						<text>点赞</text>
					</view>
					<!-- 		<view class="share-btn">
						<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_video_share.png"></image>
						<text>分享</text>
					</view> -->
				</view>
				<view :style="spaceStyle"></view>
			</swiper-item>
		</swiper>
		<open-vip-popup :isshow="isShowOpenVipPopup" title="开通会员观看更多视频" @closeAction="closeOpenVipPopupAction">
		</open-vip-popup>
	</view>
</template>

<script>
	import {
		isVip
	} from '../../common/util';

	export default {
		data() {
			return {
				videoStyle: '',
				spaceStyle: '',
				videoList: [],
				current: 0,
				isZan: false,
				videoContext: null,
				isShowOpenVipPopup: false,
				isVip: false,
				videoPlayingIndex: null, // 存储video的播放状态
			}
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			// 状态栏高度
			let statusBarHeight = systemInfo.statusBarHeight
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
			let videoHeight = screenHeight - navAndStatusHeight - spaceHeight
			this.spaceStyle = "height:" + spaceHeight + 'px;'
			this.videoStyle = "width:100%;height:" + videoHeight + 'px;'
		},
		onLoad() {
			var that = this;
			const eventChannel = this.getOpenerEventChannel();
			// 监听videoData事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('videoData', function(data, index) {
				that.videoList = data;
				that.current = index;
				that.searchVipStatus()
				that.showOpenVipPopup()
			})
		},
		methods: {
			closeOpenVipPopupAction() {
				this.isShowOpenVipPopup = false;
				this.searchVipStatus()
			},

			searchVipStatus() {
				this.isVip = isVip(this)
			},
			onVideoPlay(index) {
				this.videoPlayingIndex = index;
				this.videoContext = uni.createVideoContext('myVideo-' + this.current, this);
			},
			onVideoPause(index) {
				if (this.videoPlayingIndex === index) {
					this.videoPlayingIndex = null;
				}
			},
			timeUpdatetAcion(event) {
				let detail = event.detail;
				if (this.current > 3 && detail.currentTime > 0 && !this.isVip) {
					this.videoContext.pause();
				}
			},
			changeAction(event) {
				var current = event.detail.current
				this.current = current
				if (this.videoPlayingIndex !== null && this.videoPlayingIndex !== this.current) {
					if (this.videoContext != null) {
						this.videoContext.pause();
					}
				}
				this.showOpenVipPopup()
			},

			showOpenVipPopup() {
				if (this.current > 3 && !this.isVip) {
					if (this.videoContext != null) {
						this.videoContext.pause();
					}
					this.isShowOpenVipPopup = true
				}
			},
			zanAction() {
				var that = this
				var videoObj = that.videoList[that.current]
				var count = 0
				if (that.isZan) {
					count = -1
				} else {
					count = 1
				}
				let params = {
					count: count,
					videoId: videoObj.id,
				}
				that.$u.api.changeDzCount(params).then(res => {
					if (res.code == 200) {
						that.isZan = !that.isZan
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.wrap {
		background-color: black;
		height: 100%;

		.video-swiper {
			height: 100%;

			swiper-item {
				position: relative;

				.video-tool-view {
					position: absolute;
					top: 30%;
					right: 50rpx;

					image {
						width: 60rpx;
						height: 60rpx;
					}

					text {
						font-size: 30rpx;
						display: block;
						color: #666666;
					}

					.share-btn {
						margin-top: 40rpx;
						position: relative;
					}
				}
			}
		}
	}
</style>