# teamcity-rollup
Summarize test failure counts in last N test runs

  Usage: index [options]

  Options:

    -h, --help                output usage information
    -c --count [count]        Number of test runs to summarize (default: 6)
    -b --build-type-id [id]   Name of the test configuration to summarize (default: 'fxa_StageTests')
    -u --username [username]  Teamcity Username (default: process.env.TEAMCITY_USERNAME)
    -p --password [password]  Teamcity Password (default: process.env.TEAMCITY_PASSWORD)
    --url [url]               Teamcity scheme://hostname (default: 'https://tc-test.dev.lcip.org')
