import {GET_VENDAS_PENDENTES} from '../../constants/constants'


const INITIAL_STATE = {
    vendas: [],
    dadosRastreamento: {},
    isLoading: true,
    qtdeVendasConcluidas: 0,
    qtdeVendasCanceladas: 0,
    qtdeVendasEmTransito: 0,
    qtdeVendasPendentes: 0,
    qtdeVendasAEnviar: 0,

    isLoadingVendasPendentes: true,
    isLoadingVendasConcluidas: true,
    isLoadingVendasEmTransito: true,

    isLoadingQtdeVendasAEnviar: true,
    isLoadingQtdeVendasEmTransito: true,
    isLoadingVendasAEnviar: true
}

export default function vendaReducer(state = INITIAL_STATE, action) {
    switch(action.type){
        case GET_VENDAS_PENDENTES: {
            let vendas = state.vendas
            action.vendasPendentes.data.map(venda => {
                vendas.push(venda)
            })
            return {
                ...state,
                isLoadingVendasPendentes: false,
                vendas: vendas
            }
        }
        case 'GET_VENDAS_CONCLUIDAS': {

        }
        case 'GET_VENDAS_EM_TRANSITO': {

        }
        case 'GET_VENDAS_A_ENVIAR': {

        }
        case 'GET_TOTAL_VENDAS': {

        }
        case 'GET_TOTAL_VENDAS_EM_TRANSITO': {

        }
        case 'GET_TOTAL_VENDAS_A_ENVIAR': {

        }
        case 'GET_TOTAL_VENDAS_PENDENTES': {

        }
        default: {
            return {...state}
        }
    }
}