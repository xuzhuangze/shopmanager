import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
import manager from "../components/manager/manager";
import store from '../store/index';

const router = new Router({
  routes: [
    {
      path: '/',
      component: home,
      meta: {selected: '/'},
      children: [

        //menu页面下的路由规则
        {
          path: 'menu', component: () => import('../components/menu/menu'),
          meta: {selected: '/menu'}
        }, {
          path: 'menu/add', component: () => import('../components/menu/add'),
          meta: {selected: '/menu'}
        }, {
          path: 'menu/add/:id', component: () => import('../components/menu/add'),
          meta: {selected: '/menu'}
        },

        //角色管理
        {
          path: 'role', component: () => import('../components/role/role'),
          meta: {selected: 'role'}
        },
        {
          path: 'role/add', component: () => import('../components/role/add')
        },
        {
          path: 'role/add/:id', component: () => import('../components/role/add')
        },


        //管理员
        {path: 'manager', component: () => import('../components/manager/manager')},
        {
          path: 'manager/add', component: () => import('../components/manager/add')
        },
        {
          path: 'manager/add/:uid', component: () => import('../components/manager/add')
        },


        //商品
        {
          path: 'goodscate', component: () => import('../components/goodscate/goodscate')
        },
        {
          path: 'goodscate/add', component: () => import('../components/goodscate/add')
        },
        {
          path: 'goodscate/add/:id', component: () => import('../components/goodscate/add')
        },

        //规格
        //商品
        {
          path: 'specs', component: () => import('../components/specs/specs')
        },
        {
          path: 'specs/add', component: () => import('../components/specs/add')
        },
        {
          path: 'specs/add/:id', component: () => import('../components/specs/add')
        },

        //商品详情
        {
          path: 'goodsdetail', component: () => import('../components/goodsdetail/goodsdetail')
        },
        {
          path: 'goodsdetail/add', component: () => import('../components/goodsdetail/add')
        },
        {
          path: 'goodsdetail/add/:id', component: () => import('../components/goodsdetail/add')
        },


        //商品详情
        {
          path: 'banner', component: () => import('../components/banner/banner')
        },
        {
          path: 'banner/add', component: () => import('../components/banner/add')
        },
        {
          path: 'banner/add/:id', component: () => import('../components/banner/add')
        },

        //商品详情
        {
          path: 'seckill', component: () => import('../components/seckill/seckill')
        },
        {
          path: 'seckill/add', component: () => import('../components/seckill/add')
        },
        {
          path: 'seckill/add/:id', component: () => import('../components/seckill/add')
        },

      ]
    },
    //登录
    {path: '/login', component: () => import('../components/login/login')},

  ]
})

router.beforeEach((to, from, next) => {
  let token = store.state.userinfo.token ? store.state.userinfo.token : null;
  if (to.fullPath == '/login') {
    next();
  } else {
    if (store.state.userinfo.token) {
      let nowPath = '/' + to.fullPath.split('/')[1];
      let allowPath = store.state.userinfo.menus_url;
      allowPath.push('/login')
      allowPath.push('/')
      if (allowPath.indexOf(nowPath) == -1) {
        next('/');
      } else {
        next();
      }
    } else {
      next('/login')
    }
  }
})
export default router;
