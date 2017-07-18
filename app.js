const koa = require('koa')
const router = require('./router')
const cors = require('koa2-cors')
const loggerAsync = require('./middleware/logger-async.js')
const app = new koa()

app
  .use(cors())
  .use(router.routes())
  .use(loggerAsync())
  .use(router.allowedMethods())
  .listen(3000)