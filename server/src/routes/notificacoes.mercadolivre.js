const express = require('express')
const router = express.Router()
const axios = require('axios')
const keys = require('../config/keys')
const meli = require('mercadolibre');


var meliObject = new meli.Meli(keys.mercadolivre.CLIENT_ID, keys.mercadolivre.CLIENT_SECRET)

router.get('/oauth/redirect', (req, res) => {
    res.redirect(meliObject.getAuthURL('http://localhost:3000'))
})



module.exports = router