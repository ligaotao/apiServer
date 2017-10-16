const router = require('koa-router')()
const UserControl = require('../controller/user')
const MoviesControl = require('../controller/list')
const Blog = require('../controller/git')
router
  .get('/api/movies', MoviesControl.apiMovies)
  .get('/api/moviesMore', UserControl.getMoviesMore)
  .get('/api/updateBlog', Blog.updataBlog)
  .get('/list', MoviesControl.getList)
  .get('/', MoviesControl.home)
  .get('/movie', MoviesControl.movie)
  .get('/movie/detail/:id', MoviesControl.movieDetail)
module.exports = router
