<template>
	<view>
		<uni-popup ref="popup" type="center" @maskClick="closeAction" @change="changeAction">
			<view class="wrap">
				<view class="top-view">
					<uni-icons type="compose" size="30" color="#ffffff"></uni-icons>
					<view class="name">请输入姓名</view>
				</view>
				<view class="content-view">
					<view class="desc">{{'原用户名：' + nickName + "，限8个字以内"}}</view>
					<view class="input-view">
						<input :focus="isFocus" type="text" v-model="userName" maxlength="8"/>
					</view>
				</view>
				<view class="bottom-view">
					<view class="cancel-btn" @click="closeAction(1)">取消</view>
					<view class="ok-btn" @click="okAction">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"nick-name-popup",
		props:{
			isshow: {
				type : Boolean,
				default : false
			},
		},
		data() {
			return {
				nickName:"",
				userName:"",
				userId:"",
				isFocus:false,
				timeout:null,
			};
		},
		mounted() {
			
		},
		watch: {
			isshow(newValue, oldValue) {
				if (this.isshow) {
					var that = this
					that.userName = ""
					const user = uni.getStorageSync('user');
					if (!that.$util.isNullVal(user)) {
						that.nickName = user.nickName
						that.userId = user.id
					}
					that.$refs.popup.open()
					that.timeout = setTimeout(function() {
						that.isFocus = true
					}, 1000);
				}
			},
		},
		methods: {
			closeAction(value) {
				if (value == 1) {
					this.isFocus = false
					clearTimeout(this.timeout)
					this.$refs.popup.close()
				}
				this.$emit('closeAction')
			},
			changeAction(e) {
				this.$emit('changeAction',e.show)
			},
			okAction() {
				if (this.$util.isNullVal(this.userName)) {
					uni.showToast({
						icon:'none',
						title:'用户名不能为空'
					})
					return
				}
				var that = this
				let params = {
					userId: this.userId,
					nickName:this.userName
				}
				that.$u.api.updateUser(params)
					.then(res => {
					if (res.code == 200) {
						const user = uni.getStorageSync('user');
						user.nickName = this.userName
						uni.setStorageSync('user', user);
						that.closeAction(1)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.wrap {
	background-color: white;
	width: 600rpx;
	.top-view {
		padding: 20rpx 0 20rpx 30rpx;
		background-color: #237ded;
		display: flex;
		.name {
			color: white;
			font-size: 36rpx;
			margin: auto 0 auto 24rpx;
		}
	}
	.content-view {
		padding: 30rpx 30rpx 0 30rpx;
		background-color: white;
		.desc {
			color: #666666;
			font-size: 30rpx;
		}
		.input-view {
			margin-top: 40rpx;
			padding-bottom: 20rpx;
			border-bottom: 2rpx solid orangered;
		}
	}
	.bottom-view {
		margin: 60rpx 0;
		display: flex;
		.cancel-btn {
			margin-left: 260rpx;
			font-size: 30rpx;
			color: #666666;
		}
		.ok-btn {
			margin-left: 100rpx;
			font-size: 30rpx;
			color: #e0bf6a;
		}
	}
}
</style>