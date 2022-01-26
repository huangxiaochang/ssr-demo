import LRU from 'lru-cache'
import config, { cachePages } from './config'
import { formatURLWithSlash } from './utils'

export const microCache = new LRU({
  max: config.max || 0,
  maxAge: config.maxAge || 1000 * 60 * 10, // Important: entries expires after 1 second.
})

export const isCacheable = (url: string) => {
  // implement logic to check if the request is user-specific.
  // only non-user-specific pages are cache-able
  //  the `url` may end with '/'
  return cachePages.some(
    (item) => formatURLWithSlash(item) === formatURLWithSlash(url)
  )
}
