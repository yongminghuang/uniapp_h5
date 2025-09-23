<template>
	<view class="wrap">
		<view class="segment-view">
			<uni-segmented-control
			:current="current" 
			:values="items" 
			@clickItem="onClickItem" 
			styleType="text" 
			activeColor="#007aff"
			></uni-segmented-control>
		</view>
		<view class="content-view">
			<view class="content">
				<view v-for="(item,index) in recordList" :key="index" class="row-wrap" @click="rowAction(item)">
					<view class="time-view">
						<text class="time">{{item.createTime}}</text>
					</view>
					<view class="status-view" :class="item.status == 0 ? 'status-view-unsel' : item.status == 1 ? '' : 'status-view-sel'">
						<text>{{item.status == 0 ? '不通过' : item.status == 1 ? '待处理' : '已退款'}}</text>
					</view>
					<view class="nick-name">{{item.userName}}</view>
					<view class="phone">{{item.phone}}</view>
					<view v-for="(url,subIndex) in item.scoreUrlList" :key="subIndex" class="img-wrap" @click.stop="imgAtcion(url)">
						<image :src="url" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
		</view>
		<view :style="spaceStyle"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0,
				items: ['全部', '待处理', '已退款','不通过'],
				pageSize:10,
				pageNo:1,
				recordList:[],
				spaceStyle:'',
				isLoaded:false,
			};
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			this.spaceStyle = 'height:' + bottomSafeHeight + 'px;'
		},
		onLoad() {
			this.getListData(true)
		},
		// 下拉刷新回调
		onPullDownRefresh() {
			this.getListData(true)
		},
		// 上拉加载回调
		onReachBottom() {
			this.getListData(false)
		},
		methods: {
			imgAtcion(url) {
				uni.previewImage({
					urls:[url],
					current:0,
				})
			},
			rowAction(item) {
				 uni.navigateTo({
				 	url: '/pages/refund/refund-apply-record-detail',
				 	success: function(res) {
				 		// 通过eventChannel向被打开页面传送数据
				 		res.eventChannel.emit('recordObj',item);
				 	}
				 });
			},
			getListData(isRefresh) {
				var that = this
				if (isRefresh) {
					that.recordList = []
					that.pageNo = 1
				}else {
					if (that.isLoaded) {
						return
					}
					that.pageNo += 1
				}
				const user = uni.getStorageSync('user');
				let params = {
					pageSize : that.pageSize,
					pageNo : that.pageNo,
					userId : user.id,
				}
				if (that.current == 1) {
					 params.status = 1
				}else if (that.current == 2) {
					params.status = 2
				}else if (that.current == 3) {
					params.status = 0
				} 
				that.$u.api.queryRefundList(params)
					.then(res => {
					if (res.code == 200) {
						var list = res.result.records
						var pages = res.result.pages
						var current = res.result.current
						that.isLoaded =  current >= pages
						for (var i = 0; i < list.length; i++) {
							var obj = list[i]
							obj.picUrl = that.$util.imgDomainUrl() + '/lrjk' + obj.qImageUrl
							obj.skillPicUrl = that.$util.imgDomainUrl() + '/lrjk' + obj.skillImgUrl
							that.recordList.push(obj)
						}
					}
				})
			},
			backAction() {
				uni.navigateBack()
			},
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
				this.getListData(true)
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: #f4f7f9;
}
.wrap {
	width: 100%;
	.segment-view {
		position: sticky;
		position: -webkit-sticky;
		z-index: 1000;
		background-color: #f4f7f9;
		padding-bottom: 20rpx;
		top:0
	}
	.content-view {
		margin-top: 10rpx;
		background-color: #f4f7f9;
		.content {
			padding: 0 0 60rpx 0;
			.row-wrap {
				width: 710rpx;
				margin: 0 20rpx 20rpx 20rpx;
				position: relative;
				background-color: white;
				padding: 20rpx;
				border-radius: 10rpx;
				box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.5);
				.time-view {
					font-size: 24rpx;
				}
				.status-view {
					position: absolute;
					top:0;
					right: 0;
					width: 150rpx;
					height: 50rpx;
					display: flex;
					background-color: #f5f5f5;
					text {
						margin: auto;
						color: black;
						font-size: 24rpx;
					}
				}
				.status-view-unsel {
					background-color: red;
					text {
						color: white;
					}
				}
				.status-view-sel {
					background-color: #62D385;
					text {
						color: white;
					}
				}
				.nick-name {
					margin-top: 40rpx;
					font-size: 28rpx;
					font-weight: bold;
				}
				.phone {
					margin-top: 40rpx;
					font-size: 24rpx;
				}
				.img-wrap {
					display: inline-block;
					margin: 40rpx 20rpx 0 0;
					image {
						width: 160rpx;
						height: 160rpx;
					}
				}
			}
		}
	}
}
</style>