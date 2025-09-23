<template>
	<view class="warp">

		<image class="bg_top_image" :src="$util.ossImagePath('/vip/bg_open_vip_top2.png')"></image>

		<view class="title_layout" :style="{ 'background-color': `rgba(0,0,0,${opacity})` ,
		 height: `${barHeight + statusBarHeight}px`, paddingTop:`${statusBarHeight}px` }">
			<view class="back_view" @click="toBack">
				<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_back_gray.png" mode="widthFix">
				</image>
			</view>
			<text class="title-view">
				开通会员
			</text>
		</view>

		<view class="content">

			<!-- 	<view class="phone_layout">
				<image src="https://img.jx885.com/lrjk_uniapp/img/login/ic_openvip_phone.png"></image>
				<text>{{phoneStr}}</text>
			</view> -->
			<!-- <image class="vip_profile_compare" :src="$util.ossImagePath('/vip/ic_vip_compare.png')"></image> -->
			<view class="tip-wrap">
				<text class="tip">永久VIP</text>
				<text class="tip">直降￥{{rightOriginalPrice - rightPrice}}元</text>

			</view>

			<view class="price-wrap">
				<view class="price_nor_box" @click="click_vip_type(0)">
					<view :class="selectedVipType == 0 ?'conten_selected_wrap':'conten_nor_wrap'">

						<text class="content_0_box">30天体验VIP</text>
						<view class="content_1_box">
							<text>使用30天</text>
						</view>
						<view class="content_2_box">
							<text>速记技巧</text>
						</view>
						<view class="content_1_box">
							<text>科一课程</text>
						</view>
						<view class="content_2_box">
							<text>速成题库</text>
						</view>
						<view class="content_1_box">
							<text>考前密卷</text>
						</view>
						<view class="content_2_nor_box">
							<text>难题攻克</text>
						</view>
						<view class="content_1_box">
							<text>-</text>
						</view>
						<view class="content_2_nor_box">
							<text>-</text>
						</view>
						<view class="content_1_box">
							<text>-</text>
						</view>
						<view class="content_2_nor_box">
							<text>-</text>
						</view>
						<view class="content_1_box">
							<text>-</text>
						</view>
					</view>
					<view :class="selectedVipType == 0 ?  'price_top_selected_bg': 'price_top_bg'">

						<view class="price_box">
							<text class="price_text">¥{{leftPrice}}</text>
							<text class="price_origin_text">¥{{leftOriginalPrice}}</text>
						</view>

						<image
							:src="selectedVipType == 0? $util.ossImagePath('/vip/price_selected.png'):$util.ossImagePath('/vip/price_bg.png')">
					</view>

				</view>

				<view class="price_nor_box" @click="click_vip_type(1)">
					<view :class="selectedVipType == 1? 'conten_selected_wrap':'conten_nor_wrap'">

						<text class="content_0_box">180天VIP</text>
						<view class="content_1_box">
							<text>使用180天</text>
						</view>
						<view class="content_2_box">
							<text>速记技巧</text>
						</view>
						<view class="content_1_box">
							<text>全部课程</text>
						</view>
						<view class="content_2_box">
							<text>速成题库</text>
						</view>
						<view class="content_1_box">
							<text>考前密卷</text>
						</view>
						<view class="content_2_nor_box">
							<text>难题攻克</text>
						</view>
						<view class="content_1_color_box">
							<text>3小时精华课</text>
						</view>
						<view class="content_2_box">
							<text>科二视频教学</text>
						</view>
						<view class="content_1_color_box">
							<text>科三视频教学</text>
						</view>
						<view class="content_2_nor_box">
							<text>-</text>
						</view>
						<view class="content_1_box">
							<text>-</text>
						</view>

					</view>
					<view :class="selectedVipType == 1 ?  'price_top_selected_bg': 'price_top_bg'">

						<view class="price_box">
							<text class="price_text">¥{{middlePrice}}</text>
							<text class="price_origin_text">¥{{middleOriginalPrice}}</text>
						</view>

						<image
							:src="selectedVipType == 1? $util.ossImagePath('/vip/price_selected.png'):$util.ossImagePath('/vip/price_bg.png')">
					</view>

				</view>

				<view class="price_nor_box" @click="click_vip_type(2)">
					<view :class="selectedVipType == 2? 'conten_selected_wrap':'conten_nor_wrap'">

						<text class="content_0_box">永久VIP</text>
						<view class="content_1_box">
							<text>永久使用</text>
							<view class="couple_tip_layout">
								<text>比分开购买立省80元</text>
							</view>
						</view>
						<view class="content_2_box">
							<text>速记技巧</text>
						</view>
						<view class="content_1_box">
							<text>全部课程</text>
						</view>
						<view class="content_2_box">
							<text>速成题库</text>
						</view>
						<view class="content_1_box">
							<text>考前密卷</text>
						</view>
						<view class="content_2_nor_box">
							<text>难题攻克</text>
						</view>
						<view class="content_1_color_box">
							<text>3小时精华课</text>
						</view>
						<view class="content_2_box">
							<text>科二视频教学</text>
						</view>
						<view class="content_1_color_box">
							<text>科三视频教学</text>
						</view>
						<view class="content_2_box">
							<text>速记卡片</text>
						</view>
						<view class="content_1_color_box">
							<text>科一科四不过退款</text>
						</view>

					</view>
					<view :class="selectedVipType == 2 ?  'price_top_selected_bg': 'price_top_bg'">

						<view class="price_box">
							<text class="price_text">¥{{rightPrice}}</text>
							<text class="price_origin_text">¥{{rightOriginalPrice}}</text>
						</view>

						<image
							:src="selectedVipType == 2? $util.ossImagePath('/vip/price_selected.png'):$util.ossImagePath('/vip/price_bg.png')">
						</image>
					</view>

				</view>
			</view>

			<view class="rule_box">
				<text class="rule_tip_text">开通前请阅读</text>
				<text class="rule_text" @click="toVipWeb">《会员协议》</text>
				<text class="rule_tip_text">，科一科四不过退款请联系客服办理。</text>
			</view>


			<!-- <image class="vip_refund" :src="$util.ossImagePath('/vip/bg_vip_refund.png')"></image> -->

			<view class="open_vip_status_wrap">
				<!-- <image class="ic_open_vip_status" :src="$util.ossImagePath('/vip/bg_ipen_vip_status.png')"></image> -->

				<view class="open_vip_status_box">
					<scroll-view class="list_open_vip_status" :scroll-top="scrollTop" scroll-y>
						<view :class="index%2 == 0 ? 'item_open_vip_status':'item_open_vip_status_2'"
							v-for="(item,index) in open_vip_list" :key="item">
							<image class="vip_head" src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_vip.png">
							</image>
							<image class="user_head"
								src="https://img.jx885.com/lrjk_uniapp/img/mine/ic_default_avatar.png"></image>
							<label class="user_name">{{ item.username }}</label>
							<view class="div"></view>
							<view class="open_vip_layout">
								<label class="open_vip_text_hint">开通</label>
								<label class="open_vip_text_1" v-if="item.isForverVip">永久会员</label>
								<label class="open_vip_text_2" v-else>临时会员</label>
							</view>
						</view>
					</scroll-view>

					<view class="view_stop_user_touch"></view>

					<view class="ic_open_status_bg">

						<image class="bg_open_status" :src="$util.ossImagePath('/vip/bg_open_status.png')"></image>
						<view class="point_text">
							<image class="point" :src="$util.ossImagePath('/vip/ic_point.png')"></image>
							<text>开通情况</text>
							<image class="point" :src="$util.ossImagePath('/vip/ic_point.png')"></image>
						</view>

					</view>
				</view>
			</view>
			<view class="open_vip_common_question" v-if="false">




				<!-- <image class="ic_vip_common_problem" :src="$util.ossImagePath('/vip/ic_vip_common_problem.png')"> -->
				<!-- </image> -->
				<!-- <image class="ic_vip_common_problem_top"
					:src="$util.ossImagePath('/vip/ic_vip_common_problem_top.png')">
				</image> -->
				<view class="open_vip_history_box">
					<view class="vip_common_problem_list">
						<view class="vip_common_problem_item" v-for="item in vip_quesiton_list" :key="item">
							<view class="vip_common_problem_title">

								<image class="ic_answer" :src="$util.ossImagePath('/vip/ic_vip_answer.png')"></image>
								<label>{{ item.title }}</label>
							</view>
							<view class="vip_common_problem_content">
								<label class="title_anwer_hint">答：</label>
								<label class="title_answer">{{ item.answer }}</label>
							</view>

						</view>

					</view>

				</view>

				<view class="ic_history_bg">

					<image class="bg_history" :src="$util.ossImagePath('/vip/bg_open_status.png')"></image>
					<view class="point_text">
						<image class="point" :src="$util.ossImagePath('/vip/ic_point.png')"></image>
						<text>常见问题</text>
						<image class="point" :src="$util.ossImagePath('/vip/ic_point.png')"></image>
					</view>

				</view>

			</view>
			<view class="bottom_empty_layout">

			</view>
		</view>
		<view class="bottom_pay_wrap" :style="bottomStyle">
			<view class="div"></view>

			<view class="bottom_price_wrap" v-if="isShowBottomPrice">
				<view :class="selectedVipType == 0 ? 'bottom_price_selected_box':'bottom_price_box'"
					@click="click_vip_type(0)">
					<text class="vip_type_text">30天体验VIP</text>
					<text class="vip_money_text">￥{{leftPrice}}</text>
					<view class="vip_lock_bg" v-if="selectedVipType == 0">

						<image :src="$util.ossImagePath('/vip/ic_lock.png')"></image>
					</view>
				</view>

				<view :class="selectedVipType == 1 ? 'bottom_price_selected_box':'bottom_price_box'"
					@click="click_vip_type(1)">
					<text class="vip_type_text">180天VIP</text>
					<text class="vip_money_text">￥{{middlePrice}}</text>
					<view class="vip_lock_bg" v-if="selectedVipType == 1">

						<image :src="$util.ossImagePath('/vip/ic_lock.png')"></image>
					</view>
				</view>

				<view :class="selectedVipType == 2 ? 'bottom_price_selected_box':'bottom_price_box'"
					@click="click_vip_type(2)">
					<text class="vip_type_text">永久VIP</text>
					<text class="vip_money_text">￥{{rightPrice}}</text>
					<view class="vip_lock_bg" v-if="selectedVipType == 2">

						<image :src="$util.ossImagePath('/vip/ic_lock.png')"></image>
					</view>
				</view>
			</view>
			<view class="bottom_couple_layout">
				<view class="bottom_couple_wrap" v-if="selectedVipType == 2">
					<text class="couple_tip">立减￥{{rightOriginalPrice - rightPrice}}！ </text>

					<image class="ic_timer" :src="$util.ossImagePath('/vip/ic_count_timer.png')"></image>

					<text class="time_tip">{{day}}</text>
					<text class="time2_tip">天 </text>
					<view class="time_space"></view>

					<text class="time_tip">{{hour1}}</text>
					<text class="time2_tip">{{hour2}}</text>

					<text class="time2_div">:</text>

					<text class="time_tip">{{min1}}</text>
					<text class="time2_tip">{{min2}}</text>

					<text class="time2_div">:</text>

					<text class="time_tip">{{sec1}}</text>
					<text class="time2_tip">{{sec2}}</text>
				</view>
			</view>

			<view class="bottom_pay_btn_warp" @click="payAction">
				<view class="pay_money_wrap">
					<text class="pay_money_text">{{payMoney}}</text>
					<text class="limit_text">{{limitTimeVip}}</text>
				</view>

				<text class="open_vip_text">{{openVipTip}}</text>
			</view>

			<view class="pay_option_and_button" v-if="false">
				<view class="pay_option">
					<image class="weixin_icon" :src="$util.ossImagePath('/vip/ic_weixin.png')"></image>
					<label class="weixin_pay_text">微信支付</label>
					<image class="weixin_checked" :src="$util.ossImagePath('/vip/ic_pay_option_check.png')"></image>
				</view>

			</view>

		</view>
		<view class="bottom-space" :style="bottomSpaceStyle"></view>
	</view>

</template>

<script>
	import {
		toVIPUrl,
		toVipInfo
	} from '../../common/page-route.js'
	import {
		getVipsInfo,
		requestPay
	} from '../../common/request.js'
	import {
		ossImagePath
	} from '../../common/util.js'
	export default {
		data() {
			return {
				statusBarHeight: 0,
				barHeight: 0,
				priceBgUrl: "",
				open_vip_list: [

				],
				vip_quesiton_list: [{
						title: "：开通会员有什么好处？",
						answer: "开通会员可以获得各类做题技巧，视频技巧讲解，精简题目等众多特权，永久会员还可以获得科一科四考试不过包退权益。"
					},
					{
						title: "：开通会员后要怎么使用？",
						answer: "开通会员后可以在首页各个功能模块直接点击进入学习，特权将自动开启，无需额外操作。"
					},
					{
						title: "：不过包退是什么意思？",
						answer: "不过包退指您开通永久会员后若参与科一或科四考试未通过，则可以申请退回会员费用，同时会员权益也将关闭，关闭后您可再次开通会员，再次获得权益。"
					},
					{
						title: "：不过包退怎么申请？",
						answer: "若您科一或科四考试未通过，您可以通过“我的-我要退款”功能提交退款申请，审核通过后即可退款，退款完成后VIP权益也将关闭。"
					},
				],

				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				scrollTop: 0,
				opacity: 0,
				phoneStr: '',
				leftId: 0,
				rightId: 0,
				middleId: 0,
				leftPrice: 0,
				rightPrice: 0,
				middlePrice: 0,
				leftOriginalPrice: 0,
				rightOriginalPrice: 0,
				middleOriginalPrice: 0,
				bottomStyle: '',
				bottomSpaceStyle: '',
				selectedVipType: 2,
				payMoney: 0,
				openVipTip: '',
				limitTimeVip: '',
				isShowBottomPrice: false,
				isIosPlatform: false,
				remainingTime: 5 * 24 * 60 * 60 * 1000, // 5天的毫秒数
				day: 0,
				hour1: "",
				hour2: "",
				min1: "",
				min2: "",
				sec1: "",
				sec2: "",
			}
		},
		onPageScroll(e) {
			if (e.scrollTop <= 30) {
				this.opacity = 0
			} else if (e.scrollTop > 30) {
				this.opacity = 1
			}
			if (e.scrollTop <= 150) {
				this.isShowBottomPrice = false
			} else {
				this.isShowBottomPrice = true
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
			this.priceBgUrl = ossImagePath('/vip/price_bg.png');
			const userObj = uni.getStorageSync('user');
			this.phoneStr = userObj.phone;
			this.getVipPrice()
			this.isIosPlatform = uni.getSystemInfoSync().platform == 'ios'
			this.startCountdown();
		},
		methods: {
			startCountdown() {
				const timer = setInterval(() => {
					this.remainingTime -= 1000;

					if (this.remainingTime <= 0) {
						clearInterval(timer);
						this.remainingTime = 0;
					}

					this.formatTime();
				}, 1000);
			},
			formatTime() {
				this.day = Math.floor(this.remainingTime / (1000 * 60 * 60 * 24));
				const hours = Math.floor((this.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
				this.hour1 = parseInt(hours / 10);
				this.hour2 = hours % 10;
				this.min1 = parseInt(minutes / 10);
				this.min2 = minutes % 10;
				this.sec1 = parseInt(seconds / 10);
				this.sec2 = seconds % 10;
			},

			getRandom(min, max) {
				const floatRandom = Math.random()

				const difference = max - min

				// 介于 0 和差值之间的随机数
				const random = Math.round(difference * floatRandom)

				const randomWithinRange = random + min

				return randomWithinRange
			},
			toBack() {
				uni.navigateBack();
			},
			toVipWeb() {
				toVIPUrl()
			},
			click_vip_type(type) {
				if (this.isIosPlatform) {
					this.payMoney = ''
					this.openVipTip = '由于相关规范，IOS功能暂不可用'
					this.limitTimeVip = ''
					return
				}
				this.selectedVipType = type;
				if (type == 0) {
					this.payMoney = "￥" + this.leftPrice
					this.openVipTip = '立即开通'
					this.limitTimeVip = '有效期:30天'
				} else if (type == 1) {
					this.payMoney = "￥" + this.middlePrice
					this.openVipTip = '立即开通'
					this.limitTimeVip = '有效期:180天'
				} else if (type == 2) {
					this.payMoney = "￥" + this.rightPrice
					this.openVipTip = '永久VIP限时特惠价!'
					this.limitTimeVip = ''
				}
			},
			getVipPrice() {
				var that = this
				let params = {}
				that.$u.api.queryVipList(params)
					.then(res => {
						if (res.code == 200) {
							var list = res.body
							for (var i = 0; i < list.length; i++) {
								var obj = list[i]
								if (obj.id == 1) {
									that.leftId = obj.id
									that.leftPrice = obj.money
									that.leftOriginalPrice = obj.originalMoney
								} else if (obj.id == 2) {
									that.rightId = obj.id
									that.rightPrice = obj.money
									that.rightOriginalPrice = obj.originalMoney
								} else if (obj.id == 29) {
									that.middleId = obj.id
									that.middlePrice = obj.money
									that.middleOriginalPrice = obj.originalMoney
								}
							}
							this.click_vip_type(2)
						}
					})
			},
			payAction() {
				if (this.isIosPlatform) {
					return
				}
				let id = this.selectedVipType == 0 ? this.leftId : this.selectedVipType == 2 ? this.rightId : this
					.middleId;
				requestPay(this, id, () => {
					toVipInfo(true)
				})
				// var that = this
				// const user = uni.getStorageSync('user');
				// var thirdInfoObj = this.$store.state.vuex_user_thirdinfo
				// let params = {
				// 	toUser: user.id,
				// 	commodityId: that.selectedVipType == 2 ? that.rightId : that.selectedVipType == 0 ? that.leftId :
				// 		that.middleId,
				// 	wxUnionId: thirdInfoObj.wxUnionId,
				// 	xcxOpenId: thirdInfoObj.wxXcxOpenId
				// }
				// that.$u.api.lrXcxWxPay(params)
				// 	.then(res => {
				// 		if (res.code == 200) {
				// 			var body = res.body
				// 			uni.requestPayment({
				// 				provider: 'wxpay',
				// 				timeStamp: body.timeStamp,
				// 				nonceStr: body.nonceStr,
				// 				package: body.packageValue,
				// 				signType: body.signType,
				// 				paySign: body.paySign,
				// 				success: function(res) {
				// 					uni.showToast({
				// 						title: '支付成功',
				// 						icon: 'success'
				// 					});
				// 					that.queryVips();
				// 				},
				// 				fail: function(err) {
				// 					uni.showToast({
				// 						title: '支付失败',
				// 						icon: 'error'
				// 					});
				// 				},
				// 			});
				// 		}
				// 	})
			},
			async queryVips() {
				var isSuccess = await getVipsInfo(this)
				if (isSuccess) {
					this.toBack()
				}
			},
		},
		mounted() {
			this.open_vip_list = [];
			for (var i = 0; i < 50; i++) {
				const isForverVip = Boolean(Math.round(Math.random()))
				const forverVip = '<span style="color: #FF47403C;">开通</span><span style="color: #FFFF4200;">永久会员</span>';
				const tempVip = '<span style="color: #FF47403C;">开通</span><span style="color: #FFB37A64;">临时会员</span>'
				const item = {
					isForverVip: isForverVip,
					vipLabel: isForverVip ? forverVip : tempVip,
					username: "l懒人****" + this.getRandom(999999999, 100000000)
				}
				this.open_vip_list.push(item)
			}
			let index = 0;
			setInterval(() => {
				// 每隔1秒钟更新scrollTop属性的值
				this.scrollTop += 20; // 假设每次滚动20像素
				if (this.scrollTop >= 200) {
					// 如果滚动到底部了，重新从顶部开始滚动
					this.scrollTop = 0;
				}
				index++;
				if (index >= this.open_vip_list.length) {
					index = 0;
				}
				this.open_vip_list.unshift(this.open_vip_list.pop());
			}, 1000);
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #000;
	}

	.bg_top_image {
		width: 100%;
		height: 700rpx;
	}

	.warp {
		position: relative;
		min-height: 100%;
	}


	.title_layout {
		position: fixed;
		background-color: transparent;
		display: flex;
		flex-direction: row;
		// height: calc(var(--status-bar-height) + 40rpx);
		width: 100%;
		left: 0;
		top: 0;
		// padding-top: calc(var(--status-bar-height) + 40rpx);
		justify-content: center;
		align-items: center;
		z-index: 2;

		.back_view {
			position: absolute;
			left: 0;
			padding-left: 25rpx;
			padding-right: 25rpx;

			image {
				// margin-left: 25rpx;
				// padding: 5rpx;
				width: 25rpx;

			}
		}


		text {
			text-align: center;
			font-size: 36rpx;
			width: 100%;
			color: #fff;
		}
	}

	.content {
		position: absolute;
		left: 0;
		top: 200rpx;
		width: 100%;

		.tip-wrap {
			display: flex;
			flex-direction: column;

			.tip {
				background: linear-gradient(0deg, #FFCD5C 0%, #FFFDD9 100%);
				-webkit-background-clip: text;
				color: transparent;

				font-size: 70rpx;
				font-weight: bold;
				// color: #FFCE5A;
				align-self: center;
			}
		}

		.price-wrap {
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			padding-left: 13rpx;
			padding-right: 13rpx;

			.price_nor_box {
				// display: flex;
				// flex-direction: column;
				position: relative;

				width: 216rpx;
				height: 800rpx;



				.price_top_bg {
					margin-left: auto;
					margin-right: auto;
					position: relative;
					width: 144rpx;
					height: 146rpx;

					image {
						position: absolute;

						top: 0rpx;
						left: 0rpx;
						width: 144rpx;
						height: 146rpx;
					}

					.price_box {
						position: absolute;
						top: 0rpx;
						left: 0rpx;
						width: 100%;
						height: 100%;
						display: flex;
						z-index: 1;

						flex-direction: column;
						justify-content: center;
						align-items: center;

						.price_text {

							font-weight: 600;
							font-size: 38rpx;
							color: #DB7E51;
						}

						.price_origin_text {
							font-size: 26rpx;
							color: #666666;
							line-height: 30rpx;
							text-decoration-line: line-through;
						}
					}

				}

				.price_top_selected_bg {
					margin-left: auto;
					margin-right: auto;
					position: relative;
					width: 144rpx;
					height: 146rpx;

					image {
						position: absolute;

						top: 0rpx;
						left: 0rpx;
						width: 144rpx;
						height: 146rpx;
					}

					.price_box {
						position: absolute;
						top: 0rpx;
						left: 0rpx;
						width: 100%;
						height: 100%;
						display: flex;
						z-index: 1;

						flex-direction: column;
						justify-content: center;
						align-items: center;

						.price_text {

							font-weight: 600;
							font-size: 38rpx;
							color: #ED3C00;
						}

						.price_origin_text {
							font-size: 26rpx;
							color: #666666;
							line-height: 30rpx;
							text-decoration-line: line-through;
						}
					}

				}

				.conten_nor_wrap {
					position: absolute;
					top: 60rpx;
					background: #FFFFFF;
					border-radius: 14rpx;
					border: 2px solid #9C9C9C;
					width: 216rpx;
					height: 720rpx;
					display: flex;
					flex-direction: column;

					.content_0_box {
						width: 100%;
						height: 196rpx;
						background: #F3F0E9;
						text-align: center;
						border-radius: 14rpx 14rpx 0rpx 0rpx;
						padding-top: 107rpx;
						font-size: 32rpx;
						font-weight: 600;
						color: #948470;
					}

					.content_1_box {
						width: 100%;
						height: 54rpx;
						padding-top: 6rpx;
						text-align: center;
						font-size: 24rpx;
						color: #2D2D2D;
						background: #FFFFFF;
					}

					.content_1_color_box {
						width: 100%;
						height: 54rpx;
						padding-top: 6rpx;
						text-align: center;
						font-size: 24rpx;
						color: #FF4800;
						background: #FFFFFF;
					}

					.content_2_box {
						width: 100%;
						height: 54rpx;
						padding-top: 6rpx;
						text-align: center;
						font-size: 24rpx;
						background: #F3F0E9;
						color: #FF4800;
					}

					.content_2_nor_box {
						width: 100%;
						height: 54rpx;
						padding-top: 6rpx;
						text-align: center;
						font-size: 24rpx;
						background: #F4EDE7;
						color: #2D2D2D;
					}

					.content_3_box {
						width: 100%;
						height: 54rpx;
						padding-top: 6rpx;
						text-align: center;
						font-size: 24rpx;
						background: #F4EDE7;
						color: #000;
					}
				}

				.conten_selected_wrap {
					position: absolute;
					top: 60rpx;
					background: #FEFAF2;
					border-radius: 14rpx;
					border: 4px solid #B17A49;
					width: 216rpx;
					height: 720rpx;
					display: flex;
					flex-direction: column;

					.content_0_box {
						width: 100%;
						height: 196rpx;
						background: #E8C5A2;
						text-align: center;
						border-radius: 14rpx 14rpx 0rpx 0rpx;
						padding-top: 107rpx;
						font-size: 32rpx;
						font-weight: 600;
						color: #963515;
					}

					.content_1_box {
						width: 100%;
						height: 54rpx;
						padding-top: 6rpx;
						text-align: center;
						color: #2D2D2D;
						background: #FEFAF2;
						font-size: 24rpx;
					}

					.content_1_color_box {
						width: 100%;
						height: 54rpx;
						padding-top: 6rpx;
						text-align: center;
						font-size: 24rpx;
						color: #FF4800;
						background: #FFFFFF;
					}

					.content_2_box {
						width: 100%;
						height: 54rpx;
						padding-top: 6rpx;
						text-align: center;
						background: #F4EDE7;
						color: #FF4800;
						font-size: 24rpx;
					}

					.content_2_nor_box {
						width: 100%;
						height: 54rpx;
						padding-top: 6rpx;
						text-align: center;
						background: #F4EDE7;
						color: #2D2D2D;
						font-size: 24rpx;
					}

					.content_3_box {
						width: 100%;
						height: 54rpx;
						padding-top: 6rpx;
						text-align: center;
						font-size: 24rpx;
						background: #F4EDE7;
						color: #000;
					}
				}

				.couple_tip_layout {
					margin-top: -70rpx;
					width: 200rpx;
					height: 30rpx;
					background: #ED6A00;
					border-radius: 15rpx 14rpx 0rpx 15rpx;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;

					image {
						width: 12rpx;
						height: 14rpx;
					}

					text {
						font-weight: 400;
						font-size: 18rpx;
						color: #FFFFFF;
						line-height: 46rpx;
					}
				}

			}
		}



		.rule_box {
			margin-left: 30rpx;
			margin-right: 25rpx;

			.rule_tip_text {
				color: #ffffff;
				font-size: 22rpx;
			}

			.rule_text {
				color: #9B4928;
				font-size: 22rpx;
			}
		}

		.phone_layout {

			width: 696rpx;
			height: 94rpx;
			margin: auto;
			margin-top: 74rpx;
			// background: url('https://img.jx885.com/lrjk_uniapp/img/vip/bg_vip_unlogin.png');
			// background-size: 100% 100%;
			background: #FFFFFF;
			border-radius: 47rpx;

			border: 1px solid #CC9E5F;
			opacity: 0.96;
			display: flex;

			image {
				width: 36rpx;
				height: 52rpx;
				margin: auto 0 auto 60rpx;
			}

			text {
				font-size: 30rpx;
				color: #333333;
				margin: auto 0 auto 30rpx;
			}
		}

		.vip_profile_compare {
			width: 696rpx;
			height: 838rpx;
			margin-left: 27rpx;
			margin-top: 35rpx;

			background-size: 80px 120px;
		}

		.vip_refund {
			width: 696rpx;
			height: 309rpx;
			margin-left: 27rpx;
			margin-top: 42rpx;
		}

		.open_vip_status_wrap {
			position: relative;
			width: 694rpx;
			height: 679rpx;
			background: #FFFFFF;
			border-radius: 14rpx;
			margin-left: 27rpx;
			margin-top: 42rpx;
			overflow: hidden;

			.open_vip_status_box {
				width: 660rpx;
				height: 616rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				border: 2px solid #B97D4D;
				margin-left: 19rpx;
				margin-top: 46rpx;
			}

			.ic_open_status_bg {
				position: relative;
				margin-top: -46rpx;
				left: 129rpx;
				width: 403rpx;
				height: 92rpx;
				align-items: center;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;

				.bg_open_status {
					position: absolute;
					left: 0rpx;
					top: 0;
					width: 100%;
					height: 100%;
				}

				.point_text {

					z-index: 1;

					.point {
						width: 7rpx;
						height: 7rpx;
						margin-bottom: 10rpx;
						vertical-align: middle;
					}

					text {
						font-weight: 500;
						font-size: 40rpx;
						color: #7D4926;
						margin-left: 15rpx;
						margin-right: 15rpx;
					}
				}

			}


			.ic_open_vip_status {
				width: 696rpx;
				height: 669rpx;
			}

			.view_stop_user_touch {

				position: absolute;
				display: flex;
				flex-direction: column;
				padding-top: 17rpx;
				top: 102rpx;
				// background: #6C615D;
				// left: 46rpx;
				width: 660rpx;
				height: 550rpx;
			}

			.list_open_vip_status {
				position: absolute;
				display: flex;
				flex-direction: column;
				padding-top: 17rpx;
				top: 102rpx;
				// left: 46rpx;
				height: 540rpx;

				.item_open_vip_status {

					display: flex;
					flex-direction: row;
					// margin-top: 17rpx;
					// margin-bottom: 20rpx;
					background: #F5F4F2;
					width: 650rpx;
					align-items: center;
				}

				.item_open_vip_status_2 {

					display: flex;
					flex-direction: row;
					// margin-top: 17rpx;
					// margin-bottom: 20rpx;
					background: #EEE7DF;
					width: 650rpx;
					align-items: center;
				}

				.vip_head {
					width: 28rpx;
					height: 22rpx;
					margin-left: 28rpx;
					align-items: center;
				}

				.user_head {
					width: 55rpx;
					height: 55rpx;
					margin-left: 17rpx;
				}

				.user_name {
					white-space: normal;
					text-overflow: ellipsis;
					width: 244rpx;
					margin-left: 17rpx;
					font-size: 23rpx;
					color: #47403C;

				}

				.div {
					width: 4rpx;
					height: 90rpx;
					background: #ffffff;
				}

				.open_vip_layout {
					margin-left: 35rpx;

					.open_vip_text_hint {
						color: #47403C;
					}

					.open_vip_text_1 {
						color: #FF4200;
					}

					.open_vip_text_2 {
						color: #B37A64;
					}
				}


			}
		}
	}

	.open_vip_common_question {
		position: relative;
		width: 694rpx;
		height: 1320rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		margin-left: 27rpx;
		margin-top: 42rpx;

		.open_vip_history_box {
			position: absolute;
			width: 660rpx;
			height: 1257rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			border: 2px solid #B97D4D;
			margin-left: 19rpx;
			top: 46rpx;

		}

		.ic_history_bg {
			position: relative;
			// margin-top: -46rpx;
			left: 129rpx;
			width: 403rpx;
			height: 92rpx;
			align-items: center;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			.bg_history {
				position: absolute;
				left: 0rpx;
				top: 0;
				width: 100%;
				height: 100%;
			}

			.point_text {

				z-index: 1;

				.point {
					width: 7rpx;
					height: 7rpx;
					margin-bottom: 10rpx;
					vertical-align: middle;
				}

				text {
					font-weight: 500;
					font-size: 40rpx;
					color: #7D4926;
					margin-left: 15rpx;
					margin-right: 15rpx;
				}
			}

		}


		.ic_open_vip_status {
			width: 696rpx;
			height: 669rpx;
		}


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
			top: 46rpx;
			left: 0rpx;
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
			// background: url('https://img.jx885.com/lrjk_uniapp/img/vip/bg_vip_comon_problem_content.png');
			background: #F2ECE9;
			width: 650rpx;
			height: auto !important;
			height: 194rpx;
			min-height: 194rpx;

			// background-size: 100% 100%;


			.title_anwer_hint {
				margin-top: 28rpx;
				margin-left: 30rpx;
				font-size: 29rpx;
				color: #47403C;

			}

			.title_answer {
				margin-top: 31rpx;
				font-size: 27rpx;
				color: #2B2B2B;
				margin-right: 20rpx;
			}
		}

		.vip_common_problem_title {
			// background: url('https://img.jx885.com/lrjk_uniapp/img/vip/ic_vip_common_problem_tile.png');
			width: 650rpx;
			height: 87rpx;
			background: #FFFEFE;
			// background-size: 100% 100%;
			font-weight: 400;
			font-size: 29rpx;
			color: #7D4926;
			align-items: center;
			padding-top: 19rpx;
			padding-left: 30rpx;
			display: flex;
			flex-direction: row;

			.ic_answer {
				width: 56rpx;
				height: 63rpx;
			}

			.title_text {
				font-weight: 400;
				font-size: 29rpx;
				color: #7D4926;
			}
		}

	}

	.bottom_empty_layout {
		width: 100%;
		height: 400rpx;
	}

	.bottom_pay_wrap {
		z-index: 1;
		background: #ffffff;

		background-size: 100% 100%;
		// height: 326rpx;
		height: auto !important;
		height: 170rpx;
		min-height: 170rpx;
		position: fixed;
		padding-bottom: 20rpx;
		left: 0;
		bottom: 0;
		width: 100%;
		display: flex;
		flex-direction: column;

		.div {
			width: 100%;
			height: 1rpx;
			background-color: #F8A43F;
		}

		.bottom_couple_layout {
			height: 60rpx;
			width: 100%;
			display: flex;
			flex-direction: row;
			margin-top: 6rpx;

			.bottom_couple_wrap {
				align-self: flex-end;
				margin: 0 auto;
				width: fit-content;
				height: 50rpx;
				padding-left: 26rpx;
				padding-top: 10rpx;
				padding-right: 26rpx;
				background: #FFD8B2;
				border-radius: 25rpx;

				margin-right: 22rpx;
				display: flex;
				flex-direction: row;

				.couple_tip {
					font-weight: 500;
					font-size: 24rpx;
					color: #ED3C00;
				}

				.ic_timer {

					margin-right: 10rpx;
					width: 22rpx;
					height: 28rpx;
				}

				.time_tip {
					background: #FFFFFF;
					border-radius: 5rpx;
					padding-left: 2rpx;
					padding-right: 2rpx;
					height: 29rpx;
					font-size: 18rpx;
					margin-left: 5prx;
					display: flex;
					align-items: center;
				}

				.time_space {
					width: 10rpx;
				}

				.time2_tip {
					background: #FFFFFF;
					border-radius: 5rpx;
					padding-left: 2rpx;
					height: 29rpx;
					padding-right: 2rpx;
					font-size: 18rpx;
					margin-left: 3rpx;
					display: flex;
					align-items: center;
				}

				.time2_div {
					font-weight: 400;
					font-size: 18rpx;
					color: #6C615D;
				}
			}
		}

		.bottom_price_wrap {
			width: 100%;
			display: flex;
			margin-top: 10rpx;
			flex-direction: row;
			justify-content: space-evenly;

			.bottom_price_box {
				position: relative;
				display: flex;
				flex-direction: column;
				width: 222rpx;
				height: 110rpx;
				background: #FFFFFF;
				border-radius: 14rpx;
				border: 1px solid #9C9C9C;

				.vip_type_text {
					margin-top: 14rpx;
					font-weight: 500;
					font-size: 27rpx;
					align-self: center;
					color: #765029;
				}

				.vip_money_text {
					font-weight: 600;
					font-size: 40rpx;
					color: #DB7E51;
					align-self: center;
				}

				.vip_lock_bg {
					position: absolute;
					bottom: 0rpx;
					right: 0rpx;
					width: 35rpx;
					height: 35rpx;
					background: #ED6A00;
					border-radius: 14rpx 0rpx 14rpx 0rpx;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					image {
						width: 19rpx;
						height: 15rpx;
					}
				}
			}

			.bottom_price_selected_box {
				position: relative;
				display: flex;
				flex-direction: column;
				width: 222rpx;
				height: 110rpx;
				background: #FFEAD6;
				border-radius: 14rpx;
				border: 1px solid #ED6A00;

				.vip_type_text {
					margin-top: 14rpx;
					font-weight: 500;
					font-size: 27rpx;
					align-self: center;
					color: #765029;
				}

				.vip_money_text {
					font-weight: 600;
					font-size: 40rpx;
					color: #ED3C00;
					align-self: center;
				}

				.vip_lock_bg {
					position: absolute;
					bottom: 0rpx;
					right: 0rpx;
					width: 35rpx;
					height: 35rpx;
					background: #ED6A00;
					border-radius: 14rpx 0rpx 14rpx 0rpx;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

					image {
						width: 19rpx;
						height: 15rpx;
					}
				}
			}
		}

		.bottom_pay_btn_warp {
			margin-top: 3rpx;
			width: 684rpx;
			height: 94rpx;
			align-self: center;
			background-color: #ED3C00;
			border-radius: 60rpx;
			display: flex;
			padding-left: 100rpx;
			padding-right: 100rpx;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.pay_money_wrap {
				display: flex;
				flex-direction: row;
				align-items: end;

				.pay_money_text {
					justify-self: center;
					font-weight: 800;
					font-size: 47rpx;
					color: #FFFFFF;
				}

				.limit_text {
					justify-self: center;
					font-weight: 400;
					font-size: 24rpx;
					color: #FFFFFF;
					align-self: flex-end;
					margin-bottom: 8rpx;
					margin-left: 15rpx;
				}
			}


			.pay_hint_text {
				justify-self: center;
				font-weight: 400;
				font-size: 32rpx;
				color: #FFFFFF;
			}

			.open_vip_text {
				font-weight: bold;
				font-size: 32rpx;
				color: #FFFFFF;
			}


		}

		.pay_option_and_button {

			width: 100%;
			height: 60rpx;
			display: flex;
			margin-top: 13rpx;
			flex-direction: row;

			.pay_option {
				display: flex;
				flex-direction: row;
				height: 50rpx;
				// justify-content: center;
				align-items: center;

				.weixin_icon {
					margin-left: 100rpx;
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


		}



	}

	.bottom-space {
		position: fixed;
		width: 100%;
		bottom: 0;
		background-color: white;
		z-index: 1;
	}
</style>