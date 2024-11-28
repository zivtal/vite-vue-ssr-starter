import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import vueDevToolsPlugin from 'vite-plugin-vue-devtools';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p: string) => path.resolve(__dirname, p);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin({ overrideConfigFile: resolve('.eslintrc.cjs') }), vueDevToolsPlugin()],
  resolve: {
    alias: {
      '@': resolve('client'),
      '@assets': resolve('client/assets'),
      '@router': resolve('client/router'),
      '@services': resolve('client/services'),
      '@shared': resolve('client/shared'),
      '@store': resolve('client/store'),
      '@styles': resolve('client/styles'),
      '@views': resolve('client/views'),
      '@locale': resolve('client/locale'),
      '@components': resolve('client/components'),
    },
  },
  css: { preprocessorOptions: { scss: { additionalData: '@use "@styles/global.scss" as *;' } } },
});
