import { createWebHistory, createRouter, createMemoryHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../views/home.vue';
import About from '../views/about.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

const load = async (key: string = 'router') => {
  const data = localStorage.getItem(key) || undefined;

  return create(data);
};

const create = (data: Readonly<Array<RouteRecordRaw>> | string = routes) => {
  try {
    const routes = typeof data === 'string' ? JSON.parse(data) : data;

    return createRouter({
      history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
      routes,
    });
  } catch (error) {
    console.error('router:create', error);

    throw error;
  }
};

export { create, load };
