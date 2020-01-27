const express = require('express')
const router = express.Router()
const vendasService = require('../services/vendas-service')

router.get('/getTotalDeVendas', vendasService.obterTotalDeVendas)
router.get('/getVendasConcluidas', vendasService.obterVendasConcluidas)
router.get('/getVendasPendentes', vendasService.obterVendasPendentes)
router.get('/getVendasEmTransito', vendasService.obterVendasEmTransito)
router.get('/getTotalVendas', vendasService.obterTotalVendas)
router.get('/getTotalVendasPendentes', vendasService.obterTotalVendasPendentes)
router.get('/getVendasAEnviar', vendasService.obterVendaProntoParaEnviar)
router.get('/imprimirEtiquetaEnvio/:shipping_id', vendasService.imprimirEtiquetaEnvio)

module.exports = router