# Intro

`yt-mp3` is just a thin wrapper around [youtube.js](https://github.com/LuanRT/YouTube.js) for downloading videos as MP3s.

# Installation

```bash
npm install --save https://github.com/jrc03c/yt-mp3
```

# Usage

Node:

```js
const ytmp3 = require("yt-mp3")
const query = "Lo-Fang #88"
const outfile = "~/Downloads/lo-fang-88.mp3"
ytmp3(query, outfile)
```

Where the `outfile` parameter is optional.

CLI:

```bash
yt-mp3 "Lo-Fang #88" ~/Downloads/lo-fang-88.mp3
```

The output file path is also optional here.
