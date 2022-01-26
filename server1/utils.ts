import { routesToPrerender } from './config'
// Inject teleports in template
export function injectTeleports(
  html: string,
  teleports: Record<string, string>
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
export function formatURLWithSlash(url: string) {
  url = url.endsWith('/') ? url : `${url}/`
  url = url.startsWith('/') ? url : `/${url}`
  return url
}

export function unwrapURLEndSlash(url: string) {
  return url.endsWith('/') ? url.substring(0, url.length - 1) : url
}

export function shoulPrerender(url: string) {
  return routesToPrerender.some(
    (item) => unwrapURLEndSlash(item) === unwrapURLEndSlash(url)
  )
}
