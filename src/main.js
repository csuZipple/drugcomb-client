// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import Message from './plugins/message/message'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
Vue.use(Message)
Vue.config.productionTip = false
Vue.filter('toFixed', (value, number) => {
  if (value || value === 0) return value.toFixed(number)
})
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre')
  blocks.forEach(block => {
    hljs.highlightBlock(block)
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
