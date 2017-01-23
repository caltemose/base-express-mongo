const express = require('express')

const config = {
    port: 4444
}

const app = express()

app.get('/', (req, res) => {
    res.send('hi there.')
})

app.listen(config.port, () => {
    console.log('Express running on port:', config.port)
})
