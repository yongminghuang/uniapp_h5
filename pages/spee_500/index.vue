<template>
	<view class="speed-container">
		<!-- 背景 -->
		<image class="bg-image" src="/static/speed/bg_speed.png" mode="aspectFill"></image>

		<!-- 顶部返回按钮 -->
		<image
			class="btn-back"
			src="/static/speed/ic_back.png"
			mode="aspectFit"
			@click="handleBack"
		></image>

		<!-- 标题区域 -->
		<image
			class="img-2000"
			src="/static/speed/ic_2000.png"
			mode="widthFix"
		></image>
		<image
			class="img-use-500"
			src="/static/speed/ic_use_500.png"
			mode="widthFix"
		></image>

		<!-- 顶部两枚标签：技巧归类 / 秒选答案 -->
		<image
			class="tab-group"
			src="/static/speed/ic_group.png"
			mode="widthFix"
		></image>
		<image
			class="tab-answer"
			src="/static/speed/ic_answer.png"
			mode="widthFix"
		></image>

		<!-- 列表容器 -->
		<view class="list-wrapper">
			<view
				class="list-item"
				v-for="(item, index) in list"
				:key="index"
			>
				<text class="list-title">{{ item.title + item.desc }}</text>
			</view>
		</view>

		<!-- 底部解锁按钮 -->
		<view class="bottom-area">
			<image
				class="refund-tag"
				src="/static/speed/ic_refund.png"
				mode="widthFix"
			></image>
			<view class="unlock-btn" @click="handleUnlock">
				<text class="unlock-text">立即解锁速成500题</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						title: '100题：交通标志类',
						desc: '看形状颜色，秒辨含义'
					},
					{
						title: '100题：扣分罚款类',
						desc: '抓数字关键词，不混淆'
					},
					{
						title: '100题：安全行车类',
						desc: '“安全优先”原则'
					},
					{
						title: '100题：速度距离类',
						desc: '记死“特殊数值”'
					},
					{
						title: '100题：答题通用技巧',
						desc: '3 个“必对”原则，蒙题也准'
					}
				]
			};
		},
		methods: {
			handleBack() {
				// 返回上一页
				uni.navigateBack({
					fail() {
						// 若无上一页则跳回首页
						uni.reLaunch({
							url: '/pages/pre-exam/index'
						});
					}
				});
			},
			handleUnlock() {
				// 这里预留点击事件，后续可对接原生或跳转
				// console.log('点击立即解锁速成500题');
			}
		}
	};
</script>

<style lang="scss">
	.speed-container {
		min-height: 100vh;
		position: relative;
		overflow: hidden;
		background-color: #0196ff;
	}

	.bg-image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.btn-back {
		position: absolute;
		top: 101rpx;
		left: 30rpx;
		width: 62rpx;
		height: 62rpx;
		z-index: 3;
	}

	.img-2000 {
		position: absolute;
		top: 196rpx;
		left: 125.33rpx;
		width: 504rpx;
	
		z-index: 3;
	}

	.img-use-500 {
		position: absolute;
		/* 196 + 76 + 5.33 = 277.33 */
		top: 277.33rpx;
		left: 93.33rpx;
		width: 566.67rpx;
		height: 92rpx;
		z-index: 3;
	}

	.tab-group {
		position: absolute;
		/* 277.33 + 92 + 26 = 395.33 */
		top: 395.33rpx;
		left: 132rpx;
		width: 232rpx;
		height: 57.33rpx;
		z-index: 3;
	}

	.tab-answer {
		position: absolute;
		/* 与“技巧归类”同一高度，稍向右排布 */
		top: 395.33rpx;
		left: 386rpx;
		width: 232rpx;
		height: 57.33rpx;
		z-index: 3;
	}

	.list-wrapper {
		position: absolute;
		/* 技巧归类底部 395.33 + 57.33 + 28.67 = 481.33 */
		top: 481.33rpx;
		left: 26.5rpx;
		width: 697rpx;
		padding: 48rpx 24rpx;
		box-sizing: border-box;
		background: radial-gradient(0% 0% at 0% 0%, #e5f9ff 0%, #b5edff 100%);
		border-radius: 21rpx;
		z-index: 2;
		display: flex;
		flex-direction: column;
	}

	.list-item {
		width: 100%;
		min-height: 112rpx;
		padding: 34rpx 32rpx;
		box-sizing: border-box;
		background: #1fa2ff;
		border-radius: 28rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 24rpx;
		box-shadow: 0 6rpx 16rpx rgba(0, 87, 191, 0.35);
	}

	.list-item:last-child {
		margin-bottom: 0;
	}

	.list-title {
		font-size: 24rpx;
		font-weight: 600;
		color: #ffffff;
		line-height: 36rpx;
	}

	.bottom-area {
		position: fixed;
		left: 92.5rpx;
		right: 92.5rpx;
		bottom: 183rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 5;
	}

	.refund-tag {
		position: absolute;
		right: 29.33rpx;
		/* 按钮高度 104rpx，其中大约 15.33rpx 在按钮内部：104 - 15.33 = 88.67 */
		bottom: 88.67rpx;
		width: 158.67rpx;
		height: 68.67rpx;
	}

	.unlock-btn {
		width: 100%;
		height: 104rpx;
		border-radius: 52rpx;
		background: radial-gradient(0% 0% at 0% 0%, #ffe782 0%, #ffb21c 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8rpx 18rpx rgba(204, 122, 0, 0.45);
	}

	.unlock-text {
		font-size: 34rpx;
		font-weight: 700;
		color: #ff3c00;
	}
</style>

