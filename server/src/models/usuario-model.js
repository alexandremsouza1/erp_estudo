const mongoose = require('mongoose');

const usuarioModel = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        trim: true
    },
    accessToken: {
        type: String,
        required: true,
        trim: true
    },
    refreshToken: {
        type: String,
        required: true,
        trim: true
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }


});

module.exports = mongoose.model('usuario', usuarioModel);