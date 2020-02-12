const axios = require('axios')
const usuarioService = require('../services/usuario-service')
const BlackListPerguntas = require('../models/blacklistPerguntas-model')

exports.salvarUsuarioListaNegra = (req, res) => {
    usuarioService.buscarUsuarioPorID().then(user => {
        axios.post(`https://api.mercadolibre.com/users/${user.id}/questions_blacklist?access_token=${user.accessToken}`, req.body).then(response => {
            res.send(response.data)
        }).catch(error => { res.send(error) })
    }).catch(error => { res.send(error) })
}

exports.listarTodosUsuariosListaNegra = (req, res) => {
    usuarioService.buscarUsuarioPorID().then(user => {
        axios.get(`https://api.mercadolibre.com/users/${user.id}/questions_blacklist?access_token=${user.accessToken}`).then(response => {
            res.send(response.data.users)
        }).catch(error => { res.send({ message: "Nenhum usuário encontrado na black list" }) })
    }).catch(error => { res.send(error) })
}

exports.removerUsuarioListaNegra = (req, res) => {
    usuarioService.buscarUsuarioPorID().then(user => {
        axios.delete(`https://api.mercadolibre.com/users/${user.id}/questions_blacklist/${req.params.user_id}?access_token=${user.accessToken}`).then(response => {
            res.send(response.data)
        }).catch(error => { res.send(error) })
    }).catch(error => { res.send(error) })
}

exports.buscarUsuarioPorNickName = (req, res) => {
    axios.get(`https://api.mercadolibre.com/sites/MLB/search?nickname=${req.params.nickname}`).then(response => {
        res.send(response.data.seller)
    }).catch(error => { res.send(error) })
}

//MongoDB
exports.salvarUsuarioBlackListPerguntas = (req, res) => {
    let blackListPerguntas = new BlackListPerguntas(req.body)
    blackListPerguntas.save().then(response => {
        res.send('OK').status(200)
    }).catch(error => {res.send(error)})
}

exports.listarUsuarioBlackListPerguntas = (req, res) => {
    BlackListPerguntas.find({}).then(response => {
        res.send(response).status(200)
    }).catch(error => {res.send(error)})
}

exports.buscarUsuarioBlackListPerguntasPorNickName = (req, res) => {
    BlackListPerguntas.find({
        nickname: req.params.nickname.toUpperCase()
    }).then(response => {
        res.send(response).status(200)
    }).catch(error => {res.send(error)})
}


