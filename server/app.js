const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
// const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')

// 解析请求体
app.use(bodyParser())
// 引入路由分发
const router = require('./routes')
app.use(router.routes())

// 启动程序，监听端口
app.listen(config.port, function () {
  console.log("success")
})
