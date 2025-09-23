<template>
	<view class="wrap">
		<u-parse 
		:html="content" 
		:tag-style="style"
		:autopause="false"
		:autosetTitle="false"
		lazy-load
		></u-parse>
		<view :style="spaceStyle"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				spaceStyle:'',
				style:{
					 
				},
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
			eventChannel.on('itemObj', function(data) {
				uni.setNavigationBarTitle({
					title: data.title
				});
				that.content = data.content
			})
		},
	}
</script>

<style lang="scss">
.wrap {
	width: 100%;
	height: 100%;
	background-color: white;
	text-align: center;
	padding:20rpx;
}
</style>
