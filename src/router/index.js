import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Quiz from '../views/Quiz.vue'
import Result from '../views/Result.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/quiz', component: Quiz },
  { path: '/result', component: Result },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
