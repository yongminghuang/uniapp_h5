// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let hotSearchUrl = '/ebapi/store_api/hot_search';
// let indexUrl = '/ebapi/public_api/index';

import {
	appGetHttpAddress,
	wxHttpAddress
} from "./util";

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	let getBullect = params => vm.$u.get(appGetHttpAddress() + '/lrjkapp/handBook/queryBulletChat', params);
	let getStaticInfo = params => vm.$u.post('/lrjkapp/dataDict/list', params);
	let getVideoList = params => vm.$u.get(appGetHttpAddress() + '/lrjkapp/vipCourseVideo/getVideoList', params);
	let queryVips = params => vm.$u.post('/lrjkapp/userVip/queryVips', params);
	let roomList = params => vm.$u.post('/lrjkapp/room/roomList', params);
	let queryVipList = params => vm.$u.post('/lrjkapp/commodity/queryVipList', params);
	let wxLogin = params => vm.$u.post(wxHttpAddress() + '/lrjkxcx/user/login', params);
	let lrXcxWxPay = params => vm.$u.post(wxHttpAddress() + '/lrjkxcx/order/lrXcxWxPay', params);
	let tlXcxWxPay = params => vm.$u.post(wxHttpAddress() + '/lrjkxcx/order/tlXcxWxPay', params);
	let queryThirdInfo = params => vm.$u.post('/lrjkapp/thirdInfo/queryThirdInfo', params);
	let queryAllCity = params => vm.$u.get(appGetHttpAddress() + '/lrjkapp/area/queryAllCity', params);
	let queryTypeCount = params => vm.$u.post('/lrjkapp/classify/queryTypeCount', params);
	let queryVideoListBySubject = params => vm.$u.post('/lrjkapp/video/queryVideoListBySubject', params);
	let queryQuestion = params => vm.$u.post('/lrjkapp/classifyQuestion/queryQuestion', params);
	let queryShortVideoList = params => vm.$u.post('/lrjkapp/videoShort/queryShortVideoList', params);
	let changeDzCount = params => vm.$u.post('/lrjkapp/videoShort/changeDzCount', params);
	let createCorrectItem = params => vm.$u.post('/lrjkapp/questionCorrect/createCorrectItem', params);
	let queryUserCorrectList = params => vm.$u.get(appGetHttpAddress() +
		'/qnmApp/app/questionCorrect/queryUserCorrectList', params);
	let queryQuestionIdsWithNewRuleFlag = params => vm.$u.post(
		"/lrjkapp/classifyQuestion/queryQuestionIdsWithNewRuleFlag", params);
	let queryRefundList = params => vm.$u.post('/qnmApp/app/view/refund/queryRefundList', params);
	let queryList = params => vm.$u.post('/lrjkapp/errorCollect/queryList', params);
	let saveQuestion = params => vm.$u.post('/lrjkapp/errorCollect/saveQuestion', params); //收藏题
	let removeQuestion = params => vm.$u.post('/lrjkapp/errorCollect/removeQuestion', params); //移除收藏题
	let logoutAccount = params => vm.$u.post('/lrjkapp/user/logoutAccount', params);
	let sendVerifyCode = params => vm.$u.post('/lrjkapp/base/sendVerifyCode', params);
	let unBindPhone = params => vm.$u.post('/lrjkapp/user/unBindPhone', params);
	let bindPhone = params => vm.$u.post('/lrjkapp/user/bindPhone', params);
	let queryClassifyInfoList = params => vm.$u.post('/qnmApp/app/questionClassify/queryClassifyInfoList', params);
	let queryClassify = params => vm.$u.get(appGetHttpAddress() + '/qnmApp/app/questionClassify/queryClassify',
		params);
	let lrjkQueryClassify = params => vm.$u.post('/lrjkapp/classify/queryClassify', params);
	let updateUser = params => vm.$u.post('/lrjkapp/user/updateUser', params);
	let errorCollectQueryQuestion = params => vm.$u.post('/lrjkapp/errorCollect/queryQuestion', params);
	let getErrorCollectCount = params => vm.$u.post('/lrjkapp/errorCollect/queryCount', params);
	let removeErrorOrCollectRecord = params => vm.$u.post('/lrjkapp/errorCollect/removeQuestion', params);
	let passRatePrediction = params => vm.$u.get(appGetHttpAddress() +
		'/lrjkapp/modelTestRecord/passRatePrediction', params);
	let wxGetPhoneNumber = params => vm.$u.post('/lrjkapp/user/wxGetPhoneNumber', params);
	let renewMoney = params => vm.$u.get(appGetHttpAddress() + '/lrjkapp/userVip/renewMoney', params);
	let queryMkRecord = params => vm.$u.post('/lrjkapp/modelTestRecord/queryRecord', params);
	let cityMock = params => vm.$u.post('/lrjkapp/mock/cityMock', params);
	let saveRefundApply = params => vm.$u.post('/lrjkapp/refundApply/saveRefundApply', params);
	let uploadRecord = params => vm.$u.post('/lrjkapp/modelTestRecord/uploadRecord', params);
	let getWxInfo = params => vm.$u.post('/lrjkapp/thirdInfo/queryThirdInfo', params);
	let getSmartCard = params => vm.$u.get(appGetHttpAddress() + '/lrjkapp/smartCard/queryList', params);
	let getFineCourse = params => vm.$u.get(appGetHttpAddress() + '/lrjkapp/proCourse/queryPage', params);
	let getBuyGood = params => vm.$u.get(appGetHttpAddress() + '/lrjkapp/proCourse/queryUserCommodity', params);
	let getBannerList = params => vm.$u.get(appGetHttpAddress() + '/lrjkapp/proCourse/banners', params);
	let getSubFineList = params => vm.$u.get(appGetHttpAddress() + '/lrjkapp/proCourse/querySubList', params);
	let queryUserCommodity = params => vm.$u.get(appGetHttpAddress() + '/lrjkapp/proCourse/queryUserCommodity',
		params);
	let queryUserCourse = params => vm.$u.get(appGetHttpAddress() + '/lrjkapp/proCourse/queryUserCourse', params);
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		getBullect,
		getStaticInfo,
		getVideoList,
		queryVips,
		roomList,
		queryVipList,
		wxLogin,
		lrXcxWxPay,
		tlXcxWxPay,
		queryThirdInfo,
		queryAllCity,
		queryTypeCount,
		queryQuestion,
		queryVideoListBySubject,
		queryShortVideoList,
		changeDzCount,
		createCorrectItem,
		queryUserCorrectList,
		queryQuestionIdsWithNewRuleFlag,
		queryRefundList,
		queryList,
		saveQuestion,
		removeQuestion,
		queryClassifyInfoList,
		queryClassify,
		lrjkQueryClassify,
		logoutAccount,
		sendVerifyCode,
		unBindPhone,
		bindPhone,
		updateUser,
		errorCollectQueryQuestion,
		getErrorCollectCount,
		removeErrorOrCollectRecord,
		passRatePrediction,
		queryMkRecord,
		cityMock,
		wxGetPhoneNumber,
		renewMoney,
		saveRefundApply,
		uploadRecord,
		getSmartCard,
		getFineCourse,
		getBuyGood,
		getBannerList,
		getSubFineList,
		queryUserCommodity,
		queryUserCourse,
	};
}

export default {
	install
}