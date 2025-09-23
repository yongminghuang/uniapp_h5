<template>
	<view>
		<view v-for="item in datas" :key="item.classifyId">
			<view class="title_layout">{{item.classifyName}}</view>
			<uni-grid :column="2" :square="false" :showBorder="false">
				<uni-grid-item v-for="(childItem, index) in item.childrenList" :key="childItem.classifyId">
					<view class="grid_item" @click="toLearn(childItem)" v-if="childItem.questionTotal >0">
						<view class="index_layout">
							<view class="index_bg"></view>
							<label class="index_text">{{index +1}}</label>
						</view>
						<rich-text :nodes="titleText(childItem)" decoded></rich-text>
						<!-- 	<text class="title_text">{{childItem.classifyName}}</text>
						<text class="count_text">{{childItem.questionTotal}}</text> -->
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import {
		toLearnPage
	} from '../../common/page-route';
	import {
		getBigClassId
	} from '../../common/request';
	export default {
		data() {
			return {
				datas: [],
				pageName: "",
			}
		},
		onLoad() {
			let that = this;
			const eventChannel = this.getOpenerEventChannel();
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('learnClassifyData', (data) => {
				that.pageName = data.pageName;
				let title = data.title;
				that.getClassId(that.pageName);
				uni.setNavigationBarTitle({
					title: title
				})

			})

		},
		methods: {
			titleText(item) {
				// return `<div><span style="color: #333333">${item.classifyName}</span>&nbsp;<span style="color: #999999">${item.questionTotal}</span></div>`
				// return `<span style='color: #333333; font-size: 25px;'>` + item.classifyName +
				// 	`</span>` 
				// 	+ '&ensp;' +
				// 	`<span style='color: #999999'; font-size: 16px;margin-left: 10rpx; '>${ item
				// 	.questionTotal}</span>`
				// return `<span style='color: #333333'; font-size: 30px;'>` +
				// 	item.classifyName + `</span>` +
				// 	'&ensp;' +
				// 	`<span style='color: #999999'; font-size: 16px;'>` + item
				// 	.questionTotal + `</span>`
				return `<span style="color:#333333;font-size:18px;vertical-align:middle;">${item.classifyName}</span><span style="color:#999999;font-size:13px;vertical-align:middle;">&nbsp;${item.questionTotal}</span>`
			},
			async getClassId(pageName) {
				try {
					let classifyObj = await getBigClassId(this, pageName);
					if (classifyObj) {
						this.queryClassifyInfoList(classifyObj);
					} else {
						uni.showToast({
							title: "无数据，请联系客服"
						})
					}
				} catch (e) {
					console.error(e)
				}
			},

			queryClassifyInfoList(item) {

				var carType = this.$util.carType();
				var subject = this.$util.subject();
				if (subject == 5) {
					carType = 1; //扣满12分只有小车类型
				}
				const cityNo = this.$util.cityNo(this);
				let params = {
					carType: carType,
					course: subject,
					cityNo: cityNo,
					classifyId: item.classifyId,
					classifyType: item.classifyName,

				}

				this.$u.api.queryClassifyInfoList(params).then(res => {
					if (res.code = 200) {
						this.datas = res.result
					}
				})
			},
			toLearn(childItem) {
				if (childItem.questionTotal <= 0) {
					uni.showToast({
						title: "没有题目哟\n请咨询客服"
					})
					return
				}
				toLearnPage([childItem.classifyId], false, childItem.classifyName)
			},
		}
	}
</script>

<style lang="scss">
	.title_layout {
		height: 80rpx;
		display: flex;
		margin-left: 27rpx;
		justify-content: start;
		align-items: center;
		font-size: 35rpx;
		color: #3c3c3c;
	}

	.grid_item {
		width: 375rpx;
		height: 100rpx;
		display: flex;
		position: relative;
		flex-direction: row;
		align-items: center;
		border-bottom: 1rpx solid #fff3f7f9;

		.index_layout {
			margin-left: 27rpx;
			margin-right: 27rpx;
			width: 50rpx;
			height: 50rpx;
			display: flex;
			position: relative;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.index_bg {
				position: absolute;
				width: 50rpx;
				height: 50rpx;
				top: 0;
				left: 0;
				border-radius: 25rpx;
				background: #237ded;
			}

			.index_text {
				z-index: 1;
				color: #fff;
				font-size: 25rpx;
			}
		}

		.title_text {
			color: #333333;
			font-size: 35rpx;
		}

		.count_text {
			margin-left: 10rpx;
			color: #999999;
			font-size: 25rpx;
		}
	}
</style>