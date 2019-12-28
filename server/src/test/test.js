const firebase = require('../config/firebase');
const axios = require("axios");
const { rastro } = require('rastrojs');
const constants = require('../constants/constants');
const usuarioService = require('../services/usuario-service')
const anuncioService = require('../services/anuncio-service')
const util = require('../helpers/util')
const postAnuncio = require('./postAnuncio')


const usuario = {
    id: 3311227,
    access_token: "78l~987lõ87op´1928373847",
    email: "pedromelo@gmail.com",
    first_name: "Pedro",
    nick_name: "Americana",
    refresh_token: "7op9870op987ó0987928370984705"
}

const usuario02 = {
    id: 987654,
    access_token: "8888888888888888888888888",
    email: "comproline.ecoomercer@gmail.com",
    first_name: "Felipe",
    nick_name: "COMPROLINE COMERCIO DE PRODUTOS ONLINE",
    refresh_token: "987P98P798P798P798P79P879P87"
}

const usuario03 = {
    id: 336659,
    access_token: "22222222222222555444411111",
    email: "jurubeba@gmail.com",
    first_name: "João",
    nick_name: "JOAOANTONIO",
    refresh_token: "0Q02Q02Q01W01W01A01A10A98A"
}

const editarUsuario = async () => {
    await axios.put("https://sisiml.firebaseio.com/usuarios.json", usuario).then(resp => {
        console.log("Usuario salvo com sucesso!" + resp);
    }).catch(err => {
        console.log("Houve um erro ao salvar o usuario no firebase: " + err);
    });
}

const salvarUsuario = () => {
    let _usuarioJSON = {}
    listarTodosUsuarios().then(resp => {
        resp.usuario.map(usuario => {
            if (usuario.id === 362614126) {
                _usuarioJSON = [{
                    accessToken: "teste",
                    refreshToken: "teste",
                    nickname: "protesteckn",
                    first_name: "te.te",
                    email: "teste",
                    id: 123
                }]
                axios.put("https://sisiml.firebaseio.com/usuarios/usuario.json", _usuarioJSON).then(resp => {
                    console.log("Usuario salvo com sucesso!" + resp)
                }).catch(err => {
                    console.log("Houve um erro ao salvar o usuario no firebase: " + err)
                });
            } else {
                _usuarioJSON = [{
                    accessToken: "teste",
                    refreshToken: "teste",
                    nickname: "protesteckn",
                    first_name: "te.te",
                    email: "teste",
                    id: 123
                }]
                axios.post("https://sisiml.firebaseio.com/usuarios/usuario.json", _usuarioJSON).then(resp => {
                    console.log("Usuario salvo com sucesso!" + resp)
                }).catch(err => {
                    console.log("Houve um erro ao salvar o usuario no firebase: " + err)
                });
            }
        })
    })

}

const listarTodosUsuarios = async () => {
    const usuarios = await axios.get("https://sisiml.firebaseio.com/usuarios.json").then(resp => {
        console.log(resp.data)
        return resp.data
    }).catch(err => {
        console.log("Houve um erro ao listar todos os usuarios: " + err)
    });
    return usuarios;
}

const buscarUsuarioPorID = async () => {
    const usuarios = await axios.get("https://sisiml.firebaseio.com/felipeanalista3.json").then(resp => {
        console.log(resp.data)
    }).catch(err => {
        console.log("Houve um erro ao listar todos os usuarios: " + err)
    });
    return usuarios;
}

const listarTodosAnuncio = async (req, res) => {
    usuarioService.buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/users/${resp.id}/items/search?search_type=scan&access_token=${resp.accessToken}`).then(response => {
            var detalhesAnuncio = response.data.results.map(result => {
                return axios.get(`${constants.API_MERCADO_LIVRE}/items/${result}/`).then(res => {
                    return axios.get(`${constants.API_MERCADO_LIVRE}/visits/items?ids=${result}`).then(resp => {
                        if (res.data.shipping.free_shipping) {
                            return axios.get(`${constants.API_MERCADO_LIVRE}/items/${result}/shipping_options/free`).then(resp => {
                                var anuncio = {
                                    id: res.data.id,
                                    titulo: res.data.title,
                                    preco: res.data.price,
                                    estoque_total: res.data.available_quantity,
                                    foto_principal: res.data.pictures[0].url,
                                    link_anuncio: res.data.permalink,
                                    status: res.data.status,
                                    visualizacao: Object.values(resp.data).reduce((accumulador, valorCorrente) => { return valorCorrente }),
                                    totalVariacoes: res.data.variations.length,
                                    tipoAnuncio: res.data.listing_type_id === "gold_pro" ? "Premium - Exposição máxima" : "Clássico - Exposição Alta",
                                    custoFreteGratis: resp.data.coverage.all_country.list_cost,
                                    json: res.data
                                }
                                return anuncio;
                            }).catch(err => console.log(err))
                        } else {
                            var anuncio = {
                                id: res.data.id,
                                titulo: res.data.title,
                                preco: res.data.price,
                                estoque_total: res.data.available_quantity,
                                foto_principal: res.data.pictures[0].url,
                                link_anuncio: res.data.permalink,
                                status: res.data.status,
                                visualizacao: Object.values(resp.data).reduce((accumulador, valorCorrente) => { return valorCorrente }),
                                totalVariacoes: res.data.variations.length,
                                tipoAnuncio: res.data.listing_type_id === "gold_pro" ? "Premium - Exposição máxima" : "Clássico - Exposição Alta",
                                custoFreteGratis: 0,
                                json: res.data
                            }
                            return anuncio;
                        }

                    }).catch(err => {
                        console.log("Houve um erro: " + err)
                    })
                }).catch(err => {
                    console.log("Houve um erro ao buscar os detalhes do anuncio: " + err)
                });
            })

            Promise.all(detalhesAnuncio).then(resp => {
                resp.map(usuario => {
                    console.log(usuario.json.variations)
                })
            });


        }).catch(err => {
            console.log("Houve um erro ao listar todos os anuncios: " + err)
        });
    })
}



const obterTotalDeVendas = async () => {
    var data = new Date();
    buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/orders/search?seller=${resp.id}&order.status=paid&order.date_created.from=2019-${data.getMonth() + 1}-01T00:00:00.000-00:00&order.date_created.to=2019-${data.getMonth() + 1}-30T00:00:00.000-00:00&&access_token=${resp.accessToken}`).then(resp => {
            console.log({ total: resp.data.results.length + 1 })
        }).catch(err => {
            console.log({ mensagem: "Houve um erro ao buscar todas as vendas realizadas: " + err })
        })
    })
}

const obterVendasPendentes = async () => {
    usuarioService.buscarUsuarioPorID().then(async resp => {
        await axios.get(`${constants.API_MERCADO_LIVRE}/orders/search/pending?seller=${resp.id}&access_token=${resp.accessToken}`).then(async response => {
            let vendasPendentes = await response.data.results.filter(value => value.payments[0].status === 'pending').map(async value => {
                return await anuncioService.obterFotoPrincipalAnuncio(value.order_items[0].item.id).then(resp => {
                    let vendas = {
                        idVariacao: value.order_items[0].item.variation_id,
                        idAnuncio: value.order_items[0].item.id,
                        titulo: value.order_items[0].item.title,
                        quantidade: value.order_items[0].quantity,
                        preco: value.order_items[0].full_unit_price,
                        sku: value.order_items[0].item.seller_sku,
                        idCategoria: value.order_items[0].item.category_id,
                        variacao: value.order_items[0].item.variation_attributes
                            .filter(value => value.name === 'Tamanho')
                            .reduce((value) => value).value_name,
                        dataPedido: util.formatarDataHora(value.date_created),
                        statusPagamento: value.payments[0].status === 'pending' ? 'Pendente' : value.payments[0].status ||
                            value.payments[0].status === 'rejected' ? 'Rejeitado' : value.payments[0].status,
                        boleto: value.payments[0].activation_uri,
                        metodoPagamento: value.payments[0].payment_method_id === 'bolbradesco' ? 'Boleto Banco Bradesco' : value.payments[0].payment_method_id,
                        tipoPagamento: value.payments[0].payment_type === 'credit_card' ? 'Cartão de crédito' : value.payments[0].payment_type ||
                            value.payments[0].payment_type === 'ticket' ? 'Boleto' : value.payments[0].payment_type,
                        cliente: value.buyer.nickname,
                        fotoPrincipal: resp,
                        quantidadeVendasPendente: response.data.results.filter(value => value.payments[0].status === 'pending').length
                    }
                    return vendas
                })
            })

            Promise.all(vendasPendentes).then(resp => { console.log(resp) })

        }).catch(err => {
            console.log(err)
        })
    })
}

const obterDadosCliente = async () => {
    buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/orders/search?seller=${resp.id}&order.status=paid&access_token=${resp.accessToken}`).then(resp => {
            /* resp.data.results.filter(function (a) {
                 //Evita os IDs duplicados
                 return !this[JSON.stringify(a.buyer.id)] && (this[JSON.stringify(a.buyer.id)] = true)
             }, Object.create(null)).map(value => {
                 /*console.log({
                     id: value.buyer.id,
                     nickname: value.buyer.nickname,
                     numero_contato: util.tratarNumeroCelularComDDD(value.buyer.phone.area_code,value.buyer.phone.number),
                     ddd: value.buyer.phone.area_code,
                     primeiro_nome: value.buyer.first_name,
                     last_name: value.buyer.last_name,
                     tipo_documento: value.buyer.billing_info.doc_type,
                     documento: value.buyer.billing_info.doc_number		
                 })
             })*/
            console.log(resp.data.results)
        }).catch(err => {
            console.log({ mensagem: "Houve um erro ao buscar todas as vendas realizadas: " + err })
        })
    })
}

function tratarNumeroCelularComDDD(ddd, numero) {
    if (ddd != null) ddd = ddd.replace(' ', '')
    if (ddd === null || ddd == undefined) {
        if (numero != null || numero != undefined) {
            numero = numero.replace("(", "").replace(")", "").replace(" ", "").replace("-", "").trim()
            if (numero.substring(0, 1) == 0) {
                return adicionarNove(numero.substring(1, 12))
            } else {
                return adicionarNove(numero)
            }
        }
    } else {
        numero = numero.replace("(", "").replace(")", "").replace(" ", "").replace("-", "").trim()
        if (ddd.substring(0, 1) == 0) {
            ddd = ddd.substring(1, 3)
            return adicionarNove(ddd + '' + numero)
        } else {
            return adicionarNove(ddd + '' + numero)
        }
    }
    return numero
}

function adicionarNove(numero) {
    if (numero.length == 10) {
        ddd = numero.substring(0, 2)
        numero = numero.substring(2, 10)
        return ddd + '9' + numero
    } else {
        return numero
    }
}



async function example() {

    const track = await rastro.track('JT124720455BR');

    console.log(track);

};




function obterEnderecoCliente() {
    return axios.get('https://api.mercadolibre.com/users/202221965').then(resp => {
        return resp.data.address
    })
}

function postAnuncioMercadoLivre() {
    usuarioService.buscarUsuarioPorID().then(user => {
        axios.post(`http://api.mercadolibre.com/items?access_token=${user.accessToken}`, JSON.stringify(postAnuncio))
    }).catch(err => console.log("err.error"))
}

const getQuestion = () => {
    usuarioService.buscarUsuarioPorID().then(user => {
        axios.get(`https://api.mercadolibre.com/questions/search?item=MLB1332847351&access_token=${user.accessToken}`).then(resp => {
            resp.data.questions.map(prop => {
                console.log(prop.answer.text)
            })
        })
    })
}

const updatePrice = () => {
    let v = {}
    usuarioService.buscarUsuarioPorID().then(user => {
        axios.get(`https://api.mercadolibre.com/items/MLB1363166469?access_token=${user.accessToken}`).then(response => {
            const newVariation = response.data.variations.map((variation, key) => {
                if(variation.id === 46280842511){
                    v = {
                        id: variation.id,
                        price: 15.98
                    }
                }else{
                    v = {
                        id: variation.id,
                        price: 150.58
                    }
                }
                return v
            })
            console.log(newVariation)
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
}

const obterVendas = async () => {
    usuarioService.buscarUsuarioPorID().then(async user => {
       await axios.get(`https://api.mercadolibre.com/orders/search?seller=${user.id}&access_token=${user.accessToken}`).then(resp => {
           let vendasConcluidas = resp.data.results.map(response => {
               let json = {
                   id_venda: response.id,
                   status: response.status,
                   data_venda: util.formatarDataHora(response.date_closed),
                   sold_quantity: response.order_items[0].quantity,
                   id_variacao: response.order_items[0].item.variation_id,
                   sku: response.order_items[0].item.seller_sku,
                   id_anuncio: response.order_items[0].item.id,
                   titulo: response.order_items[0].item.title,
                   taxa: response.order_items[0].sale_fee,
                   valor_venda: response.total_amount,
                   status_pagamento: response.payments[0].status,
                   nickname_comprador: response.buyer.nickname,
                   email_comprador: response.buyer.email,
                   first_name_comprador: response.buyer.first_name,
                   last_name_comprador: response.buyer.last_name,
                   tipo_documento_comprador: response.buyer.billing_info.doc_type,
                   documento_comprador: response.buyer.billing_info.doc_number === undefined ||
                       response.buyer.billing_info.doc_number === null ? 'Não informado' : response.buyer.billing_info.doc_number,
                   numero_contato: util.tratarNumeroCelularComDDD(response.buyer.phone.area_code, response.buyer.phone.number) === null ?
                       'Não informado' : 'https://api.whatsapp.com/send?phone=55' + util.tratarNumeroCelularComDDD(response.buyer.phone.area_code, response.buyer.phone.number) + '',
                   ddd: response.buyer.phone.area_code,
                   status_envio: response.shipping.status,
                   rua: response.shipping.receiver_address.street_name,
                   cep: response.shipping.receiver_address.zip_code,
                   latitude: response.shipping.receiver_address.latitude,
                   longitude: response.shipping.receiver_address.longitude,
                   estado: response.shipping.receiver_address.state.name,
                   id_estado: response.shipping.receiver_address.state.id,
                   cidade: response.shipping.receiver_address.city.name

               }
               return json
           })
           Promise.all(vendasConcluidas).then(vendas => {
               console.log(vendas)
           })
       }).catch(error => console.error(error))
   }).catch(error => console.error(error))
}

obterVendas()



