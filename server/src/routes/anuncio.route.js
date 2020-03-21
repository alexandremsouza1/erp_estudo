'use strict'

const express = require('express');
const router = express.Router();
const anuncioService = require('../services/anuncio-service');

router.get('/total_status', anuncioService.totalStatusAnuncios)
router.get('/', anuncioService.listarTodosAnuncio);
router.get('/:titulo', anuncioService.listarTodosAnuncio)
router.post('/post', anuncioService.salvar);
router.post('/update_listing_type', anuncioService.updateListingType)
router.put('/update_price', anuncioService.updatePrice)
router.put('/update_status', anuncioService.updateStatus)
router.put('/update_available_quantity', anuncioService.updateAvailableQuantity)



module.exports = router;
