![Emojified Git log](https://upx.cz/s8e4gaou9sziupchin614it54fn2iuhmlkhab92c?gitmoji.png)

## Usage
1. `npm i gitmoji —g`
2. You can now use `gitmoji` in your terminal!

## Custom git log command
You can run `gitmoji <git log cmd>` or set `GIT_LOG` env variable to customize the git log command. The default log gitmoji uses is `git log`.

## $PAGER
Gitmoji respects your default pager (`$PAGER` or git’s `core.pager`). If none of these variables is set, `less -rX` is used as the pager.
