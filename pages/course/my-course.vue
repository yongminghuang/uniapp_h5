<template>
	<view class="wrap">
		<view class="subject-video-content" v-if="fineCourseList && fineCourseList.length > 0">
			<view class="subject-video-wrap" v-for="(item,index) in fineCourseList" :key="index"
				@click="fineAction(item)">

				<!-- <text class="free_tip" v-if="!isVip">付费课程</text> -->
				<view class="buyed_tip">
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
				<!-- <view class="video-title">{{item.title}}</view> -->
			</view>

		</view>
		<view class="no_data_view" v-else>
			<text>您还没有自已的课程哦~</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fineCourseList: [],
			}
		},
		onLoad() {
			this.getFineCourseList();
		},
		methods: {
			getFineCourseList() {
				var that = this

				let params = {
					pageNum: 1,
					pageSize: 10,
				}
				that.$u.api.queryUserCourse(params)
					.then(res => {
						if (res.code == 200 && res.body) {

							this.fineCourseList = res.body.records;
						}
					})
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
		}
	}
</script>

<style lang="scss">
	.wrap {
		height: 100%;
	}

	.no_data_view {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
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
</style>