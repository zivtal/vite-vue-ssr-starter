import { createWebHistory, createRouter, createMemoryHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import AboutView from "./views/AboutView.vue"

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

export function buildRouter(){
  return createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}