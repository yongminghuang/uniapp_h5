import {
	fail
} from "assert";
import {
	isOriginPay,
	isVip,
} from "./util";


export const callNative = (method, data) => {
	// alert(navigator.userAgent)
	if (isAndroid()) {
		// 调用 Android 方法（与之前的 Android 方案兼容）
		if (window.Jx885WebApi) {

			switch (method) {
				case 'toOpenVipPage':

					window.Jx885WebApi.toOpenVipPage();

					break;
				case 'toLivePage':
					window.Jx885WebApi.toLivePage();
					break;
				case 'toSkillPage':

					window.Jx885WebApi.toSkillPage();
					break;
				case 'toTrueMockExamPage':
					window.Jx885WebApi.toTrueMockExamPage();
					break;
				case 'WebViewFinish':
					return window.Jx885WebApi.WebViewFinish();
			}
		}
	} else if (isIOS()) {
		// 调用 iOS 方法（通过 postMessage 传递参数）
		if (window.webkit && window.webkit.messageHandlers.Jx885WebApi) {
			// 用字典格式传递 action 和 data，便于 iOS 解析
			window.webkit.messageHandlers.Jx885WebApi.postMessage({
				action: method,
				data: data
			});
		}
	}
}

// 环境判断工具方法
function isAndroid() {
	return navigator.userAgent.toLowerCase().indexOf('android') > -1;
}

function isIOS() {
	const ua = navigator.userAgent.toLowerCase();
	return ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1;
}