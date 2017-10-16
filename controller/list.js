const model = require('../model/dytt')
const movieDB = require('../db/movieList')
const {typeToDesc} = require('../config')
class Movies {
    static async apiMovies (ctx) {
        // 通过接口来获取电影
        let page = ctx.query.page || 1
        let limit = ctx.query.limit || 18
        const movies = await movieDB.findMovie({}, page * 1, limit * 1)
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
        const search = ctx.query.search || ''
        const filter = {}
        if (search) {
            filter.name = {
                $regex: search,
                $options: 'i'
            }
        }
        const count = await movieDB.moviesCount(filter)
        const page = Math.ceil(count/18)
        const movies = await movieDB.findMovie(filter, 1, 18)
        movies.forEach((k) => {
            k.typeDesc = typeToDesc[k.type]
        })
        await ctx.render('movie.html', {movies, count, page, search})
    }
    static async movieDetail (ctx) {
        console.log(ctx.params)
        var id = ctx.params.id
        const movies = await movieDB.findOneMovie({id})
        movies.typeDesc = typeToDesc[movies.type]
        await ctx.render('movie-detail.html', {movies})
    }
}
module.exports =  Movies
