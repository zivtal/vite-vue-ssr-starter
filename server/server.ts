import express from 'express'
import fs from 'node:fs'
import path from 'node:path'

import { fileURLToPath } from 'node:url'
import { ViteDevServer } from 'vite'

export async function createServer(): Promise<void> {

  const app = express()

  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const resolve = (p: string) => path.resolve(__dirname, p)
  const isProduction = process.env.NODE_ENV === 'production'


  let vite: ViteDevServer
  let manifest: Record<string, any> = {}
  let indexProd: string = ""

  if (isProduction) {

    manifest = JSON.parse(
      fs.readFileSync(
        resolve("../dist/client/.vite/ssr-manifest.json"),
        "utf-8"
      )
    )

    indexProd = fs.readFileSync(
      resolve("../dist/client/index.html"),
      "utf-8"
    )

    app.use((await import("compression")).default())
    app.use(
      "/test", (
      (await import("serve-static")).default(resolve("../dist/client"), {
        index: false
      })
    )
    )

  } else {

    vite = await (await import('vite')).createServer({
      base: '/test/',
      logLevel: 'info',
      server: {
        middlewareMode: true,
      },
    })

    app.use(vite.middlewares)

  }

  app.use("*", async (req, res) => {

    console.log("debug render")

    try {
      const url = req.originalUrl.replace('/test/', '/')

      let template: string = ""
      let render: (url: string) => Promise<{html: string}>
      
      if (!isProduction) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('../index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('../client/entry-server.ts')).render
      } 
      else {
        template = indexProd
        // @ts-ignore
        render = (await import('../dist/server/entry-server.js')).render
      }

      const {html:appHtml} = await render(url)

      const html = template
        // .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

    } catch (e: any) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)

    }

  })

  app.listen(8080, () => {
    console.log(`Service ✅ Running on port 8080`);
  })

}

createServer()

