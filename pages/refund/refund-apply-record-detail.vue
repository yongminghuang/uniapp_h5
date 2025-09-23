<template>
	<view class="wrap" v-if="item != null">
		<view class="section-view">
			申请信息
		</view>
		<view class="apply-info-view">
			<view class="row">
				<text class="left-view">姓名</text>
				<text class="right-view">{{item.userName}}</text>
			</view>
			<view class="row">
				<text class="left-view">手机号</text>
				<text class="right-view">{{item.phone}}</text>
			</view>
			<view class="row">
				<text class="left-view">身份证号</text>
				<text class="right-view">{{item.idCard}}</text>
			</view>
			<view class="row">
				<text class="left-view left-top">不合格截图</text>
				<image :src="item.scoreUrlList[0]" mode="scaleToFill" class="right-view" @click="imgAtcion(item.scoreUrlList[0])"></image>
			</view>
			<view class="row">
				<text class="left-view left-top">个人资料截图</text>
				<image :src="item.scoreUrlList[1]" mode="scaleToFill" class="right-view" @click="imgAtcion(item.scoreUrlList[1])"></image>
			</view>
			<view class="row">
				<text class="left-view left-top">订单截图</text>
				<image :src="item.scoreUrlList[2]" mode="scaleToFill" class="right-view" @click="imgAtcion(item.scoreUrlList[2])"></image>
			</view>
		</view>
		<view class="section-view">
			处理结果
		</view>
		<view class="result-view">
			<view class="time-view">{{'申请时间：' + item.createTime}}</view>
			<view class="status-view" :class="item.status == 0 ? 'status-view-unsel' : item.status == 1 ? '' : 'status-view-sel'">
				<text>{{item.status == 0 ? '不通过' : item.status == 1 ? '待处理' : '已退款'}}</text>
			</view>
			<view class="examine-time-view">{{'处理时间：' + $util.nullStr(item.examineTime,'-')}}</view>
			<view class="remark-view">{{'处理说明：' + $util.nullStr(item.remarks,'-')}}</view>
		</view>
		<view :style="spaceStyle"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:null,
				spaceStyle:'',
			};
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			this.spaceStyle = 'background-color: #f4f7f9; height:' + ( 50 + bottomSafeHeight) + 'px;'
		},
		onLoad() {
			var that = this;
			const eventChannel = this.getOpenerEventChannel();
			// 监听videoObj事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('recordObj', function(data) {
				that.item = data;
			 
			})
		},
		methods:{
			imgAtcion(url) {
				uni.previewImage({
					urls:[url],
					current:0,
				})
			},
		}
	}
</script>

<style lang="scss">
.wrap {
	height: 100%;
	width: 100%;
	background-color: #f4f7f9;
	padding-top: 20rpx;
	.section-view {
		margin: 0 20rpx;
		font-size: 28rpx;
		font-weight: bold;
		border-left: 6rpx solid #007aff;
		padding-left: 20rpx;
	}
	.apply-info-view {
		margin:20rpx;
		background-color: white;
		border-radius: 10rpx;
		.row {
			display: flex;
			font-size: 24rpx;
			padding: 20rpx;
			.left-view {
				color: #666666;
				margin: auto 0;
			}
			.left-top {
				margin-top: 0;
			}
			.right-view {
				color: #333333;
				margin: auto 0 auto auto;
			}
			image {
				width: 160rpx;
				height: 160rpx;
			}
		}
	}
	.result-view {
		background-color: white;
		padding: 20rpx;
		position: relative;
		margin: 20rpx 20rpx 0 20rpx;
		.time-view {
			font-size: 24rpx;
			color: #333333;
		}
		.status-view {
			position: absolute;
			top: 0;
			right: 0;
			width: 150rpx;
			height: 50rpx;
			display: flex;
			background-color: #f5f5f5;
			text {
				margin: auto;
				color: black;
				font-size: 24rpx;
			}
		}
		.status-view-unsel {
			background-color: red;
			text {
				color: white;
			}
		}
		.status-view-sel {
			background-color: #62D385;
			text {
				color: white;
			}
		}
		.examine-time-view {
			font-size: 24rpx;
			color: #333333;
			margin-top: 40rpx;
		}
		.remark-view {
			font-size: 24rpx;
			color: #333333;
			margin-top: 40rpx;
		}
	}
}
</style>
