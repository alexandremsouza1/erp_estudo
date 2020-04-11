'use strict'

const express = require('express');
const router = express.Router();
const anuncioService = require('../services/anuncio-service');

router.get('/obter_atributos_por_categoria/:categoria', anuncioService.obterAtributosPorCategoria)
router.get('/total_status', anuncioService.totalStatusAnuncios)
router.get('/', anuncioService.listarTodosAnuncio);
router.get('/:titulo', anuncioService.listarTodosAnuncio)
router.get('/obterValorDoCustoFreteGratisPorAnuncio/:item_id', anuncioService.obterValorDoCustoFreteGratisPorAnuncio)
router.get('/obter_categoria/:itemId', anuncioService.getCategoria)
router.post('/update_listing_type', anuncioService.updateListingType)
router.put('/update_price', anuncioService.updatePrice)
router.put('/update_status', anuncioService.updateStatus)
router.put('/update_title', anuncioService.updateTitle)
router.put('/update_shipping', anuncioService.updateShipping)
router.put('/update_available_quantity', anuncioService.updateAvailableQuantity)
router.put('/update_retirar_pessoalmente', anuncioService.updateRetirarPessoalmente)
router.put('/update_description', anuncioService.updateDescription)
router.put('/update_disponibilidade_estoque', anuncioService.updateDisponibilidadeEstoque)
router.put('/update_garantia', anuncioService.updateGarantia)
router.put('/update_condicao', anuncioService.updateCondicao)
router.put('/update_atributos', anuncioService.updateAtributos)




module.exports = router;
