const axios = require('axios')
const usuarioService = require("./usuario-service")
const FilaPerguntas = require("../models/filaPerguntas-model")

exports.obterPerguntasNaoRespondidas = async (req, res) => {
    await usuarioService.buscarUsuarioPorID().then(user => {
        FilaPerguntas.find({
            seller_id: user.id,
            status: 'ANSWERED'
        }).then(response => {
           res.send(response)
        }).catch(error => res.send(error))
    }).catch(error => res.send(error))
}

//ANSWERED
//UNANSWERED