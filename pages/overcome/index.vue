<template>
	<view class="container">
		<image class="bg-image" src="/static/overcome/bg_overcome.png" mode="widthFix"></image>
		<view class="click-area" @click="handleClickArea"></view>
	</view>
</template>

<script>
	import {
		NativeBridge
	} from '../../common/native.js';
	const nativeBridge = new NativeBridge();
	export default {
		data() {
			return {};
		},
		onLoad(option) {
			let that = this;
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: '克服'
			});
		},
		methods: {
			handleClickArea() {
				// alert("handleClickArea")
				nativeBridge.openComeover();
			}
		}
	};
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		background: #0356DF;
		position: relative;
		overflow: hidden;
	}

	.bg-image {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: auto;
		display: block;
		z-index: 1;
	}

	.click-area {
		position: absolute;
		bottom: 116.41rpx;
		left: 139.84rpx;
		right: 142.97rpx;
		height: 114.84rpx;
		background: transparent;
		z-index: 2;
	}
</style>