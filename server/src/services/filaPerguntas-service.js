const axios = require('axios')
const usuarioService = require("./usuario-service")
const FilaNotif = require("../models/filaNotificacoes-model")

exports.obterPerguntasNaoRespondidas = async (req, res) => {
    await usuarioService.buscarUsuarioPorID().then(user => {
        FilaNotif.find({
            seller_id: user.id,
            status: 'UNANSWERED'
        }).then(response => {
           res.send(response)
        }).catch(error => res.send(error))
    }).catch(error => res.send(error))
}