const firebase = require('../config/firebase');
const axios = require("axios");
const { rastro } = require('rastrojs');
const constants = require('../constants/constants');
const usuarioService = require('../services/usuario-service')
const anuncioService = require('../services/anuncio-service')

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

const salvarUsuario = async () => {
    await axios.post("https://sisiml.firebaseio.com/usuarios.json", usuario03).then(resp => {
        console.log("Usuario salvo com sucesso!" + resp);
    }).catch(err => {
        console.log("Houve um erro ao salvar o usuario no firebase: " + err);
    });
}

const listarTodosUsuarios = async () => {
    const usuarios = await axios.get("https://sisiml.firebaseio.com/usuarios.json").then(resp => {
        return resp.data;
    }).catch(err => {
        console.log("Houve um erro ao listar todos os usuarios: " + err)
    });
    return usuarios;
}

const buscarUsuarioPorID = async () => {
    const usuarios = await axios.get(constants.urlbase.COLLECTION_USUARIOS).then(resp => {
        return resp.data;
    }).catch(err => {
        console.log("Houve um erro ao listar todos os usuarios: " + err)
    });
    return usuarios;
}

const getTodosAnuncios = async () => {
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
                            visualizacao: Object.values(resp.data).reduce((accumulador, valorCorrente) => { return valorCorrente })
                        }
                        return anuncio;
                    }).catch(err => {
                        console.log("Houve um erro: " + err)
                    })

                }).catch(err => {
                    console.log("Houve um erro ao buscar os detalhes do anuncio: " + err)
                });
            })

            Promise.all(detalhesAnuncio).then(resp => {
                console.log(resp)
            });

        }).catch(err => {
            console.log("Houve um erro ao listar todos os anuncios: " + err)
        });
    })
}

const obterTotalDeVendas = async () => {
    var data = new Date();
    buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/orders/search?seller=${resp.id}&order.status=paid&order.date_created.from=2019-${data.getMonth()+1}-01T00:00:00.000-00:00&order.date_created.to=2019-${data.getMonth()+1}-30T00:00:00.000-00:00&&access_token=${resp.accessToken}`).then(resp => {
            console.log({total: resp.data.results.length+1})
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
                        dataPedido: value.date_created,
                        statusPagamento: value.payments[0].status === 'pending' ? 'Pendente' : value.payments[0].status
                            || value.payments[0].status === 'rejected' ? 'Rejeitado' : value.payments[0].status,
                        boleto: value.payments[0].activation_uri,
                        metodoPagamento: value.payments[0].payment_method_id === 'bolbradesco' ? 'Boleto Banco Bradesco' : value.payments[0].payment_method_id,
                        tipoPagamento: value.payments[0].payment_type === 'credit_card' ? 'Cartão de crédito' : value.payments[0].payment_type
                            || value.payments[0].payment_type === 'ticket' ? 'Boleto' : value.payments[0].payment_type,
                        cliente: value.buyer.nickname,
                        fotoPrincipal: resp
                    }
                   return vendas
                })
            })
            
            Promise.all(vendasPendentes).then(resp => {console.log(resp)})

        }).catch(err => {
            console.log(err)
        })
    })
}

const obterDadosClient = async () => {
    buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/orders/search?seller=${resp.id}&order.status=paid&access_token=${resp.accessToken}`).then(resp => {
            resp.data.results.filter(function (a) {
                //Evita os IDs duplicados
                return !this[JSON.stringify(a.buyer.id)] && (this[JSON.stringify(a.buyer.id)] = true)
            }, Object.create(null)).map(value => {
                console.log({
                    id: value.buyer.id,
                    nickname: value.buyer.nickname,
                    numero_contato: value.buyer.phone.number,
                    ddd: value.buyer.phone.area_code,
                    primeiro_nome: value.buyer.first_name,
                    last_name: value.buyer.last_name,
                    tipo_documento: value.buyer.billing_info.doc_type,
                    documento: value.buyer.billing_info.doc_number		
                })
            })
        }).catch(err => {
            console.log({ mensagem: "Houve um erro ao buscar todas as vendas realizadas: " + err })
        })
    })
}



async function example() {

    const track = await rastro.track('JT124720455BR');

    console.log(track);

};

example();
