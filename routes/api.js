let express = require('express'), router = express.Router(), yt = require('../lib/yt')

router.get('/music', async (req, res) => {
	let q = req.query.q
	let apikey = req.query.apikey
	if (!q) return res.json(global.status.query)
	if (!apikey) return res.json(global.status.apikey)
	if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
	let result = await yt.music(q)
	res.header('Content-Type: application/json')
	res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/video', async (req, res) => {
	let q = req.query.q
	let apikey = req.query.apikey
	if(!q) return res.json(global.status.query)
	if (!apikey) return res.json(global.status.apikey)
	if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
	let result = await yt.video(q)
	res.header('Content-Type: application/json')
	res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/yta', async (req, res) => {
	let url = req.query.url
	let apikey = req.query.apikey
	if (!url) return res.json(global.status.url)
	if (!url.match('youtu.be') && !url.match('youtube.com')) return res.json(global.status.invalidURL)
	if (!apikey) return res.json(global.status.apikey)
	if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
	let result = await yt.ytmp3(url)
	res.header('Content-Type: application/json')
	res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/ytv', async (req, res) => {
	let url = req.query.url
	let apikey = req.query.apikey
	if (!url) return res.json(global.status.url)
	if (!url.match('youtu.be') && !url.match('youtube.com')) return res.json(global.status.invalidURL)
	if (!apikey) return res.json(global.status.apikey)
	if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
	let result = await yt.ytmp4(url)
	res.header('Content-Type: application/json')
	res.type('json').send(JSON.stringify(result, null, 2))
})

router.get('/yts', async (req, res) => {
	let q = req.query.q
	let apikey = req.query.apikey
	if(!q) return res.json(handle.query)
	if (!apikey) return res.json(global.status.apikey)
	if (!global.apikey.includes(apikey)) return res.json(global.status.invalidKey)
	let result = await yt.search(q)
	res.header('Content-Type: application/json')
	res.type('json').send(JSON.stringify(result, null, 2))
})

module.exports = router