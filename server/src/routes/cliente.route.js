const express = require('express')
const router = express.Router()
const clientService = require('../services/cliente-service')

router.get('/', clientService.obterDadosCliente)

module.exports = router