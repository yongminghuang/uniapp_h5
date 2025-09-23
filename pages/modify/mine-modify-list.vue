<template>
	<view class="wrap">
		<uni-nav-bar height="88rpx" :border="false" fixed statusBar background-color="#247CEE">
			<template v-slot:left>
				<image class="back" src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_back_gray.png" @click="backAction"></image>
			</template>
			<template>
				<view class="title-view">
					<text class="title">我的纠错</text>
				</view>
			</template>
		</uni-nav-bar>
		<view class="segment-view" :style="segmentViewStyle">
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
				<view v-for="(item,index) in modifyList" :key="index" class="row-wrap" @click="rowAction(item)">
					<view class="time-view">
						<text class="time">{{item.createTime}}</text>
					</view>
					<view class="status-view" :class="item.operationResults == 0 ? '' : 'status-view-sel'">
						<text>{{item.operationResults == 0 ? '待处理' : '已处理'}}</text>
					</view>
					<view class="type-view">
						<text>{{item.type | typeFil}}</text>
					</view>
					<view class="text-view">
						<text>{{item.title}}</text>
					</view>
				</view>
			</view>
			<view :style="spaceStyle"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0,
				items: ['全部', '待处理', '已处理'],
				pageSize:10,
				pageNo:1,
				modifyList:[],
				spaceStyle:'',
				isLoaded:false,
				segmentViewStyle:'',
			};
		},
		filters: {
			typeFil: function(value) {
				var typeStr = ''
				switch (value){
					case 1:
						typeStr = '题干有误'
						break;
					case 2:
						typeStr = '答案有误'
						break;
					case 3:
						typeStr = '技巧不好用'
						break;
					case 4:
						typeStr = '图片不清晰'
						break;
					default:
						break;
				}
				return typeStr
			},
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
			var navAndStatusHeight = navHeight + statusBarHeight
			this.segmentViewStyle = 'top:' + navAndStatusHeight +'px;'
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
			rowAction(item) {
				uni.navigateTo({
					url: '/pages/modify/mine-modify-detail',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('modifyObj',item);
					}
				});
			},
			getListData(isRefresh) {
				var that = this
				if (isRefresh) {
					that.modifyList = []
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
				if (that.current != 0) {
					params.operationResults = that.current == 1 ? 0 : 1
				}
				that.$u.api.queryUserCorrectList(params)
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
							that.modifyList.push(obj)
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
	.back {
		width: 20rpx;
		height: 36rpx;
	}
	.title-view {
		display: flex;
		width: 100%;
		color: white;
		position: relative;
		.title {
			margin: auto;
			font-size: 32rpx;
		}
	}
	.segment-view {
		position: sticky;
		position: -webkit-sticky;
		z-index: 1000;
		background-color: #f4f7f9;
		padding-bottom: 20rpx;
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
				.status-view-sel {
					background-color: #62D385;
					text {
						color: white;
					}
				}
				.type-view {
					margin-top: 40rpx;
					font-size: 28rpx;
					font-weight: bold;
				}
				.text-view {
					margin-top: 40rpx;
					font-size: 24rpx;
				}
			}
		}
	}
}
</style>