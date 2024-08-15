import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import vueDevTools from 'vite-plugin-vue-devtools';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p: string) => path.resolve(__dirname, p);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin({ overrideConfigFile: resolve('.eslintrc.cjs') }), vueDevTools()],
  resolve: {
    alias: {
      '@': resolve('client'),
      '@assets': resolve('client/assets'),
      '@router': resolve('client/router'),
      '@shared': resolve('client/shared'),
      '@store': resolve('client/store'),
      '@styles': resolve('client/styles'),
      '@views': resolve('client/views'),
      '@locale': resolve('client/locale'),
      '@components': resolve('client/components'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "./client/styles/_variables.scss";' +
          '@import "./client/styles/_mixins.scss";' +
          '@import "./client/styles/_colors.scss";' +
          '@import "./client/styles/_transitions.scss";' +
          '@import "./client/styles/_fonts.scss";',
      },
    },
  },
});
