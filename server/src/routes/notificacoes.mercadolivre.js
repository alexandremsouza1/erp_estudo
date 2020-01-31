const express = require('express')
const app = express()
const router = express.Router()
const http = require("http").createServer(app)
const io = require('socket.io')(http)

router.post('/', (req, res) => {
    //io.sockets.emit("ml-notification-perguntas", req.body)
    res.status(200).send(req.body)
})

io.on('connection', function (socket) {
    //socket.emit('news', { hello: 'world' });
    socket.emit('ml-notification-perguntas', function (data) {
      console.log(data);
    });
  });




module.exports = router