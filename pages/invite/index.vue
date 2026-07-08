<template>
	<view class="invite-page">
		<!-- 顶部背景 -->
		<image class="bg-top" src="/static/invite/bg_invite.png" mode="widthFix"></image>

		<!-- 活动时间 -->
		<!-- <view class="activity-time">
			<text>{{ activityTimeText }}</text>
		</view> -->

		<!-- 返回按钮 -->
		<image class="btn-back" src="/static/invite/ic_back.png" mode="aspectFit" @click="handleBack"></image>

		<!-- 活动规则 -->
		<image class="btn-rule" src="/static/invite/ic_activity_rule.png" mode="aspectFit" @click="handleRuleClick">
		</image>

		<!-- 中间红包区域 -->
		<view class="middle-wrap" @click="handleMiddleClick">
			<image class="middle-bg"
				:src="isEnded ? '/static/invite/ic_middle_end.png' : '/static/invite/ic_middle.png'" mode="aspectFit">
			</image>
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
			<!-- 视觉层：不直接绑定点击，点击交由透明命中层处理（避免左侧遮挡导致点击范围过大） -->
			<view class="tab-item tab-item-left">
				<image class="tab-bg"
					:src="currentTab === 'income' ? '/static/invite/ic_tab_1_sel.png' : '/static/invite/ic_tab_1_unsel.png'"
					mode="widthFix"></image>
				<view class="tab-label tab-label-invite" :class="{ 'tab-label-active': currentTab === 'income' }">
					<text>我的收益</text>
				</view>
			</view>

			<view class="tab-item tab-item-right">
				<image class="tab-bg"
					:src="currentTab === 'invite' ? '/static/invite/ic_tab_1_sel.png' : '/static/invite/ic_tab_1_unsel.png'"
					mode="widthFix"></image>
				<view class="tab-label tab-label-income" :class="{ 'tab-label-active': currentTab === 'invite' }">
					<text>我的邀请</text>
				</view>
			</view>

			<!-- 透明点击命中层：左侧宽度 230rpx（= 360 - 130），右侧从 230rpx 开始覆盖 360rpx -->
			<view class="tab-hit tab-hit-left" @click="switchTab('income')"></view>
			<view class="tab-hit tab-hit-right" @click="switchTab('invite')"></view>
		</view>

		<!-- 内容区 -->
		<view class="content-wrap">
			<!-- 我的邀请 -->
			<view v-if="currentTab === 'income'" class="invite-summary">
				<view class="invite-summary-inner">
					<text class="amount-total">{{ totalAmount }}</text>
					<text class="amount-total-label">累计收益（元）</text>

					<text class="amount-month" v-if="false">{{ monthAmount }}</text>
					<text class="amount-last-month" v-if="false">{{ lastMonthAmount }}</text>

					<text class="amount-month-label" v-if="false">本月收益</text>
					<text class="amount-last-month-label" v-if="false">上月收益</text>

					<!-- 原图片按钮暂时隐藏 -->
					<image v-if="false" class="btn-withdraw" src="/static/invite/btn_withdraw.png" mode="widthFix"
						@click.stop="handleWithdraw"></image>
					<!-- 新灰色背景文字按钮 -->
					<view class="btn-withdraw btn-withdraw-gray" @click.stop="handleWithdraw">
						<text class="btn-withdraw-text">立即提现</text>
					</view>
				</view>

				<text class="withdraw-rule-title">提现规则:</text>
				<text class="withdraw-rule-content">
					1. 活动结束后，满10元即可提现，提现后自动转入微信或支付宝；
					2. 提现审核预计20个工作日完成，有疑问可联系客服；
					3. 为优化和提升服务体验，平台近期对提现规则进行更新，具体详见
					<text class="withdraw-rule-link" @click.stop="handleRuleClick">《活动规则》</text>。
				</text>
			</view>

			<!-- 我的收益列表 -->
			<view v-else class="income-list-wrap">
				<view class="income-card">
					<!-- 有数据时展示列表 -->
					<scroll-view v-if="incomeList && incomeList.length" scroll-y="true" class="income-scroll">
						<view v-for="(item, index) in incomeList" :key="index" class="income-item">
							<image class="income-avatar" :src="item.avatar" mode="aspectFill"></image>
							<view class="income-name-time">
								<text class="income-name">{{ item.name }}</text>
								<view class="income-time-wrap">
									<text class="income-time-date">邀请时间:{{ item.inviteDate }}</text>
									<text class="income-time-status">{{ item.payText }}</text>
								</view>
							</view>
						</view>
					</scroll-view>
					<!-- 无数据时居中展示占位文案 -->
					<view v-else class="income-empty">
						<text class="income-empty-text">暂无邀请人，快去邀请好友吧</text>
					</view>
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
				inviteCode: '',
				currentTab: 'income', // invite | income
				totalAmount: '0.00',
				monthAmount: '0.00',
				lastMonthAmount: '0.00',
				incomeList: [],
				// 接口相关
				env: 'prod',
				baseUrl: '',
				authToken: '',
				activityId: null,
				activityTimeText: '活动时间:--',
				isEnded: false
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
			this.baseUrl = env === 'test' ? 'https://ult-test.xmzhujing.com' : 'https://ult.xmzhujing.com';
			console.log('token', token, 'env', env);
			// 拉取页面所需数据
			this.fetchInviteCode();
			this.fetchUserIncome();
			// this.fetchLatestActivity(true);
			this.fetchInviteRecords();
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
			// 获取邀请码
			fetchInviteCode() {
				if (!this.baseUrl) return;
				uni.request({
					url: this.baseUrl + '/inviteFission/generateInviteCode',
					method: 'POST',
					header: this.buildAuthHeader(),
					success: (res) => {
						try {
							// alert(JSON.stringify(res.data))
							const data = res.data || {};
							if (data.code === 200) {
								this.inviteCode = data.body || '';
							}
						} catch (e) {
							console.error('解析邀请码失败', e);
						}
					},
					fail: (err) => {
						console.error('获取邀请码失败', err);
					}
				});
			},
			handleRuleClick() {
				console.log("=====handleRuleClick");
				// 活动规则 H5
				const url = 'https://img.jx885.com/lrjk/html/invite_friend/event_rules.html';
				const title = '活动规则';
				uni.navigateTo({
					url: '/pages/web/web-page',
					success(res) {
						// 通过 eventChannel 向被打开页面传送数据
						res.eventChannel.emit('web-page', {
							url,
							title
						});
					}
				});
			},
			handleMiddleClick() {
				if (this.isEnded) {
					return;
				}
				// 中间红包点击：将邀请码字符串传递给原生，用于弹出邀请分享弹框
				const content = this.inviteCode;
				try {
					nativeBridge.openInviteShare(content);
				} catch (e) {
					console.error('调用原生邀请分享失败', e);
				}
			},
			handleWithdraw() {
				// 活动结束后提示文案
				uni.showToast({
					title: '活动结束后20个工作开放，有问题请联系客服。',
					icon: 'none',
					duration: 3000
				});
			},
			switchTab(key) {
				const isSameTab = this.currentTab === key;
				if (!isSameTab) {
					this.currentTab = key;
				}
				// 点击“我的邀请”时刷新邀请记录（同 tab 重复点击也刷新）
				if (key === 'invite') {
					this.fetchInviteRecords();
				} else {
					// this.fetchLatestActivity(false);
				}
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
					url: this.baseUrl + '/inviteFission/getUserIncome',
					method: 'GET',
					header: this.buildAuthHeader(),
					success: (res) => {
						try {
							const data = res.data || {};
							// 后端返回：code = 200 表示成功
							if (data.code === 200 && data.body) {
								const body = data.body || {};
								const total = typeof body.totalProfit === 'number' ? body.totalProfit : Number(
									body.totalProfit || 0);
								const last = typeof body.cashBalance === 'number' ? body.cashBalance : Number(
									body.cashBalance || 0);

								this.totalAmount = total.toFixed(2);
								this.monthAmount = '0.00';
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
			// fetchLatestActivity(isfetchInviteRecords) {
			// 	if (!this.baseUrl) return;
			// 	uni.request({
			// 		url: this.baseUrl + '/lrjkapp/activity/getLatestActivity',
			// 		method: 'GET',
			// 		data: {
			// 			activityCode: 'invite_fission'
			// 		},
			// 		header: this.buildAuthHeader(),
			// 		success: (res) => {
			// 			try {
			// 				const data = res.data || {};
			// 				if ((data.code === 200) && data.body) {
			// 					const body = data.body || {};
			// 					this.activityId = body.id;
			// 					// 活动是否结束：false 显示进行中图，true 显示结束图
			// 					this.isEnded = Boolean(body.isEnded);
			// 					const start = body.startTime || '';
			// 					const end = body.endTime || '';
			// 					const startText = start //this.formatActivityTime(start);
			// 					const endText = end //this.formatActivityTime(end);
			// 					if (startText && endText) {
			// 						this.activityTimeText = `活动时间:${startText}~${endText}`;
			// 					}
			// 
			// 					// 活动信息拿到后再请求邀请记录
			// 					if (isfetchInviteRecords && this.activityId !== null && this.activityId !==
			// 						undefined) {
			// 						this.fetchInviteRecords();
			// 					}
			// 				}
			// 			} catch (e) {
			// 				console.error('解析活动信息失败', e);
			// 			}
			// 		},
			// 		fail: (err) => {
			// 			console.error('获取活动信息失败', err);
			// 		}
			// 	});
			// },
			// 格式化活动时间：2026-06-10 00:00:00 -> 6.10 00:00
			// formatActivityTime(timeStr) {
			// 	if (!timeStr) return '';
			// 	try {
			// 		const d = new Date((timeStr + '').replace(/-/g, '/'));
			// 		if (isNaN(d.getTime())) {
			// 			return timeStr;
			// 		}
			// 		const month = d.getMonth() + 1;
			// 		const day = d.getDate();
			// 		const hh = ('0' + d.getHours()).slice(-2);
			// 		const mm = ('0' + d.getMinutes()).slice(-2);
			// 		return `${month}.${day} ${hh}:${mm}`;
			// 	} catch (e) {
			// 		return timeStr;
			// 	}
			// },
			// 格式化邀请时间：2026-06-10 00:00:00 -> 2026-06-10（去掉小时分秒）
			formatInviteDate(timeVal) {
				if (timeVal === null || timeVal === undefined || timeVal === '') return '';
				const raw = String(timeVal).trim();
				// 常见格式：YYYY-MM-DD HH:mm:ss / YYYY-MM-DD
				if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
				// 兜底：时间戳（秒/毫秒）
				if (/^\d+$/.test(raw)) {
					const n = Number(raw);
					const ms = raw.length === 10 ? n * 1000 : n;
					const d = new Date(ms);
					if (!isNaN(d.getTime())) {
						const yyyy = d.getFullYear();
						const mm = ('0' + (d.getMonth() + 1)).slice(-2);
						const dd = ('0' + d.getDate()).slice(-2);
						return `${yyyy}-${mm}-${dd}`;
					}
				}
				// 兜底：尝试 Date 解析
				try {
					const d = new Date(raw.replace(/-/g, '/'));
					if (!isNaN(d.getTime())) {
						const yyyy = d.getFullYear();
						const mm = ('0' + (d.getMonth() + 1)).slice(-2);
						const dd = ('0' + d.getDate()).slice(-2);
						return `${yyyy}-${mm}-${dd}`;
					}
				} catch (e) {}
				return raw;
			},
			// 获取邀请记录列表
			fetchInviteRecords() {
				if (!this.baseUrl) return;
				uni.request({
					url: this.baseUrl + '/inviteFission/getInviteRecords',
					method: 'POST',
					header: this.buildAuthHeader(),
					success: (res) => {
						try {
							const data = res.data || {};
							if (data.code === 200 && Array.isArray(data.body)) {
								const list = data.body.map((item) => {
									const inviteDate = this.formatInviteDate(item.inviteTime);
									const consumed = typeof item.comm === 'number' && item.comm > 0;
									const payText = consumed ? '已付费' : '未付费';
									return {
										avatar: item.inviteeHeadImgUrl || '',
										name: item.inviteeNickName || '好友',
										inviteDate: inviteDate,
										payText: payText
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
		/* 点击交由 tab-hit 处理，避免视觉层拦截 */
		pointer-events: none;
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

	/* Tab 透明点击命中层（不影响背景布局，只调整点击范围） */
	.tab-hit {
		position: absolute;
		top: 0;
		height: 120rpx;
		/* 与 tab-wrap/tab-item 高度保持一致 */
		z-index: 10;
		/* 高于 tab-item，确保能接收点击 */
		background-color: transparent;
	}

	/* 左侧可点击宽度：230rpx（= 360 - 130） */
	.tab-hit-left {
		left: 0;
		width: 230rpx;
	}

	/* 右侧可点击区域：从 230rpx 开始覆盖右 Tab（宽 360rpx） */
	.tab-hit-right {
		left: 230rpx;
		width: 360rpx;
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

	/* 新的灰色提现按钮，复用原位置和尺寸 */
	.btn-withdraw-gray {
		background-color: #cccccc;
		border-radius: 999rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn-withdraw-text {
		font-size: 36rpx;
		font-weight: bold;
		color: #98531F;
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

	/* 可点击的《活动规则》链接：颜色更深，后续只改这里即可 */
	.withdraw-rule-link {
		color: #237ded;
		font-weight: 600;
		//text-decoration: underline;
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

	/* 无数据占位：水平垂直居中 */
	.income-empty {
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		display: flex;
	}

	.income-empty-text {
		color: #c08a4a;
		font-size: 26rpx;
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
		/* 限制最大展示宽度，超出用省略号，不挤压右侧时间 */
		max-width: 300rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex-shrink: 1;
		margin-right: 20rpx;
	}

	.income-time-wrap {
		display: flex;
		align-items: center;
		/* 邀请时间和付费状态不折行、不被压缩，保证一行完整展示 */
		white-space: nowrap;
		flex-shrink: 0;
	}

	.income-time-date {
		color: #98531f;
		font-size: 24.67rpx;
	}

	.income-time-status {
		color: #98531f;
		font-size: 24.67rpx;
		margin-left: 20rpx;
	}
</style>