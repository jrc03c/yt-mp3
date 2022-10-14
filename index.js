const { Innertube } = require("youtubei.js")
const { kebabify } = require("@jrc03c/js-text-tools")
const { WritableStream } = require("node:stream/web")
const fs = require("fs")

Innertube.create().then(yt => {
  const query = "Lo-Fang #88"

  yt.search(query).then(search => {
    if (search.results.length > 0) {
      const result = search.results[0]
      const id = result.id
      const filename = kebabify(result.title.text) + ".mp3"

      yt.download(id, {
        type: "audio",
        quality: "best",
        format: "mp4",
      }).then(stream => {
        const file = fs.createWriteStream(filename)

        const writableStream = new WritableStream({
          write(chunk) {
            file.write(chunk)
          },
        })

        stream.pipeTo(writableStream)
      })
    } else {
      throw new Error(`No results for the query "${query}"!`)
    }
  })
})
