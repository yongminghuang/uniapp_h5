<template>
	<view>
		<uni-popup ref="popup" type="center" @maskClick="closeAction" @change="changeAction">
			<view class="wrap">
				<view class="title_tip">提示</view>
				<view class="title_wrap">您确定要退出登录？</view>
				<view class="div"></view>
				<view class="btn_wrap">

					<view class="box_wrap" @click="toError()">取消</view>
					<view class="box_wrap2" @click="restart()">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "exit-popup",
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

			changeAction(e) {
				this.$emit('changeAction', e.show);
			},
			restart() {
				this.$emit('toLoginOut');
				this.closeAction();
				this.$refs.popup.close();
			},
			toError() {
				this.closeAction();
				this.$refs.popup.close();
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		width: 600rpx;
		height: 300rpx;
		padding: 40rpx 0rpx;
		background: #f3f7f9ff;
		border-radius: 20rpx;
	}

	.title_tip {
		width: 100%;
		color: #000000;
		font-weight: bold;
		font-size: 30rpx;
		text-align: center;
	}

	.title_wrap {
		margin-top: 20rpx;
		width: 100%;
		color: #A8A8A8;
		font-size: 30rpx;
		text-align: center;
	}

	.div {
		width: 100%;
		height: 2rpx;
		background-color: #cccccc;
		margin-top: 40rpx
	}

	.btn_wrap {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-evenly;


		.box_wrap {
			width: 50%;
			height: 100rpx;
			padding-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 20rpx;
			// border: 2px solid #cccccc;
			color: #000000;
			font-size: 25rpx;
			font-weight: bold;
		}

		.box_wrap2 {
			width: 50%;
			height: 100rpx;
			padding-top: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 20rpx;
			// border: 2px solid #cccccc;
			color: #7282A4;
			font-size: 25rpx;
			font-weight: bold;
		}
	}
</style>