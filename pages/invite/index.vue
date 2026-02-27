<template>
	<view class="invite-page">
		<!-- 顶部背景 -->
		<image class="bg-top" src="/static/invite/bg_invite.png" mode="widthFix"></image>

		<!-- 活动时间 -->
		<view class="activity-time">
			<text>{{ activityTimeText }}</text>
		</view>

		<!-- 返回按钮 -->
		<image class="btn-back" src="/static/invite/ic_back.png" mode="aspectFit" @click="handleBack"></image>

		<!-- 活动规则 -->
		<image class="btn-rule" src="/static/invite/ic_activity_rule.png" mode="aspectFit" @click="handleRuleClick">
		</image>

		<!-- 中间红包区域 -->
		<view class="middle-wrap" @click="handleMiddleClick">
			<image class="middle-bg" src="/static/invite/ic_middle.png" mode="aspectFit"></image>
			<view class="invite-code-wrap">
				<view class="invite-code-arc"></view>
				<text class="invite-code-text">
					<text>我的邀请码：</text>
					<text class="invite-code-value">{{ inviteCode }}</text>
				</text>
			</view>
		</view>

		<!-- Tab 区域 -->
		<view class="tab-wrap">
			<view class="tab-item tab-item-left" @click="switchTab('invite')">
				<image class="tab-bg"
					:src="currentTab === 'invite' ? '/static/invite/ic_tab_1_sel.png' : '/static/invite/ic_tab_1_unsel.png'"
					mode="widthFix"></image>
				<view class="tab-label tab-label-invite" :class="{ 'tab-label-active': currentTab === 'invite' }">
					<text>我的邀请</text>
				</view>
			</view>

			<view class="tab-item tab-item-right" @click="switchTab('income')">
				<image class="tab-bg"
					:src="currentTab === 'income' ? '/static/invite/ic_tab_1_sel.png' : '/static/invite/ic_tab_1_unsel.png'"
					mode="widthFix"></image>
				<view class="tab-label tab-label-income" :class="{ 'tab-label-active': currentTab === 'income' }">
					<text>我的收益</text>
				</view>
			</view>
		</view>

		<!-- 内容区 -->
		<view class="content-wrap">
			<!-- 我的邀请 -->
			<view v-if="currentTab === 'invite'" class="invite-summary">
				<view class="invite-summary-inner">
					<text class="amount-total">{{ totalAmount }}</text>
					<text class="amount-total-label">累计收益（元）</text>

					<text class="amount-month" v-if="false">{{ monthAmount }}</text>
					<text class="amount-last-month" v-if="false">{{ lastMonthAmount }}</text>

					<text class="amount-month-label" v-if="false">本月收益</text>
					<text class="amount-last-month-label" v-if="false">上月收益</text>

					<image class="btn-withdraw" src="/static/invite/btn_withdraw.png" mode="widthFix"
						@click.stop="handleWithdraw"></image>
				</view>

				<text class="withdraw-rule-title">提现规则:</text>
				<text class="withdraw-rule-content">
					1. 5元即可提现,提现后自动转入微信或支付宝；
					2. 提现预计24小时左右到账；
					3. 为优化和提升服务体验,平台近期对提现规则进行更新，
					具体详见《提现协议》
				</text>
			</view>

			<!-- 我的收益列表 -->
			<view v-else class="income-list-wrap">
				<view class="income-card">
					<scroll-view scroll-y="true" class="income-scroll">
						<view v-for="(item, index) in incomeList" :key="index" class="income-item">
							<view class="income-avatar"></view>
							<view class="income-name-time">
								<text class="income-name">{{ item.name }}</text>
								<text class="income-time">{{ item.time }}</text>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		NativeBridge
	} from '../../common/native.js';
	const nativeBridge = new NativeBridge();
	export default {
		data() {
			return {
				inviteCode: '285X4',
				currentTab: 'invite', // invite | income
				totalAmount: '0.00',
				monthAmount: '0.00',
				lastMonthAmount: '0.00',
				incomeList: [],
				// 接口相关
				env: 'prod',
				baseUrl: '',
				authToken: '',
				activityId: null,
				activityTimeText: '活动时间:--'
			};
		},
		onLoad(options) {
			// 解析路径入参：t( token )、env
			// 1. 优先使用 onLoad(options)（小程序、App）
			let token = (options && (options.t || options.token)) || '';
			let env = (options && options.env) || '';

			// 2. H5 场景下，如果前面没有带上（如：...?t=xxx&env=test#/），再从 window.location 中解析
			if (typeof window !== 'undefined') {
				try {
					const href = window.location.href || '';
					// 只取 # 前面的 query 部分： http://xxx:8080/?t=...&env=test#/...
					const beforeHash = href.split('#')[0] || href;
					const queryIndex = beforeHash.indexOf('?');
					if (queryIndex !== -1) {
						const search = beforeHash.substring(queryIndex); // 带 ?
						const usp = new URLSearchParams(search);
						if (!token) {
							token = usp.get('t') || usp.get('token') || '';
						}
						if (!env) {
							env = usp.get('env') || '';
						}
					}
				} catch (e) {
					console.error('解析 H5 URL 参数失败', e);
				}
			}

			if (!env) {
				env = 'prod';
			}

			this.authToken = token;
			this.env = env;
			this.baseUrl = env === 'test' ? 'https://lrjk-test.jx885.com' : 'https://lrjk.jx885.com';
			console.log('token', token, 'env', env);
			// 拉取页面所需数据
			this.fetchUserIncome();
			this.fetchLatestActivity();
		},
		methods: {
			handleBack() {
				// 优先交给原生关闭 WebView（对应 Android: Jx885WebApi.WebViewFinish / iOS: postMessage(action=WebViewFinish)）
				try {
					const hasAndroidFinish =
						typeof window !== 'undefined' &&
						window.Jx885WebApi &&
						typeof window.Jx885WebApi.WebViewFinish === 'function';
					const hasIOSFinish =
						typeof window !== 'undefined' &&
						window.webkit &&
						window.webkit.messageHandlers &&
						window.webkit.messageHandlers.Jx885WebApi;

					if (hasAndroidFinish || hasIOSFinish) {
						nativeBridge.invoke('WebViewFinish');
						return;
					}
				} catch (e) {
					// ignore and fallback to uni navigation
				}

				// H5/小程序等无原生桥接时，保持原有返回逻辑
				uni.navigateBack({
					fail() {
						uni.switchTab({
							url: '/pages/index/index'
						});
					}
				});
			},
			handleRuleClick() {
				// TODO: 替换为真实 H5 地址
				uni.navigateTo({
					url: '/pages/index/index'
				});
			},
			handleMiddleClick() {
				// 中间红包点击：将邀请码字符串传递给原生，用于弹出邀请分享弹框
				const content = this.inviteCode;
				try {
					nativeBridge.openInviteShare(content);
				} catch (e) {
					console.error('调用原生邀请分享失败', e);
				}
			},
			handleWithdraw() {
				// TODO: 提现按钮点击逻辑
			},
			switchTab(key) {
				if (this.currentTab === key) return;
				this.currentTab = key;
			},
			// 构建带 token 的请求头
			buildAuthHeader() {
				const headers = {};
				if (this.authToken) {
					// Authorization=token（token 为路径入参）
					headers['Authorization'] = this.authToken;
				}
				return headers;
			},
			// 获取用户收益
			fetchUserIncome() {
				if (!this.baseUrl) return;
				uni.request({
					url: this.baseUrl + '/lrjkapp/income/getUserIncome',
					method: 'GET',
					header: this.buildAuthHeader(),
					success: (res) => {
						try {
							const data = res.data || {};
							if (data.code === 0 && data.body) {
								const body = data.body || {};
								const total = typeof body.totalProfit === 'number' ? body.totalProfit : Number(body.totalProfit || 0);
								const month = typeof body.monthProfit === 'number' ? body.monthProfit : Number(body.monthProfit || 0);
								const last = typeof body.cashBalance === 'number' ? body.cashBalance : Number(body.cashBalance || 0);

								this.totalAmount = total.toFixed(2);
								this.monthAmount = month.toFixed(2);
								this.lastMonthAmount = last.toFixed(2);
							}
						} catch (e) {
							console.error('解析用户收益失败', e);
						}
					},
					fail: (err) => {
						console.error('获取用户收益失败', err);
					}
				});
			},
			// 获取最新活动信息（时间 + activityId）
			fetchLatestActivity() {
				if (!this.baseUrl) return;
				uni.request({
					url: this.baseUrl + '/lrjkapp/activity/getLatestActivity',
					method: 'GET',
					data: {
						activityCode: 'invite_fission'
					},
					header: this.buildAuthHeader(),
					success: (res) => {
						try {
							const data = res.data || {};
							if (data.code === 0 && data.body) {
								const body = data.body || {};
								this.activityId = body.id;
								const start = body.startTime || '';
								const end = body.endTime || '';
								const startText = this.formatActivityTime(start);
								const endText = this.formatActivityTime(end);
								if (startText && endText) {
									this.activityTimeText = `活动时间:${startText}~${endText}`;
								}

								// 活动信息拿到后再请求邀请记录
								if (this.activityId !== null && this.activityId !== undefined) {
									this.fetchInviteRecords();
								}
							}
						} catch (e) {
							console.error('解析活动信息失败', e);
						}
					},
					fail: (err) => {
						console.error('获取活动信息失败', err);
					}
				});
			},
			// 格式化活动时间：2026-06-10 00:00:00 -> 6.10 00:00
			formatActivityTime(timeStr) {
				if (!timeStr) return '';
				try {
					const d = new Date((timeStr + '').replace(/-/g, '/'));
					if (isNaN(d.getTime())) {
						return timeStr;
					}
					const month = d.getMonth() + 1;
					const day = d.getDate();
					const hh = ('0' + d.getHours()).slice(-2);
					const mm = ('0' + d.getMinutes()).slice(-2);
					return `${month}.${day} ${hh}:${mm}`;
				} catch (e) {
					return timeStr;
				}
			},
			// 获取邀请记录列表
			fetchInviteRecords() {
				if (!this.baseUrl || this.activityId === null || this.activityId === undefined) return;
				uni.request({
					url: this.baseUrl + '/lrjkapp/user/getInviteRecords?activityId=' + encodeURIComponent(this.activityId),
					method: 'POST',
					header: this.buildAuthHeader(),
					success: (res) => {
						try {
							const data = res.data || {};
							if (data.code === 0 && Array.isArray(data.body)) {
								const list = data.body.map((item) => {
									return {
										name: item.inviteeNickName || '好友',
										time: item.inviteTime || ''
									};
								});
								this.incomeList = list;
							}
						} catch (e) {
							console.error('解析邀请记录失败', e);
						}
					},
					fail: (err) => {
						console.error('获取邀请记录失败', err);
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.invite-page {
		min-height: 100vh;
		background: #ffe4a9;
		position: relative;
		overflow: auto;
		padding-bottom: 1400rpx;
	}

	.activity-time {
		position: absolute;
		top: 374rpx;
		left: 0;
		right: 0;
		text-align: center;
		z-index: 2;
	}

	.activity-time text {
		font-weight: 400;
		font-size: 27rpx;
		color: #FFEEC0;
	}

	.bg-top {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1;
	}

	.btn-back {
		position: absolute;
		top: 98.67rpx;
		left: 27.33rpx;
		width: 67.33rpx;
		height: 67.33rpx;
		z-index: 3;
	}

	.btn-rule {
		position: absolute;
		top: 190rpx;
		right: 0;
		width: 50rpx;
		height: 141.33rpx;
		z-index: 3;
	}

	.middle-wrap {
		position: absolute;
		top: 419.33rpx;
		left: 80rpx;
		width: 586rpx;
		height: 480.6rpx;
		z-index: 2;
	}

	.middle-bg {
		width: 100%;
		height: 100%;
	}

	.invite-code-wrap {
		position: absolute;
		top: 290.67rpx;
		left: 0;
		right: 0;
		align-items: center;
		justify-content: center;
		display: flex;
	}

	.invite-code-arc {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 350rpx;
		height: 50rpx;
		border-radius: 72rpx;
		border-width: 1rpx;
		border-style: solid;
		border-color: #f56464;
	}

	.invite-code-text {
		color: #ffe097;
		font-size: 30rpx;
		z-index: 1;
	}

	.invite-code-value {
		font-weight: 600;
		margin-left: 6rpx;
	}

	.tab-wrap {
		position: absolute;
		top: 942.67rpx;
		left: 30rpx;
		width: 690rpx;
		height: 120rpx;
		flex-direction: row;
		display: flex;
		z-index: 3;
	}

	.tab-item {
		position: relative;
		height: 120rpx;
	}

	.tab-item-left {
		width: 360rpx;
		z-index: 2;
	}

	.tab-item-right {
		width: 360rpx;
		margin-left: -130rpx;
		z-index: 1;
	}

	.tab-bg {
		width: 100%;
		height: 100%;
	}

	.tab-label {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		justify-content: flex-start;
		align-items: flex-start;
		display: flex;
	}

	.tab-label-invite {
		padding-left: 56rpx;
		padding-top: 15rpx;
	}

	.tab-label-income {
		padding-left: 90rpx;
		padding-top: 15rpx;
	}

	.tab-label text {
		font-size: 30rpx;
		font-weight: bold;
		color: #ffffff;
	}

	.tab-label-active text {
		color: #98531f;
	}

	.content-wrap {
		position: absolute;
		top: 1005.34rpx;
		/* 942.67 + 62.67 */
		left: 0;
		right: 0;
		padding: 0 30rpx 40rpx;
		z-index: 4;
	}

	.invite-summary {
		position: relative;
		width: 690rpx;
		/* 外层卡片（原图最外层浅色底） */
		background-color: #fff9ec;
		border-radius: 40rpx;
		box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.06);
		overflow: hidden;
		/* 底部内边距稍微缩小一点，让下面的“提现规则”更贴近卡片 */
		padding-bottom: 30rpx;
	}

	.invite-summary-inner {
		position: relative;
		width: 100%;
		/* 固定高度略收窄，压缩下方空白区 */
		height: 280rpx;
	}

	/* 内层大黄块 + 中间横线，模拟原背景图 */
	.invite-summary-inner::before {
		content: '';
		position: absolute;
		left: 40rpx;
		right: 40rpx;
		top: 36rpx;
		/* 减小与下方的间距，让黄底更靠近“提现规则” */
		bottom: 15rpx;
		background-color: #ffe3ac;
		border-radius: 36rpx;
		z-index: 0;
	}

	// .invite-summary-inner::after {
	// 	content: '';
	// 	position: absolute;
	// 	left: 74rpx;
	// 	right: 74rpx;
	// 	top: 178rpx;
	// 	height: 2rpx;
	// 	background-color: #f0c98a;
	// 	z-index: 0;
	// }

	.amount-total {
		position: absolute;
		left: 100.67rpx;
		top: 50rpx;
		font-size: 60.59rpx;
		font-weight: bold;
		color: #98531f;
	}

	.amount-total-label {
		position: absolute;
		left: 98rpx;
		top: 129.33rpx;
		font-size: 24rpx;
		color: #585858;
	}

	.amount-month {
		position: absolute;
		left: 100.67rpx;
		top: 180rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #98531f;
	}

	.amount-last-month {
		position: absolute;
		right: 87.33rpx;
		top: 180rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #98531f;
	}

	.amount-month-label {
		position: absolute;
		left: 97.33rpx;
		top: 227.33rpx;
		font-size: 24rpx;
		color: #585858;
	}

	.amount-last-month-label {
		position: absolute;
		right: 93.33rpx;
		top: 227.33rpx;
		font-size: 24rpx;
		color: #585858;
	}

	.btn-withdraw {
		position: absolute;
		left: 94rpx;
		top: 170rpx;
		width: 504.67rpx;
		height: 76.67rpx;
	}

	.withdraw-rule-title {
		margin-top: 0rpx;
		margin-left: 49.33rpx;
		font-weight: bold;
		font-size: 27rpx;
		color: #98531F;
	}

	.withdraw-rule-content {
		display: block;
		margin-top: 10rpx;
		margin-left: 46.67rpx;
		margin-right: 40rpx;
		font-weight: 400;
		font-size: 23rpx;
		color: #98531F;
		line-height: 33rpx;
	}

	.income-list-wrap {
		align-items: center;
		justify-content: flex-start;
		display: flex;
	}

	.income-card {
		width: 690rpx;
		height: 576rpx;
		background-color: #fff9eb;
		border-radius: 40rpx;
		overflow: hidden;
		padding-top: 25rpx;
	}

	.income-scroll {
		width: 100%;
		height: 100%;
	}

	.income-item {
		position: relative;
		flex-direction: row;
		display: flex;
		align-items: center;
		padding-left: 38.67rpx;
		padding-right: 47.33rpx;
		padding-top: 14rpx;
		padding-bottom: 14rpx;
	}

	.income-item::after {
		content: '';
		position: absolute;
		left: 38.67rpx;
		right: 38.67rpx;
		bottom: 0;
		height: 1rpx;
		background-color: #e0c7ad;
	}

	.income-avatar {
		width: 61.33rpx;
		height: 61.33rpx;
		border-radius: 50%;
		background-color: #ffd9a6;
		margin-right: 14rpx;
	}

	.income-name-time {
		flex: 1;
		flex-direction: row;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.income-name {
		color: #98531f;
		font-size: 24.67rpx;
	}

	.income-time {
		color: #98531f;
		font-size: 24.67rpx;
	}
</style>