const express = require('express')

const errors = require('./middleware/errors')

const config = {
    port: 4444
}

const app = express()

app.use('/', require('./routes'))

errors(app)

app.listen(config.port, () => {
    console.log('Express running on port:', config.port)
})
