'use strict'

const anuncioModel = require('../models/anuncio-model');

exports.salvar = (req, res, next) => {
    anuncioModel(req.body).save().then(resp => {
        res.status(200).send({
            mensagem: "Anúncio salvo com sucesso!",
        });
    }).catch(err => {
        res.status(400).send({
            mensagem: "Ops, ocorreu um erro ao salvar o anúncio!",
            error: err
        });
    });
}

exports.listarTodosAnuncio = (req, res, next) => {
    anuncioModel.find({}).then(resp => {
        res.status(200).send(resp);
    }).catch(err => {
        res.status(400).send({ mensagem: "Ops, houve um erro ao listar todos os anúncios :( ", error: err.message })
    });
}

exports.atualizar = (req, res, next) => {
    anuncioModel.findByIdAndUpdate({_id: req.params.id},{
        $set: {
            titulo: req.body.titulo,
            preco: req.body.preco,
            descricao: req.body.descricao
        }
    }).then(resp => {
        res.status(200).send({
            mensagem: "Anúncio atualizado com sucesso!"
        })
    }).catch(err => {
        res.status(400).send({
            mensagem: "Ops, houve um erro ao tentar atualizar o anúncio",
            error: err
        })
    });
}