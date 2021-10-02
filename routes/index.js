let express = require('express'), router = express.Router(), favicon = require('serve-favicon')
router.use(favicon(process.cwd() + '/public/favicon.ico'))

router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/index.html')
})

router.get('/api', (req, res) => {
	res.redirect('https://api.indocoder.dev/docs')
})

module.exports = router