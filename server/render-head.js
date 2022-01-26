const headConfig = require('./head-config')


function mergeHeadAttr(soruce1, soruce2) {
  return {
    title: soruce2.title ?? soruce1.title ?? 'HKUST',
    description:
      `${soruce2.description ?? ''} ${soruce1.description ?? ''}` || 'HKUST',
    keywords: `${soruce2.keywords ?? ''} ${soruce1.keywords ?? ''}` || 'HKUST',
  }
}

function generateHeadTitle({ title, keywords, description }) {
  return `<title>${title || 'HKUST'}</title>
  <meta name="description" content="${description || 'HKUST'}">
  <meta name="keywords" content="${keywords || 'HKUST'}">`
}

module.exports = {
  renderHeadToString: (route) => {
    const routeMeta = route.meta
    const path = route.path

    if (headConfig[path] && routeMeta) {
      return generateHeadTitle(mergeHeadAttr(routeMeta, headConfig[path]))
    } else {
      return generateHeadTitle(routeMeta || headConfig[path] || {})
    }
  }
}
  
