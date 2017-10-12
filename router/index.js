const router = require('koa-router')()
const UserControl = require('../controller/user')
const MoviesControl = require('../controller/list')
const Blog = require('../controller/git')
router
  .get('/api/movies', UserControl.getMovies)
  .get('/api/moviesMore', UserControl.getMoviesMore)
  .get('/api/updateBlog', Blog.updataBlog)
  .get('/list', MoviesControl.getList)
  .get('/home', MoviesControl.home)
module.exports = router
