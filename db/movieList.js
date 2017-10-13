var Movie = require('./movie');

function findMovie (filter = {}, skip = 0, limit = 20) {
    return new Promise(function (resolve, reject) {
        Movie.find(filter).skip(skip).limit(limit).find(function (err, list) {
            if (err) {
                reject(err)
            } else {
                resolve(list)
            }
        })
    })
}

function findOneMovie (filter = {}) {
    return Movie.findOne(filter)
}

function moviesCount (filter = {}) {
    return Movie.find(filter).count()
}

module.exports.findMovie = findMovie
module.exports.findOneMovie = findOneMovie
module.exports.moviesCount = moviesCount