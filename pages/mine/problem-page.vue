<template>
	<view class="wrap">
		<view class="content_wrap">
			<view class="title">遇到问题？</view>
			<view class="line_wrap">
				<view class="hint_text">客服热线</view>
				<view class="content_wrap1">
					<view class="content_1_text">{{phone}}</view>
					<view class="div"></view>
					<view class="content_2_text" @click="callPhone">拨打</view>
				</view>
			</view>

			<view class="line_wrap">
				<view class="hint_text">客服邮箱</view>
				<view class="content_wrap1">
					<view class="content_1_text">{{mail}}</view>
					<view class="div"></view>
					<view class="content_2_text" @click="copyMail()">复制</view>
				</view>
			</view>

			<view class="line_wrap">
				<view class="hint_text">客服微信</view>
				<view class="content_wrap1">
					<view class="content_1_text">{{wx}}</view>
					<view class="div"></view>
					<view class="content_2_text" @click="copyWx()">复制</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				wx: 'Lrjk02-666888',
				mail: 'qnmkefu@jx885.com',
				phone: '0592-6251660',
			}
		},
		methods: {
			copyMail() {
				uni.setClipboardData({
					data: this.mail,
					success: function() {
						uni.showToast({
							title: '已复制',
							icon: 'none'
						});
					},
					fail(e) {
						console.log(e)
					}
				});
			},
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.phone, //仅为示例，
					fail(e) {
						console.log(e)
					}
				});
			},
			copyWx() {
				uni.setClipboardData({
					data: this.wx,
					success: function() {
						uni.showToast({
							title: '已复制',
							icon: 'none'
						});
					},
					fail(e) {
						console.log(e)
					}
				});

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.wrap {
		background-color: #F2F2F2;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;


		.content_wrap {
			width: 90%;
			height: 290rpx;

			background-color: #FFF;
			padding: 20rpx;
			margin-top: 20rpx;
			border-radius: 20rpx;


			.title {
				margin-top: 10rpx;
				font-size: 30rpx;
				color: #333333;
				font-weight: bold;
			}

			.line_wrap {
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 25rpx;

				.hint_text {
					font-size: 30rpx;
					color: #878787;
				}

				.content_wrap1 {
					display: flex;
					flex-direction: row;

					.content_1_text {
						font-size: 30rpx;
						color: #878787;
					}

					.div {
						margin-left: 15rpx;
						align-self: center;
						width: 1rpx;
						height: 20rpx;
						background-color: #DDDDDD;
					}

					.content_2_text {
						font-size: 30rpx;
						margin-left: 15rpx;
						color: #5890F8;
					}
				}
			}
		}

	}
</style>