'use strict'

const express = require('express');
const router = express.Router();

//Importando o controller
const anuncioController = require('../controllers/anuncio-controller');

router.get('/', anuncioController.listarTodosAnuncio);
router.post('/post', anuncioController.salvar);
router.put('/put/:id', anuncioController.atualizar);

module.exports = router;
