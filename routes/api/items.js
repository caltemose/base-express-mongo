const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Item = mongoose.model('Item')

router.get('/', (req, res) => {
    Item.find((err, items) => {
        if (err)
            res.json({ err })

        if (!items)
            res.json({ err: "No items available" })

        res.json(items)
    })
})

module.exports = router
