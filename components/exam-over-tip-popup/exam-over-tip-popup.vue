<template>
	<view>
		<uni-popup ref="popup" type="center" @maskClick="closeAction" @change="changeAction">
			<view class="wrap">
				<view class="title_wrap">{{getTitleText}}</view>
				<view class="content_wrap">
					<view class="right_rate_wrap">
						<view class="rate_text"> {{score}}% </view>
						<view class="rate_tip_text">答题正确率</view>
					</view>

					<view class="info_wrap">正确率<span style="color: #FD8D42;">{{getLowOrHight}}</span>，继续考试，预计<span
							style="color: #FD8D42;">成绩不错</span></view>
				</view>
				<view class=".bottom_wrap">
					<view class="bottom_left_warp" @click="examOverAction">现在交卷</view>
					<view class="bottom_right_warp" @click="closeAction">继续考试</view>
				</view>

			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "exam-over-tip-popup",
		props: {
			isshow: {
				type: Boolean,
				default: false
			},
			score: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {

			};
		},
		watch: {
			isshow(newValue, oldValue) {
				if (this.isshow) {
					this.$refs.popup.open()
				}
			}
		},
		computed: {
			getTitleText() {
				if (this.score >= 90) {
					return "驾考车神";
				} else if (this.score > 80) {
					return "未来车神";
				} else if (this.score > 50) {
					return "未来之星";
				} else {
					return "潜力学员";
				}
			},
			getLowOrHight() {
				if (this.score > 50) {
					return "较高";
				} else {
					return "较低";
				}
			},
		},
		methods: {

			closeAction() {
				this.$emit('closeAction')
				this.$refs.popup.close()
			},

			changeAction(e) {
				this.$emit('changeAction', e.show)
			},
			examOverAction() {
				this.$emit('examOverAction')
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		background: #fff;
		width: 600rpx;
		height: 650rpx;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	.title_wrap {
		justify-self: center;
		color: #FD8D42;
		font-size: 40rpx;
		width: 100%;
		text-align: center;
		margin-top: 20rpx;
		font-weight: bold;
	}

	.content_wrap {
		display: flex;
		flex-direction: column;

		.right_rate_wrap {
			margin-top: 50rpx;
			border-radius: 130rpx;
			border-width: 10rpx;
			border-color: #f3f7f9;
			border-style: solid;
			width: 260rpx;
			height: 260rpx;
			justify-self: center;
			align-self: center;
			display: flex;
			flex-direction: column;

			.rate_text {
				margin-top: 70rpx;
				justify-self: center;
				align-self: center;
				color: #06A9F9;
				font-size: 45rpx;
				font-weight: bold;
			}

			.rate_tip_text {
				margin-top: 20rpx;
				justify-self: center;
				align-self: center;
				color: #666666;
				font-size: 20rpx;

			}
		}

		.info_wrap {
			margin-top: 50rpx;
			color: #666666;
			font-size: 28rpx;
			justify-self: center;
			align-self: center;
		}
	}

	.bottom_wrap {
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: row;

		.bottom_left_warp {

			width: 300rpx;
			height: 80rpx;
			color: #06A9F9;
			background: #EAF3FF;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
		}

		.bottom_right_warp {

			width: 300rpx;
			height: 80rpx;
			color: #FFF;
			background: #06A9F9;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
		}
	}
</style>