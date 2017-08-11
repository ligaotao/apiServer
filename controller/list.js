const model = require('../model/dytt')
const movieDB = require('../db/movieList')
class Movies {
    static async getList (ctx) {
        const movies = await movieDB.findMovie()
        ctx.state = {
            movies
        }
        await ctx.render('list.html')
    }
}
module.exports =  Movies
