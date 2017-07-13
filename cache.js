class cache {
  static getData (key) {
    let time = +new Date()
    if (cache[key] && (time - cache[key].time < cache.validTime)) {
       console.log('有效时间还有', cache.validTime - time + cache[key].time, 'ms')
       return cache[key].data
    } else {
      return false
    }
  }
  static setData (key, data) {
    let time = +new Date()
    cache[key] = {
      time,
      data
    }
  }
}
cache.validTime = 1000 * 100
module.exports = cache