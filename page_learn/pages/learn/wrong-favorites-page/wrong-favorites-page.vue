<template>
	<view>
		<view class="wrap">
			<view class="box_wrap">

				<image class="box_icon" src="https://img.jx885.com/lrjk_uniapp/img/learn/error_bg.png" @click="toWrong">
				</image>
				<text class="count_text">{{errorCount}}</text>
				<text class="title_text">我的错题</text>
				<image class="bottom_right_icon" @click="toClearWrong()"
					src="https://img.jx885.com/lrjk_uniapp/img/learn/error_btn.png">
				</image>

			</view>
			<view class="box_wrap">
				<image class="box_icon" src="https://img.jx885.com/lrjk_uniapp/img/learn/collect_bg.png"
					@click="toCollect"></image>
				<text class="count_text">{{collectCount}}</text>
				<text class="title_text">我的收藏题</text>
				<image class="bottom_right_icon" @click="toClearCollect()"
					src="https://img.jx885.com/lrjk_uniapp/img/learn/collect_btn.png">
			</view>
		</view>
	</view>
</template>

<script>
	import {
		carType,
		subject
	} from '../../../../common/util';
	import {
		toMyWrongPage,
		toColloctPage
	} from '../../../common/page-route'
	export default {
		data() {
			return {
				errorCount: 0,
				collectCount: 0
			}
		},
		onLoad() {
			this.getCount(0);
			this.getCount(1);
		},
		methods: {
			getCount(type) {
				let params = {
					carType: carType(this),
					subject: subject(this),
					type: type
				}
				let that = this;
				this.$u.api.getErrorCollectCount(params)
					.then(res => {
						if (res.code == 200) {
							if (type == 0) {
								this.errorCount = res.body;
							} else if (type == 1) {
								this.collectCount = res.body;
							}
						}
					})
			},
			removeErrorOrCollectRecord(type) {
				let params = {
					type: type
				}
				let that = this;
				this.$u.api.removeErrorOrCollectRecord(params)
					.then(res => {
						if (res.code == 200) {
							if (type == 0) {
								this.errorCount = 0;
							} else if (type == 1) {
								this.collectCount = 0;
							}
						}
					})
			},
			toCollect() {
				if (this.collectCount == 0) {
					uni.showToast({
						title: "还没有收藏哟"
					})
					return;
				}
				toColloctPage();
			},
			toClearCollect() {
				if (this.collectCount == 0) {
					uni.showToast({
						title: "还没有收藏哟"
					})
					return;
				}
				this.removeErrorOrCollectRecord(1);
			},
			toWrong() {
				if (this.errorCount == 0) {
					uni.showToast({
						title: "还没有错题哟"
					})
					return;
				}
				toMyWrongPage();
			},
			toClearWrong() {
				if (this.errorCount == 0) {
					uni.showToast({
						title: "还没有错题哟"
					})
					return;
				}
				this.removeErrorOrCollectRecord(0);
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f7f9;
	}

	.wrap {
		margin-top: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		.box_wrap {
			position: relative;
			background: #fff;
			width: 300rpx;
			height: 300rpx;
			border-radius: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.box_bg {
				width: 200rpx;
				height: 200rpx;
				position: relative;
			}

			.box_icon {
				width: 200rpx;
				height: 200rpx;
			}

			.count_text {
				font-weight: bold;
				position: absolute;
				top: 50%;
				z-index: 1;
			}

			.title_text {

				position: absolute;
				top: 65%;
			}

			.bottom_right_icon {
				position: absolute;
				right: 0;
				bottom: 0;
				width: 150rpx;
				height: 30rpx;

			}

		}
	}
</style>