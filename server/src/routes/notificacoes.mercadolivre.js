const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    console.log(req.bod)
    res.status(200).send(req.body)
})

module.exports = router