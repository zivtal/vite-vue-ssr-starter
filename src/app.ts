import { createSSRApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './routes';

export function createApp() {
    const app = createSSRApp(App);
    const router = createRouter({
        history: createWebHistory(),
        routes,
    });

    app.use(router);
    return { app, router };
}
