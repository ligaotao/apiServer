const execSync = require('child_process').execSync;

exports.updataBlog = function (ctx) {
    const cmdCd = 'cd c:/web/Blog'
    const cmdGit = 'git pull'
    try {
        execSync(cmdCd)
        execSync(cmdGit)
        ctx.body = '成功'
    } catch (err) {
        ctx.body = '失败'
        console.log('更新失败' + err)
    }
}