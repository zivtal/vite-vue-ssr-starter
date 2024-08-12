import { createSSRApp } from 'vue';
import App from './App.vue';
import { createRouter } from 'vue-router';
import { createMemoryHistory } from 'vue-router';
import routes from './routes';

export function createApp() {
    const app = createSSRApp(App);

    const router = createRouter({
        history: createMemoryHistory(),
        routes,
    });

    app.use(router);

    return { app, router };
}
