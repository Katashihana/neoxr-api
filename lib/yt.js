let yts = require('yt-search'), { decode } = require('html-entities'), { servers, yta, ytv } = require('./y2mate'), { shorten } = require('./shorten')

function crop(url) {
	return new Promise(async(resolve, reject) => {
		let sh = await shorten(url)
		if (!sh.status) return resolve(url)
		resolve(sh.data.url)
	})
}

function ytr(url) {
	return new Promise((resolve, reject) => {
		const regex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
		if(!regex.test(url)) return resolve({ status: false })
		let v = regex.exec(url)
		let z = v[1]
        resolve({ status: true, data: z })
    })
}

function music(q) {
	return new Promise(async(resolve, reject) => {
	try {
		let json = await yts(q)
		let yt = json.all.find(video => video.seconds < 3600)
		let { thumb, dl_link, title, filesize, filesizeF } = await yta(yt.url, 'en88')
		let data = {
			title: decode(title),
			thumb: thumb,
			size: filesizeF,
			bytes: filesize,
			duration: yt.seconds + ' (' + yt.timestamp + ')',
			bitrate: '192 kbps',
			link: await crop(dl_link)
		}; resolve({ creator: '@neoxrs – Wildan Izzudin', status: true, data })
	} catch {
		    resolve({ creator: '@neoxrs – Wildan Izzudin', status: false })
		}
	})
}

function video(q) {
	return new Promise(async(resolve, reject) => {
	try {
		let json = await yts(q)
		let yt = json.all.find(video => video.seconds < 3600)
		let { thumb, dl_link, title, filesize, filesizeF } = await ytv(yt.url, 'en88')
		let data = {
			title: decode(title),
			thumb: thumb,
			size: filesizeF,
			bytes: filesize,
			duration: yt.seconds + ' (' + yt.timestamp + ')',
			quality: '480p',
			link: await crop(dl_link)
		}; resolve({ creator: '@neoxrs – Wildan Izzudin', status: true, data })
	} catch {
		    resolve({ creator: '@neoxrs – Wildan Izzudin', status: false })
		}
	})
}

function ytmp3(url) {
	return new Promise(async(resolve, reject) => {
	try {
		let id = await ytr(url)
		if (!id.status) resolve({ creator: '@neoxrs – Wildan Izzudin', status: false })
		let yt = await yts({ videoId: id.data })
		let { thumb, dl_link, title, filesize, filesizeF } = await yta(yt.url, 'en88')
		let data = {
			title: decode(title),
			thumb: thumb,
			size: filesizeF,
			bytes: filesize,
			duration: yt.seconds + ' (' + yt.timestamp + ')',
			bitrate: '192 kbps',
			link: await crop(dl_link)
		}; resolve({ creator: '@neoxrs – Wildan Izzudin', status: true, data })
	} catch {
		    resolve({ creator: '@neoxrs – Wildan Izzudin', status: false })
		}
	})
}

function ytmp4(url) {
	return new Promise(async(resolve, reject) => {
	try {
		let id = await ytr(url)
		if (!id.status) resolve({ creator: '@neoxrs – Wildan Izzudin', status: false })
		let yt = await yts({ videoId: id.data })
		let { thumb, dl_link, title, filesize, filesizeF } = await ytv(yt.url, 'en88')
		let data = {
			title: decode(title),
			thumb: thumb,
			size: filesizeF,
			bytes: filesize,
			duration: yt.seconds + ' (' + yt.timestamp + ')',
			quality: '480p',
			link: await crop(dl_link)
		}; resolve({ creator: '@neoxrs – Wildan Izzudin', status: true, data })
	} catch {
		   resolve({ creator: '@neoxrs – Wildan Izzudin', status: false })
		}
	})
}

function search(q) {
	return new Promise(async(resolve, reject) => {
		let yt = await yts(q)
		let videos = yt.videos.slice(0, 10)
		resolve({ creator: '@neoxrs – Wildan Izzudin', status: true, data: videos })
	})
}

exports.music = music
exports.video = video
exports.ytmp3 = ytmp3
exports.ytmp4 = ytmp4
exports.search = search