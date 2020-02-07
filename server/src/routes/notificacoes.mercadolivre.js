const express = require('express')
const router = express.Router()

module.exports = (io) => {

    router.post('/', (req, res) => {
        io.emit('notification-ml-perguntas', req.body)
        res.send(req.body)
    })

    return router
}



