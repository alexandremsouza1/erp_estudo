'use strict'

const express = require('express');
const router = express.Router();

//Importando o controller
const anuncioService = require('../services/anuncio-service');

router.get('/', anuncioService.listarTodosAnuncio);
router.post('/post', anuncioService.salvar);
router.put('/put/:id', anuncioService.atualizar);

module.exports = router;
