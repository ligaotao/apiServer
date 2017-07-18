const router = require('koa-router')()
const UserControl = require('../controller/user')
router
  .get('/api/movies', UserControl.getMovies)
  .get('/api/moviesMore', UserControl.getMoviesMore)
module.exports = router
