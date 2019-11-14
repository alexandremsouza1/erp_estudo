'use strict'

const mongoose = require('mongoose');
const anuncioModel = require('../models/anuncio-model');

exports.salvar = (req, res, next) => {
    anuncioModel(req.body).save().then().catch();
}

exports.listarTodosAnuncio = (req, res, next) => {
    anuncioModel.find({}).then(resp => {
        res.status(200).send(resp);
    }).catch(err => {
        res.status(400).send({ mensagem: "Ops, houve um erro ao listar todos os anúncios :( ", error: err.message })
    });
}

exports.atualizar = (req, res, next) => {

}