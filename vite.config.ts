import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    build: {
        ssr: true,
        rollupOptions: {
            input: './src/entry-server.ts',
            output: {
                format: 'cjs',
                dir: 'dist/server',
            },
        },
    },
});
