const badapple = require("./badapple.json")

const iv = setInterval(_ => {
	const frame = badapple.frames.shift()

	if (frame) {
		console.clear()
		console.log(frame)
	} else
		clearInterval(iv)
	
}, 1000 / badapple.fps)
