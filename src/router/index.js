import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入组件
import login from '@/views/login/index.vue'

const routes = [
  {
    path:'/',
    component:login
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
