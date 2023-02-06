const program = require('commander')

const helpOptions = () => {
  program.option('-w --gl', 'a gl cli')

  program.on('--help', () => {
    console.log('')
    console.log('Options:')
    console.log(' other options:')
  })
}

module.exports = helpOptions
