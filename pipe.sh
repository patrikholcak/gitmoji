#!/bin/bash

pager='less -rX'
gitPager=$(git config --global core.pager)

if ! [[ $gitPager == "" ]]; then
  pager=$gitPager
elif ! [[ -z "$PAGER" ]]; then
  pager=$PAGER
fi

echo "$1" | $pager
