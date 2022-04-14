# element-vue
> 集成VUE2.0 + Element框架

## 项目准备
```
<!--安装依赖-->
npm install

<!--启动服务-->
npm run serve

<!--构建生产环境-->
npm run build
```

## 文件说明
1. 左侧菜单文件：assets/js/menuList.js

```
export let menuList = [
    {
    <!--一级菜单-->
        path: '/',
        text: '示例',
        children: [
        <!--二级菜单-->
            {
                path: '/',
                text: '表格合并行'
            }
        ]
    },
]
```
2. 公共工具类：utils/idnex.js

```
处理参数拼接方法：handleParamsUrl

字符串判空方法：isNull

对象判空：objectIsNull
```
3. 封装Elment的el-dialog弹窗

```
方法实现：utils/idnex.js中的toolDialog方法

具体使用可参考弹窗示例（views/DialogExample.vue)
```

4. 时间工具类：utils/dateUtil.js

```
时间加减函数方法：dateAdd

获取当前时间是周几：getWeekday
```


5. 正则匹配工具类：utils/regUtil.js

```
整数：isInt

整数或小数：isDecimal

手机号：isPhone

邮箱：isEmail
```


6. 下拉加载更多指令（针对Elment的el-select下拉框）
```
指令实现：utils/directives.js

指令使用：v-loadmore

具体使用可参考下拉框加载更多示例（views/LoadMoreExample.vue)

```

7. 封装本地svg指令，可更改颜色大小等属性

```
指令实现参考：[vue使用本地svg](https://www.jianshu.com/p/28827f4c60f4)

注意若是vue.config.js中配置svg-sprite-loader，参考以下代码:

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
}

```


