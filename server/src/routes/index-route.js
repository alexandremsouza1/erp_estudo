"use strict"

const express = require("express");
const passport = require("passport");
const router = express.Router();
require('../../src/config/passport-mercadolivre');

router.get('/', (req, res, next) => {

    res.status(200).send({mensagem: "Servidor funcionando!"});

});


module.exports = router;