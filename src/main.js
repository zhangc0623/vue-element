import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 引入时间
import moment from 'moment';
// 引入封装axios的get和post方法
import { get, post } from "@/api/request";
// 引入bus
import VueBus from 'vue-bus';

// 注册滚动条加载触发事件v-loadmore绑定
import directives from '@/utils/directives'

// 引入icons文件夹下所有的svg图标
import '@/icons/index';

// 关闭生产模式下的提示
Vue.config.productionTip = false

Vue.use(Element);
moment().format();
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.use(VueBus);
Vue.use(directives)

/**
 * new Date()的format方法
 * 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param fmt
 * @returns {*}
 */
Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
