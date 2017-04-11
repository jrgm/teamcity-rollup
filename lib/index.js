#!/usr/bin/env node
'use strict'

const P = require('bluebird')
const teamcity = require('teamcity-rest-api')

module.exports = function fetch(options, cb) {
  const testFailures = {}
  const buildDimensions = {
    dimensions: {
      count: options.count,
      state: 'finished',
      canceled: 'false',
      failedToStart: 'false'
    }
  }

  const client = teamcity.create({
    url: options.url,
    username: options.username,
    password: options.password,
    timeout: options.timeout
  })

  client.builds.getByBuildTypeWithCount({ id: options.buildTypeId }, buildDimensions)
    .then(function(buildList) {
      const promised = buildList.build.map((item) => {
        return client.tests.get({ id: item.id })
      })

      P.all(promised)
        .then((results) => {
          results.forEach((tests) => {
            tests.testOccurrence.forEach((testResult) => {
              if (testResult.status === 'FAILURE') {
                if (! testFailures[testResult.name]) {
                  testFailures[testResult.name] = 0
                }
                testFailures[testResult.name] += 1
              }
            })
          })

          return cb(null, testFailures)
        })
        .catch((e) => cb(e))
    })
    .catch((e) => cb(e))
}
