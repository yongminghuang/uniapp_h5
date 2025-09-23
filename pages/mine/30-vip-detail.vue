<template>
	<view class="wrap">
		<view>
			<image class="navi_bg" :src="$util.ossImagePath('/vip/bg_forever_vip_detail_top.jpg')">
			</image>
		</view>

		<view class="title_layout" :style="{ 'background-color': `rgba(0,0,0,${opacity})` ,
		 height: `${barHeight + statusBarHeight}px`, paddingTop:`${statusBarHeight}px` }">
			<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_back_gray.png" mode="widthFix" @click="toBack"></image>
			<text class="title-view">
				开通会员
			</text>
		</view>
		<view class="header_layout">
			<image class="bg_header_layout" :src="$util.ossImagePath('/vip/bg_30_vip_detail_top.png')">
			</image>
			<image class="img_head"
				:src="userinfo.headImgUrl ? userinfo.headImgUrl : 'https://img.jx885.com/lrjk_uniapp/img/mine/ic_default_avatar.png'"></image>
			<label class="label_nick_name">{{ userinfo.nickName }}</label>
			<label class="label_phone">{{ userinfo.phone ? userinfo.phone : '未绑定手机' }}</label>
		</view>

		<view class="my_profile_layout">
			<image class="bg_my_profile" :src="$util.ossImagePath('/vip/bg_forever_vip_my_profile.png')">
			</image>
			<view class="grid_profile">
				<view class="colum_profile">
					<image class="item_profile" :src="$util.ossImagePath('/vip/item_profile_1.png')"
						@click="skillAction(1)">
					</image>
					<image class="item_profile" :src="$util.ossImagePath('/vip/item_profile_2.png')"
						@click="skillAction(4)">
					</image>
					<image class="item_profile" :src="$util.ossImagePath('/vip/item_profile_3_u.png')">
					</image>
				</view>
				<view class="colum_profile">
					<image class="item_profile" :src="$util.ossImagePath('/vip/item_profile_4_u.png')">
					</image>
					<image class="item_profile" :src="$util.ossImagePath('/vip/item_profile_5.png')"
						@click="speedAction">
					</image>
					<image class="item_profile" :src="$util.ossImagePath('/vip/item_profile_6.png')"
						@click="secretAcyion">
					</image>
				</view>
				<view class="colum_profile">
					<!-- <image class="item_profile" :src="$util.ossImagePath('/vip/item_profile_7.png')">
					</image> -->
					<image class="item_profile" :src="$util.ossImagePath('/vip/item_profile_8_u.png')">
					</image>
					<image class="item_profile" :src="$util.ossImagePath('/vip/item_profile_9_u.png')">
					</image>
				</view>
			</view>

		</view>

		<view class="open_vip_common_question">

			<!-- <image class="ic_vip_common_problem" :src="$util.ossImagePath('/vip/ic_vip_common_problem.png')"></image> -->
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

		<view class="fix_bottom_layout" :style="bottomStyle">
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
				<label class="label_upgradle">升级永久会员</label>

			</view>

			<view class="pay_price_layout">
				<label class="label_price_symbol">￥</label>
				<label class="label_price">{{money}}</label>
			</view>

			<view class="pay_button" @click="payAction">立即支付</view>
		</view>
		<view class="bottom-space" :style="bottomSpaceStyle"></view>
	</view>
</template>

<script>
	import {
		getVipsInfo,
		getArrayClassId,
		getBigClassId
	} from '../../common/request.js'
	import {
		toSkillPage,
		toClassifyListPage,
	} from '../../common/page-route.js'
	export default {
		data() {
			return {
				userinfo: [],
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
				opacity: 0,
				statusBarHeight: 0,
				barHeight: 0,
				money: 0,
				moneyId: 0,
				bottomStyle: '',
				bottomSpaceStyle: '',
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
		created() {
			const systemInfo = uni.getSystemInfoSync();
			// 状态栏高度
			let statusBarHeight = systemInfo.statusBarHeight
			// 胶囊区域坐标
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// 导航栏的高度 = (胶囊底部高度-状态栏的高度)+(胶囊顶部高度-状态栏的高度)*2
			let navHeight = (menuButtonInfo.bottom - statusBarHeight) + (menuButtonInfo.top - statusBarHeight) * 2
			// 导航栏和状态栏的高度
			this.statusBarHeight = statusBarHeight
			this.barHeight = navHeight
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			this.bottomStyle = 'bottom:' + bottomSafeHeight + 'px;'
			this.bottomSpaceStyle = 'height:' + bottomSafeHeight + 'px;'
		},
		onLoad() {
			this.getVipPrice()
		},
		methods: {
			toBack() {
				uni.navigateBack();
			},
			getVipPrice() {
				var that = this
				var userinfo = uni.getStorageSync('user')
				let params = {
					userId: userinfo.id
				}
				that.$u.api.renewMoney(params)
					.then(res => {
						if (res.code == 200) {
							var obj = res.body
							that.money = obj.money
							that.moneyId = obj.id
						}
					})
			},
			speedAction() {
				toClassifyListPage("精简600题")
			},

			payAction() {
				var that = this
				const user = uni.getStorageSync('user');
				var thirdInfoObj = this.$store.state.vuex_user_thirdinfo
				let params = {
					toUser: user.id,
					commodityId: that.moneyId,
					wxUnionId: thirdInfoObj.wxUnionId,
					xcxOpenId: thirdInfoObj.wxXcxOpenId
				}
				that.$u.api.lrXcxWxPay(params)
					.then(res => {
						if (res.code == 200) {
							var body = res.body
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: body.timeStamp,
								nonceStr: body.nonceStr,
								package: body.packageValue,
								signType: body.signType,
								paySign: body.paySign,
								success: function(res) {
									uni.showToast({
										title: '支付成功',
										icon: 'success'
									});
									that.queryVips();
								},
								fail: function(err) {
									uni.showToast({
										title: '支付失败',
										icon: 'error'
									});
								},
							});
						}
					})
			},

			async queryVips() {
				var isSuccess = await getVipsInfo(this)
				if (isSuccess) {
					this.toBack()
				}
			},

			async skillAction(value) {
				if (this.$util.isVip(this)) {
					uni.navigateTo({
						url: "/page_learn/pages/learn/skill-ready-page/skill-ready-page?subject=" + value
					})
				} else {
					let classIds = await getArrayClassId(this)
					if (classIds) {
						toSkillPage(classIds, false, value);
					}
				}
			},

			// 考前密卷
			secretAcyion() {
				this.onLaunchLearnPageByPageName("考前密卷");
			},

			async onLaunchLearnPageByPageName(pageName) {
				try {
					let classifyObj = await getBigClassId(this, pageName);
					if (classifyObj) {
						toLearnPage([classifyObj.classifyId])
					} else {
						uni.showToast({
							title: "无数据，请联系客服"
						})
					}
				} catch (e) {
					console.error(e)
				}
			},

		}
	}
</script>

<style lang="scss">
	.navi_bg {
		width: 100%;
		margin-top: -110rpx;
		height: 560rpx;
	}

	.title_layout {
		position: fixed;
		background-color: transparent;
		display: flex;
		flex-direction: row;
		// height: 105rpx;
		width: 100%;
		left: 0;
		top: 0rpx;
		// padding-top: 80rpx;
		justify-content: center;
		align-items: center;
		z-index: 1;

		image {
			// margin-left: 25rpx;
			// padding: 5rpx;
			width: 25rpx;
			position: absolute;
			left: 25rpx;
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

	.my_profile_layout {
		width: 696rpx;
		height: 888rpx;
		position: absolute;
		display: flex;
		flex-direction: column;
		top: 558rpx;
		left: 27rpx;

		.bg_my_profile {
			position: absolute;
			width: 696rpx;
			height: 888rpx;

		}

		.grid_profile {
			width: 100%;
			position: absolute;
			top: 120rpx;
		}

		.colum_profile {
			width: 100%;
			height: 230rpx;
			display: flex;
			margin-top: 16rpx;
			align-items: center;
			flex-wrap: wrap;
			// justify-content: space-evenly;
			// flex-direction: row;

			.item_profile {
				margin-left: 21rpx;
				width: 204rpx;
				height: 230rpx;
			}
		}
	}

	.open_vip_common_question {
		position: absolute;
		width: 696rpx;
		height: 1392rpx;
		margin-left: 27rpx;
		top: 1500rpx;

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
				margin-right: 20rpx;
			}
		}

		.vip_common_problem_title {
			background: url('https://img.jx885.com/lrjk_uniapp/img/vip/ic_vip_common_problem_tile.png');
			width: 642rpx;
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
		height: 100rpx;
		position: absolute;
		top: 2950rpx;

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

	.bottom-space {
		position: fixed;
		width: 100%;
		bottom: 0;
		background-color: white;
	}
</style>