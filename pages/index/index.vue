<template>
	<page-meta :page-style="'overflow:'+(isShowPageMeta?'hidden':'visible')"></page-meta>
	<view class="wrap">
		<uni-nav-bar height="88rpx" :border="false" fixed statusBar>
			<template v-slot:left>
				<!-- 	<view class="kf-view" @click="kfAction">
					<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_kf.png"></image>
					<text>客服</text>
				</view> -->
			</template>
			<template>
				<view class="title-view">
					<text class="title">懒人理论速成</text>
					<view class="city-view" @click="cityAction">
						<text>{{$util.nullStr(currentCityObj.cityName) | cityNameFil}}</text>
						<uni-icons type="down" size="16" color="#666666" class="down"></uni-icons>
					</view>
				</view>
			</template>
		</uni-nav-bar>
		<view class="user-info-view">
			<view class="avatar-bg" v-if="isLogin" @click="infoAction">
				<image
					:src="$util.nullStr(headImgUrl,'https://img.jx885.com/lrjk_uniapp/img/mine/ic_default_avatar.png')"
					mode="aspectFit" class="img-avatar"></image>
			</view>
			<view class="avatar-bg" v-else @click="loginAction">
				<image
					:src="$util.nullStr(headImgUrl,'https://img.jx885.com/lrjk_uniapp/img/mine/ic_default_avatar.png')"
					mode="aspectFit" class="img-avatar"></image>
			</view>
			<view class="user-name-view" v-if="isLogin" @click="infoAction">
				<view class="user-name">{{$util.nullStr(nickName)}}</view>
				<view class="user-phone">{{$util.nullStr(phone,'')}}</view>
			</view>
			<text class="login" @click="loginAction" v-else>一键登录</text>
			<view class="forever-vip-view" v-if="vipBtnStyle == 2" @click="foreverVipAction">
				<text>永久会员</text>
			</view>
			<view class="open-vip-view upgrade-vip-view" v-else-if="vipBtnStyle == 1" @click="monthVipAction">
				<text class="open-vip">{{upgradeVipTip}}</text>
				<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_upgrade.png" class="upgrade"></image>
			</view>
			<view class="open-vip-view" @click="openVipAction" v-else-if="!isIosPlatform && vipBtnStyle == 0">
				<text class="open-vip">开通会员</text>
			</view>
		</view>
		<view class="topic-info-view">
			<text>{{'已更新至' + currentYearMonth}} </text>
			<text class="city" @click="cityAction">{{$util.nullStr(currentCityObj.cityName)}}</text>
			<text>最新题库</text>
		</view>
		<view class="subject-view">
			<view class="subject-btn" :class="selectedSubjectIndex == 1 ? 'selected-subject' : ''"
				@click="subjectAction(1)">
				<text>科一</text>
			</view>
			<view class="subject-btn" @click="subjectAction(2)" v-if="!isIosPlatform || vipBtnStyle != 0">
				<text>科二</text>
			</view>
			<view class="subject-btn" @click="subjectAction(3)" v-if="!isIosPlatform || vipBtnStyle != 0">
				<text>科三</text>
			</view>
			<view class="subject-btn" :class="selectedSubjectIndex == 4 ? 'selected-subject' : ''"
				@click="subjectAction(4)">
				<text>科四</text>
			</view>
			<view class="subject-btn" :class="selectedSubjectIndex == 5 ? 'selected-subject' : ''"
				@click="subjectAction(5)">
				<text>扣满12分</text>
			</view>
			<view class="car-type-view" @click="this.isShowCarTypePopup = true">
				<view class="car-view">
					<text class="car">{{selectedCarType}}</text>
					<text class="arrow">></text>
				</view>
				<view class="change-topic">切换题库</view>
			</view>
		</view>
		<view class="k5_tip" v-if="selectedSubjectIndex == 5">
			<text>驾照扣满12分后，需重新学习理论考试</text>
		</view>
		<view class="skill-video-view">
			<view class="video-btn" @click="examAction">
				<view class="video-btn-wrap">
					<image src="https://img.jx885.com/lrjk_uniapp/img/home/icon_home_mnks.png" class="img-video_bg">
					</image>
					<!-- <image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_video_live.gif" class="img-video_live"></image> -->
					<view class="video">模拟考试</view>
				</view>
			</view>
			<view class="skill-btn" @click="skillBtnAction">
				<view class="skill-btn-wrap">
					<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_skill.png" class="img-skill">
					</image>
					<view class="skill">技巧练题</view>
				</view>
			</view>
		</view>
		<view class="exam-view">
			<view class="exam-four-btn2" @click="speedAction">
				<text>速成{{speedCount}}题</text>
				<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_speed.png"></image>
			</view>

			<view class="exam-four-btn2" @click="newRuleAction">
				<text>新规题目</text>
				<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_new.png"></image>
			</view>
			<view class="exam-four-btn2" @click="errorAction">
				<text>我的错题</text>
				<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_error.png"></image>
			</view>
			<view :class="!isIosPlatform || vipBtnStyle !=0 ? 'exam-four-btn2':'exam-four-btn2 exam-four-btn-last'"
				@click="collectionAction">
				<text>我的收藏</text>
				<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_error.png"></image>
			</view>
			<view class="exam-four-btn2 exam-four-btn-last2" @click="moreVideoAction"
				v-if="!isIosPlatform || vipBtnStyle !=0">
				<text>技巧小视频</text>
				<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_skill2.png"></image>
			</view>
		</view>
		<view class="strengthen-view">
			<view class="strengthen">强化训练</view>
			<view class="strengthen-wrap">
				<view class="strengthen-four-btn" @click="secretAcyion">
					<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_secret.png"></image>
					<text>考前密卷</text>
				</view>
				<view class="strengthen-four-btn" @click="difficultyAction">
					<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_difficulty.png"></image>
					<text>难题攻克</text>
				</view>
				<view class="strengthen-four-btn" @click="classifyAction">
					<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_classify.png"></image>
					<text>分类练习</text>
				</view>
				<view class="strengthen-four-btn strengthen-four-btn-last" @click="iconAction">
					<image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_icon.png"></image>
					<text>图标速记</text>
				</view>
				<view class="strengthen-four-btn strengthen-four-btn-last2" v-if="!isIosPlatform || isVip"
					@click="smallCardAction">
					<!-- <image src="https://img.jx885.com/lrjk_uniapp/img/home/ic_home_icon.png"></image> -->
					<image class="smallcard" src="https://img.jx885.com/lrjk_uniapp/img/home/fun_card.png"></image>
					<image class="red-pot" src="https://img.jx885.com/lrjk_uniapp/img/home/fun_fire.png"></image>
					<text>速记卡片</text>
				</view>
			</view>
		</view>
		<view class="subject-video-view" v-if="videoList.length > 0 && isLogin">
			<view class="subject-more-view">
				<text class="subject-skill">科一科四技巧</text>
				<text class="subject-more" @click="moreVideoAction" v-if="!isIosPlatform || vipBtnStyle !=0">更多 ></text>
			</view>
			<view class="subject-video-content">
				<view class="subject-video-wrap" v-for="(item,index) in videoList" :key="index"
					@click="videoAction(index)">
					<!-- <view class="explain">技巧讲解</view> -->
					<text class="free_tip">免费</text>
					<view class="subject-video-img">
						<image :src="item.imgUrl" mode="widthFix"></image>
						<view class="subject-video-time-view">
							<view class="time">{{item.time}}</view>
						</view>
					</view>
					<view class="video-title">{{item.title}}</view>
				</view>
			</view>
		</view>
		<car-type-popup :isshow="isShowCarTypePopup" @closeAction="isShowCarTypePopup = false;"
			@carTypeAction="carTypeAction" @changeAction="carTypePopupChangeAction">
		</car-type-popup>
		<login-popup :isshow="isShowLoginPopup" @closeAction="isShowLoginPopup = false;">
		</login-popup>
	</view>
</template>

<script>
	import {
		getVipsInfo,
		getArrayClassId,
		getBigClassId
	} from '../../common/request.js'
	import {
		toClassifyListPage,
		toColloctPage,
		toFastLarnTipPage,
		toLearnPage,
		toMyWrongPage,
		toOpenVip,
		toReadyBeforeExamPage,
		toSkillPage,
		toVipInfo
	} from '../../common/page-route.js'
	import {
		carType,
		isProdEnv,
		isVip,
		subject,
		vipName
	} from '../../common/util.js'
	import GravityEngine from "../../utils/gravityengine.wx.min.js";

	export default {
		data() {
			return {
				selectedSubjectIndex: 1,
				selectedCarType: '小车',
				isShowCarTypePopup: false,
				isShowPageMeta: false,
				videoList: [],
				allVideoList: [],
				liveListFirstObj: null,
				currentCityObj: {
					cityName: "厦门市",
					cityNo: "350200",
					initials: "X"
				},
				isShowLoginPopup: false,
				headImgUrl: '',
				nickName: '',
				phone: '',
				isLogin: false,
				vipBtnStyle: null, // 0 开通vip  1 30天会员  2 永久会员
				upgradeVipTip: '',
				speedCount: 600,
				isIosPlatform: false,
			}
		},
		filters: {
			cityNameFil: function(value) {
				var temp = value
				var index = temp.indexOf('市')
				if (index == -1) {
					index = temp.indexOf('自治州')
					if (index == -1) {
						index = temp.indexOf('自治县')
						if (index == -1) {
							index = temp.indexOf('地区')
						}
					}
				}
				if (index > -1) {
					temp = temp.substring(0, index)
				}
				return temp;
			}
		},
		computed: {
			currentYearMonth() {
				const now = new Date();
				const year = now.getFullYear();
				const month = (now.getMonth() + 1).toString().padStart(2, '0');
				return `${year}年${month}月`;
			}
		},
		created() {
			this.isIosPlatform = uni.getSystemInfoSync().platform == 'ios'
			this.$u.vuex('vuex_is_ios_platform', this.isIosPlatform)
			this.$store.state.vuex_user_cityinfo
		},
		onLoad(option) {
			uni.$on('user', this.getUserInfo);
			uni.$on('launch', (title) => {
				this.launchPage(title)
			});
		},
		onUnload() {
			uni.$off('user');
			uni.$off('launch');
		},
		onShow() {
			this.getDict();
			this.initCarTypeData();
			this.initSubjectData();
			this.speedCount = this.getSpeedCount();
			this.getUserInfo(1);
			// console.log('onShow')
			// console.log(`process.env：${JSON.stringify(process.env)}`)

			this.refreshData()
		},
		// 下拉刷新回调
		onPullDownRefresh() {
			this.refreshData()
			var timeout = setTimeout(function() {
				uni.stopPullDownRefresh()
				clearTimeout(timeout)
			}, 2000);
		},
		methods: {
			getDict() {
				// console.log("baseinfo:" + JSON.stringify(uni.getAppBaseInfo()))
				let params = {
					status: 0,
					channel: 0,
					key: 0,
					version: uni.getAppBaseInfo().appVersion
				}
				this.$u.api.getStaticInfo(params)
					.then(res => {

						if (res.code == 200) {
							var list = res.body
							for (var index = 0; index < list.length; index++) {
								var element = list[index];
								if (element && element.key == "pay_channel_mp") {
									uni.setStorageSync("originPay", element.value)
								}

							}
						}
					})
			},
			// 我的资料
			infoAction() {
				uni.navigateTo({
					url: '/pages/mine/mine-info',
				})
			},
			getSpeedCount() {
				const cartype = this.$util.carType();
				const subject = this.$util.subject();
				if (subject == 5) {
					return 800
				}
				if (cartype == 1) {
					return 600
				}
				if (cartype == 4) {
					return 200
				}
				if (subject == 1 && (cartype == 2 || cartype == 3)) {
					return 700
				}
				if (subject == 4 && (cartype == 2 || cartype == 3)) {
					return 600
				}
			},
			// 刷新数据
			refreshData() {
				let token = uni.getStorageSync('accessToken')
				if (token) {
					this.queryVips();
					this.getThirdInfo();
					this.getLocalCity();
					this.getIpAddress();
					this.getVideoList();
				}

				// this.getVideoList();
			},

			getVideoList() {
				var that = this
				const carTypeObj = uni.getStorageSync('carTypeObj');
				var subject = uni.getStorageSync('subject');
				if (subject == 5) {
					subject = 1;
				}
				let params = {
					carType: carTypeObj.carType,
					subject: subject,
					isAd: 0
				}
				that.$u.api.queryShortVideoList(params)
					.then(res => {
						that.videoList = []
						that.allVideoList = []
						if (res.code == 200) {
							var list = res.body
							for (var i = 0; i < list.length; i++) {
								var obj = list[i]
								obj.imgUrl = that.$util.imgDomainUrl() + '/' + obj.cover
								obj.time = that.$util.convertSecondsToTime(obj.duration)
								obj.videoUrl = that.$util.imgDomainUrl() + '/' + obj.url
								if (i < 4) {
									that.videoList.push(obj)
								}
								that.allVideoList.push(obj)
							}
						}
					})
			},

			// 永久会员点击事件 
			foreverVipAction() {
				toVipInfo()
			},
			// 30天会员点击事件
			monthVipAction() {
				toVipInfo()
			},
			// 获取用户信息
			getUserInfo(value) {
				const user = uni.getStorageSync('user');
				if (this.$util.isNullVal(user)) {
					this.headImgUrl = ''
					this.nickName = ''
					this.phone = ''
					this.isLogin = false
					this.vipBtnStyle = 0
				} else {
					this.headImgUrl = user.headImgUrl
					this.nickName = user.nickName
					this.phone = user.phone
					this.isLogin = true //user.isTemp == 0
				}
				if (this.$util.isNullVal(value)) {
					this.refreshData()
				}
			},
			launchPage(title) {
				switch (title) {
					case "速记技巧":
						this.skillBtnAction();
						break;
					case "全部课程":
					case "3小时精华课":
						uni.switchTab({
							url: '/pages/course/course',
							success() {
								console.log('===')
							},
							fail(e) {
								console.log('===' + JSON.stringify(e))
							}
						})
						break;
					case "速成题库":
						this.speedAction();
						break;
					case "难题攻克":
						this.difficultyAction();
						break;
					case "科二视频教学":
						this.subjectAction(2)
						break;
					case "科三视频教学":
						this.subjectAction(3)
						break;
					case "速记卡片":
						this.smallCardAction();
						break;
				}
			},
			// 客服点击事件
			kfAction() {
				uni.navigateTo({
					url: '/pages/mine/kefu',
				})
			},
			// 获取当前定位城市
			getLocalCity() {
				var cityInfoObj = this.$store.state.vuex_user_cityinfo
				if (this.$util.isNullVal(cityInfoObj)) {
					var that = this
					uni.request({
						url: 'https://whois.pconline.com.cn/ipJson.jsp?json=true',
						success: (res) => {
							var cityCode = res.data.cityCode
							let params = {}
							that.$u.api.queryAllCity(params)
								.then(res1 => {
									if (res1.code == 200) {
										var list = res1.body
										for (var i = 0; i < list.length; i++) {
											var obj = list[i]
											if (obj.cityNo == cityCode) {
												that.currentCityObj = obj
												that.$u.vuex('vuex_user_cityinfo', obj)
											}
										}
									}
								})
						}
					})
				} else {
					this.currentCityObj = cityInfoObj
				}
			},
			initGravityEngine(openid) {
				const user = uni.getStorageSync('user');
				let mode = "debug"
				if (isProdEnv()) {
					mode = "none"
				}
				const config = {
					accessToken: "FtMUtpRZKI1O4zxfnVfjwA8DieokvlYB", // 项目通行证，在：网站后台-->设置-->应用列表中找到Access Token列 复制（首次使用可能需要先新增应用）
					clientId: user.id, // 用户唯一标识，如产品为小程序，则必须填用户openid（注意，不是小程序的APPID！！！）
					debugMode: mode, // 是否开启测试模式，开启测试模式后，可以在 网站后台--设置--元数据--事件流中查看实时数据上报结果。（测试时使用，上线之后一定要关掉，改成none或者删除）
				};
				const ge = new GravityEngine(config);
				ge.setupAndStart();
				let account = uni.getAccountInfoSync();
				let version = parseInt(uni.getAppBaseInfo().appVersionCode)
				ge.initialize({
						name: user.nickName,
						version: version,
						openid: openid,
						enable_sync_attribution: true,
					})
					.then((res) => {
						console.log("initialize success " + res);
					})
					.catch((err) => {
						console.log("initialize failed, error is " + err);
					});
			},
			// 第三方登录信息
			getThirdInfo() {
				var that = this
				const user = uni.getStorageSync('user');
				let params = {
					userId: user.id
				}
				that.$u.api.queryThirdInfo(params)
					.then(res => {
						if (res.code == 200) {
							that.$u.vuex('vuex_user_thirdinfo', res.body)
							// this.initGravityEngine(res.body.wxXcxOpenId);
						}
					})

			},
			// 获取直播列表
			getLiveList() {
				var that = this
				let params = {}
				that.$u.api.roomList(params)
					.then(res => {
						if (res.code == 200) {
							var list = res.body
							for (var i = 0; i < list.length; i++) {
								var obj = list[i]
								if (obj.id == 1) {
									that.liveListFirstObj = obj
								}
							}
						}
					})
			},
			// 获取ip地址
			getIpAddress() {
				const userIp = uni.getStorageSync('userIp');
				if (this.$util.isNullVal(userIp)) {
					uni.request({
						url: 'https://api.ipify.org?format=json',
						success(res) {
							var ip = res.data.ip;
							uni.setStorageSync('userIp', ip);
						}
					})
				}
			},
			// 查询Vip状态	
			async queryVips() {
				var isSuccess = await getVipsInfo(this)
				if (isSuccess) {
					if (isVip(this, 1)) {
						this.vipBtnStyle = 2
					} else if (isVip(this, 30) || isVip(this, 180)) {
						this.upgradeVipTip = vipName(this) + "会员·升级"
						this.vipBtnStyle = 1
					} else {
						this.vipBtnStyle = 0
					}
				} else {
					this.vipBtnStyle = 0
				}
			},

			// 初始化车型
			initCarTypeData() {
				const obj = uni.getStorageSync('carTypeObj');
				if (obj) {
					this.selectedCarType = obj.title;
				} else {
					this.selectedCarType = "小车";
					var item = {
						imgUrl: 'https://img.jx885.com/lrjk_uniapp/img/home/ic_cartype_car_sel.png',
						title: '小车',
						subTitle: 'C1/C2/C3',
						carType: 1,
					};
					uni.setStorageSync('carTypeObj', item);
				}
			},
			// 初始化科目
			initSubjectData() {
				const obj = uni.getStorageSync('subject');
				if (obj) {
					this.selectedSubjectIndex = obj;
				} else {
					this.selectedSubjectIndex = "1";
					uni.setStorageSync('subject', 1);
				}
			},

			// 登录
			loginAction() {
				this.isShowLoginPopup = true
			},
			// 开通vip
			openVipAction() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				toOpenVip()
			},
			// 科目
			subjectAction(value) {
				if (value == 2) {
					if (!this.isLogin) {
						this.isShowLoginPopup = true
						return
					}
					uni.navigateTo({
						url: '/pages/subject-video/subject-video?subject=' + value,
					});
				} else if (value == 3) {
					if (!this.isLogin) {
						this.isShowLoginPopup = true
						return
					}
					uni.navigateTo({
						url: '/pages/subject-video/subject-video?subject=' + value,
					});
				} else {
					this.selectedSubjectIndex = value
					uni.setStorageSync('subject', value);
					this.speedCount = this.getSpeedCount();
					this.getVideoList()
				}
			},
			// 城市
			cityAction() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				uni.navigateTo({
					url: '/pages/city/city'
				});
			},
			// 车型
			carTypeAction() {
				const obj = uni.getStorageSync('carTypeObj');
				this.speedCount = this.getSpeedCount()
				this.selectedCarType = obj.title;
				// this.getVideoList()
			},
			// 考试技巧讲解
			videoBtnAction() {
				var that = this;
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				uni.navigateTo({
					url: '/pages/live/live',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('liveListFirstObj', that.liveListFirstObj);
					}
				});
			},
			// 技巧练题
			async skillBtnAction() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				if (this.$util.isVip(this)) {
					uni.navigateTo({
						url: "/page_learn/pages/learn/skill-ready-page/skill-ready-page"
					})
				} else {
					let classIds = await getArrayClassId(this)
					if (classIds) {
						toSkillPage(classIds);
					}
				}
			},
			async onLaunchLearnPageByPageName(pageName) {
				try {
					let classifyObj = await getBigClassId(this, pageName);
					if (classifyObj) {
						toLearnPage([classifyObj.classifyId], false, pageName)
					} else {
						uni.showToast({
							title: "无数据，请联系客服"
						})
					}
				} catch (e) {
					console.error(e)
				}
			},
			getErrorOrCollectCount(type) {
				let params = {
					carType: carType(this),
					subject: subject(this),
					type: type
				}
				let that = this;
				this.$u.api.getErrorCollectCount(params)
					.then(res => {
						if (res.code == 200) {
							if (type == 0) {
								let errorCount = res.body;
								if (errorCount == 0) {
									uni.showToast({
										title: "还没错题哟"
									})
								} else {
									toMyWrongPage();
								}
							} else if (type == 1) {
								let collectCount = res.body;
								if (collectCount == 0) {
									uni.showToast({
										title: "还没收藏哟"
									})
								} else {
									toColloctPage()
								}
							}
						}
					})
			},
			// 速成600题
			speedAction() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				if (!isVip(this)) {
					toFastLarnTipPage()
					return
				}
				toClassifyListPage("精简600题", `速成` + this.speedCount + `题`)
				// this.payAction()
			},
			// 模拟考试
			examAction() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				uni.navigateTo({
					url: "/pages/exam/exam-ready"
				})
			},
			// 新规题目
			newRuleAction() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				uni.navigateTo({
					url: "/page_learn/pages/learn/new-rule-ready-page"
				})
			},
			// 错题收藏
			errorCollectionAction() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				uni.navigateTo({
					url: "/learn-learn/pages/learn/wrong-favorites-page/wrong-favorites-page"
				})
			},
			// 错题
			errorAction() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				this.getErrorOrCollectCount(0)
			},
			// 收藏
			collectionAction() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				this.getErrorOrCollectCount(1)
			},
			// 考前密卷
			secretAcyion() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				if (!isVip(this)) {
					toReadyBeforeExamPage()
					return
				}
				this.onLaunchLearnPageByPageName("考前密卷");
			},
			// 难题攻克
			difficultyAction() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				if (!isVip(this)) {
					toOpenVip()
					return
				}
				this.onLaunchLearnPageByPageName("难题攻克");
			},
			// 分类练习
			classifyAction() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				toClassifyListPage("分类练习", "分类练习")
			},
			// 图标速记
			iconAction() {
				var that = this;
				uni.navigateTo({
					url: '/page_short_icon/pages/icon-shorthand/icon-shorthand?isRoot=1',
				});
			},
			smallCardAction() {
				var that = this;
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				// if (!isVip(this)) {
				// 	toOpenVip()
				// 	return
				// }
				uni.navigateTo({
					url: '/page_smartcard/pages/smartcard/smart-card-page',
				});
			},
			// 科一科四技巧更多
			moreVideoAction() {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				var that = this
				uni.navigateTo({
					url: '/pages/skill-video/skill-video-list',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('videoData', that.allVideoList);
					}
				});
			},
			// 科一科四技巧视频单个技巧视频
			videoAction(index) {
				if (!this.isLogin) {
					this.isShowLoginPopup = true
					return
				}
				var that = this
				uni.navigateTo({
					url: '/pages/skill-video/skill-video',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('videoData', that.videoList, index);
					}
				});
			},
			// 车型弹窗组件状态变化
			carTypePopupChangeAction(value) {
				this.isShowPageMeta = value;
			},
		},

	}
</script>

<style lang="scss">
	.kf-view {
		display: flex;

		image {
			width: 36rpx;
			height: 36rpx;
			margin: auto 0;
		}

		text {
			font-size: 26rpx;
			margin: auto 0 auto 10rpx;
		}
	}

	.title-view {
		display: flex;
		margin: auto;

		.title {
			font-size: 36rpx;
			color: #2f86e8;
		}

		.city-view {
			margin-left: 10rpx;
			display: flex;

			text {
				margin: auto 0;
				font-size: 28rpx;
				color: #333333;
			}

			.down {
				margin: auto 0;
			}
		}
	}

	.user-info-view {
		padding-top: 0rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		padding-bottom: 40rpx;
		display: flex;

		.avatar-bg {
			display: flex;

			.img-avatar {
				width: 100rpx;
				height: 100rpx;
			}
		}

		.login {
			font-size: 40rpx;
			font-weight: bold;
			margin: auto 0 auto 32rpx;
		}

		.user-name-view {
			margin: auto 20rpx;

			.user-name {
				font-size: 32rpx;
				font-weight: bold;
			}

			.user-phone {
				font-size: 24rpx;
			}
		}

		.open-vip-view {
			background-color: red;
			display: flex;
			margin: auto 0 auto auto;
			padding: 16rpx 28rpx;
			border-radius: 36rpx;

			.open-vip {
				margin: auto;
				color: white;
				font-size: 28rpx;
			}
		}

		.upgrade-vip-view {
			position: relative;

			.upgrade {
				position: absolute;
				top: -24rpx;
				right: 24rpx;
				width: 35rpx;
				height: 40rpx;
			}
		}

		.forever-vip-view {
			background-color: black;
			display: flex;
			margin: auto 0 auto auto;
			padding: 16rpx 28rpx;
			border-top-left-radius: 36rpx;
			border-top-right-radius: 36rpx;
			border-bottom-right-radius: 36rpx;

			text {
				margin: auto;
				color: #FFDF9C;
				font-size: 28rpx;
			}
		}
	}

	.topic-info-view {
		display: flex;
		padding: 0 38rpx;

		text {
			color: #666666;
			font-size: 28rpx;
		}

		.city {
			text-decoration: underline;
			text-underline-offset: 10rpx;
			text-decoration-color: red;
			color: red;
		}
	}

	.subject-view {
		display: flex;
		margin-top: 30rpx;
		position: relative;

		.subject-btn {
			display: flex;
			padding: 10rpx 26rpx;
			border: 1rpx solid lightgray;
			border-radius: 34rpx;
			margin-left: 16rpx;

			text {
				margin: auto;
				font-size: 22rpx;
			}
		}

		.car-type-view {
			right: 16rpx;
			position: absolute;

			.car-view {
				display: flex;
				margin-left: 10rpx;

				text {
					font-size: 24rpx;
				}

				.arrow {
					margin-left: 10rpx;
				}
			}

			.change-topic {
				font-size: 22rpx;
				color: #666666;
			}
		}

		.selected-subject {
			background-color: #d1e4fc;

			text {
				color: #1561c1
			}
		}
	}

	.k5_tip {
		width: 100%;
		font-size: 25rpx;
		text-align: center;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		margin-top: 10rpx;
		background-color: #737373;

		text {
			width: 100%;
			color: #fff;
		}

	}

	.skill-video-view {
		display: flex;
		margin-top: 20rpx;

		.video-btn {
			width: 280rpx;
			height: 280rpx;
			background-color: #327ee6;
			border-radius: 152rpx;
			display: flex;
			border: 12rpx solid #D5E5FF;
			margin-left: auto;

			.video-btn-wrap {
				margin: auto;
				text-align: center;
				position: relative;

				.img-video_bg {
					// width: 78rpx;
					// height: 46rpx;
					width: 108rpx;
					height: 108rpx;
				}

				.img-video_live {
					width: 32rpx;
					height: 32rpx;
					position: absolute;
					left: 66rpx;
					top: 8rpx;
				}

				.video {
					color: white;
					font-size: 30rpx;
				}
			}
		}

		.skill-btn {
			width: 280rpx;
			height: 280rpx;
			background-color: #37c767;
			border-radius: 152rpx;
			display: flex;
			border: 12rpx solid #D3F7E6;
			margin: 0 auto;

			.skill-btn-wrap {
				margin: auto;
				text-align: center;

				.img-skill {
					width: 68rpx;
					height: 68rpx;
				}

				.skill {
					margin-top: 23rpx;
					color: white;
					font-size: 30rpx;
				}
			}
		}
	}

	.exam-view {
		margin-top: 20rpx;
		display: flex;
		padding-bottom: 50rpx;

		.exam-four-btn {
			background-color: #f2f8ff;
			margin-left: auto;
			width: 130rpx;
			height: 160rpx;
			text-align: center;
			padding-top: 20rpx;

			text {
				font-size: 22rpx;
			}

			image {
				width: 80rpx;
				height: 80rpx;
				margin-top: 10rpx;
			}
		}

		.exam-four-btn2 {
			background-color: #f2f8ff;
			margin-left: auto;
			width: 130rpx;
			height: 160rpx;
			text-align: center;
			padding-top: 20rpx;
			display: flex;
			flex-direction: column;
			justify-self: center;

			text {
				font-size: 24rpx;
				width: 100%;
				text-align: center;
			}

			image {
				width: 80rpx;
				height: 80rpx;
				margin-top: 10rpx;
				margin-left: auto;
				margin-right: auto;
			}
		}

		.exam-four-btn-last {
			margin-right: auto;

			image {
				width: 70rpx;
				height: 80rpx;
				margin-top: 10rpx;
				margin-left: auto;
				margin-right: auto;
			}

			text {
				font-size: 24rpx;
				width: 100%;
				text-align: center;
			}
		}

		.exam-four-btn-last2 {
			margin-right: auto;

			image {
				width: 60rpx;
				height: 60rpx;
				margin-top: 20rpx;
				margin-left: auto;
				margin-right: auto;
			}

			text {
				font-size: 24rpx;
				width: 100%;
				text-align: center;
			}
		}
	}

	.strengthen-view {
		border-top: #f3f7f9 solid 10rpx;
		padding-bottom: 50rpx;

		.strengthen {
			font-size: 35rpx;
			font-weight: bold;
			margin-top: 40rpx;
			margin-left: 30rpx;
		}

		.strengthen-wrap {
			display: flex;
			margin-top: 20rpx;
			justify-content: space-evenly;

			.strengthen-four-btn {

				width: 130rpx;
				height: 130rpx;
				text-align: center;

				image {
					width: 120rpx;
					height: 120rpx;
				}

				text {
					font-size: 28rpx;
					display: block;
				}
			}

			.strengthen-four-btn-last {
				// margin-left: auto;
			}

			.strengthen-four-btn-last2 {
				// margin-right: auto;

				background: linear-gradient(#E9EFFC, #FFFFFF);

				width: 115rpx;
				height: 105rpx;
				margin-top: 4rpx;
				border-radius: 20rpx;
				position: relative;

				.smallcard {
					width: 50rpx;
					height: 80rpx;
					margin-top: 20rpx;
					padding-bottom: 20rpx;

				}

				.red-pot {
					position: absolute;
					top: -10rpx;
					right: 0;
					width: 30rpx;
					height: 30rpx;
					z-index: 1;
				}
			}
		}

	}

	.subject-video-view {
		border-top: #f3f7f9 solid 10rpx;

		.subject-more-view {
			display: flex;
			margin: 30rpx 30rpx;

			.subject-skill {
				font-weight: bold;
				font-size: 35rpx;
			}

			.subject-more {
				font-size: 26rpx;
				color: #666666;
				margin: auto 0 auto auto;
			}
		}

		.subject-video-content {
			background-color: #f3f7f9;
			padding-bottom: 30rpx;
			display: flex;
			flex-wrap: wrap;

			.subject-video-wrap {
				position: relative;
				border-radius: 20rpx;
				width: 355rpx;
				height: 280rpx;
				text-align: center;
				background-color: white;
				margin: 10rpx;

				.explain {
					font-size: 30rpx;
					margin-top: 20rpx;
				}

				.free_tip {
					border-radius: 16rpx 16rpx 16rpx 0rpx;
					padding: 0 10rpx;
					color: #fff;
					position: absolute;
					left: 15rpx;
					z-index: 1;
					background-color: #327ee6;
				}

				.subject-video-img {
					position: relative;

					image {
						width: 325rpx;
						height: 160rpx;
					}

					.subject-video-time-view {
						background-color: black;
						position: absolute;
						right: 17rpx;
						bottom: 10rpx;
						border-radius: 16rpx;
						padding: 0 10rpx;

						.time {
							font-size: 22rpx;
							color: white;
						}
					}
				}

				.video-title {
					margin: 20rpx 10rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					text-align: start;
				}
			}
		}
	}
</style>