/* eslint @typescript-eslint/no-console: "off" */
// @ts-check
const fs =  require('fs')
const path  = require('path')
const express  = require('express')
const { injectTeleports, shoulPrerender }  = require('./utils')
const config  = require('./config')
const { renderHeadToString }  = require('./render-head')
const { isCacheable, microCache }  = require('./page-cache')

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

const projRoot = path.resolve(__dirname, '..')

const resolve = (p) => path.resolve(projRoot, p)

const degradeToClientRender = (res, isProd) => {
  const template = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : fs.readFileSync(resolve('index.html'), 'utf-8')
  res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
  console.info('had degraded to client render!')
}

async function createServer(
  root = projRoot,
  isProd = process.env.NODE_ENV === 'production'
) {
  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''

  const manifest = isProd
    ? // @ts-ignore
      require('../dist/client/ssr-manifest.json')
    : {}

  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        host: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        proxy: {
          '/edirectory': {
            target: 'https://ims.hkust-gz.edu.cn',
            changeOrigin: true,
          },
        },
      },
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    const compression = require('compression')
    app.use(compression())
    const serveStatic = require('serve-static')
    app.use(
      serveStatic(resolve('dist/client'), {
        index: false,
      })
    )
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl
      // in some special case, we aslo need to degrade to client render.
      // e.g.: large access or some pages need to degrade
      if (req.query.degrade === 'true' || config.degrade === true) {
        degradeToClientRender(res, isProd)
        return
      }

      console.log(url, 'url')
      // handle the prerender pages
      if (isProd && config.usePrerender && shoulPrerender(url)) {
        const fileName = `${url}.html`
        const filePath = resolve(`dist/client/${fileName}`)
        if (fs.existsSync(filePath)) {
          const html = fs.readFileSync(filePath, 'utf-8')
          res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
          console.info('this page is prerender!')
          return
        }
      }

      // handle the cache pages
      const cacheable = config.useCache && isCacheable(url)
      if (cacheable) {
        const hit = microCache.get(url)
        if (hit) {
          console.info('this page is from cache')
          return res.status(200).set({ 'Content-Type': 'text/html' }).end(hit)
        }
      }

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      } else {
        template = indexProd
        const serverEntry = (await import(
          '../dist/server/entry-server.js'
        ))
        render = serverEntry.render
      }
      console.info('server side render, pls waiting...')

      const [appHtml, preloadLinks, ctx, router] = await render(url, manifest)

      const head = renderHeadToString(router.currentRoute.value)

      const html = injectTeleports(template, ctx.teleports)
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--head-title-->`, head)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

      if (cacheable) {
        microCache.set(url, html)
      }

      console.info('server side render success!')
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      //to do: deal with the error accour in ssr, such as recording the error log
      console.log(e.stack, 'render error')
      // if server render is fails, we need to degrade it to client render.
      degradeToClientRender(res, isProd)
    }
  })

  return { app, vite }
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(3008, '0.0.0.0', () => {
      console.log('http://localhost:3008')
    })
  )
}

// // for test use
exports.createServer = createServer
