<template>
	<view>
		<uni-popup ref="popup" type="center" @maskClick="closeAction" @change="changeAction">
			<view class="wrap">
				<view class="box_wrap" @click="subjectAction(1)"> 科目一</view>
				<view class="box_wrap" @click="subjectAction(4)"> 科目四</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "subject-switch-popup",
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
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		display: flex;
		flex-direction: row;
		padding: 40rpx 0rpx;
		background: #f3f7f9ff;
		width: 500rpx;
		justify-content: space-evenly;
		border-radius: 20rpx;

		.box_wrap {
			width: 200rpx;
			height: 150rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 20rpx;
			border: 2px solid #e5be57;
		}
	}
</style>