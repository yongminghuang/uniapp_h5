<template>
	<view>
		<view class="swiperPanel" @touchstart="startMove" @touchend="endMove">
			<view class="swiperItem" v-for="(item, index) in swiperList" :key="index"
				:style="{transform: itemStyle[index].transform, zIndex: itemStyle[index].zIndex, opacity: itemStyle[index].opacity}">
				<view class="children">
					<view class="children_wrap">
						<!--  :style='{right: itemStyle[index].end,}'-->



						<!-- 所有情况都显示底层清晰图片 -->
						<image class="pic_base" :src="item.imgUrl"></image>
						<!-- 付费卡片时显示上层模糊层 -->
						<image class="pic_blur" :src="item.imgUrl" v-if="!isVip && item.tip == '付费卡片'"></image>

						<text class="tip" v-if="!isVip && item.tip == '付费卡片'">{{item.tip}}</text>

						<text class="tip_free" v-if="!isVip && item.tip != '付费卡片'">{{item.tip}}</text>


						<image class='locked_img' src=" https://img.jx885.com/lrjk_uniapp/img/card/ic_lock.png"
							v-if="!isVip && item.tip == '付费卡片'">
						</image>
						<!-- <image class="pic" src="https://img.jx885.com/lrjk_uniapp/img/card/ic_mohu.png" v-else></image> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			swiperList: {
				type: Array,
				default: []
			},
			isVip: {
				type: Boolean,
				default: false
			}

		},
		watch: {
			swiperList(newValue, oldValue) {
				// 计算swiper样式
				this.itemStyle = []
				this.swiperList.forEach((item, index) => {
					this.itemStyle.push(this.getStyle(index))
				})
			}
		},
		data() {
			return {
				slideNote: {
					x: 0,
					y: 0
				},
				screenWidth: 0,
				itemStyle: [],
				currentRealIndex: 0 // 新增当前实际索引
			};
		},
		created() {
			var macInfo = uni.getSystemInfoSync();
			this.screenWidth = macInfo.screenWidth;
			// 计算swiper样式
			this.swiperList.forEach((item, index) => {
				this.itemStyle.push(this.getStyle(index))
			})
		},
		methods: {
			getStyle(e) {

				if (e > this.swiperList.length / 2) {
					var right = this.swiperList.length - e
					return {
						transform: 'scale(' + (1 - right / 13) + ') translate(-' + (right * 4) + '%,0px)',
						zIndex: 9999 - right,
						opacity: 0.8 / right,
						end: -right * 0.05,
					}
				} else {
					return {
						transform: 'scale(' + (1 - e / 13) + ') translate(' + (e * 4) + '%,0px)',
						zIndex: 9999 - e,
						opacity: 0.8 / e,
						end: e * 0.05,
					}
				}
			},
			startMove(e) {
				this.slideNote.x = e.changedTouches[0] ? e.changedTouches[0].pageX : 0;
				this.slideNote.y = e.changedTouches[0] ? e.changedTouches[0].pageY : 0;
			},
			endMove(e) {
				const deltaX = e.changedTouches[0].pageX - this.slideNote.x;
				if (Math.abs(deltaX) < 10) return; // 忽略微小滑动

				let newList = JSON.parse(JSON.stringify(this.itemStyle));

				// 向左滑动处理
				if (deltaX < 0) {
					if (this.currentRealIndex >= this.swiperList.length - 1) {
						uni.showToast({
							title: '已经是最后一张',
							icon: 'none'
						});
						return;
					}

					let last = [newList.pop()];
					newList = last.concat(newList);
					this.currentRealIndex++;
				}
				// 向右滑动处理
				else {
					if (this.currentRealIndex <= 0) {
						uni.showToast({
							title: '已经是第一张',
							icon: 'none'
						});
						return;
					}
					newList.push(newList[0]);
					newList.splice(0, 1);
					this.currentRealIndex--;
				}

				this.itemStyle = newList;
			}
		},
	}
</script>

<style lang="scss">
	.swiperPanel {
		margin: 10rpx 0;
		height: 900rpx;
		width: 100%;
		overflow: hidden;
		position: relative;

		.swiperItem {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			transition: all .5s;

			.children {
				height: 100%;
				width: 580rpx;
				margin: 2rpx auto;

				.pic {
					height: 100%;
					width: 100%;
					border-radius: 20px;
					// box-shadow: 0 0 10px #333;
				}
			}

			.children_wrap {
				overflow: hidden;
				height: 100%;
				width: 100%;
				display: flex;
				position: relative;

				.pic_base {
					position: absolute;
					width: 100%;
					height: 100%;
					border-radius: 20px;
				}

				.pic_blur {
					position: absolute;
					left: 5rpx;
					top: 5rpx;
					width: calc(100% - 10rpx);
					/* 左右各留5rpx */
					height: calc(100% - 10rpx);
					/* 上下各留5rpx */
					filter: blur(10rpx);
					/* 调整模糊强度 */
					border-radius: 15px;
					/* 根据容器调整圆角 */
					// z-index: 1;
					/* 确保模糊层在上 */
				}

				.locked_img {
					position: absolute;
					width: 54rpx;
					height: 74rpx;
					top: 437rpx;
					left: 270rpx;
				}

				.tip_free {
					background-color: #59CB4B;
					height: 38rpx;
					width: 130rpx;
					padding: 10rpx;
					position: absolute;
					top: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					right: 12rpx;
					font-size: 22rpx;
					text-align: center;
					color: #fff;

					border-radius: 20rpx 20rpx 0rpx 20rpx;
				}

				.tip {
					background-color: #E9230F;
					height: 38rpx;
					width: 130rpx;
					padding: 10rpx;
					position: absolute;
					top: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					right: 12rpx;
					font-size: 22rpx;
					text-align: center;
					color: #fff;

					border-radius: 20rpx 20rpx 0rpx 20rpx;
				}

				.tip-locked {
					background-color: #E9230F;
					height: 70rpx;
					width: 173rpx;
					padding: 10rpx;
					position: absolute;
					right: 0rpx;
					text-align: center;
					color: #fff;

					border-radius: 20rpx 0rpx 0rpx 20rpx;
				}
			}
		}
	}
</style>