var Movie = require('./movie');
var Dytt = require('../model/dytt');

var saveMovie = async function () {
    var list = await Dytt.list();
    var arr = [];
    var maxIdMovie = await Movie.findOne({}).sort({id: -1})
    var maxContinu = 3 // 最大连续数值超过多少会认为下面的是重复内容
    var id = maxIdMovie ? maxIdMovie.id : 0
    id++
    for (let k in list) {
        if (maxContinu == 0)  {
            console.log('---本次爬虫到此结束--, 重复次数超过了三次')
            break
        }
        for (let i = 0; i< list[k].length; i++) {
            let obj = list[k][i]
            obj.type = k
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
    }
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
    Movie.find({status: {$ne: 200}}, async function (err, list) {
        if (list) {
            let sum = list.length
            let process = 0
            await Promise.all(list.map(async (k, i) => {
                let res = await Dytt.moviesMore(k.url)
                return await new Promise(function (reslove, reject) {
                    Movie.update({_id: k["_id"]}, {$set: {img: res.banner, ftp: res.url, thumb: res.thumb, meta: res.meta, status: 200}}, function (err, docs) {
                        process++
                        console.log('已完成 ', process)
                        console.log('剩余 ', sum - process)
                        if (err) {
                            reject(err)
                        } else {
                            reslove(docs)
                        }
                    })
                })
            }))
        }
    })
}
async function initSql () {
    console.log('电影列表----------')
    await saveMovie()
    console.log('电影详情----------')
    await setMore()
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