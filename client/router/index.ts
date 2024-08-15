import {
  createWebHistory,
  createRouter,
  createMemoryHistory,
  type RouteRecordRaw,
} from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";

const Index = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
];

export function buildRouter(routes: Readonly<Array<RouteRecordRaw>> = Index) {
  try {
    return createRouter({
      history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
      routes,
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
}
