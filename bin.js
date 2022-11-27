#!/usr/bin/env node
const process = require("process")
const ytmp3 = require(__dirname)

function bold(x) {
  return `\x1b[1m${x}\x1b[0m`
}

function magenta(x) {
  return `\x1b[35m${x}\x1b[0m`
}

if (process.argv.length < 3 || process.argv.length > 4) {
  console.log(
    `\nThe syntax is: ${bold(
      magenta(`yt-mp3 "some query" [/some/path.mp3]`)
    )}\n`
  )

  process.exit()
}

const query = process.argv[2]
const outfile = process.argv[3]
ytmp3(query, outfile)
