import App from './App.vue';
import { createSSRApp } from 'vue';
import './styles/main.scss';
import { create as createRouter } from './router';
import { createPinia } from 'pinia';
import './plugins/dayjs-init.ts';

export function createApp({ routers, ...state }: Record<string, any> = {}) {
  const app = createSSRApp(App);
  const router = createRouter(routers);
  const pinia = createPinia();

  app.use(pinia).use(router);

  return { app, router, data: state };
}
