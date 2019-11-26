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
    var listaAnuncio = [];
    var resultadoBusca = buscarUsuarioPorID().then(resp => {

        var resultGetAnuncios = axios.get(`https://api.mercadolibre.com/users/${resp.id}/items/search?search_type=scan&access_token=${resp.accessToken}`).then(response => {

            var anuncioResult = new Promise((resolve, reject) => {

                var detalhesAnuncio = response.data.results.map(result => {

                    var resultDetalheAnuncio = axios.get(`https://api.mercadolibre.com/items/${result}/`).then(res => {

                        var anuncio = {
                            titulo: res.data.title,
                            preco: res.data.price,
                            estoque_total: res.data.available_quantity,
                            foto_principal: res.data.pictures[0].url,
                            link_anuncio: res.data.permalink
                        }

                        return anuncio;

                    }).catch(err => {
                        console.log("Houve um erro ao buscar os detalhes do anuncio: " + err)
                    });

                    return resultDetalheAnuncio;

                })

                console.log(this.listaAnuncio);

                resolve(detalhesAnuncio);

            })

            //console.log(anuncioResult);

            anuncioResult.then(resp => {
                res.status(200).send(resp);
            }).catch(err => {
                console.log(err);
            });




        }).catch(err => {
            console.log("Houve um erro ao listar todos os anuncios: " + err)
        });
    })
}

exports.atualizar = async (req, res, next) => {

}