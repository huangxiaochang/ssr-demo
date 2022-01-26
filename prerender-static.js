/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint @typescript-eslint/no-console: "off" */
// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

const fs = require('fs')
const path = require('path')

const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = require('./dist/static/ssr-manifest.json')
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = require('./dist/server/entry-server.js')

function injectTeleports(html, teleports) {
  if (teleports) {
    for (const [target, content] of Object.entries(teleports)) {
      if (['head', 'body', 'html'].includes(target)) {
        const replacement = `<${target}>`
        html = html.replace(replacement, replacement + content)
      } else {
        const replacement = ` id="${target.replace('#', '')}">`
        html = html.replace(replacement, replacement + content)
      }
    }
  }
  return html
}

// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(toAbsolute('src/pages'))
  .map((file) => {
    const name = file.replace(/\.vue$/, '').toLowerCase()
    return name === 'home' ? `/` : `/${name}`
  })

;(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const [appHtml, preloadLinks, ctx] = await render(url, manifest)

    const html = injectTeleports(template, ctx.teleports)
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }

  // done, delete ssr manifest
  fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))
})()
