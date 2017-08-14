const koa = require('koa')
const serve = require('koa-static')
const router = require('./router')
const cors = require('koa2-cors')
const loggerAsync = require('./middleware/logger-async.js')
const app = new koa()
const views = require('koa-views')

app
  .use(views(__dirname + '/views', {
    map: {
      html: 'ejs'
    }
  }))
  .use(serve(__dirname))  
  .use(cors())
  .use(router.routes())
  .use(loggerAsync())
  .use(router.allowedMethods())
  .listen(3000)

console.log('服务已启动, http://127.0.0.1:3000')