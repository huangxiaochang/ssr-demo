// Pre-render the specific pages into static HTML.

const fs = require('fs')
const path = require('path')
const fsExtra = require('fs-extra')
const { injectTeleports } = require('./utils')
const { routesToPrerender } = require('./config')

const toAbsolute = (p) => path.resolve(__dirname, '..', p)

;(async () => {
  const manifest = require('../dist/client/ssr-manifest.json')
  const template = fs.readFileSync(
    toAbsolute('dist/client/index.html'),
    'utf-8'
  )
  const { render } = (require('../dist/server/entry-server.js'))

  // pre-render each route...
  for (const url of routesToPrerender) {
    const [appHtml, preloadLinks, ctx] = await render(url, manifest)

    const html = injectTeleports(template, ctx.teleports)
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    const filePath = `dist/client${url}.html`
    fsExtra.outputFile(filePath, html)
  }
})()
