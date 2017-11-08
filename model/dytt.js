const request = require('superagent')
const cheerio = require('cheerio')
require('superagent-charset')(request)

class Movies {
  constructor () {
    this.root = 'http://www.dytt8.net'
  }
  async homeHtmlList () {
    return request.get(`${this.root}/index.htm`).charset('gbk')
  }
  async urlToRequest (url) {
    return request.get(`${this.root + url}`).charset('gbk')
  }
  async moviesMore (more) {
    let res = await this.urlToRequest(more)
    const $ = cheerio.load(res.res.text)
    const img = $('#Zoom').find('img')
    const url = $('#Zoom a').attr('href')
    return {
      banner: img.eq(0).attr('src'),
      url,
      meta: $('#Zoom p').eq(0).text(),
      thumb: img.eq(1).attr('src')
    }
  }
  async newMovie (page) {
    let url = `/html/gndy/dyzz/list_23_${page}.html`
    let res = await this.urlToRequest(url)
    const $ = cheerio.load(res.res.text)
    const $movie = $('.co_content8 table').toArray()
    const total = $('[name=sldd] option:last-child').text() // 获取共多少页
    var arrList = []
    $movie.forEach(k => {
      var $dom = $(k).find('a')
      arrList.push({
        txt: $dom.text(),
        url: $dom.attr('href')
      })
    })
    return {
      list: arrList,
      page: page,
      total: total
    }
  }
  async list (movieKey) {
    let res = await this.homeHtmlList()
    const $ = cheerio.load(res.res.text)
    const $bdr = $('.bd3r .bd3rl').toArray()
    var arrList = []
    $bdr.forEach(k => {
      var dom = $(k).find('.co_area2')
      dom.each((ii, kk) => {
        arrList.push(kk)
      })
    })
    // rightDom.push($('.bd3rl').eq(1).find('.co_area2').toArray())
    var movie = {
      newMovie: [],
      xunLei: [],
      dianShiCn: [],
      dianShiUs: [],
      xunLeiZongYi: [],
      DongMan: []
    }
    var list = ['newMovie', 'xunLei', 'dianShiCn', 'dianShiUs', 'xunLeiZongYi', 'DongMan']
    // 最新电影 迅雷电影 华语剧集 欧美剧集
    list.forEach((k, i) => {
      var $dom = $(arrList[i]).find('table td:first-child')
      $dom.each((ii, kk) => {
        var dom = $(kk).find('a').eq(1)
        var txt = dom.text()
        var url = dom.attr('href')
        movie[k].push({
          txt,
          url
        })
      })
    })
    if (movieKey && movieKey in movie) {
      return movie[movieKey]
    } else {
      return movie
    }
  }
}

module.exports = new Movies()