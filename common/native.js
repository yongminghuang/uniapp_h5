import {
	fail
} from "assert";
import {
	isOriginPay,
	isVip,
} from "./util";


export const callNative = (method, data) => {
	if (this.isAndroid()) {
		// 调用 Android 方法（与之前的 Android 方案兼容）
		if (window.Jx885WebApi) {
			switch (method) {
				case 'showToast':
					window.AndroidInterface.showToast(data);
					break;
				case 'getData':
					return window.AndroidInterface.getAndroidData();
			}
		}
	} else if (this.isIOS()) {
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
isAndroid = () {
	return navigator.userAgent.toLowerCase().indexOf('android') > -1;
}
isIOS = () {
	const ua = navigator.userAgent.toLowerCase();
	return ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1;
}