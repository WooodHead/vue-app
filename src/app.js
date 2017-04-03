// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import store from './store/index.js'

import FastClick from 'fastclick'
import router from './router'
import App from './App.vue'
import * as util from './util/util.js'
import * as filters from './filter/filter.js'
import * as config from './config/config.js'

import api from './api'

//引入资源文件
// import YingerVue from './js/yinger-vue.js'
import Style from './styles/style.css'
import Reset from './styles/reset.css'

//引入 nprogress
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

//引入 zepto 插件
import $ from 'n-zepto'

//调用模块
Vue.use(Plugin);
Vue.use(VueResource);


//引入 animate.css 动画库
// require('vue2-animate/dist/vue2-animate.min.css')
let ad = config.app_config.ad;
router.beforeEach((to, from, next) => {
  console.log("路由切换");
  //判断 token---登陆拦截

  // NProgress.start();
  if (!from.name && to.name == "home") {
    //init app
    console.log("首次进入");
    router.app.isIndex = true;
    if (ad.is_show) {
      util.init_ad.show(ad.url, ad.src, ad.show_time, ad.text);
    }
  } else {
    util.loading.show();
    router.app.isIndex = false;
  }
  next()
})
router.afterEach(transition => {
  // NProgress.done();
  util.loading.hide();
  if (ad.is_show) {
    setTimeout(function () {
      $(".init-ad").addClass("init-ad-leave");
      setTimeout(function () {
        util.init_ad.hide();
      }, 750);
    }, ad.show_time - 750);
  }
});

FastClick.attach(document.body)

//引入vue插件扩展
import Plugin from './plugin/plugin'


//引入组件
import {
  ToastPlugin,
} from 'vux'
Vue.use(ToastPlugin)
import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)


Vue.filter('date', filters.dateFilter)

// Vue.directive('infiniteScroll',infiniteScroll)

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//检查登陆拦截
if (config.app_config.intercept) {
   app.refresh_token();
}

// --- get_user_info
if (!!window.localStorage.access_token) {
  
} else {
  
}
