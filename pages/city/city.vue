<template>
	<view class="wrap">
		<view class="search-view">
			<view class="input-bg">
				<input type="text" placeholder="搜索城市" v-model="searchCity"/>
			</view>
			<view class="search-btn" @click="searchAction">
				<text>搜索</text>
			</view>
		</view>
		<view class="city-view" :style="cityListStyle">
			<uni-indexed-list :options="cityTempList.length > 0 ? cityTempList : cityList" @click="bindClick"></uni-indexed-list>
		</view>
		<view class="topic-info-popup" v-if="isShowTopicInfoPopup">
			<view class="topic-info-wrap">
				<view class="content-view">
					<view class="circular">
						<text>{{clickCity}}</text>
					</view>
					<view class="content-bg-view">
						<view class="topic-title">{{topicTitle}}</view>
						<view class="subject-one">{{topicNumTipByK1}}</view>
						<view class="subject-four">{{topicNumTipByK4}}</view>
						<view class="ok-btn" @click="okAction">
							<text>我知道了</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowTopicInfoPopup:false,
				searchCity:'',
				cityListStyle:'',
				cityOriginalList:[],
				cityList:[],
				cityTempList:[],
				topicNumTipByK1:'',
				topicNumTipByK4:'',
				clickCity:'',
				topicTitle:'',
				selectedCityObj:{},
			};
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			// 状态栏高度
			let statusBarHeight = systemInfo.statusBarHeight
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			// 胶囊区域坐标
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// 导航栏的高度 = (胶囊底部高度-状态栏的高度)+(胶囊顶部高度-状态栏的高度)*2
			let navHeight = (menuButtonInfo.bottom - statusBarHeight) + (menuButtonInfo.top - statusBarHeight) * 2 
			// 导航栏和状态栏的高度
			let navAndStatusHeight = navHeight + statusBarHeight
			// 屏幕高度
			let screenHeight = systemInfo.screenHeight
			// 顶部搜索间距高度 单位px
			let spaceHeight = 50
			// 城市列表高度 单位px
			let cityHeight = screenHeight - navAndStatusHeight - spaceHeight - bottomSafeHeight
		 
			this.cityListStyle = "width:100%;height:" + cityHeight + 'px;'
		},
		watch: {
			searchCity(newValue, oldValue) {
				if (this.$util.isNullVal(this.searchCity)) {
					this.cityTempList = []
				} 
			}
		},
		onLoad() {
			this.getCityList()
		},
		methods: {
			searchAction() {
				this.cityTempList = []
				for (var i = 0; i < this.cityOriginalList.length; i++) {
					var obj = this.cityOriginalList[i]
					var isContain = obj.cityName.indexOf(this.searchCity) > -1
					if (isContain) {
						// some 判断数组是否包含特定的值
						var isSome = this.cityTempList.some(item => item.letter === obj.initials)
						if (!isSome) {
							this.cityTempList.push({
								letter: obj.initials,
								data: []
							})
						} 
						for (var j = 0; j < this.cityTempList.length; j++) {
							var item = this.cityTempList[j]
							if (obj.initials == item.letter) {
								item.data.push(obj.cityName)
							}
						}
					}
				}
			},
			bindClick(item) {
				var that = this
				this.clickCity = item.item.name
				 const carTypeObj = uni.getStorageSync('carTypeObj');
				for (var i = 0; i < this.cityOriginalList.length; i++) {
					var obj = this.cityOriginalList[i]
					if (obj.cityName == this.clickCity) {
						that.selectedCityObj = obj
						var cityNo = obj.cityNo
						 let params1 = {
						 	carType : carTypeObj.carType,
						 	cityNo : cityNo,
						 	subject : 1
						 }
						 that.$u.api.queryTypeCount(params1)
						 	.then(res1 => {
						 	if (res1.code == 200) {
							    var cityTopicNumByK1 = res1.body
								var countryTopicNumByK1 = 0
								var areaTopicNumByK1 = 0
		
								if (!that.$util.isNullVal(cityTopicNumByK1) && cityTopicNumByK1.length > 0 ) {
									var countryTopicNumByK1 = cityTopicNumByK1[0].questionCount
									that.topicNumTipByK1 = '科一：' + countryTopicNumByK1 + '题'
									if (cityTopicNumByK1.length > 1) {
										 areaTopicNumByK1 = cityTopicNumByK1[1].questionCount
										 that.topicNumTipByK1 = '科一：' + (countryTopicNumByK1 + areaTopicNumByK1) + '题(含' + areaTopicNumByK1 + '道地方题)'
									}
								}
								
						 		let params4 = {
						 			carType : carTypeObj.carType,
						 			cityNo : cityNo,
						 			subject : 4
						 		}
						 		that.$u.api.queryTypeCount(params4)
						 			.then(res4 => {
						 			if (res4.code == 200) {
						 				var cityTopicNumByK4 = res4.body
										var countryTopicNumByK4 = 0
										var areaTopicNumByK4 = 0
										if (!that.$util.isNullVal(cityTopicNumByK4) && cityTopicNumByK4.length > 0 ) {
											var countryTopicNumByK4 = cityTopicNumByK4[0].questionCount
											that.topicNumTipByK4 = '科四：' + countryTopicNumByK4 + '题'
											if (cityTopicNumByK4.length > 1) {
												 var areaTopicNumByK4 = cityTopicNumByK4[1].questionCount
												 that.topicNumTipByK4 = '科四：' + (countryTopicNumByK4 + areaTopicNumByK4) + '题(含' + areaTopicNumByK4 + '道地方题)'
											}
										}
										
										if (cityTopicNumByK1.length == 1 && cityTopicNumByK4.length == 1) {
											that.topicTitle = '全国通用题库'
										}else {
											that.topicTitle = '全国通用题库+地方题'
										}
										that.isShowTopicInfoPopup = true
						 			}
						 		})
								
						 	}
						 })
					}
				}
			},
		 
			okAction() {
				this.$u.vuex('vuex_user_cityinfo',this.selectedCityObj)
				this.isShowTopicInfoPopup = false
				uni.navigateBack()
			},
			getCityList() {
				var that = this
				that.cityList = []
				let params = {
				}
				that.$u.api.queryAllCity(params)
					.then(res => {
					if (res.code == 200) {
						var list = res.body
						that.cityOriginalList = list
						for (var i = 0; i < list.length; i++) {
							var obj = list[i]
							// some 判断数组是否包含特定的值
							var isSome = that.cityList.some(item => item.letter === obj.initials)
							if (!isSome) {
								that.cityList.push({
									letter: obj.initials,
									data: []
								})
							} 
							for (var j = 0; j < that.cityList.length; j++) {
								var item = that.cityList[j]
								if (obj.initials == item.letter) {
									item.data.push(obj.cityName)
								}
							}
						}
					}
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.wrap {
		width: 100%;
		height: 100%;
		position: relative;
		.search-view {
			display: flex;
			height: 50px;
			.input-bg {
				margin: auto 0 auto 30rpx;
				width: 600rpx;
				 
			}
			.search-btn {
				background: linear-gradient(to right, #13BAF9, #1D8AF2);
				display: flex;
				width: 90rpx;
				height: 60rpx;
				border-radius: 10rpx;
				margin: auto 10rpx auto 20rpx;
				text {
					margin: auto;
					font-size: 30rpx;
					color: white;
				}
			}
		}
		.city-view {
			position: relative;
		}
		.topic-info-popup {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0,0.2);
			.topic-info-wrap {
				width: 100%;
				height: 100%;
				display: flex;
				.content-view {
					margin: auto;
					width: 560rpx;
					height: 510rpx;
					.circular {
						position: relative;
						z-index: 1000;
						margin-left: 190rpx;
						display: flex;
						width: 180rpx;
						height: 180rpx;
						border: 3rpx solid #3184e7;
						border-radius: 90rpx;
						background-color: white;
						text {
							margin: auto;
							font-size: 38rpx;
							color: #666666;
							font-weight: 600;
							text-align: center;
						}
					}
					.content-bg-view {
						width: 560rpx;
						height: 430rpx;
						background-color: white;
						border-radius: 10rpx;
						text-align: center;
						margin-top: -80rpx;
						.topic-title {
							color: #3184e7;
							padding-top: 110rpx;
							font-size: 36rpx;
						}
						.subject-one {
							margin-top: 30rpx;
							font-size: 32rpx;
							color: #354556;
						}
						.subject-four {
							font-size: 32rpx;
							color: #354556;
						}
						.ok-btn {
							width: 84%;
							height: 80rpx;
							background-color: #3c7ee5;
							display: flex;
							margin: 40rpx auto auto auto;
							border-radius: 10rpx;
							text {
								margin: auto;
								color: white;
								font-size: 30rpx;
							}
						}
					}
				}
			}
		}
	}
</style>
