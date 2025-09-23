<template>
	<view class="wrap">
		<view class="body">

			<image class="post_bg" mode="widthFix" :src="$util.ossImagePath('/before-exam/pretest_bag.png')">

				<image class="right_image" mode="widthFix" :src="$util.ossImagePath('/before-exam/pretest_seal.png')">
				</image>


				<image class="center_image" mode="widthFix" :src="$util.ossImagePath('/before-exam/pretest_tips.png')">
				</image>

				<image class="bottom_image" mode="widthFix"
					:src="$util.ossImagePath('/before-exam/pretest_start_nor.png')" @click="openVip"></image>

		</view>
	</view>
	</view>
</template>

<script>
	import {
		toOpenVip
	} from '../../common/page-route';

	export default {
		data() {
			return {

			}
		},
		methods: {
			openVip() {
				toOpenVip()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
		background: url('https://img.jx885.com/lrjk_uniapp/img/before-exam/pretest_bg.jpg');
		// background-image: url('https://img.jx885.com/lrjk_uniapp/img/before-exam/pretest_bg.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		overflow: hidden;

	}

	.wrap {
		width: 100%;
		height: 100%;
		position: relative;
		width: 100%;
		height: 100%;

		.body {
			position: relative;
			margin-top: 200rpx;

			.post_bg {
				width: 100%;
				height: 100%;
			}

			.right_image {
				position: absolute;
				top: 10rpx;
				right: 20rpx;
				width: 200rpx;
			}

			.center_image {
				position: absolute;
				top: 300rpx;
				left: 14%;
				width: 70%;
			}

			.bottom_image {
				position: absolute;
				top: 600rpx;
				left: 25%;
				width: 400rpx;
			}
		}
	}
</style>