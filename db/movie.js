var mongoose = require('./index')
// 创建一个 Schema
var movieSchema = mongoose.Schema({
    id: Number,
    img: String,
    thumb: String,
    detailName: String,
    name: String,
    ftp: String,
    url: String,
    meta: String,
    type: String,
    status: Number
})
// 创建model

module.exports = mongoose.model('movie', movieSchema)
