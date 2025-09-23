import {
	fail
} from "assert";
import {
	isOriginPay,
	isVip,
} from "./util";

// 查询Vip状态 value 传this对象进来  
export const getVipsInfo = (value, callback) => {
	var that = value
	const user = uni.getStorageSync('user');
	var userId = user.id;
	let params = {
		userId: userId,
	}
	var isSuccess = that.$u.api.queryVips(params).then(res => {

		that.$u.vuex('vuex_vip_30', false)
		that.$u.vuex('vuex_vip_180', false)
		that.$u.vuex('vuex_vip_forever', false)
		that.$u.vuex('vuex_vip_name', null)
		that.$u.vuex('vuex_vip_k2', false)
		that.$u.vuex('vuex_vip_k3', false)
		that.$u.vuex('vuex_vip_outdata', '')
		if (res.code == 200) {
			var list = res.body
			if (list.length > 0) {
				for (var i = 0; i < list.length; i++) {
					var obj = list[i]
					var isEnable = obj.enable == 1;
					obj.isEnable = isEnable // 是否激活会员
					if (obj.vipType == 1) { // 科一科四会员
						var isForever = obj.isPermanent == 1;
						if (isForever) {
							that.$u.vuex('vuex_vip_forever', isEnable)
						} else if ("29" == obj.vipId) {
							that.$u.vuex('vuex_vip_180', isEnable)
						} else {
							that.$u.vuex('vuex_vip_30', isEnable)
						}
						var onDate = obj.onDate;
						var isNeedRenew = false
						var isLastDate = false
						if (isEnable) {
							var onDateSeconds = that.$util.dateToSeconds(onDate)
							var currentSeconds = new Date().getTime() / 1000;
							currentSeconds = currentSeconds.toFixed(0);
							var diffSeconds = onDateSeconds - currentSeconds
							if (diffSeconds < 20 * 24 * 3600) {
								isNeedRenew = true
							}
							if (diffSeconds < 1 * 24 * 3600) {
								isLastDate = true
							}
						}

						obj.isForever = isForever // 是否永久会员
						obj.isNeedRenew = isNeedRenew // 是否需要续费
						obj.isLastDate = isLastDate // 是否会员最后一天

						that.$u.vuex('vuex_vip_name', obj.vipName)
						that.$u.vuex('vuex_vip_outdata', obj.onDate)

					} else if (obj.vipType == 2) {
						that.$u.vuex('vuex_vip_k2', obj)
					} else if (obj.vipType == 3) {
						that.$u.vuex('vuex_vip_k3', obj)
					}
					if (i == list.length - 1) {
						callback && callback()
						return true
					}
				}
			} else {
				return true
			}
		} else {
			return false
		}
	})
	// 接口请求成功
	return isSuccess
}

export const getArrayClassId = (ctx) => {
	var carType = ctx.$util.carType();
	const subject = ctx.$util.subject();
	const cityNo = ctx.$util.cityNo(ctx);
	if (subject == 5) {
		carType = 1
	}
	let params = {
		carType: carType,
		subject: subject,
		cityNo: cityNo,
	}
	return ctx.$u.api.lrjkQueryClassify(params).then(res => {
		if (res.code == 200) {
			return res.body.classifyIds
		}
		return undefined
	})
}

//{"classifyId":"1415565933356777740","classifyType":"preExam","classifyName":"考前密卷"}
export const getBigClassId = (ctx, bigClassName) => {
	var carType = ctx.$util.carType();
	const subject = ctx.$util.subject();
	if (subject == 5) {
		carType = 1;
	}
	let params = {
		carType: carType,
		course: subject
	}
	return ctx.$u.api.queryClassify(params).then(res => {
		if (res.code == 200) {
			let classifyObj = res.result.find(item =>
				item.classifyName == bigClassName);
			return classifyObj;
		}
		return undefined
	})
}

export const getBigClassIdBySubject = (ctx, bigClassName, subject) => {
	var carType = ctx.$util.carType();
	if (subject == 5) {
		carType = 1;
	}
	let params = {
		carType: carType,
		course: subject
	}
	return ctx.$u.api.queryClassify(params).then(res => {
		if (res.code == 200) {
			let classifyObj = res.result.find(item =>
				item.classifyName == bigClassName);
			return classifyObj;
		}
		return undefined
	})
}

export const requestPayment = (ctx, body, pack, successCallBack) => {
	uni.requestPayment({
		provider: 'wxpay',
		timeStamp: body.timeStamp,
		nonceStr: body.nonceStr,
		package: pack,
		signType: body.signType,
		paySign: body.paySign,
		success: function(res) {
			uni.showToast({
				title: '支付成功',
				icon: 'success'
			});
			// that.queryVips();
			isPay = false;
			getVipsInfo(ctx, function() {
				successCallBack && successCallBack();
			})

		},
		fail: function(err) {
			isPay = false;
			uni.showToast({
				title: '支付失败',
				icon: 'error'
			});
		},
	});
}
var isPay = false;
export const requestPay = (ctx, commodityId, successCallBack) => {
	if (isPay) {
		return
	}
	isPay = true;
	var that = ctx
	const user = uni.getStorageSync('user');
	var thirdInfoObj = ctx.$store.state.vuex_user_thirdinfo
	let params = {
		toUser: user.id,
		commodityId: commodityId, //that.isSelectedLeftPrice ? that.leftId : that.rightId,
		wxUnionId: thirdInfoObj.wxUnionId,
		xcxOpenId: thirdInfoObj.wxXcxOpenId
	}
	let isOrigin = isOriginPay(ctx)
	let payApi = isOrigin ? that.$u.api.lrXcxWxPay : that.$u.api.tlXcxWxPay
	payApi(params).then(res => {

		if (res.code == 200) {
			if (isOrigin) {
				var body = res.body;
				requestPayment(ctx, body, body.packageValue, successCallBack);
			} else {
				var param = res.body;;
				var body = JSON.parse(param.payinfo);
				requestPayment(ctx, body, body.package, successCallBack)
			}


		} else {
			isPay = false;
			uni.showToast({
				title: res.msg,
				icon: 'error'
			});
		}
	}).catch(err => {
		// 请求失败处理
		isPay = false;
		uni.showToast({
			title: err.data.status
		})
		console.error(JSON.stringify(err));
	});;
}

export const getForeverPrice = (ctx, successCallBack) => {
	var that = ctx
	let is30or180Vip = isVip(ctx, 30) || isVip(ctx, 180)
	if (is30or180Vip) {
		var userinfo = uni.getStorageSync('user')
		let params = {
			userId: userinfo.id
		}
		that.$u.api.renewMoney(params)
			.then(res => {
				if (res.code == 200) {
					var obj = res.body
					successCallBack && successCallBack({
						money: obj.money,
						id: obj.id,
						originalMoney: obj.originalMoney
					})
				}
			})
	} else {
		let params = {}
		that.$u.api.queryVipList(params)
			.then(res => {
				if (res.code == 200) {
					var list = res.body
					for (var i = 0; i < list.length; i++) {
						var obj = list[i]
						if (obj.id == 2) {
							successCallBack && successCallBack({
								money: obj.money,
								id: obj.id,
								originalMoney: obj.originalMoney
							})
							break;
						}
					}
				}
			})
	}

}