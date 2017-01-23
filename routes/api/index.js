const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('/api/')
})

router.use('/items', require('./items'))

module.exports = router
