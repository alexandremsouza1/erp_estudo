const express = require('express')
const router = express.Router()
const saldoService = require('../services/saldo-service')


router.get('/', saldoService.obterSaldo);

module.exports = router