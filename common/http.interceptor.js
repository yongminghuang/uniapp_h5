// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量

import {
	KJUR,
	hextob64
} from "jsrsasign";
import {
	appHttpAddress
} from "./util"

// function rsaSign(content, privateKey) => {
// 	// 创建 Signature 对象
// 	const signature = new KJUR.crypto.Signature({
// 		alg: "SHA256withRSA",
// 		//私钥pem! 
// 		prvkeypem: privateKey
// 	});
// 	signature.updateString(content);
// 	const signData = signature.sign();
// 	// 将内容转成base64 
// 	return hextob64(signData)
// 	// return signData; 
// }


const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		// baseUrl: 'https://lrjk.jx885.com',
		baseUrl: appHttpAddress(),
		// baseUrl: 'http://192.168.3.51:8080',
		// baseUrl: 'http://192.168.2.204:10001',
		// baseUrl: 'http://192.168.3.51:8080',
		// baseUrl: 'http://192.168.2.204:8080',
		loadingText: '加载中~~~',
		// dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true,
		originalData: true,
	});

	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
		// 见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;
		if (config.url.indexOf('lrjkapp') > -1) {
			var timezone = 8; //目标时区时间，东八区   东时区正数 西市区负数
			var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
			var nowDate = new Date().getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
			var time = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000).getTime();
			// console.log("东8区现在是：" + time);

			// var time = new Date().getTime();
			var version = uni.getAppBaseInfo().appVersion //`2.0.5`
			var commonData =
				`brand=null&device-code=null&flavor=null&os=wxMiniProgram&timestamp=${time}&version=${version}`
			// var commonData = `123`
			// var commonData =
			// 	`brand=null&device-code=null&flavor=null&os=wxMiniProgram&timestamp=1756706138199&version=3.0.5`
			// var privacyKey =
			// 	'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'
			var privacyKey =
				"MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEAgzbixJfdG97o2o7HuynK6MW1fGf7ZiBqUHyA59hjna42VPMo0DomsS1WJNBBfghW3IhwA8sl9YMu8xxsn3ye4wIDAQABAkADG/zZrcOWknywGSwQelgNlgnL7ebeL6x1Rc4EMHOD3AFKKbsLTsGzDkBjqlcRYKMSFJ9rSSZkOM5WpAOaaRBJAiEAsCWnaEfRfIsnf4CARJl/uHmDQictOlFZDqu+96GlWB0CIQC+sqv8XUDFixRFbfWIj4YSe3epgjCEt+m+yIsT/o4i/wIgIoV+paVNnQb4mrhoawlaSqEl5FUhPAitV365UnbPnNECIBLXPkzJvduGmTMe4RJj88AhuLnjpf2G2i5CTBNmpA5rAiANUbD/1RqhDg5cs+GIcfQtvK/OobZIdRYRaly0mN3y7w==";
			const privateKey = `-----BEGIN PRIVATE KEY-----\n${privacyKey}\n-----END PRIVATE KEY-----`;
			const signature = new KJUR.crypto.Signature({
				alg: "SHA256withRSA",
				//私钥pem! 
				prvkeypem: privateKey
			});
			signature.updateString(commonData);
			const signData = signature.sign();
			// 将内容转成base64 
			var singedData = hextob64(signData)
			// console.log("====singedData:" + singedData)
			// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
			// console.log('不是请求刷新token')
			// config.header['brand'] = ''; // vm.$store.state.vuex_token;
			// config.header['deviceCode'] = '';
			// config.header['flavor'] = '';
			config.header['version'] = version;
			config.header['os'] = "wxMiniProgram";
			config.header['X-sign'] = singedData;
			config.header['X-timestamp'] = time;
			config.header['Authorization'] = uni.getStorageSync('accessToken');
		} else if (config.url.indexOf('qnmApp') > -1) {
			config.header['X-Access-Token'] = uni.getStorageSync('accessToken'); // vm.$store.state.vuex_token;
		} else {
			config.header['Authorization'] = uni.getStorageSync('accessToken');
			config.header['X-Access-Token'] = uni.getStorageSync('accessToken'); // vm.$store.state.vuex_token;
		}

		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;

		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		// const token = uni.getStorageSync('token');
		// config.header.token = token;
		// config.header.Token = 'xxxxxx';

		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		// if(config.url == '/user/login') config.header.noToken = true;
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}

	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (result) => {
		let res = result.data
		if (res.code != 200) {
			console.log("error" + JSON.stringify(res));
		}
		if (res.code == 200) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			return res;
		} else if (res.code == 500 || res.code == 502 || result.statusCode == 404) {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			uni.showToast({
				icon: "none",
				title: res.msg,
			});
			return false;
		} else if (res.code == 401) {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			uni.setStorageSync('accessToken', '')
			uni.setStorageSync('user', '')
			uni.$emit('user')
			// let url = `/pages/index/index`
			// uni.navigateTo({
			// 	url: url
			// });
			//返回首页
			uni.navigateBack({
				delta: 100
			})
			uni.showToast({
				icon: "none",
				title: "请重新登录",
			});
			return true;
		} else {
			return res;
		}
	}

}

export default {
	install
}