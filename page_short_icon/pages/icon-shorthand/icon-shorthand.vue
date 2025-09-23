<template>
	<view class="wrap">
		<view v-for="(item,index) in iconList" :key="index" class="row-wrap" @click="rowAction(item)">
			<view class="header-view">
				<view class="title-view">{{item.title}}</view>
				<view class="num-view">
					<view class="num">{{item.count + '张'}}</view>
					<image src="https://img.jx885.com/lrjk_uniapp/img/mine/icon_mine_enter_right.png" class="arrow">
					</image>
				</view>
			</view>
			<view class="content-view">
				<view v-for="(imgUrl,subIndex) in item.images" :key="subIndex" class="img-wrap">
					<image :src="imgUrl"></image>
				</view>
			</view>
		</view>
		<view :style="spaceStyle"></view>
	</view>
</template>

<script>
	import {
		iconDataHandle
	} from '../../common/logic.js'
	export default {
		data() {
			return {
				rootPathName: 'signs',
				iconList: [],
				spaceStyle: '',
			};
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			this.spaceStyle = 'height:' + bottomSafeHeight + 'px;'
		},
		onLoad(option) {
			if (option.isRoot == "1") {
				this.getData(this.rootPathName)
			} else {
				var that = this;
				const eventChannel = this.getOpenerEventChannel();
				eventChannel.on('itemObj', function(data, iconList) {
					uni.setNavigationBarTitle({
						title: data.title
					});
					that.iconList = iconList
				})
			}
		},
		methods: {

			async getData(pathName) {
				this.iconList = await this.getIconData(pathName)
			},

			async getIconData(pathName) {
				var that = this
				var url = that.$util.ossDataPath('/signs/' + pathName + '.txt')
				// uni.request({
				// 	url: url,
				// 	success: (res) => {
				// 		console.log(res.data);
				// 		this.text = 'request success';
				// 	},
				// 	fail: (e) => {
				// 		console.log("===" + e);
				// 	}
				// })
				var list = await uni.request({
					url: url,
				}).then(res => {
					var signsStr = res.data;
					var iconList = iconDataHandle(signsStr, pathName, that.rootPathName, that)
					return iconList
				})
				return list
			},
			async rowAction(item) {
				var that = this;
				if (item.type == 'group') {
					var iconList = await that.getIconData(item.pathName)
					if (iconList[0].type == 'group') {
						uni.navigateTo({
							url: '/page_short_icon/pages/icon-shorthand/icon-shorthand',
							success: function(res) {
								// 通过eventChannel向被打开页面传送数据
								res.eventChannel.emit('itemObj', item, iconList);
							}
						});
					} else {
						uni.navigateTo({
							url: '/page_short_icon/pages/icon-shorthand/icon-list',
							success: function(res) {
								// 通过eventChannel向被打开页面传送数据
								res.eventChannel.emit('itemObj', item, iconList);
							}
						});
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.wrap {
		width: 100%;
		height: 100%;
		background-color: white;

		.row-wrap {
			width: 100%;
			border-bottom: #ececec solid 2rpx;
			padding: 20rpx;

			.header-view {
				display: flex;

				.title-view {
					font-size: 32rpx;
					color: #333333;
					margin: auto 0;
				}

				.num-view {
					display: flex;
					margin: auto 0 auto auto;

					.num {
						font-size: 30rpx;
						color: #666666;
						margin: auto 0;
					}

					.arrow {
						width: 17rpx;
						height: 30rpx;
						margin: auto 0 auto 20rpx;
					}
				}
			}

			.content-view {
				margin-top: 40rpx;
				display: flex;

				.img-wrap {
					margin-right: 40rpx;

					image {
						width: 120rpx;
						height: 120rpx;
					}
				}
			}
		}
	}
</style>