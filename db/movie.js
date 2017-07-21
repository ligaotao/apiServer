var mongoose = require('./index')
// 创建一个 Schema
var movieSchema = mongoose.Schema({
    img: String,
    thumb: String,
    name: String,
    ftp: String,
    url: String,
    meta: String,
    type: String
})
// 创建model

module.exports = mongoose.model('movie', movieSchema)
