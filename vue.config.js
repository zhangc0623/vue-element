// @vue/cli-service 提供的 defineConfig 帮手函数
const { defineConfig } = require('@vue/cli-service')
// resolve
const resolve = dir => require('path').join(__dirname, dir)


module.exports = defineConfig({
  transpileDependencies: true,
  // 支持template编译
  runtimeCompiler: true,
  publicPath: '/',              // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  outputDir: 'dist',            // 构建输出目录（打包位置）
  assetsDir: 'static',          // 放置生成的静态资源（js，css，img，fonts）的（相对于outputDir）的目录
  lintOnSave: false,            // 是否校验语法
  productionSourceMap: false,   // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  devServer: {
    host: 'localhost', //启动时使用的域名
    port: 8888,
    open: true,  // 启动后打开浏览器
  },
  configureWebpack: {           // 绝对路径
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  // 添加svg-sprite-loader
  chainWebpack: config => {
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
  },
})
