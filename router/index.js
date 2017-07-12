const router = require('koa-router')()
const UserControl = require('../controller/user')
router
  .get('/api/login', UserControl.login)
module.exports = router
