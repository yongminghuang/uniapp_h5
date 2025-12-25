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
					window.Jx885WebApi.WebViewFinish();
					break;
				case 'onGuideVideoPlay':
					window.Jx885WebApi.onGuideVideoPlay();
					break;
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

// 与原生通信的封装类
export class NativeBridge {
	constructor() {
		this.channel = window.Jx885WebApi || (window.webkit && window.webkit.messageHandlers.Jx885WebApi);
	}

	// 通用调用封装
	invoke(method, data) {
		// alert('11：' + typeof window.Jx885WebApi['openBottomSecretPaper'])
		if (isAndroid() && window.Jx885WebApi && typeof window.Jx885WebApi[method] === 'function') {
			// alert('handleUnsealScroll21')
			if (data == undefined) {
				window.Jx885WebApi[method]();
			} else {
				window.Jx885WebApi[method](data);
			}
		} else if (isIOS() && window.webkit && window.webkit.messageHandlers.Jx885WebApi) {
			window.webkit.messageHandlers.Jx885WebApi.postMessage({
				action: method,
				data
			});
		}
	}

	// 拆密卷，需传入试卷 ID（数字）
	openSecretPaper(paperId) {

		if (typeof paperId !== 'number') {
			console.warn('openSecretPaper 需要数字类型的 paperId');
			return;
		}
		this.invoke('openSecretPaper', paperId);
	}

	// 拆开底部密卷，无需入参
	openBottomSecretPaper() {
		this.invoke('openBottomSecretPaper');
	}

	// 打开克服页面，无需入参
	openComeover() {
		this.invoke('openComeover');
	}
}