#!/usr/bin/env node

exec = require('child_process').exec
wemoji = require('wemoji')
fs = require('fs')
cmd = process.argv[2] || 'git log'

exec(cmd, function (error, stdout, stderr) {
  lines = stdout.split('\n')

  for (var i = lines.length - 1; i >= 0; i--) {
    lines[i] = lines[i].replace(/:([^\s]+?):/, function (text, index) {
      glyph = wemoji.name[text.replace(/\:/g, '')]
      return glyph ? glyph.emoji : text
    })
  }

  console.log(lines.join('\n'))
})