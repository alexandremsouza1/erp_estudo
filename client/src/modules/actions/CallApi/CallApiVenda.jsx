import React from 'react'
import {
    GET_VENDAS_PENDENTES,
    GET_VENDAS_CONCLUIDAS,
    GET_VENDAS_EM_TRANSITO,
    GET_VENDAS_A_ENVIAR,
    GET_TOTAL_VENDAS,
    GET_TOTAL_VENDAS_EM_TRANSITO,
    GET_TOTAL_VENDAS_A_ENVIAR,
    GET_TOTAL_VENDAS_PENDENTES,
    DOMAIN
} from '../../constants/constants'
import axios from 'axios'
import swal from 'sweetalert'
import { connect } from 'react-redux'

class CallApiVenda extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = async () => {
        await axios.get(`${DOMAIN}/vendas/getVendasPendentes`).then(vendasPendentes => {
            this.props.vendasPendentes(vendasPendentes)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })

        await axios.get(`${DOMAIN}/vendas/getVendasConcluidas`).then(vendasConcluidas => {
            if(vendasConcluidas !== null){
                this.props.vendasConcluidas(vendasConcluidas)
            }
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })

        await axios.get(`${DOMAIN}/vendas/getVendasEmTransito`).then(vendasEmTransito => {
            this.props.vendasEmTransito(vendasEmTransito)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })

        await axios.get(`${DOMAIN}/vendas/getVendasAEnviar`).then(vendasAEnviar => {
            this.props.vendasAEnviar(vendasAEnviar)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })

        await axios.get(`${DOMAIN}/vendas/getTotalVendas`).then(totalVendas => {
            this.props.totalVendas(totalVendas)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })

        await axios.get(`${DOMAIN}/vendas/getTotalVendasEmTransito`).then(totalVendasEmTransito => {
            this.props.totalVendasEmTransito(totalVendasEmTransito)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })

        await axios.get(`${DOMAIN}/vendas/getTotalVendasAEnviar`).then(totalVendasAEnviar => {
            this.props.totalVendasAEnviar(totalVendasAEnviar)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })

        await axios.get(`${DOMAIN}/vendas/getTotalVendasPendentes`).then(totalVendasPendentes => {
            this.props.totalVendasPendentes(totalVendasPendentes)
        }).catch(error => {
            swal('Aviso', 'O Mercado Livre está passando por instabilidade. \n\n Aguarde um instante, recarregue a página e tente novamente \n\n' + error, 'error')
        })
    }

    render() {
        return (
            <></>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        vendasPendentes: (vendasPendentes) => {
            dispatch({
                type: GET_VENDAS_PENDENTES,
                vendasPendentes: vendasPendentes
            })
        },
        vendasConcluidas: (vendasConcluidas) => {
            dispatch({
                type: GET_VENDAS_CONCLUIDAS,
                vendasConcluidas: vendasConcluidas
            })
        },
        vendasEmTransito: (vendasEmTransito) => {
            dispatch({
                type: GET_VENDAS_EM_TRANSITO,
                vendasEmTransito: vendasEmTransito
            })
        }

        ,
        vendasAEnviar: (vendasAEnviar) => {
            dispatch({
                type: GET_VENDAS_A_ENVIAR,
                vendasAEnviar: vendasAEnviar
            })
        },
        totalVendas: (totalVendas) => {
            dispatch({
                type: GET_TOTAL_VENDAS,
                qtdeVendasConcluidas: totalVendas.data.qtdeVendasConcluidas,
                qtdeVendasCanceladas: totalVendas.data.qtdeVendasCanceladas
            })
        },
        totalVendasEmTransito: (totalVendasEmTransito) => {
            dispatch({
                type: GET_TOTAL_VENDAS_EM_TRANSITO,
                qtdeVendasEmTransito: totalVendasEmTransito.data.qtdeVendasEmTransito,
                isLoadingQtdeVendasEmTransito: false
            })
        },
        totalVendasAEnviar: (totalVendasAEnviar) => {
            dispatch({
                type: GET_TOTAL_VENDAS_A_ENVIAR,
                qtdeVendasAEnviar: totalVendasAEnviar.data.qtdeVendasAEnviar,
                        isLoadingQtdeVendasAEnviar: false
            })
        },
        totalVendasPendentes: (totalVendasPendentes) => {
            dispatch({
                type: GET_TOTAL_VENDAS_PENDENTES,
                qtdeVendasPendentes: totalVendasPendentes.data.qtdeVendasPendentes,
                        isLoading: false
            })
        }
    })
}

export default connect(null, mapDispatchToProps)(CallApiVenda)

