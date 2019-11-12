'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const index = require('./routes/index-route');
const product = require('./routes/product-route');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0-5qx8r.mongodb.net/test?retryWrites=true&w=majority');


app.use(bodyParser.json());
app.use('/', index);
app.use('/products', product);

module.exports = app;
