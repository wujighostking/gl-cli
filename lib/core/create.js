const program = require('commander')

const createCommond = () => {
  program
    .command('create <project> [other...]')
    .description('clone a repository into a folder')
    .action((project, others) => {
      console.log(project, others)
    })
}

module.exports = createCommond
