#!/bin/bash
file="indonesia_map_slothNinja.svg"
inkscape $file -d 67,85 -e ${file%.svg}.png
pngquant ${file%.svg}.png --strip -f -o ${file%.svg}_tiny.png
# convert ${file%.svg}_tiny.png -resize 1190 ${file%.svg}_1190.png
