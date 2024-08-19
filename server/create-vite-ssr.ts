// create-vite-ssr.ts
import type { Content } from './models';
import { type ViteDevServer } from 'vite';
import { type Express } from 'express';
import * as cheerio from 'cheerio';
import fs from 'node:fs';
import config from './config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

let vite: ViteDevServer;
const isProduction = !!config.IS_PROD_ENV;

export default async (app: Express): Promise<{ vite: ViteDevServer; render: (url: string, data?: Content) => Promise<string> }> => {
  const indexHtml = loadIndexHtml();
  await serverInit(app);

  const render = async (url: string, data: Content = {} as Content) => {
    const ssrRender = await loadSSRRender();

    if (!isProduction) {
      await vite.transformIndexHtml(url, indexHtml);
    }

    const appHtml = await ssrRender({ path: url, data: {} });

    return buildHtml(indexHtml, appHtml, data);
  };

  return { vite, render };
};

const loadIndexHtml = (): string => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = isProduction ? '../dist/client/index.html' : '../index.html';

  return fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
};

const serverInit = async (app: Express): Promise<void> => {
  if (!isProduction) {
    const { createServer } = await import('vite');

    vite = await createServer({ appType: 'custom', server: { middlewareMode: true }, base: config.BASE_URL });
    app.use(vite.middlewares);
  } else {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;

    app.use(compression());
    app.use(config.BASE_URL, sirv('./dist/client', { extensions: [] }));
  }
};

const loadSSRRender = async (): Promise<any> => {
  // @ts-ignore
  return isProduction ? (await import('../dist/server/entry-server.js')).render : (await vite.ssrLoadModule('./client/entry-server.ts')).render;
};

const buildHtml = (indexHtml: string, appHtml: string, data: Content): string => {
  const { direction = 'ltr', metadata, style, ...state } = data;
  const cheerioApi = cheerio.load(indexHtml);

  cheerioApi('html').attr('dir', direction as string);
  cheerioApi('head').find('title').text(state.title);
  cheerioApi('head').append(`<link rel="manifest" href="/manifest.json">`);
  cheerioApi('#root').html(appHtml);
  cheerioApi('body').append(`<script id="ssr">window.__SSR_DATA__=${JSON.stringify(state)};document.getElementById('ssr').remove();</script>`);

  renderMeta(cheerioApi, metadata);
  renderStyle(cheerioApi, style);

  return cheerioApi.html();
};

const renderStyle = (cheerioApi: cheerio.CheerioAPI, style?: Content['style']): void => {
  if (!style) {
    return;
  } else if (typeof style === 'string') {
    cheerioApi('head').append(`<style>${style}</style>`);

    return;
  }

  const cssStyle = Object.entries(style)
    .map(([selector, properties]) => {
      return `${selector} {\n${Object.entries(properties || {})
        .map(([property, value]) => ` ${property}: ${value};`)
        .join('\n')}\n}`;
    })
    .join('\n\n');

  cheerioApi('head').append(`<style>${cssStyle}</style>`);
};

const renderMeta = (cheerioApi: cheerio.CheerioAPI, metadata?: Content['metadata']): void => {
  if (metadata?.image) {
    cheerioApi('head').append(
      `<meta name="image" content="${metadata.image}" />`,
      `<meta property="og:image" content="${metadata.image}" />`,
      `<meta property="twitter:image" content="${metadata.image}" />`
    );
  }

  if (metadata?.title) {
    cheerioApi('head').append(
      `<meta property="og:title" content="${metadata.title}" />`,
      `<meta property="og:site_name" content="${metadata.title}" />`,
      `<meta property="twitter:title" content="${metadata.title}" />`
    );
  }

  if (metadata?.description) {
    cheerioApi('head').append(
      `<meta name="description" content="${metadata.description}" />`,
      `<meta property="og:description" content="${metadata.description}" />`,
      `<meta property="twitter:description" content="${metadata.description}" />`
    );
  }

  if (metadata?.keywords?.length) {
    cheerioApi('head').append(`<meta name="keywords" content="${metadata.keywords.join(',')}" />`);
  }
};
