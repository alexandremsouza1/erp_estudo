const express = require('express')
const router = express.Router()
const clientService = require('../services/cliente-service')

router.get('/', clientService.obterDadosClient)
router.get('/rastreamento', clientService.rastreamento)

module.exports = router