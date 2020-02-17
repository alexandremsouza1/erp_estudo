const express = require('express')
const router = express.Router()
const clientService = require('../services/cliente-service')

router.get('/', clientService.obterDadosCliente)
router.get('/obterDadosVendasPorCliente/:id', clientService.obterDadosVendasPorCliente)


module.exports = router