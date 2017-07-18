const model = require('../model/dytt')
const cache = require('../cache')
class UserControl {
  static async getMovies (ctx) {
    let movies = {}
    var moviesCache = cache.getData('movies')
    if (moviesCache) {
      movies = moviesCache
    } else {
      movies = await model.list()
      cache.setData('movies', movies)
    }
    let data = {
      code: 200,
      data: movies
    }
    ctx.body = data
  }
  static async getMoviesMore (ctx) {
    let mores = await model.moviesMore('/html/gndy/jddy/20170715/54515.html')
    ctx.body = {
      data: mores,
      code: 200
    }
  }
}
module.exports =  UserControl
