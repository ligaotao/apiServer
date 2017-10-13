const model = require('../model/dytt')
const movieDB = require('../db/movieList')
const {typeToDesc} = require('../config')
class Movies {
    static async apiMovies (ctx) {
        // 通过接口来获取电影
        let page = ctx.page || 0
        const movies = await movieDB.findMovie({}, page)
        ctx.body = movies
    }
    static async getList (ctx) {
        const movies = await movieDB.findMovie()
        ctx.state = {
            movies: movies
        }
        await ctx.render('list.html')
    }
    static async home (ctx) {
        await ctx.render('index.html')
    }
    static async movie (ctx) {
        const count = await movieDB.moviesCount()
        const page = Math.ceil(count/18)
        const movies = await movieDB.findMovie({}, 0, 18)
        movies.forEach((k) => {
            k.typeDesc = typeToDesc[k.type]
        })
        await ctx.render('movie.html', {movies, count, page})
    }
    static async movieDetail (ctx) {
        console.log(ctx.params)
        var id = ctx.params.id
        const movies = await movieDB.findOneMovie({id})
        movies.typeDesc = typeToDesc[k.type]
        await ctx.render('movie-detail.html', {movies})
    }
}
module.exports =  Movies
