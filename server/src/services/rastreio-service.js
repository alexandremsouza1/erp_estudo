const { rastro } = require('rastrojs');

exports.obterRastreamentoCorreios = async(req, res) => {
    Promise.resolve(rastro.track(req.params.codigo)).then(response => {
        res.send(response)
    })
}