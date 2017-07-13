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
    ctx.body = movies
  }
}
module.exports =  UserControl
