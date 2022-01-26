const path = require('path')
const vuePlugin = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const AutoImport = require('unplugin-auto-import/vite')
const Components = require('unplugin-vue-components/vite')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  plugins: [
    vuePlugin(),
    vueJsx(),
    {
      name: 'virtual',
      resolveId(id) {
        if (id === '@foo') {
          return id
        }
      },
      load(id) {
        if (id === '@foo') {
          return `export default { msg: 'hi' }`
        }
      }
    },
    AutoImport({
      resolvers: [ElementPlusResolver({ ssr: true, importStyle: 'css' })],
    }),
    Components({
      dts: true,
      globalNamespaces: ['global'],
      include: [/\.vue$/],
      resolvers: [ElementPlusResolver({ ssr: true, importStyle: 'css' })],
      directoryAsNamespace: true
    })
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  server: {
    port: 3008,
    host: '0.0.0.0'
  },
  proxy: {
    '/edirectory': {
      target: 'https://ims.hkust-gz.edu.cn',
      changeOrigin: true
    }
  },
  build: {
    minify: false,
    rollupOptions: {
      output: (() => {
        
        if (process.env.isServer !== 'true') {
          return {
            chunkFileNames: 'gz-assets/js/[name].[hash].js',
            entryFileNames: 'gz-assets/js/[name].[hash].js',
            assetFileNames: chunk => {
              const imgReg = /\.(png|jpg|jpeg|svg|gif|webp|apng|bmp)$/
              const fontReg = /\.(otf|ttf|woff|eot)$/
              return imgReg.test(chunk.name)
                ? 'gz-assets/img/[name].[hash].[ext]'
                : fontReg.test(chunk.name)
                  ? 'gz-assets/fonts/[name].[hash].[ext]'
                  : 'gz-assets/[ext]/[name].[hash].[ext]'
            },
          }
        }
      })(),
    },
  }
}
