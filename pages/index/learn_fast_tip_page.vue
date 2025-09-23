<template>
	<view class="wrap">
		<image class="top_bg" mode="widthFix" :src="$util.ossImagePath('/fast-learn/learn_fast_bg.jpg')"></image>

		<view class="body_wrap">
			<image class="content_image" mode="widthFix" :src="pic">

			</image>
			<button class="button" @click="openVip">立即开通 </button>
			<image class="image_close" :src="$util.ossImagePath('/fast-learn/ic_close.png')"></image>
		</view>
	</view>
</template>

<script>
	import {
		toOpenVip
	} from '../../common/page-route';
	import {
		carType,
		ossImagePath,
		subject
	} from '../../common/util';

	export default {
		data() {
			return {
				pic: ''
			}
		},
		onLoad() {
			this.pic = this.getPic()
		},
		methods: {
			openVip() {
				toOpenVip()
			},
			getPic() {
				debugger;
				const cartype = this.$util.carType();
				const subject = this.$util.subject();
				if (subject == 5) {
					// return 800
					return ossImagePath('/fast-learn/learn_fast_tips_800.png')
				}
				if (cartype == 1) {
					// return 600
					return ossImagePath('/fast-learn/learn_fast_tips_600.png')
				}
				if (cartype == 4) {
					// return 200
					return ossImagePath('/fast-learn/learn_fast_tips_200.png')
				}
				if (subject == 1 && (cartype == 2 || cartype == 3)) {
					// return 700
					return ossImagePath('/fast-learn/learn_fast_tips_700.png')
				}
				if (subject == 4 && (cartype == 2 || cartype == 3)) {
					// return 600
					return ossImagePath('/fast-learn/learn_fast_tips_600.png')
				}
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.top_bg {
			position: absolute;
			width: 100%;
		}

		.body_wrap {
			z-index: 1;

			.content_image {
				margin-top: 300rpx;
				width: 600rpx;
			}

			.button {
				border-radius: 70rpx;
				height: 90rpx;
				color: #fff;
				width: 80%;
				margin-top: 80rpx;
				background-color: #237DED;
				justify-content: center;
				align-items: center;
			}

			.image_close {
				width: 120rpx;
				height: 120rpx;
				margin-top: 0rpx;
				background-color: E6E6E6;
				border-radius: 60rpx;
			}
		}

	}
</style>