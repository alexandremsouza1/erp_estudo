'use strict'

const axios = require('axios');
const constants = require('../constants/constants');
const usuarioService = require('../services/usuario-service')

/**
 * Created by Felipe M. Santos
 */

exports.obterVisualizacao = (req, res) => {
    axios.get(`${constants.API_MERCADO_LIVRE}/visits/items?ids=${req.params.itemId}`).then(response => {
        res.status(200).send({ visualizacao: Object.values(response.data).reduce((accumulador, valorCorrente) => { return valorCorrente }) })
    })
}

exports.totalStatusAnuncios = async (req, res) => {
    usuarioService.buscarUsuarioPorID().then(async user => {
        await axios.get(`${constants.API_MERCADO_LIVRE}/users/${user.id}/items/search?search_type=scan&access_token=${user.accessToken}`).then(anuncioID => {
            let anunciosID = anuncioID.data.results.map(async anuncio => {
                return await axios.get(`${constants.API_MERCADO_LIVRE}/items/${anuncio}?access_token=${user.accessToken}`).then(detalhe => {
                    let statusAnuncio = {
                        status: detalhe.data.status
                    }
                    return statusAnuncio
                }).catch(error => console.error(error))
            })
            Promise.all(anunciosID).then(status => {
                let data = {
                    total_ativos: status.filter(s => s.status === 'active').length,
                    total_pausados: status.filter(s => s.status !== 'active').length
                }
                res.send(data)
            })
        }).catch(error => console.error(error))
    }).catch(error => console.error(error))

}

/** Function responsible for get for all product */
exports.listarTodosAnuncio = async (req, res) => {
    usuarioService.buscarUsuarioPorID().then(resp01 => {
        axios.get(`${constants.API_MERCADO_LIVRE}/users/${resp01.id}/items/search?search_type=scan&access_token=${resp01.accessToken}`).then(resp07 => {
            var detalhesAnuncio = resp07.data.results.map(resp02 => {
                return axios.get(`${constants.API_MERCADO_LIVRE}/items/${resp02}?access_token=${resp01.accessToken}`).then(resp03 => {
                    return axios.get(`${constants.API_MERCADO_LIVRE}/visits/items?ids=${resp02}`).then(resp04 => {
                        return axios.get(`https://api.mercadolibre.com/items/${resp02}/description?access_token=${resp01.accessToken}`).then(resp08 => {
                            return axios.get(`https://api.mercadolibre.com/questions/search?item=${resp02}&access_token=${resp01.accessToken}`).then(resp09 => {
                                if (resp03.data.shipping.free_shipping) {
                                    return axios.get(`${constants.API_MERCADO_LIVRE}/items/${resp02}/shipping_options/free`).then(resp05 => {
                                        var anuncio = {
                                            id: resp03.data.id,
                                            titulo: resp03.data.title,
                                            preco: resp03.data.price,
                                            estoque_total: resp03.data.available_quantity,
                                            foto_principal: resp03.data.pictures[0].url,
                                            link_anuncio: resp03.data.permalink,
                                            status: resp03.data.status,
                                            visualizacao: Object.values(resp04.data).reduce((accumulador, valorCorrente) => { return valorCorrente }),
                                            totalVariacoes: resp03.data.variations.length,
                                            custoFreteGratis: resp05.data.coverage.all_country.list_cost,
                                            freteGratis: "Grátis Brasil",
                                            tarifa: Number(((resp03.data.price) * (11 / 100)).toFixed(2)),
                                            liquido: Number((resp03.data.price - (resp05.data.coverage.all_country.list_cost) - (resp03.data.price) * (11 / 100)).toFixed(2)),
                                            tipoAnuncio: resp03.data.listing_type_id === "gold_pro" ? "Premium - Exposição máxima" : "Clássico - Exposição alta",
                                            tipoAnuncio_id: resp03.data.listing_type_id,
                                            quantidadeVendido: resp03.data.sold_quantity,
                                            status: resp03.data.status,
                                            description: resp08.data.plain_text,
                                            video_id: resp03.data.video_id === null ? '' : 'https://www.youtube.com/watch?v=' + resp03.data.video_id,
                                            sub_status: resp03.data.sub_status[0] === 'out_of_stock' ? 'Sem estoque' : resp03.data.sub_status,
                                            json: resp03.data,
                                            freeShipping: resp03.data.shipping.free_shipping === true ? true : false,
                                            question: resp09.data.questions
                                        }
                                        return anuncio;
                                    }).catch(err => res.send(err))
                                } else {
                                    var anuncio = {
                                        id: resp03.data.id,
                                        titulo: resp03.data.title,
                                        preco: resp03.data.price,
                                        estoque_total: resp03.data.available_quantity,
                                        foto_principal: resp03.data.pictures[0].url,
                                        link_anuncio: resp03.data.permalink,
                                        status: resp03.data.status,
                                        visualizacao: Object.values(resp04.data).reduce((accumulador, valorCorrente) => { return valorCorrente }),
                                        totalVariacoes: resp03.data.variations.length,
                                        custoFreteGratis: 5.00 + ",00",
                                        freteGratis: "",
                                        tarifa: Number(((resp03.data.price) * (11 / 100)).toFixed(2)),
                                        liquido: Number((resp03.data.price - 5.00 - ((resp03.data.price) * (11 / 100))).toFixed(2)),
                                        tipoAnuncio: resp03.data.listing_type_id === "gold_pro" ? "Premium - Exposição máxima" : "Clássico - Exposição alta",
                                        tipoAnuncio_id: resp03.data.listing_type_id,
                                        quantidadeVendido: resp03.data.sold_quantity,
                                        description: resp08.data.plain_text,
                                        video_id: resp03.data.video_id === null ? '' : 'https://www.youtube.com/watch?v=' + resp03.data.video_id,
                                        sub_status: resp03.data.sub_status[0] === 'out_of_stock' ? 'Sem estoque' : resp03.data.sub_status,
                                        json: resp03.data,
                                        question: resp09.data.questions
                                    }
                                    return anuncio;
                                }
                            })
                        }).catch(err => res.send(err))
                    }).catch(err => { res.send(err) })
                }).catch(err => { res.send(err) });
            })

            //Ordenar 

            Promise.all(detalhesAnuncio).then(resp06 => {
                res.send(orderAnunciosPorQuantidadeVendas(resp06))
            });


        }).catch(err => {
            res.send(err)
        });
    })
}

/** Order by quantity sold*/
const orderAnunciosPorQuantidadeVendas = (detalhesAnuncio) => {
    return detalhesAnuncio.sort((a, b) => { return b.quantidadeVendido - a.quantidadeVendido })
}

exports.obterFotoPrincipalAnuncio = async (idAnuncio) => {
    return await axios.get(`${constants.API_MERCADO_LIVRE}/items/${idAnuncio}/`).then(res => {
        return res.data.pictures[0].url;
    }).catch(err => {
        console.log("An Error occurred to get details product" + err)
    });
}

exports.buscarAnuncioPorTitulo = async (req, res) => {
    usuarioService.buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/users/${resp.id}/items/search?search_type=scan&access_token=${resp.accessToken}`)
            .then(response => {
                let resultadoPesquisa = response.data.results.filter(resp => resp.title === req.params.titulo)
                res.status(200).send(resultadoPesquisa)
            }).catch(err => res.send(err))
    })
}

/*
    Function responsible for to update procuct price
*/
exports.updatePrice = (req, res) => {
    usuarioService.buscarUsuarioPorID().then(user => {
        axios.get(`https://api.mercadolibre.com/items/${req.body.itemId}?access_token=${user.accessToken}`).then(response => {
            let values = response.data.variations.map((variat) => {
                let dados = {
                    id: variat.id,
                    price: Number(req.body.price)
                }
                return dados
            })
            axios.put(`https://api.mercadolibre.com/items/${req.body.itemId}?access_token=${user.accessToken}`,
                JSON.stringify({ variations: values })).then(resp => {
                    res.send('Product price updated with success')
                })
        }).catch(err => {
            console.error('> An error occurred while process a PUT method in line 139')
            res.send('An error occurred while process a PUT method in line 139', err)
        })
    }).catch(err => {
        console.error('> An error occurred to get user ID, line 128')
        res.send('An error occurred to get user ID, line 128', err)
    })
}

/** Function responsible for to update status 'paused' or 'active' */
exports.updateStatus = (req, res) => {
    usuarioService.buscarUsuarioPorID().then(user => {
        axios.put(`https://api.mercadolibre.com/items/${req.body.itemId}?access_token=${user.accessToken}`,
            JSON.stringify({
                status: req.body.status
            })).then(response => {
                res.send('Status updated with success!')
            }).catch(error => {
                console.log("An error occurred to updated status Anuncio: " + error)
            })
    }).catch(error => {
        console.log("An error occurred to get user: " + error)
    })
}

exports.updateAvailableQuantity = (req, res) => {
    usuarioService.buscarUsuarioPorID().then(user => {
        axios.put(`https://api.mercadolibre.com/items/${req.body.itemId}?access_token=${user.accessToken}`, JSON.stringify({
            variations: {
                id: req.body.id,
                available_quantity: req.body.available_quantity
            }
        })).then(response => {
            res.status(200).send('Estoque atualizado com sucesso!')
        }).catch(error => res.send(error))
    }).catch(error => res.send(error))
}

exports.updateListingType = (req, res) => {
    usuarioService.buscarUsuarioPorID().then(async user => {
        await axios.post(`https://api.mercadolibre.com/items/${req.body.itemId}/listing_type?access_token=${user.accessToken}`, JSON.stringify(
            {
                id: req.body.id
            }
        )).then(response => {
            res.status(200).send("ListingType atualizado no anúncio " + req.body.itemId)
        }).catch(error => res.send(error))
    }).catch(error => res.send(error))
}

exports.updateTitle = async (req, res) => {
    await usuarioService.buscarUsuarioPorID().then(async user => {
        await axios.put(`https://api.mercadolibre.com/items/${req.body.itemId}?access_token=${user.accessToken}`, JSON.stringify(
            {
                title: req.body.title
            }
        )).then(response => {
            res.status(200).send("Título atualizado no anúncio " + req.body.itemId)
        }).catch(error => res.send(error))
    }).catch(error => res.send(error))
}

exports.obterValorDoCustoFreteGratisPorAnuncio = async (req, res) => {
    usuarioService.buscarUsuarioPorID().then(async user => {
        await axios.get(`https://api.mercadolibre.com/users/${user.id}/shipping_options/free?item_id=${req.params.item_id}`).then(async response => {
            res.status(200).send({ custo: response.data.coverage.all_country.list_cost })
        }).catch(error => res.send(error))
    }).catch(error => res.send(error))
}

exports.updateShipping = async (req, res) => {
    await usuarioService.buscarUsuarioPorID().then(async user => {
        if (req.body.free_shipping) {
            await axios.put(`https://api.mercadolibre.com/items/${req.body.itemId}?access_token=${user.accessToken}`, JSON.stringify(
                {
                    shipping: {
                        free_methods: [
                            {
                                id: 100009,
                                rule: {
                                    default: true,
                                    free_mode: "country",
                                    free_shipping_flag: true,
                                    value: null
                                }
                            }
                        ]
                    }
                }
            )).then(response => {
                res.status(200).send("Shipping atualizado.")
            }).catch(error => res.send(error))
        } else {
            await axios.put(`https://api.mercadolibre.com/items/${req.body.itemId}?access_token=${user.accessToken}`, JSON.stringify(
                {
                    shipping: {
                        methods: []
                    },
                }
            )).then(response => {
                res.status(200).send("Shipping atualizado.")
            }).catch(error => res.send(error))
        }


    }).catch(error => res.send(error))
}

exports.updateRetirarPessoalmente = async (req, res) => {
    await usuarioService.buscarUsuarioPorID().then(async user => {
        await axios.put(`https://api.mercadolibre.com/items/${req.body.itemId}?access_token=${user.accessToken}`, JSON.stringify(
            {
                shipping: {
                    local_pick_up: req.body.local_pick_up
                }
            }
        )).then(response => {
            res.status(200).send("Retirar pessoalmente atualizado.")
        }).catch(error => res.send(error))
    }).catch(error => res.send(error))
}

exports.updateDescription = async (req, res) => {
    console.log(req.body.plain_text)
    await usuarioService.buscarUsuarioPorID().then(async user => {
        await axios.put(`https://api.mercadolibre.com/items/${req.body.itemId}/description?access_token=${user.accessToken}`, JSON.stringify(
            {
                plain_text: req.body.plain_text
            }
        )).then(response => {
            res.status(200).send("Descrição atualizada.")
        }).catch(error => res.send(error))
    }).catch(error => res.send(error))
}