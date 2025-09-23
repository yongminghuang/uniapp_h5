<template>
	<view>
		<web-view :src="webUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webUrl: ''
			}
		},
		onLoad(option) {
			var that = this
			const eventChannel = this.getOpenerEventChannel();
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('web-page', (data) => {
				this.webUrl = data.url;
				let title = data.title;
				if (!that.$util.isNullVal(title)) {
					uni.setNavigationBarTitle({
						title: title
					})
				}
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>