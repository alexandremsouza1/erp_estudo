const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr: server');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0-5qx8r.mongodb.net/test?retryWrites=true&w=majority');

const port = process.env.PORT || 5000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`API rodando na porta: ${port}`);
});


