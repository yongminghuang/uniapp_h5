const {
	BUILD_ENV
} = require("./config");
const {
	xcx_env
} = require("./http.interceptor");

// 判断是否为空
var isNullVal = function(val) {
	var isnull = false;
	if (val == undefined || val == null) {
		isnull = true;
	} else {
		if (typeof(val) == 'string') { // 判断是否是字符串
			if (val === '' || val.replace(/\s/ig, '') === '') {
				isnull = true;
			}
		} else if (val instanceof Array) { // 判断是否是数组
			if (val.length == 0) {
				isnull = true;
			}
		} else if (val instanceof Object) { // 判断是否是字典
			if (JSON.stringify(val) == '{}') {
				isnull = true;
			}
		} else {} // 判断其它的 boolean number symbol date function 
	}
	return isnull;
}

// 判断字符串是否为空：为空且def为空返回''，def不为空，则返回def；否则返回自己
var nullStr = function(str, def) {
	if (isNullVal(str)) {
		if (isNullVal(def)) {
			return '';
		} else {
			return def;
		}
	} else {
		return str;
	}
}

// 秒数转分秒
var convertSecondsToTime = function(value) {
	const date = new Date(value * 1000);
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	if (minutes < 10) {
		minutes = "0" + minutes
	}
	if (seconds < 10) {
		seconds = "0" + seconds
	}
	return minutes + ':' + seconds
}

// 年月日时分秒转秒数
var dateToSeconds = function(value) {
	const seconds = new Date(value).getTime() / 1000;
	return seconds.toFixed(0);
}

var ossImagePath = function(picPath) {
	return imgDomainUrl() + "/lrjk_uniapp/img" + picPath
}

var ossDataPath = function(picPath) {
	return imgDomainUrl() + "/lrjk_uniapp/data" + picPath
}

var imgDomainUrl = function() {
	return "https://img.jx885.com"
}

var deepCopyObject = function(obj) {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	const copiedObj = Array.isArray(obj) ? [] : {};

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			copiedObj[key] = this.deepCopyObject(obj[key]);
		}
	}

	return copiedObj;
}

var getStorageSync = function(key, defaultValue) {
	const keyStorage = uni.getStorageSync(key);
	if (keyStorage == undefined) {
		return defaultValue
	}
	return keyStorage;
}

var carType = function(ctx) {
	return getStorageSync('carTypeObj', {
		imgUrl: 'https://img.jx885.com/lrjk_uniapp/img/home/ic_cartype_car_sel.png',
		title: '小车',
		subTitle: 'C1/C2/C3',
		carType: 1,
	}).carType;
}

var subject = function(ctx) {
	return getStorageSync('subject', 1);
}

var cityNo = function(ctx) {
	return ctx.$store.state.vuex_user_cityinfo.cityNo;
}

var isOriginPay = function(ctx) {
	return getStorageSync('originPay', 1) == 1 || getStorageSync('originPay', 1) == '';
}

var isProdEnv = function() {
	return xcx_env == "release"
}


//queryVip 30 为临时会员，1 为永久会员，3 为 180天会员， undefined 是否为会员
var isVip = function(ctx, queryVip) {
	if (queryVip == 1) {
		return ctx.$store.state.vuex_vip_forever
	} else if (queryVip == 30) {
		return ctx.$store.state.vuex_vip_30
	} else if (queryVip == 180) {
		return ctx.$store.state.vuex_vip_180
	} else if (queryVip == 2) {
		return ctx.$store.state.vuex_vip_k2
	} else if (queryVip == 3) {
		return ctx.$store.state.vuex_vip_k3
	}
	if (queryVip == undefined) {
		return ctx.$store.state.vuex_vip_forever ||
			ctx.$store.state.vuex_vip_30 ||
			ctx.$store.state.vuex_vip_180
	}
	return false
}

var vipName = function(ctx) {
	return ctx.$store.state.vuex_vip_name
}

var onVipDate = function(ctx) {
	return ctx.$store.state.vuex_vip_outdata
}

var skillFreeTime = function() {
	let freeTime = uni.getStorageSync('freeTime');
	if (freeTime === '') {
		return 10
	}
	if (freeTime != undefined) {
		return freeTime
	}
	return 10
}

var skillFreeQuestionIds = function() {
	let freeQuestionIds = uni.getStorageSync("freeQuestionIds");
	if (freeQuestionIds) {
		return freeQuestionIds
	}
	return freeQuestionIds || []
}
const WX_ENV = BUILD_ENV
var appHttpAddress = function() {
	let http_app = ''

	var env = WX_ENV
	if (env == 'trial') {
		if (uni.getSystemInfoSync().platform == 'devtools') {
			env = 'develop2'
		}
	}
	if (env == "develop") {
		http_app = 'http://192.168.2.204:10001'
	} else if (env == "develop2") {
		http_app = 'http://lrjk-test.jx885.com'
	} else if (env == "trial") {
		http_app = 'https://lrjk-test.jx885.com'
	} else if (env == "trial2") {
		http_app = 'https://lrjk-sim.jx885.com'
	} else if (env == "release") {
		http_app = 'https://lrjk.jx885.com'
	} else if (env == "zicai") {
		http_app = 'http://192.168.3.145:8080'
	}
	return http_app;
}

var appGetHttpAddress = function() {
	let http_app = ''

	var env = WX_ENV
	if (env == 'trial') {
		if (uni.getSystemInfoSync().platform == 'devtools') {
			env = 'develop'
		}
	}
	if (env == "develop") {
		http_app = 'http://192.168.2.204:10001'
	} else if (env == "develop2") {
		http_app = 'http://lrjk-test.jx885.com'
	} else if (env == "trial") {
		http_app = 'https://lrjk-test.jx885.com'
	} else if (env == "trial2") {
		http_app = 'https://lrjk-sim.jx885.com'
	} else if (env == "release") {
		http_app = 'https://lrjk.jx885.com'
	} else if (env == "zicai") {
		http_app = 'http://192.168.2.204:10001'
	}
	return http_app;
}

var wxHttpAddress = function() {
	let http_wx = ''
	var env = WX_ENV
	if (env == 'trial') {
		if (uni.getSystemInfoSync().platform == 'devtools') {
			env = 'develop2'
		}
	}

	if (env == "develop") {
		http_wx = 'http://192.168.2.205:8570'
	} else if (env == "develop2") {
		http_wx = 'http://wechat-lrjk-test.jx885.com'
	} else if (env == "trial") {
		http_wx = 'https://wechat-lrjk-test.jx885.com'
	} else if (env == "trial2") {
		http_wx = 'https://lrjk-wechat-sim.jx885.com'
	} else if (env == "release") {
		http_wx = 'https://lrjk-wechat.jx885.com'
	} else if (env == "zicai") {
		http_wx = 'http://192.168.3.60:8080'
	}
	return http_wx;
}

module.exports = {
	isNullVal,
	nullStr,
	convertSecondsToTime,
	dateToSeconds,
	ossImagePath,
	ossDataPath,
	imgDomainUrl,
	deepCopyObject,
	getStorageSync,
	carType,
	subject,
	cityNo,
	isVip,
	vipName,
	onVipDate,
	skillFreeTime,
	skillFreeQuestionIds,
	isOriginPay,
	isProdEnv,
	wxHttpAddress,
	appHttpAddress,
	appGetHttpAddress
}