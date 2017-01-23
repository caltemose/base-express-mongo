const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Item = mongoose.model('Item')

router.get('/', (req, res) => {
    Item.find((err, items) => {
        if (err)
            return res.json({ err })

        if (!items)
            return res.json({ err: "No items available" })

        res.json(items)
    })
})

router.post('/', (req, res) => {
    if (!req.body.name)
        return res.status(400).json({ err: "You must provide an item name" })

    Item.create({ name: req.body.name }, (err, item) => {
        if (err)
            return res.status(503).json({ err })

        res.json(item)
    })
})

module.exports = router
