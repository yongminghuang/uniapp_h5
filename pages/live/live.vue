<template>
	<view class="wrap">
		<uni-nav-bar height="88rpx" :border="false" fixed statusBar background-color="#3165a1" :rightWidth="rightWidth">
			<template>
				<view class="nav-center">
					<view class="header-view">
						<view class="header-wrap" v-for="(imgUrl,index) in headerList" :key="index">
							<image :src="imgUrl"></image>
						</view>
					</view>
					<view class="num-view">
						<view class="num">{{peopleNum}}</view>
						<image src="https://img.jx885.com/lrjk_uniapp/img/live/ic_live_people_count.png"></image>
					</view>
					<uni-icons type="closeempty" size="20" color="#fff" class="close" @click="closeAction"></uni-icons>
				</view>
			</template>
		</uni-nav-bar>
		<view class="play-view">
			<!-- <live-player
			  :src="liveListFirstObj.liveRtmpUrl"
			  autoplay
			  @statechange="statechange"
			  @error="error"
			  :style="videoStyle"
			/> -->
			<view style="background-color: white;" :style="videoStyle"></view>
			<scroll-view class="live-message-view" scroll-y="true" :scroll-into-view="scrollToView">
				<view class="message-wrap" v-for="(item,index) in messageList" :key="index" :id="'item-' + index">
					<view class="message-bg"
						:style="'border-radius:' + (item.type == 2  ? '46rpx;' : (item.type == 3 || item.type == 4) ? '40rpx;' : '32rpx;')">
						<image :src="item.headerImg" v-if="item.type == 2 || item.type == 3 || item.type == 4"></image>
						<view class="message-zan" v-if="item.type == 2">
							<view class="message-zan-wrap">
								<view class="nike-name msg">{{item.nickName}}</view>
								<view class="message msg">{{item.message}}</view>
							</view>
							<image src="https://img.jx885.com/lrjk_uniapp/img/live/ic_live_msg_like.png"></image>
						</view>
						<view class="message-content" v-else>
							<view class="prefix msg" v-if="item.type == 3 || item.type == 4">恭喜</view>
							<view class="nike-name msg">{{item.nickName}}</view>
							<view class="message msg">{{item.message}}</view>
						</view>

					</view>
				</view>
			</scroll-view>
			<view class="like-view">
				<uni-icons type="heart-filled" :color="isLike?'#ff0000':'#c9c7c8'" class="like" size="30"
					@click="likeAction"></uni-icons>
				<view class="like-num">{{likeNum}}</view>
			</view>
		</view>
		<view class="bottom-view" :style="'height:' + bottomViewHeight + 'px;'">
			<view class="live-list-btn" @click="liveListBtnAction">直播课程表</view>
			<view class="input-btn" @click="commentAction">
				<text>说点什么...</text>
			</view>
			<!-- <uni-icons type="more-filled" color="#cdcdcd" class="more"></uni-icons> -->
		</view>
		<view class="input-mask-view" v-if="isShowInputMaskView">
			<view class="mask-view-wrap">
				<view :style="closeViewStyle" @click="isShowInputMaskView = false"></view>
				<view class="input-view-wrap" :style="inputViewWrapStyle">
					<view class="input-view">
						<input type="text" focus :cursor-spacing="20" v-model="comment" />
					</view>
					<view class="send" :class="isComment?'send-sel':''" @click="sendAction">发送</view>
				</view>
			</view>
		</view>
		<live-list-popup :isshow="isShowliveListPopup" :livelist="liveList" @closeAction="isShowliveListPopup = false;"
			@liveAction="liveAction" @refreshLiveList="refreshLiveList"></live-list-popup>

		<open-vip-popup :isshow="isShowOpenVipPopup" title="开通会员观看更多直播" @closeAction="closeOpenVipPopupAction">
		</open-vip-popup>

		<login-popup :isshow="isShowLoginPopup" @closeAction="isShowLoginPopup = false;">
		</login-popup>
	</view>
</template>

<script>
	import {
		isVip
	} from '../../common/util';

	export default {
		data() {
			return {
				peopleNum: 0,
				isVip: false,
				isShowOpenVipPopup: false,
				isShowliveListPopup: false,
				isShowInputMaskView: false,
				isShowLoginPopup: false,
				rightWidth: '',
				bottomViewHeight: 50, //px
				inputViewWrapStyle: '',
				isComment: false,
				closeViewStyle: '',
				comment: '',
				scrollToView: '',
				isLike: false,
				videoStyle: '',
				headerList: [],
				liveList: [],
				liveListFirstObj: null,
				likeNum: 0,
				messageList: [],
				isSocketOpen: false,
				socketMsgQueue: [],
				tempSubject: 0,
				tempCarType: 0,
			}
		},
		watch: {
			comment(newValue, oldValue) {
				var value = newValue.replace(/\s+/g, '');
				if (value != "") {
					this.isComment = true;
				} else {
					this.isComment = false;
				}
			}
		},
		created() {
			const systemInfo = uni.getSystemInfoSync();
			let screenWidth = systemInfo.screenWidth
			let screenHeight = systemInfo.screenHeight
			// 状态栏高度
			let statusBarHeight = systemInfo.statusBarHeight
			// 底部安全区域高度
			let bottomSafeHeight = systemInfo.safeAreaInsets.bottom
			// 胶囊区域坐标
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.rightWidth = ((screenWidth - menuButtonInfo.left) * 2) + 'rpx;'
			let videoHeight = screenHeight - statusBarHeight - 44 - bottomSafeHeight - this.bottomViewHeight
			this.videoStyle = "width:100%;height:" + videoHeight + 'px;'
			this.inputViewWrapStyle = 'height:' + (60 + bottomSafeHeight) + 'px;'
			this.closeViewStyle = 'width:100%;height:' + (screenHeight - 60 - bottomSafeHeight) + 'px;'
		},
		onLoad() {
			const carTypeObj = uni.getStorageSync('carTypeObj');
			const subject = uni.getStorageSync('subject');
			this.getLiveList(carTypeObj.carType, subject);
			this.getRandomUsersHeader(3);

			var that = this;
			const eventChannel = this.getOpenerEventChannel();
			// 监听videoObj事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('liveListFirstObj', function(data) {
				that.liveListFirstObj = data
				var dzCount = that.liveListFirstObj.dzCount
				var peopleNum = that.liveListFirstObj.peopleNum
				that.likeNum = parseInt(dzCount)
				that.peopleNum = parseInt(peopleNum)
				that.createWebSocket();
			})
		},
		onShow() {
			this.searchVipStatus()
		},
		methods: {
			commentAction() {
				this.comment = "";
				this.isShowInputMaskView = true
			},
			closeOpenVipPopupAction() {
				this.isShowOpenVipPopup = false;
				this.searchVipStatus()
			},

			searchVipStatus() {
				this.isVip = isVip(this)
			},

			liveListBtnAction() {
				if (this.liveList.length > 0) {
					this.isShowliveListPopup = true;
				} else {
					uni.showToast({
						title: '暂无数据',
						icon: 'none'
					});
				}
			},
			likeAction() {
				if (this.isLike) {
					this.isLike = false;
					this.likeNum -= 1;
				} else {
					const userIp = uni.getStorageSync('userIp');
					const userObj = uni.getStorageSync('user');
					var userId = userObj.id;
					var obj = {
						message: '点赞',
						type: 2,
						userId: userId,
						ip: userIp
					}
					var msg = JSON.stringify(obj)
					this.sendWebSocket(msg);
				}

			},
			refreshLiveList(carType, subject) {
				this.getLiveList(carType, subject)
			},
			getLiveList(carType, subject) {
				var that = this
				that.tempSubject = subject
				that.tempCarType = carType
				that.liveList = []
				let params = {
					carType: carType,
					subject: subject
				}
				that.$u.api.roomList(params)
					.then(res => {
						if (res.code == 200) {
							var liveTempList = []
							var list = res.body
							for (var i = 0; i < list.length; i++) {
								var obj = list[i]
								if ((obj.id != 1) && (obj.id != 3)) {
									liveTempList.push(obj)
								}
								if (i == list.length - 1) {
									that.liveList = liveTempList
								}
							}
						}
					})
			},
			sendWebSocket(msg) {
				var that = this;
				if (that.isSocketOpen) {
					uni.sendSocketMessage({
						data: msg,
						success(res) {
							that.likeNum += 1
							that.isLike = true
						},
						fail(res) {
							that.isLike = false
						}
					});
				} else {
					that.socketMsgQueue.push(msg);
				}
			},
			closeWebSocket() {
				if (this.isSocketOpen) {
					uni.closeSocket();
					uni.onSocketClose(function(res) {
						console.log('WebSocket 已关闭！');
					});
				}
			},
			createWebSocket() {
				var that = this
				const obj = uni.getStorageSync('user');
				var userId = obj.id;
				var domain = this.$u.http.config.baseUrl;
				domain = domain.replace('https', 'wss')
				var url = domain + '/lrjkapp/websocket/' + userId
				uni.connectSocket({
					url: url,
					complete: (res) => {}
				});
				uni.onSocketOpen(function(res) {
					console.log('WebSocket连接已打开！');
					that.isSocketOpen = true;
					for (var i = 0; i < that.socketMsgQueue.length; i++) {
						that.sendSocketMessage(that.socketMsgQueue[i]);
					}
					that.socketMsgQueue = [];
				});
				uni.onSocketError(function(res) {
					console.log('WebSocket连接打开失败，请检查！');
					that.isSocketOpen = false;
				});
				uni.onSocketMessage(function(res) {
					console.log('收到服务器内容：' + res.data);
					var data = JSON.parse(res.data)
					if (data.type == 0) { // 用户进入
						var obj = {
							headerImg: '',
							nickName: data.nickname,
							message: '来了',
							type: data.type
						}
						that.messageList.push(obj);
						that.peopleNum = data.count;
					} else if (data.type == 1) { // 用户消息
						var obj = {
							headerImg: '',
							nickName: data.nickname,
							message: data.message,
							type: data.type
						}
						that.messageList.push(obj);
					} else if (data.type == 2 || data.type == 3 || data.type == 4) { // 点赞  开会员  模拟考成绩
						var obj = {
							headerImg: data.headImgUrl,
							nickName: data.nickname,
							message: data.message,
							type: data.type
						}
						that.messageList.push(obj);
					} else { // 用户离开
						that.peopleNum = data.count;
					}
					that.scrollToBottom();

				});
			},
			// 获取随机用户头像
			getRandomUsersHeader(num) {
				var headerTempList = [];
				for (var i = 0; i < num; i++) {
					var random = Math.floor(Math.random() * 2500)
					var url = "https://img.jx885.com/lrjk/image/avatar/" + random + '.jpg'
					headerTempList.push(url)
					if (i == num - 1) {
						headerTempList.push('https://img.jx885.com/lrjk_uniapp/img/live/ic_live_head_more.png')
						this.headerList = headerTempList
					}
				}

			},
			scrollToBottom() {
				this.scrollToView = 'item-' + (this.messageList.length - 1);
			},
			closeAction() {
				this.closeWebSocket();
				uni.navigateBack()
			},
			statechange(e) {
				console.log('live-player code:', e.detail.code)
			},
			error(e) {
				console.error('live-player error:', e.detail.errMsg)
			},
			sendAction() {
				this.isShowInputMaskView = false;
				const userIp = uni.getStorageSync('userIp');
				const userObj = uni.getStorageSync('user');
				if (!this.$util.isNullVal(userObj) && userObj.isTemp == 0) {
					var userId = userObj.id;
					var obj = {
						message: this.comment,
						type: 1,
						userId: userId,
						ip: userIp
					}
					var msg = JSON.stringify(obj)
					this.sendWebSocket(msg);
				} else {
					this.isShowLoginPopup = true
				}
			},
			liveAction(item, index) {
				if (index != 0 && !this.isVip) {
					this.isShowOpenVipPopup = true
					return
				}
				var that = this
				uni.navigateTo({
					url: '/pages/live/live-video',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('videoObj', item, that.tempSubject, that.tempCarType);
					}
				});
			},

		}
	}
</script>

<style lang="scss">
	.wrap {
		width: 100%;
		height: 100%;
		position: relative;

		.nav-center {
			width: 100%;
			display: flex;

			.header-view {
				margin: auto 0;
				display: flex;

				.header-wrap {
					margin: auto 10rpx auto 0;
					display: flex;

					image {
						margin: auto;
						width: 40rpx;
						height: 40rpx;
						border-radius: 20rpx;
					}
				}
			}

			.num-view {
				margin: auto 0;
				background-color: #1353a2;
				height: 60rpx;
				display: flex;
				padding: 0 20rpx;
				border-radius: 30rpx;

				.num {
					margin: auto 0;
					font-size: 30rpx;
					color: white;
				}

				image {
					width: 24rpx;
					height: 28rpx;
					margin: auto 0 auto 10rpx;
				}
			}

			.close {
				margin: auto 0 auto auto;
			}
		}

		.play-view {
			display: flex;
			position: relative;

			.live-message-view {
				position: absolute;
				left: 0;
				bottom: 20rpx;
				width: 100%;
				height: 300rpx;

				// overflow-y: auto;
				.message-wrap {
					display: flex;
					margin-bottom: 10rpx;

					.message-bg {
						margin: auto 0 auto 20rpx;
						background-color: rgba(0, 0, 0, 0.6);
						padding: 10rpx 10rpx;
						display: flex;
						font-style: 28rpx;
						color: white;

						image {
							width: 60rpx;
							height: 60rpx;
							margin: auto 0 auto 10rpx;
						}

						.message-zan {
							display: flex;

							.message-zan-wrap {
								margin-left: 10rpx;

								.nike-name {
									color: white;

								}

								.message {
									font-size: 20rpx;
								}
							}

							image {
								width: 60rpx;
								height: 52rpx;
							}
						}

						.message-content {
							display: flex;

							.nike-name {
								color: #0c9df3;
							}

							.msg {
								margin: auto 0 auto 10rpx;
							}

							.message {
								max-width: 400rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
						}


					}
				}
			}

			.like-view {
				position: absolute;
				top: 500rpx;
				right: 50rpx;
				text-align: center;
			}
		}

		.bottom-view {
			display: flex;

			.live-list-btn {
				margin: auto 0 auto 20rpx;
				font-size: 28rpx;
				color: white;
				background-color: #0c9df3;
				padding: 16rpx 24rpx;
				border-radius: 36rpx;
			}

			.input-btn {
				margin: auto 0 auto 20rpx;
				background-color: #f2f0ef;
				display: flex;
				padding: 16rpx 260rpx 16rpx 50rpx;
				border-radius: 36rpx;

				text {
					font-size: 28rpx;
					color: #b9b9ba;
				}
			}

			.more {
				margin: auto;
			}
		}

		.input-mask-view {
			background-color: rgba(0, 0, 0, 0.6);
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1000;

			.mask-view-wrap {
				width: 100%;
				height: 100%;
				position: relative;

				.input-view-wrap {
					position: absolute;
					bottom: 0;
					left: 0;
					background-color: white;
					display: flex;
					width: 100%;

					.input-view {
						display: flex;
						border: 2rpx solid #666;
						width: 560rpx;
						height: 76rpx;
						margin: 24rpx 0 auto 20rpx;
						border-radius: 10rpx;

						input {
							margin: 0 auto;
							width: 94%;
							font-size: 32rpx;
							height: 100%;
						}
					}

					.send {
						padding: 16rpx 32rpx;
						font-size: 32rpx;
						color: #b9b9ba;
						margin: 24rpx auto auto auto;
					}

					.send-sel {
						background-color: #0c9df3;
						color: white;
						border-radius: 10rpx;
					}
				}
			}

		}
	}
</style>