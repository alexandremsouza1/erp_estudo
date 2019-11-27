const express = require('express')
const router = express.Router()
const vendasService = require('../services/vendas-service')


router.get('/', vendasService.obterTotalDeVendas)

module.exports = router