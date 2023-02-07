const { promisify } = require('util')
const { commondSpawn } = require('../utils/terminal')
const download = promisify(require("download-git-repo"))
const createProjectAction = async (project, other) => {
  /**
   * 1.创建文件夹
   * 2.clone远程仓库
   * 3.npm install
   * 4.npm run dev
   */
  //  https://gitee.com/wujighostking/webgl_test.git


  await download('direct:https://gitee.com/ny3/web-side.git', project, { clone: true })

  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commondSpawn(npm, ['install'], {cwd: `./${project}`})

  await commondSpawn(npm, ['run', 'serve'], {cwd: `./${project}`})

}

module.exports = {
  createProjectAction
}

