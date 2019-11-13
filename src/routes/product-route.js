"use strict"

const express = require("express");
const productController = require('../controllers/product-controller');
const router = express.Router();

router.post('/', productController.post);

router.put('/:id', productController.put);

router.get('/product/all', productController.listarTodosProdutos);

router.get('/product/key/:id', productController.listarProdutoPorID);

module.exports = router;