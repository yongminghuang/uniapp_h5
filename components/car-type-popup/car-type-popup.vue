<template>
	<view>
		<uni-popup ref="popup" type="center" @maskClick="closeAction" @change="changeAction">
			<view class="wrap">
				<view class="content" v-for="(item,index) in carTypeList" :key="index" @click="carTypeAction(item)">
					<view class="image-view">
						<image :src="item.imgUrl"></image>
					</view>
					<view>{{item.title}}</view>
					<view>{{item.subTitle}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"car-type-popup",
		props:{
			isshow: {
				type : Boolean,
				default : false
			},
		},
		data() {
			return {
				carTypeList:[
					{
						imgUrl:'https://img.jx885.com/lrjk_uniapp/img/home/ic_cartype_car_sel.png',
						title:'小车',
						subTitle:'C1/C2/C3',
						carType:1,
					},
					{
						imgUrl:'https://img.jx885.com/lrjk_uniapp/img/home/ic_cartype_truck_sel.png',
						title:'货车',
						subTitle:'A2/B2',
						carType:3,
					},
					{
						imgUrl:'https://img.jx885.com/lrjk_uniapp/img/home/ic_cartype_bus_sel.png',
						title:'客车',
						subTitle:'A1/A3/B1',
						carType:2,
					},
					{
						imgUrl:'https://img.jx885.com/lrjk_uniapp/img/home/ic_cartype_moto_sel.png',
						title:'摩托',
						subTitle:'D/E/F',
						carType:4,
					}
				]
			};
		},
		watch: {
			isshow(newValue, oldValue) {
				if (this.isshow) {
					this.$refs.popup.open()
				}
			}
		},
	 
		methods: {
			closeAction() {
				this.$emit('closeAction')
			},
			carTypeAction(item) {
				uni.setStorageSync('carTypeObj', item)
				this.$emit('carTypeAction')
				this.closeAction()
				this.$refs.popup.close()
			},
			changeAction(e) {
				this.$emit('changeAction',e.show)
			}
		}
	}
</script>

<style lang="scss">
.wrap {
	background-color: white;
	width: 600rpx;
	height: 400rpx;
	border-radius: 20rpx;
	.content {
		width: 50%;
		height: 50%;
		display: inline-block;
		text-align: center;
		color: #333333;
		.image-view {
			margin-top: 33rpx;
			image {
				width: 74rpx;
				height: 36rpx;
			}
		}
	}
}

</style>