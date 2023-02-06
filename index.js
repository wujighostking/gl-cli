#!/usr/bin/env node

const program = require('commander')
const createCommond = require('./lib/core/create')
const helpOptions = require('./lib/core/help')
const packageConfig = require('./package.json')
// 查看版本号
program.version(packageConfig.version)

helpOptions()
createCommond()

// 命令行解析
program.parse(process.argv)

