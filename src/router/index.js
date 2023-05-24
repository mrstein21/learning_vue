import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import ListAirsoftView from "../views/airsoft/ListAirsoftView.vue"
import AddAirsoftView from "@/views/airsoft/AddAirsoftView.vue"
import EditAirsoftView from "@/views/airsoft/EditAirsoftView.vue"
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta :{
      requiresAuth : true
    }
  },
  {
    path: '/airsoft',
    name: 'ListAirsoft',
    component: ListAirsoftView,
    meta :{
      requiresAuth : true
    }
  },
  {
    path: '/airsoft/:id',
    name: 'EditAirsoft',
    component: EditAirsoftView,
    meta :{
      requiresAuth : true
    }
  },
  {
    path: '/airsoft/add',
    name: 'AddAirsoft',
    component: AddAirsoftView,
    meta :{
      requiresAuth : true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta :{
      requiresAuth : false
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  if(to.meta.requiresAuth == true && loggedIn == null){
    next("login")
  }else{
    next();
  }
});

export default router
