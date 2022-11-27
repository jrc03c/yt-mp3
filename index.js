const { Innertube } = require("youtubei.js")
const { kebabify } = require("@jrc03c/js-text-tools")
const { WritableStream } = require("node:stream/web")
const fs = require("fs")
const path = require("path")

module.exports = function ytmp3(query, outfile) {
  return new Promise((resolve, reject) => {
    try {
      return Innertube.create().then(async yt => {
        console.log("Searching for:", query)

        const search = await yt.search(query)

        if (search.results.length > 0) {
          const result = search.results[0]
          const id = result.id

          const filename = path.resolve(
            outfile || kebabify(result.title.text) + ".mp3"
          )

          console.log(`Found: "${result.title.text}"`)
          console.log("Downloading...")

          const stream = await yt.download(id, {
            type: "audio",
            quality: "best",
            format: "mp4",
          })

          const file = fs.createWriteStream(filename)

          const writableStream = new WritableStream({
            write(chunk) {
              file.write(chunk)
            },

            close() {
              console.log(`Saved to: ${filename}`)
              return resolve()
            },
          })

          stream.pipeTo(writableStream)
        } else {
          console.log("No results found!")
          return null
        }
      })
    } catch (e) {
      return reject(e)
    }
  })
}
