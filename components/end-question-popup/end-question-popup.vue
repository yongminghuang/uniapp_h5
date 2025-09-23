<template>
	<view>
		<uni-popup ref="popup" type="center" @maskClick="closeAction" @change="changeAction">
			<view class="wrap">
				<view class="title_wrap">当前已是最后一题</view>
				<view class="btn_wrap">
					<view class="box_wrap" @click="restart()">重新开始</view>
					<view class="box_wrap" @click="toError()">查看错题</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "end-question-popup",
		props: {
			isshow: {
				type: Boolean,
				default: false
			},
		},
		watch: {
			isshow(newValue, oldValue) {
				if (this.isshow) {
					this.$refs.popup.open()
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			closeAction() {
				this.$emit('closeAction');
			},
			subjectAction(position) {
				uni.setStorageSync('subject', position);
				this.$emit('subjectAction');
				this.closeAction();
				this.$refs.popup.close();
			},
			changeAction(e) {
				this.$emit('changeAction', e.show);
			},
			restart() {
				this.$emit('restart');
				this.closeAction();
				this.$refs.popup.close();
			},
			toError() {
				this.$emit('toErrorPage');
				this.closeAction();
				this.$refs.popup.close();
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		width: 600rpx;
		height: 350rpx;
		padding: 40rpx 0rpx;
		background: #f3f7f9ff;
		border-radius: 20rpx;
	}

	.title_wrap {
		margin-top: 100rpx;
		width: 100%;
		color: #000000;
		font-size: 30rpx;
		text-align: center;
	}

	.btn_wrap {
		display: flex;
		flex-direction: row;
		margin-top: 40rpx;

		width: 100%;
		justify-content: space-evenly;


		.box_wrap {
			width: 200rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 20rpx;
			border: 2px solid #cccccc;
			color: #000000;
			font-size: 25rpx;
		}
	}
</style>