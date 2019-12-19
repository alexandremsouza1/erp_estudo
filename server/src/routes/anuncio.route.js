'use strict'

const express = require('express');
const router = express.Router();

//Importando o controller
const anuncioService = require('../services/anuncio-service');

router.get('/', anuncioService.listarTodosAnuncio);
router.get('/:titulo', anuncioService.listarTodosAnuncio)
router.post('/post', anuncioService.salvar);
router.put('/put/:id', anuncioService.atualizar);
router.put('/:itemId/:price', anuncioService.updatePrice)


module.exports = router;
