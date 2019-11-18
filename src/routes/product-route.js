"use strict"

const express = require("express");
const productController = require('../controllers/product-controller');
const router = express.Router();

router.post('/', productController.post);

router.put('/put/:id', productController.put);

router.get('/product/all', productController.listarTodosProdutos);

router.get('/product/findby/:id', productController.listarProdutoPorID);

module.exports = router;