var ProgressBar = require('progress')
var Movie = require('./movie');
var Dytt = require('../model/dytt');

var green = '\u001b[42m \u001b[0m';
var red = '\u001b[41m \u001b[0m';
var bar
var getList = async function (thisPage , arr) {
    var {list, page, total} = await Dytt.newMovie(thisPage);
    if (page * 1 === 1) {
        bar = new ProgressBar(' 爬虫进度 [:bar] :percent :etas', {
            complete: green,
            incomplete: red,
            total: total * 1
        })
    } else {
        bar.tick()
    }
    // var arr = [];
    var maxIdMovie = await Movie.findOne({}).sort({id: -1})
    var maxContinu = 5 // 最大连续数值超过多少会认为下面的是重复内容
    var id = maxIdMovie ? maxIdMovie.id : 0
    id++
    for (let i = 0; i< list.length; i++) {
        let obj = list[i]
        obj.type = 'newMovie'
        obj.name = obj.txt
        obj.id = id
        obj.status = 100 //待二次爬去
        var count = await Movie.find({detailName: obj.txt}).count()
        // var count = await Movie.find({detailName: obj.ext}).count()
        // console.log(typeof count, count)
        if (count !== 0) {
            if (maxContinu == 0)  {
                console.log('---本次爬虫到此结束--， 没有新的数据')
                break
            }
            maxContinu--
            continue
        } else {
            maxContinu = 3
            id++
            var re = /\《([^》《]*)\》/i
            var result = obj.txt.match(re)
            try {
                obj.name = result[1]
            } catch (err) {
                console.log(result, obj)
            }
            obj.detailName = obj.txt
            // (?<=《)([^》]+)(?=》)
            delete obj.txt
            arr.push(obj)
        }
    }
    if (thisPage < total && maxContinu !== 0) {
        var nextPage = thisPage + 1
        return await getList(nextPage, arr)
    } else {
        return arr
    }
}

var saveMovie = async function () {
   var arr = await getList(1, [])
    await Movie.insertMany(arr).then(function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log(docs)
        }
    })
};
// 根据list 生成图片
var setMore = async function () {
    let a = await Movie.find({status: {$ne: 200}}).then(async function (list) {
            if (list) {
                let sum = list.length
                let bar = new ProgressBar(' 详细内容进度 [:bar] :percent :etas', {
                    complete: green,
                    incomplete: red,
                    total: sum
                })
                await Promise.all(list.map(async (k, i) => {
                    let res = await Dytt.moviesMore(k.url)
                    return await new Promise(function (reslove, reject) {
                        Movie.update({_id: k["_id"]}, {$set: {img: res.banner, ftp: res.url, thumb: res.thumb, meta: res.meta, status: 200}}, function (err, docs) {
                            bar.tick()
                            if (err) {
                                reject(err)
                            } else {
                                reslove(docs)
                            }
                        })
                    })
                }))
            }
        }
    )
    console.log(a)
}
async function initSql () {
    console.log('电影列表----------')
    await saveMovie()
    console.log('电影详情----------')
    await setMore()
    process.exit()

}
initSql()
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
