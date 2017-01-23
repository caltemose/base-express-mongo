const express = require('express')
const mongoose = require('mongoose')

const errors = require('./middleware/errors')
const middleware = require('./middleware')
const models = require('./models')

// NOTE these would be config defaults for DEV but ultimately would
// be handled by reading environment variables or something more appropriate
const config = {
    port: 4444,
    mongoUrl: 'mongodb://localhost/base-mongo-express'
}

const app = express()

// NOTE this debugging should only be enabled in dev mode/ENV
mongoose.set('debug', true)

// NOTE this approach means that you have no express server if there is
// no connection to the database. In our case, that's fine but probably not
// the best solution for a real project given that you're likely to want to
// show something to the user rather than "Site not available."
mongoose.connect(config.mongoUrl, (err) => {
    if (err) throw err;

    middleware(app)
    app.use('/', require('./routes'))
    errors(app)

    app.listen(config.port, () => {
        console.log('Express running on port:', config.port)
    })
})
