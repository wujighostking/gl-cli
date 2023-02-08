const { spawn } = require('child_process')

const commondSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => resolve(true))
  })
}

module.exports = {
  commondSpawn
}

