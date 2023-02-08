const { promisify } = require('util')
const { VUE_TEMPLATE_URL, REACT_TEMPLATE_URL } = require('../config')
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

  // 获取创建模板类型和构建工具
  let frameType, structureTool, customRepository
  other.forEach(param => {
    if (!frameType) frameType = getParam(param, 'template')
    if (!structureTool) structureTool = getParam(param, 'devtool')
    if (!customRepository) customRepository = getParam(param, 'repo')
  })

  let isInstallFinal = false
  const npm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'

  const isInstall = await downloadTemplate(frameType, project, customRepository)
  isInstall && (isInstallFinal = await commondSpawn(npm, ['install'], { cwd: `./${project}` }))

  isInstallFinal && run(npm, structureTool)

  // webpack --> await commondSpawn(npm, ['run', 'serve'], {cwd: `./${project}`})
  // vite --> await commondSpawn(npm, ['run', 'dev'], {cwd: `./${project}`})
}

const getParam = (param, key) => {
  if (param.includes(key)) {
    return param.split('=')[1]
  }
}

const downloadTemplate = async (frameType = 'vue', projectName, customRepository) => {
  if (customRepository) {
    await download(`direct:${customRepository}`, projectName, { clone: true })
    return false
  } else if (frameType === 'vue') {
    await download(VUE_TEMPLATE_URL, projectName, { clone: true })
    return true
  } else if (frameType === 'react') {
    await download(REACT_TEMPLATE_URL, projectName, { clone: true })
    return true
  }
}

const run = async (npm, structureTool) => {
  if (structureTool === 'webpack') await commondSpawn(npm, ['run', 'serve'], {cwd: `./${project}`})
  if (structureTool === 'vite') await commondSpawn(npm, ['run', 'dev'], {cwd: `./${project}`})
}

module.exports = {
  createProjectAction
}

