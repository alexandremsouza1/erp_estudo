const express = require('express')
const router = express.Router()


router.post('/', (req, res) => {
    //io.sockets.emit("ml-notification-perguntas", req.body)
    res.status(200).send(req.body)
})





module.exports = router