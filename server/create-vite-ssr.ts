// create-vite-ssr.ts
import { type ViteDevServer } from 'vite';
import { type Express } from 'express';
import * as cheerio from 'cheerio';
import fs from 'node:fs';
import config from './config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { RouteRecordRaw } from 'vue-router';

let vite: ViteDevServer;

export default async (
  app: Express,
  isProd: boolean = !!config.IS_PROD_ENV
): Promise<{
  vite: ViteDevServer;
  templateHtml: string;
  ssrManifest?: Record<string, any>;
  render: (url: string, data: Record<string, any>) => Promise<string>;
}> => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const resolve = (p: string) => path.resolve(__dirname, p);

  const templateHtml = isProd ? fs.readFileSync(resolve('../dist/client/index.html'), 'utf-8') : fs.readFileSync(resolve('../index.html'), 'utf-8');
  const ssrManifest = isProd ? JSON.parse(fs.readFileSync(resolve('../dist/client/.vite/ssr-manifest.json'), 'utf-8')) : undefined;

  if (!isProd) {
    const { createServer } = await import('vite');

    vite = await createServer({
      appType: 'custom',
      server: { middlewareMode: true },
      base: config.BASE_URL,
    });

    app.use(vite.middlewares);
  } else {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;

    app.use(compression());
    app.use(config.BASE_URL, sirv('./dist/client', { extensions: [] }));
  }

  const render = async (url: string, data: Record<string, any> = {}) => {
    return await (async () => {
      const render = isProd
        ? // @ts-ignore
          (await import('../dist/client/entry-server.js')).render // /workspace added for digitalocean
        : (await vite.ssrLoadModule('./client/entry-server.ts')).render;

      if (!isProd) {
        await vite.transformIndexHtml(url, templateHtml);
      }

      const rendered = await render(url, ssrManifest);
      const appHtml = await render({ path: url, data: {} });

      const { meta, direction = 'ltr', primaryColor, secondaryColor, ...state } = data;

      const htmlContent = cheerio.load(templateHtml);
      htmlContent('html').attr('dir', direction);
      htmlContent('head').find('title').text(state.title);
      htmlContent('head').append(rendered.head);
      htmlContent('head').append(`<style>:root { --primary-color: ${primaryColor}; --secondary-color: ${secondaryColor}; }</style>`);
      htmlContent('head').append(`<link rel="manifest" href="/manifest.json">`);
      htmlContent('#root').html(appHtml);
      htmlContent('body').append(`<script id="ssr">window.__SSR_DATA__=${JSON.stringify(state)};document.getElementById('ssr').remove();</script>`);

      const metaData = (() => {
        const route = (state.routers as Array<RouteRecordRaw>)?.find((router) => router.path === url);

        return {
          ...(meta || {}),
          title: [meta?.title, route?.meta?.title].filter((val) => !!val).join(' - '),
          description: route?.meta?.description || meta?.description,
        };
      })();

      if (metaData.image) {
        htmlContent('head').append(
          `<meta name="image" content="${metaData.image}" />`,
          `<meta property="og:image" content="${metaData.image}" />`,
          `<meta property="twitter:image" content="${metaData.image}" />`
        );
      }

      if (metaData.title) {
        htmlContent('head').append(
          `<meta property="og:title" content="${metaData.title}" />`,
          `<meta property="og:site_name" content="${metaData.title}" />`,
          `<meta property="twitter:title" content="${metaData.title}" />`
        );
      }

      if (metaData.description) {
        htmlContent('head').append(
          `<meta name="description" content="${metaData.description}" />`,
          `<meta property="og:description" content="${metaData.description}" />`,
          `<meta property="twitter:description" content="${metaData.description}" />`
        );
      }

      if (metaData.keywords?.length) {
        htmlContent('head').append(`<meta name="keywords" content="${(metaData.keywords || []).join(',')}" />`);
      }

      return htmlContent.html();
    })();
  };

  return {
    vite,
    templateHtml,
    ssrManifest,
    render,
  };
};
