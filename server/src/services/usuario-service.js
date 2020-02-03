const express = require('express');
const router = express.Router();
const axios = require("axios");
const constants = require('../constants/constants');
const Usuario = require('../models/usuario-model')

/**
 * @author Felipe Miguel dos Santos
 */

const salvarUsuario = async (usuario) => {
    await axios.put(constants.urlbase.COLLECTION_USUARIOS, usuario).then(resp => {
        console.log("Usuario salvo com sucesso!");
    }).catch(err => {
        console.log("Houve um erro ao salvar o usuario no firebase: " + err);
    });
}

const postUsuario = async (req, res) => {
    let usuario = new Usuario(req.body)
    usuario.save().then(resp => {
        res.status(200).send({
            isUsuarioSalvo: true,
            usuario: resp
        })
    }).catch(error => res.send(error))

}

const getProcurarUsuarioPorEmail = async (req, res) => {
    Usuario.find({
        email: req.params.email
    }, "nome email password").then(response => {
        res.send(response).status(200)
    }).catch(error => res.send(error))
}

const editarUsuario = (_id, accessToken, refreshToken) => {


}

const editarUsuarioRoute = (req, res) => {

}


const salvarUsuarioRoute = async (req, res) => {
    console.log("User saved")
    res.status(200).send("User saved");
}

const listarTodosUsuarios = async (req, res) => {
    await axios.get(constants.urlbase.COLLECTION_USUARIOS).then(resp => {
        res.status(200).send(resp.data);
    }).catch(err => {
        res.status(401).send({
            mensagem: "houve um erro ao listar os usuarios",
            error: err
        });
    });
}

const buscarUsuarioPorID = async () => {
    const usuarios = await axios.get(constants.urlbase.COLLECTION_USUARIOS).then(resp => {
        return resp.data;
    }).catch(err => {
        console.log("Houve um erro ao listar todos os usuarios: " + err);
    });
    return usuarios;
}

const getUserById = async (req, res) => {
    await axios.get('https://api.mercadolibre.com/users/' + req.params.id).then(user => {
        res.status(200).send(user.data)
    }).catch(error => {
        res.status(400).send(error)
    })
}

module.exports = {
    salvarUsuario,
    buscarUsuarioPorID,
    salvarUsuarioRoute,
    editarUsuarioRoute,
    editarUsuario,
    listarTodosUsuarios,
    getUserById,
    postUsuario,
    getProcurarUsuarioPorEmail
}