<template>
	<view>
		<uni-nav-bar title="练题情况" height="88rpx" :border="false" background-color="#FFF" fixed statusBar>
			<template v-slot:left>
				<uni-icons type="left" color="#DCDCDC" size="30" @click="toBack"></uni-icons>
			</template>
		</uni-nav-bar>
		<view class="div_10"></view>
		<view :class="rigthPercent >=90 ? `wave_wrap_right`:`wave_wrap`">
			<view class="percentage_text">{{rigthPercent}}%</view>
			<view class="right_text">正确率</view>
		</view>
		<view class="right_error_warp">
			<view class="right_error_layout">
				<view class="count_label">{{allCount}}题</view>
				<view class="count_hint_label">练题数</view>
			</view>
			<view class="right_error_layout">
				<view class="count_label">{{wrongCount}}题</view>
				<view class="count_hint_label">错题数</view>
			</view>
		</view>

		<button class="continue_btn" @click="continueLearn">继续做题</button>
		<button class="err_btn" @click="toError">查看错题</button>

	</view>
</template>

<script>
	import {
		toMyWrongPage
	} from '../../../common/page-route';

	export default {
		data() {
			return {
				allCount: 0,
				wrongCount: 0,
				rigthPercent: 0,
				classifyIds: [],
			}
		},
		onLoad(option) {
			this.wrongCount = parseInt(option.wrongCount);
			this.allCount = parseInt(option.learnCount);
			let rightCount = this.allCount - this.wrongCount;
			if (this.allCount == 0) {
				this.rigthPercent = 0
			} else {
				this.rigthPercent = Math.round(rightCount * 100 / this.allCount)
			}

		},
		methods: {
			toBack() {
				uni.navigateBack({
					delta: 100
				})
			},
			continueLearn() {
				uni.navigateBack()
			},
			toError() {
				toMyWrongPage();
			}
		}
	}
</script>

<style lang="scss">
	.div_10 {
		background: #f3f7f9;
		width: 100%;
		height: 10rpx;
	}

	.wave_wrap {
		margin-top: 150rpx;
		background: #FFF3EB;
		border-radius: 130rpx;
		margin-left: 245rpx;
		width: 260rpx;
		height: 260rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.percentage_text {
			color: #FE2D2B;
			font-size: 48rpx;
			font-weight: bold;
			text-align: center;
		}

		.right_text {
			color: #FE2D2B;
			font-size: 30rpx;
			text-align: center;
		}
	}

	.wave_wrap_right {
		margin-top: 150rpx;
		background: #4781E6;
		border-radius: 130rpx;
		margin-left: 245rpx;
		width: 260rpx;
		height: 260rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.percentage_text {
			color: #FFF;
			font-size: 48rpx;
			font-weight: bold;
			text-align: center;
		}

		.right_text {
			color: #FFF;
			font-size: 30rpx;
			text-align: center;
		}
	}

	.right_error_warp {
		margin-top: 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		text-align: center;

		.right_error_layout {
			.count_label {
				font-size: 36rpx;
				color: #222222;
			}

			.count_hint_label {
				font-size: 30rpx;
				margin-top: 20rpx;
				color: #999999;
			}

		}
	}

	.continue_btn {
		margin-top: 50rpx;
		border-radius: 50rpx;
		width: 500rpx;
		height: 80rpx;
		color: #fff;
		background: #237ded;
		font-size: 30rpx;
	}

	.err_btn {
		margin-top: 20rpx;
		border-radius: 50rpx;
		width: 500rpx;
		height: 80rpx;
		border-radius: 50rpx;
		color: #237ded;
		background: #C3DDFF;
		font-size: 30rpx;
	}
</style>