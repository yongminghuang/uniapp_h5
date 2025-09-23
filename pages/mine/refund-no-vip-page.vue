<template>
	<view class="wrap">


		<uni-nav-bar height="88rpx" :border="false" background-color="transparent" fixed statusBar>
			<template v-slot:left>
				<view class="back-view">
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_back_gray.png" mode="widthFix" @click="toBack"></image>
				</view>
			</template>
			<template>
				<view class="title-view">
					<text class="title">我要退款</text>
				</view>
			</template>
		</uni-nav-bar>

		<view>
			<image class="navi_bg" :src="$util.ossImagePath('/vip/bg_forever_vip_detail_top.jpg')">
			</image>
		</view>

		<image class="bg_profile" :src="$util.ossImagePath('/vip/bg_vip_profile.png')"></image>
		<text class=".text_not_open_forever_vip_hint" decode>
			{{ open_vip_hint }}</text>


		<view class="common_question_layout">

			<image class="ic_vip_common_problem" :src="$util.ossImagePath('/vip/ic_vip_common_problem.png')"></image>
			<image class="ic_vip_common_problem_top" :src="$util.ossImagePath('/vip/ic_vip_common_problem_top.png')">
			</image>
			<view class="vip_common_problem_list">
				<view class="vip_common_problem_item" v-for="item in vip_quesiton_list" :key="item">
					<view class="vip_common_problem_title">
						<label>{{ item.title }}</label>
					</view>
					<view class="vip_common_problem_content">
						<label class="title_anwer_hint">答：</label>
						<label class="title_answer">{{ item.answer }}</label>
					</view>

				</view>

			</view>

		</view>

		<view class="bottom_empty_layout"></view>

		<view class="fix_bottom_layout">
			<image class="bg_fix_bottom" :src="$util.ossImagePath('/vip/bg_upgradle_vip_bottom.png')">
			</image>
			<view class="pay_option">
				<image class="weixin_icon" :src="$util.ossImagePath('/vip/ic_weixin.png')"></image>
				<label class="weixin_pay_text">微信支付</label>
				<image class="weixin_checked" :src="$util.ossImagePath('/vip/ic_pay_option_check.png')">
				</image>
			</view>

			<view class="layout_upgradle">
				<image class="img_upgradle" :src="$util.ossImagePath('/vip/ic_upgradle_vip.png')"></image>
				<label class="label_upgradle">{{ isTempVip ? '升级永久会员' : '开通永久会员' }}</label>

			</view>

			<view class="pay_price_layout">
				<label class="label_price_symbol">￥</label>
				<label class="label_price">30</label>
			</view>

			<view class="pay_button">立即支付</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: [],
				isTempVip: true,
				open_vip_hint: '&ensp;&ensp;&ensp;&ensp;尊敬的用户，您还未开通永久会员，暂时无法享受不过包退权益。',
				vip_quesiton_list: [{
						title: "问：开通会员有什么好处？",
						answer: "开通会员可以获得各类做题技巧，视频技巧讲解，精简题目等众多特权，永久会员还可以获得科一科四考试不过包退权益。"
					},
					{
						title: "问：开通会员后要怎么使用？",
						answer: "开通会员后可以在首页各个功能模块直接点击进入学习，特权将自动开启，无需额外操作。"
					},
					{
						title: "问：不过包退是什么意思？",
						answer: "不过包退指您开通永久会员后若参与科一或科四考试未通过，则可以申请退回会员费用，同时会员权益也将关闭，关闭后您可再次开通会员，再次获得权益。"
					},
					{
						title: "问：不过包退怎么申请？",
						answer: "若您科一或科四考试未通过，您可以通过“我的-我要退款”功能提交退款申请，审核通过后即可退款，退款完成后VIP权益也将关闭。"
					},
				],
				opacity: 0
			}
		},
		onShow() {
			this.userinfo = uni.getStorageSync('user')
			this.url = uni.getStorageSync('url')
			let collect = uni.getStorageSync('collect')
			this.collectNum = collect.length
		},
		onPageScroll(e) {
			if (e.scrollTop <= 44) {
				this.opacity = e.scrollTop / 44 * 1
			} else if (e.scrollTop > 44) {
				this.opacity = 1
			}

		},
		methods: {
			toBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
	.navi_bg {
		position: absolute;
		top: 0rpx;
		width: 100%;
		margin-top: -110rpx;
		height: 500rpx;
	}

	.back-view {
		display: flex;

		image {
			margin-left: 25rpx;
			padding: 5rpx;
			width: 25rpx;
		}

		text {
			font-size: 26rpx;
			margin: auto 0 auto 10rpx;
		}
	}

	.title-view {
		display: flex;
		margin: auto;

		.title {
			text-align: center;
			font-size: 36rpx;
			width: 100%;
			color: #fff;
		}
	}


	.title_layout {
		position: fixed;
		background-color: transparent;
		display: flex;
		flex-direction: row;
		height: 105rpx;
		width: 100%;
		left: 0;
		top: 0;
		padding-top: 44rpx;
		justify-content: center;
		align-items: center;
		z-index: 1;

		image {
			margin-left: 25rpx;
			padding: 5rpx;
			width: 25rpx;

		}

		text {
			text-align: center;
			font-size: 36rpx;
			width: 100%;
			color: #fff;
		}
	}

	.header_layout {
		position: absolute;
		top: 226rpx;

		width: 696rpx;
		height: 266rpx;
		margin-left: 27rpx;

		.bg_header_layout {
			width: 696rpx;
			height: 266rpx;
		}

		.img_head {
			position: absolute;
			top: 127rpx;
			left: 44rpx;
			width: 102rpx;
			height: 102rpx;
			border-radius: 50%;
		}

		.label_nick_name {
			position: absolute;
			top: 137rpx;
			left: 169rpx;
			font-family: Lantinghei SC;
			font-weight: 600;
			font-size: 40rpx;
			color: #8D5C3B;
			line-height: 47rpx;
		}

		.label_phone {
			position: absolute;
			top: 187rpx;
			left: 169rpx;
			font-family: Lantinghei SC;
			font-weight: 600;
			font-size: 33rpx;
			color: #8D5C3B;
			line-height: 47rpx;
		}
	}

	.text_not_open_forever_vip_hint {
		padding-left: 27rpx;
		padding-right: 27rpx;
		position: absolute;
		top: 180rpx;
		font-weight: bold;
		font-size: 35rpx;
		color: #E0BF82
	}

	.bg_profile {
		width: 696rpx;
		height: 504rpx;
		position: absolute;
		display: flex;
		flex-direction: column;
		top: 288rpx;
		left: 27rpx;
	}

	.common_question_layout {
		position: absolute;
		width: 696rpx;
		height: 1392rpx;
		margin-left: 27rpx;
		top: 830rpx;

		.ic_vip_common_problem_top {
			position: absolute;
			top: 31rpx;
			left: 74rpx;
			width: 548rpx;
			height: 40rpx;
		}

		.ic_vip_common_problem {
			width: 696rpx;
			height: 1392rpx;
			background-size: 100% 100%;
		}

		.vip_common_problem_list {
			position: absolute;
			display: flex;
			flex-direction: column;
			top: 110rpx;
			left: 27rpx;
		}

		.vip_common_problem_item {
			position: relative;
			display: flex;
			flex-direction: column;
			height: 290rpx;
			padding-top: 20rpx;
		}

		.vip_common_problem_content {
			display: flex;
			flex-direction: row;
			background: url('https://img.jx885.com/lrjk_uniapp/img/vip/bg_vip_comon_problem_content.png');
			width: 642rpx;
			height: 321rpx;
			background-size: 100% 100%;


			.title_anwer_hint {
				margin-left: 30rpx;
				font-size: 27rpx;
				color: #47403C;

			}

			.title_answer {
				font-size: 27rpx;
				color: #47403C;
			}
		}

		.vip_common_problem_title {
			background: url('https://img.jx885.com/lrjk_uniapp/img/vip/ic_vip_common_problem_tile.png');
			width: 612rpx;
			height: 140rpx;
			background-size: 100% 100%;
			font-size: 29rpx;
			color: #FFFFFF;
			align-items: center;
			padding-top: 19rpx;
			padding-left: 30rpx;
		}

	}

	.bottom_empty_layout {
		width: 100%;
		height: 50rpx;
		position: absolute;
		top: 2430rpx;
	}

	.fix_bottom_layout {
		height: 191rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;

		.bg_fix_bottom {
			width: 100%;
			height: 191rpx;
		}

		.pay_option {
			position: absolute;
			top: 28rpx;
			left: 28rpx;
			display: flex;
			flex-direction: row;
			height: 50rpx;
			// justify-content: center;
			align-items: center;

			.weixin_icon {

				width: 37rpx;
				height: 33rpx;
			}

			.weixin_pay_text {

				font-weight: 400;
				font-size: 28rpx;
				color: #32302F;
				line-height: 90rpx;
				margin-left: 15rpx;
			}

			.weixin_checked {
				width: 40rpx;
				height: 40rpx;
				margin-left: 15rpx;
			}
		}

		.layout_upgradle {
			position: absolute;
			right: 0rpx;
			width: 197rpx;
			height: 73rpx;
			top: -40rpx;

			.img_upgradle {
				width: 197rpx;
				height: 73rpx;
				text-align: center;
			}

			.label_upgradle {
				position: absolute;
				right: 24rpx;
				top: 20rpx;
				font-weight: 400;
				font-size: 24rpx;
				color: #F6F2E9;
				line-height: 29rpx;

			}
		}


		.pay_price_layout {
			position: absolute;
			right: 0rpx;
			top: 0rpx;
			display: flex;
			width: 200rpx;
			flex-direction: row;
			align-items: flex-end;

			.label_price_symbol {
				font-weight: bold;
				font-size: 33rpx;
				color: #fddb7fFF;
				width: 40rpx;
				padding-bottom: 10rpx;
			}

			.label_price {
				font-weight: bold;
				font-size: 67rpx;
				color: #fddb7fFF;
				width: 200rpx;
			}
		}

		.pay_button {
			position: absolute;
			left: 0;
			bottom: 0rpx;
			width: 100%;
			height: 100rpx;
			background: linear-gradient(0deg, #C49454, #F8DD9A);
			box-shadow: 0rpx -4rpx 0rpx 0rpx rgba(198, 151, 87, 0.22);
			border-radius: 54rpx 54rpx 0rpx 0rpx;

			text-align: center;
			font-size: 44rpx;
			font-weight: bold;
			color: #6A3F1F;
			line-height: 29rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>