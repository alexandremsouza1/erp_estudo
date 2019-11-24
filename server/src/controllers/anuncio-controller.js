'use strict'

const axios = require('axios');
const constants = require('../constants/constants');
const localStorage = require('localStorage');


var anuncio = {};



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

exports.listarTodosAnuncio = async (req, res, next) => {
    var lista = [];
    buscarUsuarioPorID().then(resp => {
        
        axios.get(`https://api.mercadolibre.com/users/${resp.id}/items/search?search_type=scan&access_token=${resp.accessToken}`).then(resp => {
            /* console.log("\n")
             console.log("***** TODOS OS ANUNCIOS *****");
             console.log(resp.data.results);
             console.log("\n")
 */
            //let anuncio;
            
            resp.data.results.map(result => {


                axios.get(`https://api.mercadolibre.com/items/${result}/`).then(resp => {
                    //console.log("*** DETALHES DO ANUNCIO ***");
                    /*console.log("Título: "+resp.data.title);
                    console.log("Preço: "+resp.data.price);
                    console.log("Estoque total: "+resp.data.available_quantity);
                    console.log("Foto principal: "+resp.data.pictures[0].url);
                    console.log("Link do anúncio: "+resp.data.permalink);
                    console.log("\n");
*/
                    var anuncio = {
                        titulo: resp.data.title,
                        preco: resp.data.price,
                        estoque_total: resp.data.available_quantity,
                        foto_principal: resp.data.pictures[0].url,
                        link_anuncio: resp.data.permalink
                    }

                    

                    //lista.push(anuncio);

                    //console.log(anuncio);
                    lista.push(anuncio);
                    

                }).catch(err => {
                    console.log("Houve um erro ao buscar os detalhes do anuncio: " + err)
                });
                console.log(lista.map(r => {}));
            });
            // lista.push(JSON.stringify(localStorage.getItem('anuncio')));

        }).catch(err => { console.log("Houve um erro ao listar todos os anuncios: " + err) });
    })

    //console.log(lista);
    res.status(200).send(lista);

}

exports.atualizar = async (req, res, next) => {

}