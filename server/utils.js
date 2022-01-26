const { routesToPrerender } = require('./config')
// Inject teleports in template
 function injectTeleports(
  html,
  teleports
) {
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

// format the url end with '/'
 function formatURLWithSlash(url) {
  url = url.endsWith('/') ? url : `${url}/`
  url = url.startsWith('/') ? url : `/${url}`
  return url
}

 function unwrapURLEndSlash(url) {
  return url.endsWith('/') ? url.substring(0, url.length - 1) : url
}

 function shoulPrerender(url) {
  return routesToPrerender.some(
    (item) => unwrapURLEndSlash(item) === unwrapURLEndSlash(url)
  )
}

module.exports = {
  injectTeleports,
  formatURLWithSlash,
  shoulPrerender,
  unwrapURLEndSlash
}
