const express = require('express')
const router = express.Router()
const msgPosVenda = require('../services/msgPosVenda-service')


router.get('/', msgPosVenda.obterMensagemPosVenda)

module.exports = router