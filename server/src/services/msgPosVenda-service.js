const axios = require('axios')
const usuarioService = require('../services/usuario-service')

const enviarMensagemPosVenda = async (req, res) => {
    await usuarioService.buscarUsuarioPorID().then(async user => {
        await axios.post(`https://api.mercadolibre.com/messages/packs/${req.params.packId}/sellers/${user.id}?access_token=${user.accessToken}`).then(response => {

        }).catch(error => res.send(error))
    }).catch(error => res.send(error))

}

module.exports = {
    obterMensagemPosVenda
}