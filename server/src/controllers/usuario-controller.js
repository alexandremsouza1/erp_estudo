const usuarioModel = require("../models/usuario-model");
const express = require('express');
const router = express.Router();

/**
 * @author Felipe Miguel dos Santos
 */

let salvarUsuario = (objectJSON) => {
    usuarioModel(objectJSON).save().then(resp => {
        console.log("Usuário salvo com sucesso!");
    }).catch(err => {
        console.log("Opss. houve um erro ao salvar o usuario no banco de dados!");
        console.log(err);
    });
}

const buscarUsuarioPorID = (UsuarioJSON) => {

    let model = usuarioModel.findOne({ id: UsuarioJSON.id }).then(res => {
        if (res === null) {
            salvarUsuario(UsuarioJSON);
        } else {
            if (res.id === UsuarioJSON.id) {
                return true;
            } else {
                return false;
            }
        }

    })

    return model;
}

let salvarUsuarioRoute = (req, res) => {
    usuarioModel(req.body).save().then(resp => {
        res.status(200).send({
            mensagem: "Usuário salvo com sucesso!"
        });
    }).catch(err => {
        res.status(401).send({
            mensagem: "Opss. houve um erro ao salvar o usuario no banco de dados!",
            error: err
        });
    });
}

let buscarUsuarioPorIDRoute = (req, res) => {
    usuarioModel.findOne({ id: req.params.id }).then(resp => {
        res.status(200).send(resp);
    }).catch(err => {
        res.status(401).send({
            mensagem: "Ops, houve um erro ao listar o usuário por ID",
            error: err
        });
    });
}

module.exports = {
    salvarUsuario,
    buscarUsuarioPorID,
    salvarUsuarioRoute,
    buscarUsuarioPorIDRoute
}