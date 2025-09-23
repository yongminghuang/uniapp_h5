//进入做题页。
var toLearnPage = function(classIds, isRedirectTo, pageName) {
	let title = '技巧练题'
	if (pageName) {
		title = pageName
	}
	let url = `/page_learn/pages/learn/learn-page?fromType=2&classify_ids=${classIds}&title=${title}`
	if (isRedirectTo == true) {
		uni.redirectTo({
			url: url
		});
	} else {
		uni.navigateTo({
			url: url
		});
	}
}
var toReviewMkExamPage = function(isRedirectTo) {
	let title = '回顾模拟考题'
	let url = `/page_learn/pages/learn/learn-page?fromType=4&title=${title}`
	if (isRedirectTo == true) {
		uni.redirectTo({
			url: url
		});
	} else {
		uni.navigateTo({
			url: url
		});
	}
}
var toErrorPageFromMKExam = function(isRedirectTo) {
	let title = '我的错题'
	let url = `/page_learn/pages/learn/learn-page?fromType=5&title=${title}`
	if (isRedirectTo == true) {
		uni.redirectTo({
			url: url
		});
	} else {
		uni.navigateTo({
			url: url
		});
	}
}
var toSkillPage = function(classIds, isRedirectTo, subject) {
	let title = '技巧练题'
	let url =
		`/page_learn/pages/learn/learn-page?fromType=3&classify_ids=${classIds}&subject=${subject}&title=${title}`
	if (isRedirectTo == true) {
		uni.redirectTo({
			url: url
		});
	} else {
		uni.navigateTo({
			url: url
		});
	}
}
//有列表的页面：速成600和分类联系
var toClassifyListPage = function(pageName, title) {
	uni.navigateTo({
		url: '/page_learn/pages/learn/learn-classify',
		success: function(res) {
			// 通过eventChannel向被打开页面传送数据
			res.eventChannel.emit('learnClassifyData', {
				pageName: pageName,
				title: title
			});
		}
	});
}
//跳转我的错题
var toMyWrongPage = function(isRedirectTo) {
	let title = '我的错题'
	let url = `/page_learn/pages/learn/learn-page?fromType=0&title=${title}`
	if (isRedirectTo == true) {
		uni.redirectTo({
			url: url,
		});
	} else {
		uni.navigateTo({
			url: url,
		});
	}
}
//跳转收藏页面
var toColloctPage = function(isRedirectTo) {
	let title = '我的收藏'
	let url = `/page_learn/pages/learn/learn-page?fromType=1&title=${title}`
	if (isRedirectTo == true) {
		uni.redirectTo({
			url: url
		});
	} else {
		uni.navigateTo({
			url: url
		});
	}
}

var toSkillReuslt = function(learnCount, wrongCount, isRedirectTo) {
	let url = `/page_learn/pages/learn/skill-result/skill-result?learnCount=${learnCount}&wrongCount=${wrongCount}`
	if (isRedirectTo == true) {
		uni.redirectTo({
			url: url
		});
	} else {
		uni.navigateTo({
			url: url
		});
	}
}

var toMkRecordPage = function() {
	uni.navigateTo({
		url: "/pages/exam/exam-record"
	})
}

var toExamPage = function(isRedirectTo) {
	if (isRedirectTo == true) {
		uni.redirectTo({
			url: "/pages/exam/exam-page"
		});
	} else {
		uni.navigateTo({
			url: "/pages/exam/exam-page"
		});
	}
}

var toVipInfo = function(isRedirectTo) {
	if (isRedirectTo == true) {
		uni.redirectTo({
			url: "/pages/mine/vip-info"
		});
	} else {
		uni.navigateTo({
			url: "/pages/mine/vip-info"
		});
	}
}

var toOpenVip = function() {
	uni.navigateTo({
		url: "/pages/mine/openVip"
	})
}

var toProblemPage = function() {
	uni.navigateTo({
		url: "/pages/mine/problem-page"
	})
}

var toReadyBeforeExamPage = function() {
	uni.navigateTo({
		url: "/pages/index/ready-before-exam-page"
	})
}

var toFastLarnTipPage = function() {
	uni.navigateTo({
		url: "/pages/index/learn_fast_tip_page"
	})
}

var toVIPUrl = function() {
	uni.navigateTo({
		url: '/pages/mine/web-page',
		success: function(res) {
			res.eventChannel.emit('web-page', {
				url: 'https://img.jx885.com/lrjk/html/protocol/member/index.html',
			})
		}
	});
}

module.exports = {
	toLearnPage,
	toClassifyListPage,
	toMyWrongPage,
	toColloctPage,
	toSkillPage,
	toSkillReuslt,
	toMkRecordPage,
	toExamPage,
	toReviewMkExamPage,
	toErrorPageFromMKExam,
	toVIPUrl,
	toVipInfo,
	toOpenVip,
	toProblemPage,
	toReadyBeforeExamPage,
	toFastLarnTipPage
}