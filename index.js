import Vue from 'vue'
import Router from 'vue-router'
import { getMenu } from '@/api/login'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: '登录页面',
    hidden: true,
    component: resolve => require(['../views/login/Login.vue'], resolve)
  },
  {
    path: '/lock',
    hidden: true,
    name: '锁屏页',
    component: resolve => require(['../components/common/lock/index.vue'], resolve)
  },
  {
    path: '/Readme',
    // name: 'Readmehome',
    index: 'Readme',
    meta: {
      title: 'Readme',
      icon: 'el-icon-menu'
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        name: 'Readme',
        path: '/',
        meta: { title: 'Readme', icon: 'el-icon-menu' },
        component: resolve => require(['../components/page/Readme.vue'], resolve)
      }
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})
// 异步挂载的路由
// 动态需要根据权限加载的路由表

function addChild(child_id) {
  // const path = '/chart/' + child_id
  // const name = 'chart_' + child_id
  const path = '/chart'
  const name = 'chart'

  console.log('new child:', name)
  const itf_children = {
    name: name,
    path: path,
    meta: {
      title: name, roles: ['admin']
    },
    component: resolve => require(['../components/page/chart.vue'], resolve)
  }
  return itf_children
}

function addParent(menu) {
  var children_list = []
  for (var item in menu) {
    var children_ids = menu[item]['children']
    console.log('children_ids:', children_ids)
    for (var id in children_ids) {
      var new_child = addChild(children_ids[id])
      children_list.push(new_child)
    }
  }
  console.log('children_list:', children_list)

  const itf_parent = {
    path: '/chart',
    meta: {
      title: 'chart',
      icon: 'el-icon-setting',
      roles: ['admin']
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: children_list
  }
  console.log('itf_parent:', itf_parent)

  return itf_parent
}

export const baseAsyncRouterMap = [
  {
    path: '/permission',
    // name: 'permissionhome',
    meta: {
      title: 'permission',
      icon: 'el-icon-setting',
      roles: ['admin']
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        name: 'permission',
        path: '/permission',
        meta: {
          title: 'permission', icon: 'el-icon-menu', roles: ['admin']
        },
        component: resolve => require(['../components/page/permission.vue'], resolve)
      }
    ]
  },
  {
    path: '/add',
    meta: {
      title: 'add',
      icon: 'el-icon-setting',
      roles: ['admin']
    },
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [
      {
        name: 'add',
        path: '/add',
        meta: {
          title: 'add', icon: 'el-icon-menu', roles: ['admin']
        },
        component: resolve => require(['../components/page/try.vue'], resolve)
      },
      {
        name: 'add2',
        path: '/add2',
        meta: {
          title: 'add2', icon: 'el-icon-menu', roles: ['admin']
        },
        component: resolve => require(['../components/page/try.vue'], resolve)
      }
    ]
  },
  // {
  //   path: '/chart',
  //   meta: {
  //     title: 'chart',
  //     icon: 'el-icon-setting',
  //     roles: ['admin']
  //   },
  //   component: resolve => require(['../components/common/Home.vue'], resolve),
  //   children: [
  //     {
  //       name: 'chart',
  //       path: '/chart/:id',
  //       meta: {
  //         title: 'chart', icon: 'el-icon-menu', roles: ['admin']
  //       },
  //       component: resolve => require(['../components/page/chart.vue'], resolve)
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]

function addMenu() {
  // debugger
  const menu = getMenu()
  var new_menu = addParent(menu)
  baseAsyncRouterMap.push(new_menu)
  console.log('baseAsyncRouterMap:', baseAsyncRouterMap)

  return baseAsyncRouterMap
}

export const asyncRouterMap = addMenu()

