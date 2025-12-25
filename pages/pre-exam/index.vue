<template>
	<view class="container">
		<!-- 顶部标题区域 -->
		<view class="header-section">
			<view class="title-top">2025驾考理论·大数据押题密卷</view>
			<image class="header-image" src="/static/pre_exam/bg_exam.png" mode="widthFix"></image>
		</view>

		<!-- 密卷列表 -->
		<view class="scroll-list">
			<view class="scroll-item" v-for="(item, index) in scrollList" :key="index">
				<view class="scroll-icon-wrapper">
					<image class="scroll-icon" src="/static/pre_exam/ic_exam.png" mode="aspectFit"></image>
				</view>
				<view class="scroll-content">
					<view class="scroll-title">{{ item.title }}</view>
					<view class="scroll-desc">{{ item.desc }}</view>
				</view>
				<view class="scroll-btn" @click="handleUnsealScroll(item, index)">
					<text class="btn-text">拆密卷</text>
				</view>
			</view>
		</view>

		<!-- 底部按钮 -->
		<view class="footer-btn" @click="handleUnsealAll" v-if="!isHideBottom">
			<text class="footer-btn-text">拆开密卷</text>
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
				isHideBottom: false,
				scrollList: [{
						id: 'A',
						title: '密卷A: 新规智能预测卷',
						desc: '动态追踪政策变化,AI预测重点考题'
					},
					{
						id: 'B',
						title: '密卷B: 单元强化提分卷',
						desc: '针对性强化训练,快速提升薄弱模块'
					},
					{
						id: 'C',
						title: '高频易错冲刺卷',
						desc: '直击历年失分率最高题型,考前精准加固'
					}
				]
			};
		},
		onLoad(option) {
			let that = this;
			// 先读取 uniapp 传递的参数
			this.isHideBottom = option && (option.isShowBottom === '0' || option.showBottomOpenVip === '0');

			if (process.env.VUE_APP_PLATFORM === 'h5') {
				// 尝试从 search 中获取
				const urlParams = new URLSearchParams(window.location.search);
				let showBottomOpenVip = urlParams.get('showBottomOpenVip') || urlParams.get('isShowBottom');

				// 如果 search 中没有，尝试从 hash 中获取（针对 #/?showBottomOpenVip=1 这种情况）
				if (!showBottomOpenVip && window.location.hash) {
					const hashQuery = window.location.hash.split('?')[1];
					if (hashQuery) {
						const hashParams = new URLSearchParams(hashQuery);
						showBottomOpenVip = hashParams.get('showBottomOpenVip') || hashParams.get('isShowBottom');
					}
				}

				if (showBottomOpenVip) {
					this.isHideBottom = showBottomOpenVip === '0';
				}
			}

			// 监听原生回调
			window.showBottomOpenVip = (str) => {
				console.log("原生推送的 showBottomOpenVip 值：", str);
				that.isHideBottom = str === "0";
			};
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: '考前急救密卷'
			});
		},
		methods: {
			// 拆密卷点击事件（待处理）
			handleUnsealScroll(item, index) {

				console.log('拆密卷:', item, index);
				nativeBridge.openSecretPaper(index);
			},
			// 拆开密卷点击事件（待处理）
			handleUnsealAll() {
				console.log('拆开密卷');
				nativeBridge.openBottomSecretPaper();
			}
		}
	};
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		background: linear-gradient(to bottom, #FFEDC8 0%, #FFEDC8 40%, #fff 100%);
		position: relative;
		padding-bottom: 140rpx;
	}

	.header-section {
		position: relative;
		padding: 88rpx 32rpx 30rpx;
		z-index: 2;
	}

	.title-top {
		text-align: center;
		font-family: HarmonyOS Sans SC;
		font-weight: bold;
		font-size: 40rpx;
		color: #A82C1B;
		line-height: 70rpx;
	}

	.header-image {
		width: 100%;
		height: auto;
		display: block;
		margin-top: 31.94rpx;
	}

	.scroll-list {
		padding: 0 32rpx;
		display: flex;
		flex-direction: column;
		gap: 30rpx;
		z-index: 2;
		position: relative;
	}

	.scroll-item {
		display: flex;
		align-items: center;
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
		gap: 20rpx;
	}

	.scroll-icon-wrapper {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.scroll-icon {
		width: 91.67rpx;
		height: 91.67rpx;
	}

	.scroll-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}

	.scroll-title {
		font-family: PingFang SC;
		font-weight: bold;
		font-size: 29rpx;
		color: #714018;
		line-height: 23rpx;
	}

	.scroll-desc {
		font-family: PingFang SC;
		font-weight: 500;
		font-size: 24rpx;
		color: #C5A06E;
		margin-top: 15rpx;
		line-height: 23rpx;
	}

	.scroll-btn {
		width: 110rpx;
		height: 47rpx;
		background: #fff;
		border: 1rpx solid #A82C1B;
		border-radius: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.btn-text {
		font-family: PingFang SC;
		font-weight: bold;
		font-size: 29rpx;
		color: #A1121A;
		line-height: 23rpx;
	}

	.footer-btn {
		position: fixed;
		bottom: 60rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 672rpx;
		height: 100rpx;
		background: #E63946;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		background: #B41600;
		border-radius: 45rpx;
	}

	.footer-btn-text {

		text-align: center;

		font-family: PingFang SC;
		font-weight: bold;
		font-size: 32rpx;
		color: #FFFFFF;
		line-height: 23rpx;
	}
</style>