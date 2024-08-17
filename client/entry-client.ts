import { createApp } from './main';

const { app, router } = createApp();

const appDiv = (() => {
  const div = document.createElement('div');
  div.id = 'app';

  return div;
})();

document.querySelector('body')?.appendChild(appDiv);

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app', true);

  console.log('hydrated');
});
