// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'default-passive-events'

import store from './store/index';
// import axios from 'axios';
import axios from './assets/js/http.js'

Vue.prototype.axios = axios;

Vue.use(ElementUI);
Vue.config.productionTip = false;



//格式化时间的过滤器
Vue.filter('formattime', (t) => {
  let date = new Date(parseInt(t));
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  let h = date.getHours();
  h = h < 10 ? '0' + h : h;
  let min = date.getMinutes();
  min = min < 10 ? '0' + min : min;
  let s = date.getSeconds();
  s = s < 10 ? '0' + s : s;
  return y + '年' + m + '月' + d + '日 ' + h + ':' + min + ':' + s;
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  store,
})
