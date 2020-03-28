const express = require('express')
const router = express.Router()
const comunicadoVendedorService = require("../services/comunicadoVendedor-service")

router.get('/', comunicadoVendedorService.obteComunicadoVendedor)

module.exports = router