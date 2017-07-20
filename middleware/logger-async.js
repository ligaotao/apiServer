function log (ctx) {
  console.log(ctx)
}

module.exports = function () {
  return async function (ctx, next) {
    log(ctx)
    await next()
  }
}