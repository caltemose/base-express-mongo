const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Item = mongoose.model('Item')

// READ
router.get('/', (req, res) => {
    Item.find((err, items) => {
        if (err)
            return res.json({ err })

        if (!items)
            return res.json({ err: "No items available" })

        res.json(items)
    })
})

// CREATE
router.post('/', (req, res) => {
    if (!req.body.name)
        return res.status(400).json({ err: "You must provide an item name" })

    Item.create({ name: req.body.name }, (err, item) => {
        if (err)
            return res.status(503).json({ err })

        res.json(item)
    })
})

// UPDATE
router.put('/', (req, res) => {
    if (!req.body._id || !req.body.name)
        return res.status(400).json({ err: "You must provide an _id and a name of an item to edit." })

    Item.update({ _id: req.body._id}, { $set: { name: req.body.name }}, (err) => {
        if (err)
            return res.status(503).json({ err })

        res.json({ _id: req.body._id })
    })
})

// DELETE
router.delete('/', (req, res) => {
    if (!req.body._id)
        return res.status(400).json({ err: "You must supply an _id of an item to delete" })

    Item.findByIdAndRemove(req.body._id, (err, document) => {
        // TODO determine how to send the correct error code
        if (err) {
            if (err.name === 'CastError')
                return res.status(400).json({ err: "An improperly formed _id was provided." })

            return res.json({ err })
        }

        if (!document)
            return res.status(400).json({ err: "No document was found with the given _id" })

        res.json({ document })
    })
})

module.exports = router
