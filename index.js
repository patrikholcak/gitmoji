#!/usr/bin/env node

var exec = require('child_process').exec,
    wemoji = require('wemoji'),
    fs = require('fs'),
    kexec = require('kexec'),
    path = require('path'),
    tmp = require('tmp'),
    cmd = process.argv[2] || process.env.GIT_LOG || 'git --no-pager log --color'

if (process.argv[2] && process.argv[3])
  console.log('Seems like you entered 2 parameters, but gitmoji only supports one.',
    '\nYou should use quotes for commands with arguments.',
    '\nLike this: gitmoji \'git log\'')

if (!fs.existsSync(path.join(process.cwd(), '.git')))
  return console.log('Current folder is not a valid git folder!')

var replaceWithEmoji = function (text) {
  return text.replace(/:[a-z]+[0-9]*:/ig, function (str) {
    var glyph = wemoji.name[str.replace(/:/g, '')]

    return glyph ? glyph.emoji : str
  })
}

var writeFile = function (text, callback) {
  tmp.file({keep: true}, function (err, path, fd) {
    if (err) return err

    var tmpFile = fs.createWriteStream(null, {fd: fd})

    tmpFile.on('finish', function () {
      callback(path)
    })

    tmpFile.end(text)
  })
}

exec(cmd, function (error, stdout, stderr) {
  if (error || stderr)
    return console.error('Error executing log parameter: \'' + cmd + '\'\n',
      error || stderr)

  var text = replaceWithEmoji(stdout)

  if (!text) return

  writeFile(text, function (tmpPath) {
    kexec(path.resolve(__dirname, 'pipe.sh'), [tmpPath])
  })
})
