'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.post = (req, res, next) => {
    let product = new Product(req.body);
    product.save().then(resp => {
        res.status(200).send(resp);
    }).catch(err => {
        res.status(400).send(err);
    });
};

exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};