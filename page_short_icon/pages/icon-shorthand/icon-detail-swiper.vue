<template>
	<view class="wrap">
		<swiper 
		:style="swiperStyle"
		previous-margin="80rpx"
		next-margin="40rpx"
		:current="current"
		skip-hidden-item-layout
		@change="chageAction"
		>
			<swiper-item v-for="(item,index) in iconList" :key="index">
				<view class="swiper-item">
					<view class="flex-wrap">
						<image :src="item.image" class="icon" lazy-load></image>
					</view>
					<view class="flex-wrap">
						<view class="title">{{item.title}}</view>
					</view>
					<view class="content">{{item.content}}</view>
				</view>
			</swiper-item>
		</swiper>
		<view :style="spaceStyle"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				spaceStyle:'',
				iconList:[],
				swiperStyle:'',
				current:0,
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
			
			this.spaceStyle = 'height:' + bottomSafeHeight + 'px;'
			var swiperHeight = screenHeight - navAndStatusHeight - bottomSafeHeight - 20
			this.swiperStyle = 'width:100%;height:' + swiperHeight +'px;'

		},
		onLoad() {
			var that = this;
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('itemObj', function(data,index) {
				that.iconList = data
				that.current = index
				uni.setNavigationBarTitle({
					title: (index + 1) + '/' +  that.iconList.length
				});
			})
		},
		methods:{
			chageAction(event) {
				var that = this
				uni.setNavigationBarTitle({
					title: (event.detail.current + 1) + '/' +  that.iconList.length
				});
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: #f3f7f9;
}
.wrap {
	width: 100%;
	height: 100%;
	display: flex;
	swiper {
		.swiper-item {
			margin-top: 20rpx;
			margin-right: 40rpx;
			background-color: white;
			height: 100%;
			.flex-wrap {
				display: flex;
				.icon {
					width: 400rpx;
					height: 400rpx;
					margin: 60rpx auto 0 auto;
				}
				.title {
					font-size: 36rpx;
					color: #333333;
					margin: 40rpx auto 0 auto;
				}
			}
			.content {
				margin: 40rpx 30rpx 0 30rpx;
				font-size: 32rpx;
				color: #666666;
			}
			
			// box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.5);
		}
	}
}
</style>
