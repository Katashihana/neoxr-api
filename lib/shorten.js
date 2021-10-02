let fetch = require('node-fetch'), cheerio = require('cheerio')

function shorten(url) {
	return new Promise(async(resolve, reject) => {
		let params = new URLSearchParams()
		params.append('url', url)
		let html = await (await fetch('https://is.gd/create.php', { method: 'POST', body: params })).text()
		$ = cheerio.load(html)
		let link = $('input[class="tb"]').attr('value')
		if (typeof link == 'undefined' || link == '') return resolve({ creator: global.creator, status: false })
		resolve({ creator: global.creator, status: true, data: { url: link }})
	})
}

module.exports = { shorten }