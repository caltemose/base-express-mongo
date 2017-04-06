const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const sleep = require('sleep')
const Item = mongoose.model('Item')

// READ
router.get('/', (req, res) => {
    Item.find((err, items) => {
        if (err)
            return res.json({ err })

        if (!items)
            return res.json({ err: "No items available." })

        res.json(items)
    })
})

// CREATE
router.post('/', (req, res) => {
    sleep.sleep(1)

    if (!req.body.name)
        return res.status(400).json({ err: "You must provide an item name." })

    // check for unique names before creating a new item document
    Item.find({ name: req.body.name }).then((doc) => {
        if (doc.length) {
            return res.status(400).json({ err: "You must provide a unique item name." })
        } else {
            Item.create({ name: req.body.name }, (err, item) => {
                if (err)
                    return res.status(503).json({ err })

                res.json(item)
            })
        }
    })
})

// UPDATE
router.put('/', (req, res) => {
    sleep.sleep(1)

    if (!req.body._id || !req.body.name)
        return res.status(400).json({ err: "You must provide an _id and a name of an item to edit." })

    // check to see that the edited name is unique in the database
    Item.find({ name: req.body.name }).then((doc) => {
        // reject if name is not unique unless the match is the document
        // specified by the provided _id of the item being edited.
        // TODO check doc array, not just first item
        if (doc.length && doc[0]._id.toString() !== req.body._id) {
            return res.status(400).json({ err: "You must provide a unique item name.", foundDoc: doc[0], providedId: req.body._id })
        } else {
            Item.update({ _id: req.body._id}, { $set: { name: req.body.name }}, (err) => {
                if (err)
                    return res.status(503).json({ err })

                res.json({ _id: req.body._id })
            })
        }
    })
})

// DELETE
router.delete('/:_id', (req, res) => {
    if (!req.params._id)
        return res.status(400).json({ err: "You must supply an _id of an item to delete." })

    Item.findByIdAndRemove(req.params._id, (err, document) => {
        // TODO determine how to send the correct error code
        if (err) {
            if (err.name === 'CastError')
                return res.status(400).json({ err: "An improperly formed _id was provided." })

            return res.json({ err })
        }

        if (!document)
            return res.status(400).json({ err: "No document was found with the given _id." })

        res.json({ document })
    })
})

module.exports = router
