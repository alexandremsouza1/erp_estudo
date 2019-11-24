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

let buscarUsuarioPorID = (UsuarioJSON) => {
/*
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

    */
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

module.exports = {
    salvarUsuario,
    buscarUsuarioPorID,
    salvarUsuarioRoute,
    buscarUsuarioPorIDRoute,
    editarUsuarioRoute,
    editarUsuario,
    listarTodosUsuarios
}