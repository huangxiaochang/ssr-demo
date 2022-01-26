const LRU = require('lru-cache')
const config = require('./config')
const { formatURLWithSlash } = require('./utils')

module.exports = {
  microCache: new LRU({
    max: config.max || 0,
    maxAge: config.maxAge || 1000 * 60 * 10, // Important: entries expires after 1 second.
  }),
  isCacheable: (url) => {
    // implement logic to check if the request is user-specific.
    // only non-user-specific pages are cache-able
    //  the `url` may end with '/'
    return config.cachePages.some(
      (item) => formatURLWithSlash(item) === formatURLWithSlash(url)
    )
  }
}
