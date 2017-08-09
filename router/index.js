const router = require('koa-router')()
const UserControl = require('../controller/user')
const Blog = require('../controller/git')
router
  .get('/api/movies', UserControl.getMovies)
  .get('/api/moviesMore', UserControl.getMoviesMore)
  .get('/api/updateBlog', Blog.updataBlog)
  .get('/user', async function (ctx) {
    ctx.state = {
      session: this.session,
      title: 'app'
    }
    await ctx.render('user.html')
  })
module.exports = router
