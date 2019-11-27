const axios = require('axios')
const usuarioService = require('../services/usuario-service')
const constants = require('../constants/constants')

exports.obterTotalDeVendas = async (req, res) => {
    usuarioService.buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/orders/search?seller=${resp.id}&order.status=paid&access_token=${resp.accessToken}`).then(response => {
            res.send({total_vendas: response.data.results.length})
        }).catch(err => {
            res.status(401).send(err)
        })
    })

}


