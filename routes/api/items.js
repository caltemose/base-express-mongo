const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const items = [
        { _id: '1', name: 'one' },
        { _id: '2', name: 'two' },
        { _id: '3', name: 'three' }
    ]
    res.json({ items })
})

module.exports = router
