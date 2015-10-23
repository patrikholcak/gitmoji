#!/usr/bin/env node

var exec = require('child_process').exec,
    wemoji = require('wemoji'),
    kexec = require('kexec'),
    path = require('path'),
    cmd = process.argv[2] || process.env.GIT_LOG || 'git --no-pager log --color'

if (process.argv[2] && process.argv[3])
  console.log('Seems like you entered 2 parameters, but gitmoji only supports one.',
    '\nYou should use quotes for commands with arguments.',
    '\nLike this: gitmoji \'git log\'')

var replaceWithEmoji = function (text) {
  return text.replace(/:[a-z]+[0-9]*:/ig, function (str) {
    var glyph = wemoji.name[str.replace(/:/g, '')]

    return glyph ? glyph.emoji : str
  })
}

exec(cmd, function (error, stdout, stderr) {
  if (stderr || error)
    return console.error(stderr || error)

  var text = replaceWithEmoji(stdout)

  if (!text) return

  kexec(path.resolve(__dirname, 'pipe.sh'), [text])
})
