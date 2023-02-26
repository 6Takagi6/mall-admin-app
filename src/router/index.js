import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import store from '../store/index';
import getMenuRoute from "../utils/permission"
Vue.use(VueRouter);

const ayncRouterMap = //菜单路由
  [{
    path: "/product",
    name: 'Product',
    component: Home,
    meta:
    {
      title: '商品',
      hidden:false,
      icon:"shop",
    },
    children: [{
      path: 'list',
      name: 'ProductList',
      meta: {
        title: '商品列表',
        hidden:false,
        icon: 'unordered-list',
      },
      component: () => import('@/views/page/productList.vue'),
    }, {
      path: 'add',
      name: 'ProductAdd',
      meta: {
        title: '添加商品',
        hidden:false,
        icon: 'file-add',
      },
      component: () => import('@/views/page/productAdd.vue'),
    }, {
      path: 'edit/:id',
      name: 'ProductEdit',
      meta: {
        title: '编辑商品',
        hidden:true,
        icon: 'scissor',
      },
      component: () => import('@/views/page/productAdd.vue'),
    },{
      path: 'category',
      name: 'Category',
      meta: {
        title: '类目管理',
        hidden:false,
        icon: 'project',
      },
      component: () => import('@/views/page/category.vue'),
    }],
  }
  ];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      hidden:false,
      icon:'mail'
    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        hidden:false,
        icon: 'number',
      },
      component: () => import('../views/page/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:
    {
      title: '登录',
      hidden:true,
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {//用来做一些进入页面的限制
  if (to.path !== "/login") {
    if (store.state.user.email && store.state.user.role && store.state.user.appkey) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoute(store.state.user.role, ayncRouterMap);
        
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(()=>
        {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    } else {
      next('/login');
    }
  }
  return next();
})
export default router;
