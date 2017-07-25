const router = require('koa-router')()
const UserControl = require('../controller/user')
const Blog = require('../controller/git')
router
  .get('/api/movies', UserControl.getMovies)
  .get('/api/moviesMore', UserControl.getMoviesMore)
  .get('/api/updateBlog', Blog.updataBlog)
module.exports = router
