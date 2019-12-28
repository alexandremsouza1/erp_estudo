const axios = require('axios')
const usuarioService = require('../services/usuario-service')
const anuncioService = require('../services/anuncio-service')
const constants = require('../constants/constants')
const util = require('../helpers/util')


exports.obterTotalDeVendas = async (req, res) => {
    var data = new Date();
    usuarioService.buscarUsuarioPorID().then(resp => {
        axios.get(`${constants.API_MERCADO_LIVRE}/orders/search?seller=${resp.id}&order.date_created.from=2019-${data.getMonth() + 1}-01T00:00:00.000-00:00&order.date_created.to=2019-${data.getMonth() + 1}-30T00:00:00.000-00:00&&access_token=${resp.accessToken}`).then(response => {
            res.send({
                total_vendas: response.data.results.length,
                nome_mes: util.converterDataInteiroParaStringMes(data.getMonth() + 1)
            })
        }).catch(err => {
            res.status(401).send(err)
        })
    })
}

exports.obterVendasPendentes = async (req, res) => {
    usuarioService.buscarUsuarioPorID().then(async resp => {
        await axios.get(`${constants.API_MERCADO_LIVRE}/orders/search/pending?seller=${resp.id}&access_token=${resp.accessToken}`).then(async response => {
            let dadosVendaPendente = await response.data.results.filter(value => value.payments[0].status === 'pending').map(async value => {
                return await anuncioService.obterFotoPrincipalAnuncio(value.order_items[0].item.id).then(resp => {
                    let vendaPendente = {
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
                        statusPagamento: value.payments[0].status === 'pending' ? 'Pendente' : value.payments[0].status
                            || value.payments[0].status === 'rejected' ? 'Rejeitado' : value.payments[0].status,
                        boleto: value.payments[0].activation_uri,
                        metodoPagamento: value.payments[0].payment_method_id === 'bolbradesco' ? 'Boleto Banco Bradesco' : value.payments[0].payment_method_id,
                        tipoPagamento: value.payments[0].payment_type === 'credit_card' ? 'Cartão de crédito' : value.payments[0].payment_type
                            || value.payments[0].payment_type === 'ticket' ? 'Boleto' : value.payments[0].payment_type,
                        cliente: value.buyer.nickname,
                        fotoPrincipal: resp,
                        totalVendasPendentes: response.data.results.filter(value => value.payments[0].status === 'pending').length
                    }
                    return vendaPendente
                })

            })

            Promise.all(dadosVendaPendente).then(response => res.status(200).send(response))

        }).catch(err => {
            res.status(401).send(err)
        })
    })
}

    exports.obterVendas = async (req, res) => {
         usuarioService.buscarUsuarioPorID().then(async user => {
            await axios.get(`https://api.mercadolibre.com/orders/search/recent?seller=${user.id}&access_token=${user.accessToken}`).then(resp => {
                let vendasConcluidas = resp.data.results.map(response => {
                    let json = {
                        id_venda: response.id,
                        status: response.status,
                        data_venda: response.date_closed,
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
                    res.send(vendas)
                })
            }).catch(error => res.send(error))
        }).catch(error => res.send(error))
    }


    

