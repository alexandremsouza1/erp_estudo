"use strict"

const express = require("express");
const productController = require('../controllers/product-controller');
const router = express.Router();

router.post('/', productController.post);

router.put('/:id', productController.put);

module.exports = router;