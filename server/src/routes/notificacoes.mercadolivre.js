const express = require('express')
const router = express.Router()
const usuarioService = require("../services/usuario-service")
const axios = require('axios')

module.exports = (io) => {

    router.post('/', (req, res) => {
        usuarioService.buscarUsuarioPorID().then(async user => {
            if(req.body.topic === 'questions'){
                let resource = req.body.resource.split('').filter(caracter => {return Number(caracter) || caracter == 0}).join('') //Obtem apenas o número de EX: /questions/5036111111, devolvendo apenas o 5036111111
                await axios.get(`https://api.mercadolibre.com/questions/${resource}?access_token=${user.accessToken}`).then(question => {
                    io.emit('notification-ml', question.data)
                    res.send(question.data)
                })
            }
        }).catch(error => res.send(error))
       
       //console.log(req.body)
    })

    return router
}



