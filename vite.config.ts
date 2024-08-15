import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import vueDevTools from 'vite-plugin-vue-devtools';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      overrideConfigFile: path.resolve(__dirname, './.eslintrc.cjs'), // or .json, .yml, etc.
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client'),
      '@assets': path.resolve(__dirname, './client/assets'),
      '@router': path.resolve(__dirname, './client/router'),
      '@shared': path.resolve(__dirname, './client/shared'),
      '@store': path.resolve(__dirname, './client/store'),
      '@styles': path.resolve(__dirname, './client/styles'),
      '@views': path.resolve(__dirname, './client/views'),
      '@locale': path.resolve(__dirname, './client/locale'),
      '@components': path.resolve(__dirname, './client/shared/components'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./client/styles/_mixins.scss";',
      },
    },
  },
});
