var Movie = require('./movie');
var Dytt = require('../model/dytt');

var saveMovie = async function () {
    var list = await Dytt.list();
    var arr = [];
    Object.keys(list).forEach(k => {
        list[k].forEach(kk => {
            let obj = kk
            obj.name = obj.txt
            obj.type = k
            delete obj.txt
            arr.push(obj)
        })
    });
    Movie.insertMany(arr, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log(docs)
        }
    })
};

// 根据list 生成图片
var setMore = function () {
    Movie.find({}, function (err, list) {
        if (list) {
            list.forEach(async (k, i) => {
                let res = await Dytt.moviesMore(k.url)
                console.log(i)
                await new Promise(function (reslove, reject) {
                    Movie.update({_id: k["_id"]}, {$set: {img: res.banner, ftp: res.url}}, function (err, docs) {
                        if (err) {
                            reject(err)
                        } else {
                            reslove(docs)
                        }
                    })
                })
            })
        }
    })
}
setMore()
function insert () {
    var movie = new Movie({
        name: '侠客行',
        url: '123',
        meta: '好看的电影',
        ftp: '下载地址'
    });
    movie.save(function  (err, res) {
        if (err) {
            console.log('错误', err)
        } else {
            console.log('成功', res)
        }
    })
}

function update () {
    var wherestr = {
        name: '侠客行'
    };
    var updatestr = {
        url: '更新后的地址'
    };
    Movie.update(wherestr, updatestr, function (err, res) {
        if (err) {
            console.log("错误:" + err);
        }
        else {
            console.log("更新成功:" + res);
        }
    })
}
function del () {
    var wherestr = {name: '侠客行'};
    Movie.remove(wherestr, function (err, res) {
        if (err) {
            console.log('未删除')
        } else {
            console.log('删除成功')
        }
    })
}