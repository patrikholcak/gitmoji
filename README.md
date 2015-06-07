![Emojified Git log](https://upx.cz/iefgk0n5zjbpjevrrfgs1wp7jc20t6y2slwlg0rz?img.png)

## Usage
1. `npm i gitmoji —g`
2. at this point, you should be able to run `gitmoji` command.
3. create alias in your `.bash_profile`. Like this: `alias l='gitmoji "git lg" | less -r` — you can pass your own git log command as the first arg

## Known bugs
As there isn’t any nice way to pipe gitmoji to less in node atm, you need to pipe it yourself with the `-r` option.