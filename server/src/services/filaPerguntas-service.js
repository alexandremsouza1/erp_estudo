const axios = require('axios')
const usuarioService = require("./usuario-service")
const FilaPerguntas = require("../models/filaPerguntas-model")

exports.obterPerguntasNaoRespondidas = async (req, res) => {
    await usuarioService.buscarUsuarioPorID().then(user => {
        FilaPerguntas.find({
            seller_id: user.id,
            status: 'UNANSWERED'
        }).then(response => {
           res.send(response)
        }).catch(error => res.send(error))
    }).catch(error => res.send(error))
}