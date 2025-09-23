<template>
	<page-meta :page-style="'overflow:'+(isShowPageMeta?'hidden':'visible')"></page-meta>
	<view class="wrap">
		<view class="header-view">
			<image :src="bannerUrl"></image>
		</view>
		<view class="content-view">
			<view class="title">{{title}}</view>
			<view class="video-list-wrap">
				<view v-for="(item,index) in videoList" :key="index" class="video-wrap" @click="videoAction(item)">
					<view class="video-pic-wrap">
						<image class="video-top-image" mode="heightFix" :src="getTopImage(index,item)"></image>
						<image :src="item.videoCover" class="video-pic"></image>
						<image src="https://img.jx885.com/lrjk_uniapp/img/video/ic_subject_video_unvip.png"
							class="video-vip-status" v-if="item.vipStatus == 1"></image>
						<image src="https://img.jx885.com/lrjk_uniapp/img/video/ic_subject_video_vip.png"
							class="video-vip-status" v-else-if="item.vipStatus == 2"></image>
						<image src="https://img.jx885.com/lrjk_uniapp/img/video/ic_subject_video_click.png"
							class="video-vip-status" v-else></image>
						<view class="video-mask-view">
							<view class="video-mask-wrap">
								<text>{{item.videoTitle}}</text>
							</view>
						</view>
					</view>
					<view class="time-view">
						<text>{{item.freeTimes}}</text>
					</view>
				</view>
			</view>
		</view>
		<view :style="spaceStyle"></view>
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
				videoList: [],
				subject: 0,
				title: '',
				bannerUrl: '',
				spaceStyle: '',
				isShowSubjectOpenVipPopup: false,
				isShowPageMeta: false,
			};
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			this.spaceStyle = 'height:' + bottomSafeHeight + 'px;'
		},
		onLoad(option) {
			this.subject = parseInt(option.subject)
			if (this.subject == 2) {
				uni.setNavigationBarTitle({
					title: "科目二视频教学"
				});
				this.title = "科二考试项目"
				this.bannerUrl = this.$util.ossImagePath('/subjectVideo/ic_video_banner_k2.png')
			} else {
				uni.setNavigationBarTitle({
					title: "科目三视频教学"
				});
				this.title = "科三考试项目"
				this.bannerUrl = this.$util.ossImagePath('/subjectVideo/ic_video_banner_k3.png')
			}
		},
		onShow() {
			this.getVideoList()
		},
		methods: {
			getTopImage(index, item) {
				if (item.vipStatus == 2) {
					let maxPos = this.subject == 2 ? 3 : 6;
					if (index < maxPos) {
						return 'https://img.jx885.com/lrjk_uniapp/img/video/icon_video_vip_un.png'
					} else {
						return 'https://img.jx885.com/lrjk_uniapp/img/video/icon_video_vip.png'
					}
				} else {
					return 'https://img.jx885.com/lrjk_uniapp/img/video/icon_video_vip_click.png'
				}
			},
			getVideoList() {
				var that = this
				var isForeverVip = isVip(this, 1);
				var k2VipObj = that.$store.state.vuex_vip_k2
				var k3VipObj = that.$store.state.vuex_vip_k3
				if (this.$util.isNullVal(k2VipObj)) {
					k2VipObj = {}
				}
				if (this.$util.isNullVal(k3VipObj)) {
					k3VipObj = {}
				}
				var params = {
					subject: this.subject
				}
				that.$u.api.queryVideoListBySubject(params)
					.then(res => {
						if (res.code == 200) {
							var tempList = []
							var list = res.body
							for (var i = 0; i < list.length; i++) {
								var obj = list[i]
								if (that.subject == 2) {
									if (k2VipObj.isEnable || isForeverVip) {
										obj.vipStatus = 0
									} else {
										if (i >= 3) {
											obj.vipStatus = 2
										} else {
											obj.vipStatus = 1
										}
									}
								} else {
									if (k3VipObj.isEnable || isForeverVip) {
										obj.vipStatus = 0
									} else {
										if (i >= 6) {
											obj.vipStatus = 2
										} else {
											obj.vipStatus = 1
										}
									}
								}

								tempList.push(obj)
								if (i == list.length - 1) {
									that.videoList = tempList
								}
							}
						}
					})
			},
			videoAction(item) {
				if (item.vipStatus == 2) {
					this.isShowSubjectOpenVipPopup = true
				} else {
					var that = this
					uni.navigateTo({
						url: '/pages/subject-video/subject-video-detail',
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('videoObj', item, that.subject);
						}
					});
				}
			},
			subjectOpenVipChangeAction(value) {
				this.isShowPageMeta = value;
			},
			subjectOpenVipCloseAction(value) {
				if (value == 1) {
					this.getVideoList()
				}
				this.isShowSubjectOpenVipPopup = false
			}
		}

	}
</script>

<style lang="scss">
	.wrap {
		width: 100%;
		height: 100%;
		background-color: #f4f7f9;

		.header-view {
			display: flex;
			background-color: white;

			image {
				width: 710rpx;
				height: 224rpx;
				padding: 20rpx;
			}
		}

		.content-view {
			background-color: white;
			margin-top: 10rpx;

			.title {
				font-size: 32rpx;
				padding: 20rpx;
			}
		}

		.video-list-wrap {
			.video-wrap {
				border-radius: 20rpx;
				display: inline-block;
				width: 350rpx;
				margin: 10rpx;

				.video-pic-wrap {
					width: 100%;
					position: relative;

					.video-pic {
						width: 100%;
						height: 200rpx;
					}

					.video-vip-status {
						width: 190rpx;
						height: 35rpx;
						position: absolute;
						top: 0;
						left: 80rpx;
					}

					.video-top-image {
						position: absolute;
						width: 50rpx;
						height: 30rpx;
						// background-color: rgba(0, 0, 0, 0.6);
						left: 100rpx;
						top: 2rpx;
					}

					.video-mask-view {
						position: absolute;
						width: 330rpx;
						height: 80rpx;
						background-color: rgba(0, 0, 0, 0.6);
						left: 10rpx;
						top: 60rpx;

						.video-mask-wrap {
							width: 100%;
							height: 100%;
							position: relative;
							display: flex;

							text {
								color: white;
								font-size: 28rpx;
								margin: auto;
							}
						}
					}
				}

				.time-view {
					text {
						font-size: 24rpx;
						color: #666666;
					}
				}
			}
		}

	}
</style>