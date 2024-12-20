# pixoj-frontend

## Project setup
```
npm install
```
### 快速根据后台生成代码
```shell
openapi --input http://localhost:8121/api/v2/api-docs --output ./generated --client axios
```
BASE: "http://localhost:8121",注意这个base的地址一定是这个！
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
