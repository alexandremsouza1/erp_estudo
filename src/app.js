'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const index = require('./routes/index-route');
const product = require('./routes/product-route');

const app = express();

app.use(bodyParser.json());
app.use('/', index);
app.use('/products', product);

module.exports = app;
