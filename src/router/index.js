import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/home/legajo/:code',
    name: 'Home',
    component: Home
  },
  {
    path: '/home/alumno/:alum',
    name: 'Home',
    component: Home
  },
  {
    path: '/detalle/:id',
    name: 'Detalle',
    component: () => import('../components/Detalle.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
