<template>
	<view class="wrap">
		<view v-for="(item,index) in itemList" :key="index" class="icon-wrap" @click="iconAction(item,index)">
			<image :src="item.image" class="icon" mode="aspectFit"></image>
			<view class="title">{{item.title}}</view>
		</view>
		<view :style="spaceStyle"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [],
				spaceStyle: '',
			};
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			this.spaceStyle = 'height:' + bottomSafeHeight + 'px;'
		},
		onLoad(option) {
			var that = this;
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('itemObj', function(data, iconList) {
				uni.setNavigationBarTitle({
					title: data.title
				});
				that.itemList = iconList
			})
		},
		methods: {
			iconAction(item, index) {
				var that = this
				if (item.content && item.content.indexOf('<style>') > -1) {
					uni.navigateTo({
						url: '/page_short_icon/pages/icon-shorthand/icon-detail-html',
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('itemObj', item);
						}
					});
				} else {
					uni.navigateTo({
						url: '/page_short_icon/pages/icon-shorthand/icon-detail-swiper',
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('itemObj', that.itemList, index);
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		width: 100%;
		height: 100%;
		background-color: white;

		.icon-wrap {
			display: inline-block;
			width: 50%;
			text-align: center;
			padding: 60rpx 0 30rpx 0;

			.icon {
				width: 180rpx;
				height: 180rpx;
			}

			.title {
				font-size: 32rpx;
				color: #333333;
				margin-top: 30rpx;
			}
		}
	}
</style>