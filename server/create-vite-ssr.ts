import { type ViteDevServer } from 'vite';
import { type Express } from 'express';
import fs from 'node:fs';
import config from './config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

let vite: ViteDevServer;

export default async (
  app: Express,
  isProd: boolean = !!config.IS_PROD_ENV
): Promise<{
  vite: ViteDevServer;
  templateHtml: string;
  ssrManifest?: Record<string, any>;
  render: (url: string, isProduction: boolean) => Promise<string>;
}> => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const resolve = (p: string) => path.resolve(__dirname, p);

  const templateHtml = isProd ? fs.readFileSync(resolve('../dist/client/index.html'), 'utf-8') : fs.readFileSync(resolve('../index.html'), 'utf-8');
  const ssrManifest = isProd ? JSON.parse(fs.readFileSync(resolve('../dist/client/.vite/ssr-manifest.json'), 'utf-8')) : undefined;

  if (isProd) {
    const serveStatic = await import('serve-static');
    const compression = (await import('compression')).default;
    const distClient = serveStatic.default(resolve('../dist/client'), {
      index: true,
    });

    app.use(compression());
    app.use('/test', distClient);
  } else {
    const { createServer } = await import('vite');

    vite = await createServer({
      logLevel: 'info',
      server: { middlewareMode: true },
      base: config.BASE_URL,
    });

    app.use(vite.middlewares);
  }

  const render = async (url: string, isProduction: boolean = false) => {
    let html: string = '';

    if (isProduction) {
      // @ts-ignore
      html = (await import('../dist/client/entry-server.js')).render;
    } else {
      await vite.transformIndexHtml(url, templateHtml);

      html = (await vite.ssrLoadModule('../client/entry-server.ts')).render;
    }

    return templateHtml.replace(`<!--app-html-->`, html);
  };

  return {
    vite,
    templateHtml,
    ssrManifest,
    render,
  };
};
