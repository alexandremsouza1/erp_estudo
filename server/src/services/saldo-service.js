'use strict';

const axios = require('axios')
const constants = require('../constants/constants')
const usuarioService = require("../services/usuario-service");

exports.obterSaldo = (req, res, next) => {
    usuarioService.buscarUsuarioPorID().then(resp => {
        axios.get(`https://api.mercadolibre.com/users/${resp.id}/mercadopago_account/balance?access_token=${resp.accessToken}`).then(resp => {
            res.send({
                id_usuario: resp.data.user_id,
                saldo_total: resp.data.total_amount,
                disponivel: resp.data.available_balance,
                liberar: resp.data.pending_to_review
            })
        }).catch(err => {
            res.send(err)
        })
    }).catch(err => {
        res.send(err);
    })

}

