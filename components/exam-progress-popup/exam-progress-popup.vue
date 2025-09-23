<template>

	<uni-popup ref="popup" type="bottom" @maskClick="closeAction" @change="onChange">
		<view class="warp" :style="{'margin-bottom': `${safeBottom}px`}">
			<view class="bottom_bar">
				<!-- <view class="bottom_icon_label" @click="clickPrevious">
					<image class="left_button" src="https://img.jx885.com/lrjk_uniapp/img/learn/ic_bottom_left.png"></image>
					<label class="left_label">上一题</label>
				</view> -->
				<view class="bottom_right_error_layout" @click="closeAction">
					<view class="right_error_layout">
						<image :src="$util.ossImagePath('/learn/learn_left_right.png')"></image>
						<label>{{getRightCount}}</label>
					</view>
					<view class="right_error_layout">
						<image :src="$util.ossImagePath('/learn/learn_left_err.png')"></image>
						<label>{{getErrorCount}}</label>
					</view>
				</view>

				<view class="bottom_pass_rate_label">
					<view class="pass_rate_label">{{getRightRate}}%</view>
					<label>正确率</label>
				</view>

				<view class="bottom_icon_label" @click="closeAction">

					<image :src="$util.ossImagePath('/learn/ic_bottom_menu.png')"></image>
					<label>{{current +1}}/{{getRuleListSize}}</label>
				</view>

				<view class="bottom_examover_label" @click="toExamOver">

					<image :src="$util.ossImagePath('/learn/learn_left_exam_over.png')"></image>
					<label>交卷</label>
				</view>

				<view class="bottom_collect_label">

					<image v-if="!isCollect" @click="addCollect()" class="help_collect_icon"
						:src="$util.ossImagePath('/learn/learn_left_collection_un.png')" mode="widthFix">
					</image>
					<label v-if="!isCollect" @click="addCollect()" class="help_collect_text">收藏</label>

					<image v-if="isCollect" @click="removeCollect()" class="collect_icon"
						:src="$util.ossImagePath('/learn/learn_left_collection_un.png')" mode="widthFix">
					</image>
					<label v-if="isCollect" @click="removeCollect()" class="collect_text">收藏</label>
				</view>
				<!-- <view class="bottom_icon_label" @click="clickNext">
					<image src="https://img.jx885.com/lrjk_uniapp/img/learn/ic_bottom_right.png"></image>
					<label>下一题</label>
				</view> -->
			</view>

			<scroll-view class="scroll_wrap" scroll-y="true">
				<view>
					<!-- <uni-list class="scroll_wrap"> -->
					<uni-list-item title="" :border="false" note="" v-for="(item ,column) in getRuleList"
						v-bind:key="column">
						<template v-slot:body>
							<view class="list_item" v-for="row in 6" v-bind:key="row">
								<view
									:class="current == column*6 + row ? 'box_selected': getBoxStyle(column*6 +row) == 0 ?'box': getBoxStyle(column*6 +row) == 1 ? 'box_wrong':'box_right'"
									v-if="row < item.length" @click="clickBox(column*6 + row)">
									<label>{{column*6 +(1+row)}}</label>
									<view class="rule_flat_layout" v-if="item[column] == 1">
										新规题
									</view>
								</view>
								<view class="box_placehold" v-else></view>
							</view>

						</template>
					</uni-list-item>
					<!-- </uni-list> -->
				</view>

			</scroll-view>
		</view>
	</uni-popup>

</template>

<script>
	export default {
		name: "exam_progress_popup",
		props: {
			isCollect: {
				type: Boolean,
				default: false
			},
			isshow: {
				type: Boolean,
				default: false
			},
			current: {
				type: Number,
				default: 0
			},
			hadLearnedList_1000: {
				type: Array,
				default: []
			},
			hadLearnedList_2000: {
				type: Array,
				default: []
			},
			ruleListSize: {
				type: Number,
				default: 0
			},
			ruleList_1000: {
				type: Array,
				default: []
			},
			ruleList_2000: {
				type: Array,
				default: []
			},
			ruleSize: {
				type: Number,
				default: 0
			}

		},
		data() {
			return {
				safeBottom: 0,
			};
		},
		computed: {
			getRuleListSize() {
				let length_1000 = this.ruleList_1000.length ? this.ruleList_1000.length : 0;
				let length_2000 = this.ruleList_2000.length ? this.ruleList_2000.length : 0;
				this.ruleListSize = length_1000 + length_2000;
				return this.ruleListSize;
			},
			getRuleList() {
				const parentArray = [];
				const combinedArray = this.ruleList_1000.concat(this.ruleList_2000);
				for (var i = 0; i < combinedArray.length; i += 6) {
					const subArray = combinedArray.slice(i, i + 6);
					parentArray.push(subArray);
				}
				return parentArray;
			},
			getErrorCount() {
				return this.hadLearnedList_1000.filter(item => item === 1).length +
					this.hadLearnedList_2000.filter(item => item === 1).length;
			},
			getRightCount() {
				return this.hadLearnedList_1000.filter(item => item === 2).length +
					this.hadLearnedList_2000.filter(item => item === 2).length;
			},
			getRightRate() {
				let error = this.hadLearnedList_1000.filter(item => item === 1).length;
				let right = this.hadLearnedList_1000.filter(item => item === 2).length;
				let all = error + right;
				if (all == 0) {
					return 0;
				}
				return parseInt(right * 100 / all);
			}
		},
		beforeMount() {

		},
		watch: {
			isshow(newValue, oldValue) {
				if (newValue) {
					this.$refs.popup.open()
				} else {
					this.$refs.popup.close()
				}
			},
		},
		methods: {
			onChange(e) {
				if (e.show != true || this.safeBottom != 0) {
					return
				}
				uni.getSystemInfo({
					success: res => {
						this.safeBottom = -res.safeAreaInsets.bottom;
					}
				})
			},
			getBoxStyle(position) {
				let status = 0
				if (position < 1000) {
					status = this.hadLearnedList_1000[position]
				} else {
					status = this.hadLearnedList_2000[position - 1000]
				}
				return status;
			},
			clickBox(position) {
				this.$emit('clickPosition', position)
				this.closeAction()
			},
			closeAction() {
				this.$emit('closeAction')
			},
			clickNext() {
				this.$emit('clickNext')
			},
			clickPrevious() {
				this.$emit('clickPrevious')
			},
			clearRecord() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: "确定清空做题记录吗？",
					success: function(res) {
						if (res.confirm) {
							that.$emit('clearRecord');
						} else if (res.cancel) {

						}
					}
				})

			},
			toExamOver() {
				this.$emit('toExamOver');
			},
			addCollect() {
				this.$emit('addCollect');
			},
			removeCollect() {
				this.$emit('removeCollect');
			},
		}
	}
</script>

<style lang="scss">
	.warp {
		height: 1200rpx;
		background: #fff;
		display: flex;
		// flex-direction: column;
	}

	.bottom_bar {
		position: fixed;
		top: 0rpx;
		height: 120rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		background: #fff;

		.bottom_right_error_layout {
			width: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.right_error_layout {

				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				image {
					width: 50rpx;
					height: 50rpx;
				}

				label {
					margin-left: 15rpx;
					color: #727272;
					font-size: 30rpx;
				}
			}
		}

		.bottom_mic_layout {
			width: 150rpx;
			display: flex;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;

			.imc_icon {
				position: absolute;
				top: -30rpx;
				left: 60rpx;
				filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(55deg) brightness(117%) contrast(101%);
				width: 60rpx;
				height: 60rpx;
			}

			.imc_bg {
				position: absolute;
				top: -60rpx;
				left: 30rpx;
				background: #237ded;
				border-radius: 60rpx;
				width: 120rpx;
				height: 120rpx;
			}


			label {
				position: absolute;
				bottom: 10rpx;
				margin-left: 30rpx;
				color: #727272;
				font-size: 30rpx;
			}
		}

		.bottom_icon_label {
			width: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			image {
				width: 50rpx;
				height: 50rpx;
			}

			label {
				margin-top: 5rpx;
				color: #727272;
				font-size: 30rpx;
			}
		}
	}

	.clear_record_warp {
		position: fixed;
		top: 130rpx;
		right: 0rpx;
		margin: 0rpx 20rpx 0 0;

		background: #fcfcfc;
		display: flex;
		flex-direction: row-reverse;

		image {
			width: 35rpx;
			height: 35rpx;
		}

		text {
			padding-left: 10rpx;
			color: #257DE5;
			text-decoration: underline;
		}
	}

	.scroll_wrap {
		// position: absolute;
		// top: 160rpx;
		margin-top: 180rpx;
		background: #fcfcfc;
	}

	.list_item {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;

		.box_placehold {
			width: 84rpx;
			height: 84rpx;
		}

		.box {
			border: 1px solid #C6C6C6;
			border-radius: 42rpx;
			background: #fff;
			// margin: 10rpx 16rpx;

			width: 84rpx;
			height: 84rpx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #C6C6C6;
			font-size: 30rpx;
		}

		.box_wrong {
			border: 1px solid #e51c23;
			border-radius: 42rpx;
			background: #fe436530;
			// margin: 10rpx 16rpx;

			width: 84rpx;
			height: 84rpx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #e51c23;
			font-size: 30rpx;
		}

		.box_right {
			border: 1px solid #04be02;
			border-radius: 42rpx;
			background: #27ae6030;
			// margin: 10rpx 16rpx;

			width: 84rpx;
			height: 84rpx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #04be02;
			font-size: 30rpx;
		}

		.box_selected {
			border: 1px solid #727272;
			border-radius: 42rpx;
			background: #fff;
			// margin: 10rpx 16rpx;

			width: 84rpx;
			height: 84rpx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #727272;
			font-size: 30rpx;
		}

		.rule_flat_layout {
			width: 84rpx;
			height: 35rpx;
			border-radius: 42rpx;
			background: #237ded;
			font-size: 18rpx;
			color: #fff;
			align-items: center;
			display: flex;
			justify-content: center;
			position: absolute;
			bottom: 10rpx;
		}


	}
</style>