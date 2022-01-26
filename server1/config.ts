export default {
  degrade: false, // whether degrade all pages to client render
  usePrerender: true, // whether using prerender pages
  useCache: true, // whether using cache for specific pages
  max: 0, // 0 -> Infinity, the maximum size of the cache
  maxAge: 1000 * 60 * 10, // Maximum age in ms for cache, there is 10 minute
}

// determine routes to pre-render from src/router
// if route is not found , will using the 404 page
export const routesToPrerender = ['/gz/en/about', '/gz/zh-cn/about']

// determine routes to cache page
export const cachePages = ['/gz/zh-cn']
