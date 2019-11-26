'use strict'

const axios = require('axios');
const constants = require('../constants/constants');
const localStorage = require('localStorage');

var listaMAP = [];

exports.salvar = async (req, res, next) => {

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

exports.listarTodosAnuncio = async (req, res) => {
    buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/users/${resp.id}/items/search?search_type=scan&access_token=${resp.accessToken}`).then(response => {
                var detalhesAnuncio = response.data.results.map(result => {
                    return axios.get(`https://api.mercadolibre.com/items/${result}/`).then(res => {
                        return axios.get(`https://api.mercadolibre.com/visits/items?ids=${result}`).then(resp => {
                            var anuncio = {
                                id: res.data.id,
                                titulo: res.data.title,
                                preco: res.data.price,
                                estoque_total: res.data.available_quantity,
                                foto_principal: res.data.pictures[0].url,
                                link_anuncio: res.data.permalink,
                                status: res.data.status,
                                visualizacao: Object.values(resp.data).reduce((accumulador, valorCorrente) => {return valorCorrente})
                            }
                            return anuncio;
                        }).catch(err => {
    
                        })
                    }).catch(err => {
                        console.log("Houve um erro ao buscar os detalhes do anuncio: " + err)
                    });
                })

                Promise.all(detalhesAnuncio).then(resp => {
                    res.send(resp)
                });

        }).catch(err => {
            console.log("Houve um erro ao listar todos os anuncios: " + err)
        });
    })
}

exports.atualizar = async (req, res, next) => {

}