'use strict';

const mongoose = require('mongoose');
const Product = require('../models/product');
//const Product = mongoose.model('product'); Dessa forma não funciona, não sei porque...


exports.post = (req, res, next) => {
    let product = new Product(req.body);
    product.save().then(resp => {
        res.status(200).send({
            message: "Produto cadastrado com sucesso"
        });
    }).catch(err => {
        res.status(400).send({
            menssage: "Falha ao cadastrar o produto:",
            error: err
        });
    });
};

exports.put = (req, res, next) => {
    let product = new Product(req.body);
    let id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.listarTodosProdutos = (req, res, next) => {
    Product.find({
        active: true
    }, "title price").then(resp => {

            res.status(200).send(resp);

        }).catch(err => {

            res.status(400).find(err);

        });
}

exports.listarProdutoPorID = (req, res, next) => {
    Product.findOne({_id: req.body.id}).then(resp => {
        res.status(200).send(resp);
    }).catch(err => {
        res.status(400).find(err);
    });
}