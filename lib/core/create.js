const program = require('commander')
const { createProjectAction } = require('./actions')

const createCommond = () => {
  program
    .command('create <project> [other...]')
    .description('clone a repository into a folder')
    .action(createProjectAction)
    
}

module.exports = createCommond
