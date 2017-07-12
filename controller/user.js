class UserControl {
  static async login (ctx) {
    let test = {
      status: 200,
      massage: '响应成功',
      data: {
        msg: 'hello world'
      }
    }
    ctx.body = JSON.stringify(test)
  }
}

module.exports =  UserControl
