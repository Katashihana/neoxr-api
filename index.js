let express = require('express'), path = require('path'), cookieParser = require('cookie-parser'), logger = require('morgan')
let indexRouter = require('./routes/index'), apiRouter = require('./routes/api')
let PORT = process.env.PORT || 8080

global.creator = '@neoxrs – Wildan Izzudin'
global.apikey = [ 'neoxr' ] // ApiKey
global.status = {
	query: {
        creator: global.creator,
	status: false,
        msg: 'Missing \'q\' parameter!'
    },
    url: {
        creator: global.creator,
	status: false,
	msg: 'Missing \'url\' parameter!'
    },
    apikey: {
        creator: global.creator,
	status: false,
	msg: 'Missing \'apikey\' parameter!'
    },
    invalidKey: {
        creator: global.creator,
        status: false,
        msg: 'ApiKey is invalid!'
    },
    invalidURL: {
        creator: global.creator,
        status: false,
        msg: 'URL is invalid'
    },
    error: {
        status: false,
        creator: global.creator,
        msg: 'Page Not Found!'
    }
}

const app = express()
app.set('json spaces', 2)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', indexRouter)
app.use('/api', apiRouter)
app.get('*', function(req, res){
    res.status(404).json(global.status.error)
})

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))
