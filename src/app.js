'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const index = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const anuncioRoute = require('./routes/anuncio.route')

const app = express();

app.use(bodyParser.json());
app.use('/', index);
app.use('/products', productRoute);

//Anúncio
app.use('/anuncio', anuncioRoute);

module.exports = app;
