<template>
	<view class="page-wrap">
		<!-- 自定义导航栏 -->
		<view
			class="custom-nav"
			:style="navStyle"
		>
			<view class="nav-left" @click="onBack">
				<image class="back-icon" src="/static/web/icon_back_gray.png" mode="aspectFit" />
			</view>
			<view class="nav-title">
				{{ pageTitle || '活动规则' }}
			</view>
		</view>

		<!-- 内容区域，避开自定义导航栏高度 -->
		<view
			class="page-content"
			:style="contentStyle"
		>
			<web-view :src="webUrl"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webUrl: '',
				pageTitle: '',
				originTitle: '',
				statusBarHeight: 0, // 状态栏高度
				safeAreaTop: '', // H5: 使用 env(safe-area-inset-top) 适配刘海屏（无法获取原生状态栏高度）
				navBarBodyHeight: 44 // 标题栏主体高度（可按设计调整）
			}
		},
		computed: {
			navStyle() {
				const top = this.safeAreaTop || `${this.statusBarHeight}px`
				const height = this.safeAreaTop
					? `calc(${top} + ${this.navBarBodyHeight}px)`
					: `${this.statusBarHeight + this.navBarBodyHeight}px`
				return { paddingTop: top, height }
			},
			contentStyle() {
				const top = this.safeAreaTop || `${this.statusBarHeight}px`
				const marginTop = this.safeAreaTop
					? `calc(${top} + ${this.navBarBodyHeight}px)`
					: `${this.statusBarHeight + this.navBarBodyHeight}px`
				return { marginTop }
			}
		},
		onLoad(option) {
			const that = this
			// 适配不同设备的状态栏高度
			const sysInfo = uni.getSystemInfoSync()
			this.statusBarHeight = sysInfo.statusBarHeight || 50

			// // #ifndef H5
			// this.safeAreaTop = ''
			// this.statusBarHeight = sysInfo.statusBarHeight || 0
			// // #endif
			// alert('statusBarHeight: ' + this.statusBarHeight);
			const eventChannel = this.getOpenerEventChannel();
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('web-page', (data) => {
				this.webUrl = data.url;
				let title = data.title;
				this.originTitle = title;
				// 如果没有传递title，根据URL自动设置标题
				if (that.$util.isNullVal(title)) {
					title = that.getTitleByUrl(data.url);
				}
				
				// 立即设置标题到自定义导航栏
				if (!that.$util.isNullVal(title)) {
					this.pageTitle = title;
				}
			})
		},
		methods: {
			onBack() {
				uni.navigateBack()
			},
			// 根据URL自动获取标题
			getTitleByUrl(url) {
				if (!url) return '';
				
				// 用户协议
				if (url.indexOf('/protocol/index.html') !== -1) {
					return '用户协议';
				}
				// 隐私协议
				if (url.indexOf('/privacy/privacy.html') !== -1) {
					return '隐私协议';
				}
				// 会员协议
				if (url.indexOf('/protocol/member/index.html') !== -1) {
					return '会员协议';
				}
				
				return '';
			}
		}
	}
</script>

<style scoped>
	.page-wrap {
		height: 100vh;
		background-color: #ffffff;
	}

	/* 自定义导航栏 */
	.custom-nav {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 999;
		background-color: #1F7DE5;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		border-bottom: 1px solid #f0f0f0;
	}

	.nav-left {
		width: 88rpx;
		padding-left: 24rpx;
		padding-right: 12rpx;
		height: 44px;
		display: flex;
		align-items: center;
	}

	.back-icon {
		font-size: 32rpx;
		color: #333333;
		padding: 5rpx;
		width: 22rpx;
  height: 40rpx;
	}

	.nav-title {
		flex: 1;
		height: 44px;
		line-height: 44px;
		text-align: center;
		font-size: 32rpx;
		color: #fff;
		font-weight: 500;
		padding-right: 88rpx; /* 为了标题视觉居中（预留返回按钮宽度） */
	}

	/* 内容区域，避开导航栏高度 */
	.page-content {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
	}
</style>