// Pre-render the specific pages into static HTML.

import fs from 'fs'
import path from 'path'
import fsExtra from 'fs-extra'
import { injectTeleports } from './utils'
import { routesToPrerender } from './config'

const toAbsolute = (p: string) => path.resolve(__dirname, '..', p)

;(async () => {
  const manifest = await import('../dist/client/ssr-manifest.json')
  const template = fs.readFileSync(
    toAbsolute('dist/client/index.html'),
    'utf-8'
  )
  const { render } = (await import('../dist/server/entry-server.js')) as any

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
