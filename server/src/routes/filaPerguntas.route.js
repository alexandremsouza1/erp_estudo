const express = require('express')
const router = express.Router()
const filaNotifService = require('../services/filaPerguntas-service')

router.get('/fila_perguntas', filaNotifService.obterPerguntasNaoRespondidas)

module.exports = router