import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      children: [{
        path: 'student', component: () => import('../components/student')
      }, {
        path: 'student/add', component: () => import('../components/add')
      }, {
        path: 'student/add/:id', component: () => import('../components/add')
      }
      ]
    }
  ]
})
