import Vue from 'vue'
import Router from 'vue-router'
import {store} from '../store'
import {prefixPath} from '../config/PathConfig'
// import {checkAuth} from '../auth/auth'
Vue.use(Router)

const router = new Router({
  base: prefixPath,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/test1',
      name: 'test1',
      component: () => import('../views/Test/Test1')
    },
    {
      path: '/test2',
      name: 'test2',
      component: () => import('../views/Test/Test2')
    },
    {
      path: '/visual',
      name: 'visual',
      component: () => import('../views/Test/Visualization')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main')
    },
    {
      path: '/response',
      name: 'response',
      component: () => import('../views/response/response')
    }, {
      path: '/synergyScore',
      name: 'synergyScore',
      component: () => import('../views/synergyScore/synergyScore')
    },
    {
      path: '/*',
      redirect: {
        name: 'main'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requestList = store.state.status.request.queue
  requestList.forEach((cancel) => {
    // 当请求执行完以后队列里的对象是null 需要判断是不是函数 不然会报错卡住
    typeof cancel === 'function' && cancel(`取消数据加载请求`)
  })
  if (requestList.length) store.dispatch('status/clearRequestQueue')
  next()
  // 不做权限验证
  // if (checkAuth(to)) {
  //   next()
  // } else {
  //   // Todo: 权限不够跳转
  // }
})

export default router
