import { createApp } from './main';
import { useGlobalStore } from './store';

const { app, router, data } = createApp(window.__SSR_DATA__);

useGlobalStore().state = data;

const appDiv = (() => {
  const div = document.createElement('div');
  div.id = 'app';

  return div;
})();

document.querySelector('body')?.appendChild(appDiv);

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app', true);
});
