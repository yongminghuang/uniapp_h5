<template>
	<view>
		<uni-popup ref="popup" type="bottom" @maskClick="closeAction(0)">
			<view class="wrap">
				<uni-icons type="closeempty" class="close" size="26" color="#666666" @click="closeAction(1)"></uni-icons>
				<view class="header-view">
					<uni-data-select
					   :clear="false"
						class="select"
						v-model="carType"
						:localdata="range"
						@change="change"
					></uni-data-select>
					<view class="segment-view">
						<uni-segmented-control
						:class="segment"
						:current="current" 
						:values="items"
						@clickItem="onClickItem" 
						styleType="button" 
						activeColor="#2f7cf7">
						</uni-segmented-control>
					</view>
				</view>
				<view class="live-list">
					<view class="live-list-wrap" v-for="(item,index) in livelist" :key="index" @click="liveAction(item,index)">
						<view class="live-bg">
							<image src="https://img.jx885.com/lrjk_uniapp/img/live/ic_live_free_bg.png" class="free-bg" v-if="index == 0"></image>
							<image src="https://img.jx885.com/lrjk_uniapp/img/live/ic_live_free.png" class="free" v-if="index == 0"></image>
							<image src="https://img.jx885.com/lrjk_uniapp/img/live/ic_live_other.png" class="other"></image>
							<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_video_live.gif" class="video-live" v-if="item.isSelected"></image>
						</view>
						<view class="live-title" :class="item.isSelected ? 'live-title-red' : ''">{{item.title}}</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"live-list-popup",
		props:{
			isshow: {
				type : Boolean,
				default : false
			},
			livelist: {
				type : Array,
				default : []
			},
			tempcartype: {
				type : Number,
				default : 0
			},
			tempsubject: {
				type : Number,
				default : 0
			}
		},
		data() {
			return {
				carType:1,
				range: [
					{ value: 1, text: "小车题库" },
					{ value: 2, text: "客车题库" },
					{ value: 3, text: "货车题库" },
					{ value: 4, text: "摩托题库" },
			    ],
				items: ['科一', '科四'],
				current: 0,
				 
			};
		},
		watch: {
			isshow(newValue, oldValue) {
				if (this.isshow) {
					this.$refs.popup.open()
				}
			},
			tempcartype(newValue, oldValue) {
				this.carType = this.tempcartype
			},
			tempsubject(newValue, oldValue) {
				if (this.tempsubject == 1) {
					this.current = 0
				}else {
					this.current = 1
				}
			},
		},
		mounted() {
			const carTypeObj = uni.getStorageSync('carTypeObj');
			const subject = uni.getStorageSync('subject');
			if (subject == 1) {
				this.current = 0
			}else {
				this.current = 1
			}
			this.carType = carTypeObj.carType
		},
		methods: {
			closeAction(value) {
				if (value == 1) {
					this.$refs.popup.close()
				}
				this.$emit('closeAction')
			},
			change(e) {
				this.carType = e
				this.refreshLiveList()
			},
			onClickItem(e) {
				this.current = e.currentIndex
				this.refreshLiveList()
			},
			refreshLiveList() {
				var subject = 0
				if (this.current == 0) {
					subject = 1
				}else {
					subject = 4
				}
				this.$emit('refreshLiveList',this.carType,subject)
			},
			liveAction(item,index) {
				this.$emit('liveAction',item,index)
				this.closeAction(1);
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		background-color: white;
		width: 100%;
		height: 600rpx;
		border-radius: 20rpx;
		position: relative;
		.close {
			position: absolute;
			top: -80rpx;
			right: 20rpx;
		}
		.header-view {
			display: flex;
			border-bottom: 2rpx solid #ececec;
			.segment-view {
				margin-left: auto;
				width: 200rpx;
				height: 80rpx;
			}
		}
		.live-list {
			.live-list-wrap {
				padding: 56rpx 0;
				display: inline-block;
				width: 33.33%;
				text-align: center;
				.live-bg {
					background-color: #e4eafd;
					width: 80rpx;
					height: 80rpx;
					display: flex;
					margin: auto;
					border-radius: 40rpx;
					position: relative;
					.free-bg {
						position: absolute;
						top: 0;
						left: 14rpx;
						width: 52rpx;
						height: 20rpx;
					}
					.free {
						position: absolute;
						top: 0;
						left: 24rpx;
						width: 32rpx;
						height: 14rpx;
					}
					.other {
						margin: auto;
						width: 43rpx;
						height: 27rpx;
					}
					.video-live {
						position: absolute;
						top:25rpx;
						left:25rpx;
						width: 30rpx;
						height: 30rpx;
					}
				}
				.live-title {
					margin-top: 10rpx;
					font-size: 30rpx;
					color: #666666;
				}
				.live-title-red {
					color: #D32D1B;
				}
			}
		}
	}
</style>
 
 