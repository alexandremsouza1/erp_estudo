import React, { useEffect } from "react";
import axios from 'axios'
import { LISTAR_TODOS_CLIENTES, CARREGAR_DADOS_COMPRAS_POR_CLIENTE } from '../../constants/constants'
import { useDispatch } from 'react-redux'
import { DOMAIN } from '../../constants/constants'

/**
 * Criador por: @author Felipe M. Santos
 */

export default function CallApiClient(prosp) {

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`${DOMAIN}/clientes`).then(resp => {
            
            resp.data.map(result => {
                axios.get(`${DOMAIN}/clientes/obterDadosVendasPorCliente/${result.id}`).then(response => {
                    dispatch({ type: LISTAR_TODOS_CLIENTES, data: resp.data, isLoading: false })
                    dispatch({ type: CARREGAR_DADOS_COMPRAS_POR_CLIENTE, dados_compras_cliente: response.data })
                }).catch(err => console.log("ERROR", err))
            })
        }).catch(err => console.log("ERROR", err))
    }, [])

    return (<></>)
}