'use strict'

const mongoose = require('mongoose');
const anuncioModelSchema = mongoose.Schema();

const anuncioModel = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    descricao: {
        type: String,
        required: false,
        trim: true
    }
});

module.exports = mongoose.model('Anuncio', anuncioModelSchema);
