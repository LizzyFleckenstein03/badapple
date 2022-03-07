const fs = require("fs").promises
const seurat = require("seurat")
const ffmpegExtractFrames = require("ffmpeg-extract-frames")
const imageSize = require("image-size")

const fps = 1.0
const limit = 2000
const url = "https://www.youtube.com/watch?v=9lNZ_Rnr7Jc"

fs.rm("frames", {recursive: true, force: true})
	.then(_ => fs.mkdir("frames"))
	.then(_ => ffmpegExtractFrames({
		input: "bad_apple.mkv",
		output: "frames/%5d.png",
		fps
	}))
	.then(_ => fs.readdir("frames"))
	.then(files => {
		const dimensions = imageSize("frames/00001.png")
		const ratio = dimensions.width / dimensions.height
		const size = Math.sqrt(limit)
			
		return Promise.all(files.map(file =>
			seurat.convert("frames/" + file, {
				width:  Math.floor(size * ratio),
				height: Math.floor(size / ratio),
				threshold: 25,
			})))
	})
	.then(frames => fs.writeFile("badapple.json", JSON.stringify({fps, frames})))
/**/
