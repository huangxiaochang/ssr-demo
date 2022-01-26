module.exports = {
  degrade: false, // whether degrade all pages to client render
  usePrerender: true, // whether using prerender pages
  useCache: true, // whether using cache for specific pages
  max: 0, // 0 -> Infinity, the maximum size of the cache
  maxAge: 1000 * 60 * 10, // Maximum age in ms for cache, there is 10 minute
  routesToPrerender: ['/gz/en/about', '/gz/zh-cn/about'],
  cachePages: ['/gz/zh-cn']
}
