'use strict';

/**
 * @author Felipe Miguel dos Santos
 */

const express = require('express');
const passport = require("passport");
const bodyParser = require('body-parser');
const index = require('../server/src/routes/index-route');
const productRoute = require('../server/src/routes/product-route');
const anuncioRoute = require('../server/src/routes/anuncio.route');
const mercadoLivreRoute = require('../server/src/routes/mercadoLivre-route');
const app = express();
require('../server/src/config/passport-mercadolivre')(passport); //PASSPORT MERCADOLIVRE - INJETANDO O PASSPORT
const cors = require('cors');
const usuarioRoute = require('../server/src/routes/usuario-route');
const session = require('express-session');
const flash = require('connect-flash');
const saldoRoute = require('./src/routes/saldo-route')
//  Adicionar e configurar middleware
app.use(session({
    secret: 'sessionSecretKey',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/products', productRoute);

//Anúncio
app.use('/anuncio', anuncioRoute);

//Mercado Livre
app.use('/', mercadoLivreRoute);

app.use('/usuario', usuarioRoute);

app.use('/saldo', saldoRoute);


module.exports = app;
