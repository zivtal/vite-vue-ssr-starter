import express from "express";
import session from "express-session";
import createMemoryStore from "memorystore";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import config from "./config";
import createViteSSR from "./create-vite-ssr";

// Memory store
const MemoryStore = createMemoryStore(session);

// Create http server
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    store: new MemoryStore({ checkPeriod: 86400000 }), // 24h
    secret: config.SESSION_KEY!,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: "strict" },
  }),
);

// Data provider assets
app.use("/static", express.static("public"));
app.use("/sw.js", express.static("./sw.js"));

export const { vite, render, templateHtml } = await createViteSSR(app);

// Serve HTML
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace("/test/", "/");
    const html = await render(url, config.IS_PRODUCTION);

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e: any) {
    vite && vite.ssrFixStacktrace(e);
    console.error(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(config.PORT, () => {
  console.log(
    `Server started at http://localhost:${config.PORT} (${process.env.NODE_ENV})`,
  );
});
