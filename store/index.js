import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {};

try {
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
} catch (e) {

}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = [
	'vuex_course_lastplay',
	'vuex_user_thirdinfo',
	'vuex_token',
	'vuex_vip_30',
	'vuex_vip_180',
	'vuex_vip_forever',
	'vuex_vip_name',
	'vuex_vip_outdata',
	'vuex_vip_k2',
	'vuex_vip_k3',
	'vuex_user_cityinfo',
	'vuex_is_ios_platform',
];

// 保存变量到本地存储中
const saveLifeData = function(key, value) {
	// 判断变量名是否在需要存储的数组中
	if (saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	// 下面这些值仅为示例，使用过程中请删除
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		vuex_course_lastplay: lifeData.vuex_course_lastplay ? lifeData.vuex_course_lastplay : null,
		vuex_user_thirdinfo: lifeData.vuex_user_thirdinfo ? lifeData.vuex_user_thirdinfo : null,
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		vuex_vip_30: lifeData.vuex_vip_30 ? lifeData.vuex_vip_30 : false,
		vuex_vip_180: lifeData.vuex_vip_180 ? lifeData.vuex_vip_180 : false,
		vuex_vip_forever: lifeData.vuex_vip_forever ? lifeData.vuex_vip_forever : false,
		vuex_vip_name: lifeData.vuex_vip_name ? lifeData.vuex_vip_name : null,
		vuex_vip_outdata: lifeData.vuex_vip_outdata ? lifeData.vuex_vip_outdata : null,
		vuex_vip_k2: lifeData.vuex_vip_k2 ? lifeData.vuex_vip_k2 : null,
		vuex_vip_k3: lifeData.vuex_vip_k3 ? lifeData.vuex_vip_k3 : null,
		vuex_user_cityinfo: lifeData.vuex_user_cityinfo ? lifeData.vuex_user_cityinfo : null,
		vuex_is_ios_platform: lifeData.vuex_is_ios_platform ? lifeData.vuex_is_ios_platform : null,
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if (nameArr.length >= 2) {
				let obj = state[nameArr[0]];
				for (let i = 1; i < len - 1; i++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store