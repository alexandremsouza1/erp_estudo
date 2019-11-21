const usuarioModel = require("../models/usuario-model");
const express = require('express');
const router = express.Router();

/**
 * @author Felipe Miguel dos Santos
 */

exports.salvarUsuario = (objectJSON) =>{
    usuarioModel(objectJSON).save().then(resp => {
        console.log("Usuário salvo com sucesso!");
    }).catch(err => {
        console.log("Opss. houve um erro ao salvar o usuario no banco de dados!");
        console.log(err);
    });
}

exports.buscarUsuarioPorID = (idUsuario) => {
    usuarioModel.findOne({id: idUsuario}).then(resp => {
        return resp;
    }).catch(err => {
        return err;
    });
}

exports.salvarUsuarioRoute = (req, res) =>{
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

exports.buscarUsuarioPorIDRoute = (req, res) => {
    usuarioModel.findOne({id: req.params.id}).then(resp => {
        res.status(200).send(resp);
    }).catch(err => {
        res.status(401).send({
            mensagem: "Ops, houve um erro ao listar o usuário por ID",
            error: err
        });
    });
}