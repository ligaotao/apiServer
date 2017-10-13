const mongoose = require('mongoose')
mongoose.connect('mongodb://47.93.23.159/test')
var db = mongoose.connection
db.on('error', console.error.bind(console, '链接错误'))
db.on('close', console.log.bind(console, '数据库关闭'))
db.once('open', function(res) {
    console.log('连接成功')
    console.log(res)
})

module.exports = mongoose
