const axios = require('axios')
const usuarioService = require('../services/usuario-service')
const constants = require('../constants/constants')

exports.obterTotalDeVendas = async (req, res) => {
    var data = new Date();
    usuarioService.buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/orders/search?seller=${resp.id}&order.status=paid&order.date_created.from=2019-${data.getMonth()+1}-01T00:00:00.000-00:00&order.date_created.to=2019-${data.getMonth()+1}-30T00:00:00.000-00:00&&access_token=${resp.accessToken}`).then(response => {
            res.send({total_vendas: response.data.results.length + 1})
        }).catch(err => {
            res.status(401).send(err)
        })
    })
}

exports.obterVendasPendentes = async (req, res) => {
    usuarioService.buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/orders/search/pending?seller=${resp.id}&access_token=${resp.accessToken}`).then(response => {
            res.send(response.data.results)
        }).catch(err => {
            res.status(401).send(err)
        })
    })
}


