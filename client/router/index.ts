import { createWebHistory, createRouter, createMemoryHistory, type RouteRecordRaw } from 'vue-router';
import ROUTES from './routes.ts';

const load = async (key: string = 'router') => {
  const data = localStorage.getItem(key) || undefined;

  return create(data);
};

const create = (data: Readonly<Array<RouteRecordRaw>> | string = ROUTES) => {
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
