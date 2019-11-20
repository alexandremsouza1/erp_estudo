'use strict';

const express = require('express');
const passport = require("passport");
const bodyParser = require('body-parser');
const index = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const anuncioRoute = require('./routes/anuncio.route');
const mercadoLivreRoute = require('./routes/mercadoLivre-route');
const app = express();
require('../config/passport-mercadolivre')(passport); //PASSPORT MERCADOLIVRE - INJETANDO O PASSPORT
const cors = require('cors');

//Session
const expressSession = require('express-session');
app.use(expressSession({secret: 'sessionSecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use(bodyParser.json());

//app.use('/', index);

app.use('/products', productRoute);

//Anúncio
app.use('/anuncio', anuncioRoute);

//Mercado Livre
app.use('/', mercadoLivreRoute);






module.exports = app;
