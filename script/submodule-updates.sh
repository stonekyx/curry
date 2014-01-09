#!/bin/bash
grep path .gitmodules | awk '{ print $3 }' > ./tmp-submodule-dirs

#read
while read LINE
do
  echo "updating" $LINE "..."
  (cd ./$LINE && git checkout master && git pull)
done < ./tmp-submodule-dirs

rm -rf ./tmp-submodule-dirs
