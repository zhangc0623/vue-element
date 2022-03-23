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

// 关闭生产模式下的提示
Vue.config.productionTip = false

Vue.use(Element);
moment().format();

Vue.prototype.$get = get;
Vue.prototype.$post = post;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
