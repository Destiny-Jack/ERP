import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入组件
import login from '@/views/login/index.vue'
import invite from '@/views/index/invite/invite.vue'
import opening from '@/views/index/invite/components/opening.vue'

const routes = [
  {
    path:'/',
    component:login,
  },
  {
    path:'/invite',
    component:invite,
  },
  {
    path: "/opening",
    component: opening,
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
