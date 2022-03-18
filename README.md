# element-vue
> 集成VUE2.0 + Element框架
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### 文件说明
1、左侧菜单文件：assets/js/menuList
```
export let menuList = [
    {
        path: '/',
        text: '示例',
        children: [
            {
                path: '/',
                text: '表格合并行'
            },
            {
                path: '/Triangle',
                text: '杨辉三角'
            }
        ]
    },
]
```

