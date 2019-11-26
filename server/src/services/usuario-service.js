const express = require('express');
const router = express.Router();
const axios = require("axios");
const constants = require('../constants/constants');

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

const editarUsuario = (_id, accessToken, refreshToken) => {
  
  
}

const editarUsuarioRoute = (req, res) => {
   
}


const salvarUsuarioRoute = (req, res) => {
    
}

const buscarUsuarioPorIDRoute = (req, res) => {
    
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
        res.status(401).send({ mensagem: "Houve um erro ao listar todos os usuarios: " + err })
    });
    return usuarios;
}

module.exports = {
    salvarUsuario,
    buscarUsuarioPorID,
    salvarUsuarioRoute,
    buscarUsuarioPorIDRoute,
    editarUsuarioRoute,
    editarUsuario,
    listarTodosUsuarios
}