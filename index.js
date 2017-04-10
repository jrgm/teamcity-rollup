#!/usr/bin/env node
'use strict'

const commander = require('commander')
var fetch = require('./lib')

function options() {
  commander
    .option('-c --count [count]', 'Number of test runs to summarize', 6)
    .option('-b --build-type-id [id]', 'Name of the test configuration to summarize', 'fxa_StageTests')
    .option('-u --username [username]', 'Teamcity Username', process.env.TEAMCITY_USERNAME)
    .option('-p --password [password]', 'Teamcity Password', process.env.TEAMCITY_PASSWORD)
    .option('--url [url]', 'Teamcity scheme://hostname', 'https://tc-test.dev.lcip.org')
    .parse(process.argv)

  return commander
}

fetch(options(), (err, result) => {
  if (err) {
    throw err
  }

  Object.keys(result).sort((a, b) => result[b] - result[a]).forEach((key) => {
    let testName = key.replace('firefox on any platform: ', '')
    console.log(result[key], testName)
  })
})
