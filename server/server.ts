// server.ts
import type { BaseRequest } from './models';
import express from 'express';
import expressSession from 'express-session';
import createMemoryStore from 'memorystore';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import config from './config';
import createViteSSR from './create-vite-ssr';
import { webController } from './api/web/web.controller';
import { GET_CONTENT } from './api/web/web.constants';
import dataRoute from './api/data/data.route';
import webRoute from './api/web/web.route';

// Memory store
const MemoryStore = createMemoryStore(expressSession);

// Create http server
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  expressSession({
    store: new MemoryStore({ checkPeriod: 86400000 }), // 24h
    secret: config.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: 'strict' },
  })
);

// Data provider assets
app.use('/static', express.static('public'));
app.use('/sw.js', express.static('./sw.js'));
app.use('/', dataRoute);
app.use('/', webRoute);

export const { vite, render } = await createViteSSR(app);

// Serve HTML
app.use('*', async (req: BaseRequest<never, { lang?: string }>, res) => {
  try {
    const data = await webController[GET_CONTENT](req);
    const url = req.originalUrl.replace('/test/', '/');
    const html = await render(url, data);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e: any) {
    vite && vite.ssrFixStacktrace(e);
    console.error(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT} (${process.env.NODE_ENV})`);
});
