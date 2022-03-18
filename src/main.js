import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment';

Vue.config.productionTip = false
moment().format();

Vue.use(Element);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
