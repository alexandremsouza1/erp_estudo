const usuarioModel = require("../models/usuario-model");
const express = require('express');
const router = express.Router();

/**
 * @author Felipe Miguel dos Santos
 */

const salvarUsuario = (objectJSON) => {
    usuarioModel(objectJSON).save().then(resp => {
        console.log("Usuário salvo com sucesso!");
    }).catch(err => {
        console.log("Opss. houve um erro ao salvar o usuario no banco de dados!");
        console.log(err);
    });
}

const editarUsuario = (_id, accessToken, refreshToken) => {
    usuarioModel.findByIdAndUpdate({_id: _id}, {
        $set: {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }).then(resp => {
        console.log("Usuario atualizado com sucesso.");
    }).catch(err => {
        console.log("Opss. houve um erro ao editar o usuario no banco de dados!");
        console.log(err);
    });
}

const editarUsuarioRoute = (req, res) => {
    usuarioModel.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            accessToken: req.body.accessToken,
            refreshToken: req.body.refreshToken
        }
    }).then(resp => {
        res.status(200).send({
            mensagem: `Dados atualizado com sucesso para o usuário ${profile.nick_name}`,
        });
    }).catch(err => {
        res.status(400).send({
            mensagem: "Opss. houve um erro ao editar o usuario no banco de dados!",
            err: err
        });
    });
}

let buscarUsuarioPorID = (UsuarioJSON) => {

    let result = {
        isExiteUsuario: false,
        _id: 0,
        user: {}
    }

    let model = usuarioModel.findOne({ id: UsuarioJSON.id }).then(res => {
        if (res === null) {
            salvarUsuario(UsuarioJSON);
        } else {
            if (res.id === UsuarioJSON.id) {
                result.isExiteUsuario = true;
                result._id = res._id;
                result.user = res;
                return result;
            } else {
                result.isExiteUsuario = false;
                return result;
            }
        }

    }).catch(err => {
        console.log("Opss. houve um erro ao buscar o usuario pelo ID no banco de dados!");
        console.log(err);
    });

    return model;
}

const salvarUsuarioRoute = (req, res) => {
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

const buscarUsuarioPorIDRoute = (req, res) => {
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
    buscarUsuarioPorIDRoute,
    editarUsuarioRoute,
    editarUsuario
}