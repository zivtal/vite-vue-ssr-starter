import {
  createWebHistory,
  createRouter,
  createMemoryHistory,
  type RouteRecordRaw,
} from "vue-router";

import Home from "../views/home.vue";
import About from "../views/about.vue";

const Index = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

const load = () => {
  try {
    const routes = JSON.parse(localStorage.getItem("router")!);
    return create(routes);
  } catch (error) {
    console.error("router:load", error);

    throw error;
  } finally {
    localStorage.removeItem("router");
  }
};

const create = (routes: Readonly<Array<RouteRecordRaw>> = Index) => {
  try {
    return createRouter({
      history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
      routes,
    });
  } catch (error) {
    console.error("router:create", error);

    throw error;
  }
};

export { create, load };
