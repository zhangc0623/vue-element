const { defineConfig } = require('@vue/cli-service')
// resolve
const resolve = dir => require('path').join(__dirname, dir)


module.exports = defineConfig({
  transpileDependencies: true,
  // 支持template编译
  runtimeCompiler: true,
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
