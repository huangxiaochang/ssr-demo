import headConfig from './head-config'

export interface Head {
  title?: string
  description?: string
  keywords?: string
}

function mergeHeadAttr(soruce1: Head, soruce2: Head) {
  return {
    title: soruce2.title ?? soruce1.title ?? 'HKUST',
    description:
      `${soruce2.description ?? ''} ${soruce1.description ?? ''}` || 'HKUST',
    keywords: `${soruce2.keywords ?? ''} ${soruce1.keywords ?? ''}` || 'HKUST',
  }
}

function generateHeadTitle({ title, keywords, description }: Head) {
  return `<title>${title || 'HKUST'}</title>
  <meta name="description" content="${description || 'HKUST'}">
  <meta name="keywords" content="${keywords || 'HKUST'}">`
}

export const renderHeadToString = (route: Record<string, any>) => {
  const routeMeta = route.meta
  const path = route.path

  if (headConfig[path] && routeMeta) {
    return generateHeadTitle(mergeHeadAttr(routeMeta, headConfig[path]))
  } else {
    return generateHeadTitle(routeMeta || headConfig[path] || {})
  }
}
