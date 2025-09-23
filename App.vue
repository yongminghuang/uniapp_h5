<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	::v-deep .uni-nav-bar-text {
		font-size: 34rpx !important;
		// color: #09A6FE !important;
	}

	/* 微信小程序需要额外适配 */
	/deep/ .uni-nav-bar-text {
		font-size: 34rpx !important;
	}
</style>

<script>
	import {
		xcx_env
	} from './common/http.interceptor';
	import {
		appHttpAddress
	} from './common/util';
	import Vue from 'vue'

	export default {
		onLaunch: function() {
			Vue.prototype.$u.http.config.baseUrl = appHttpAddress();
			console.log('baseUrl:' + Vue.prototype.$u.http.config.baseUrl)
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		height: 100%;
	}
</style>