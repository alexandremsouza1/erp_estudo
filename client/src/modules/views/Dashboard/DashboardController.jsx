import React, { useEffect } from 'react'
import axios from 'axios'
import DashboardView from './DashboardView'
import { useSelector, useDispatch } from 'react-redux'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import {
    OBTER_SALDO_TOTAL,
    OBTER_TOTAL_VENDAS_NO_MES,
    OBTER_VENDAS_PENDENTE,
    CARREGANDO_AGUARDE,
    OBTER_STATUS_ANUNCIOS
}
    from '../../constants/constants'
import {DOMAIN} from '../../constants/constants'    

export default function DashboardController() {

    const dispatch = useDispatch()
    const state = useSelector(state => state.dashboard)

    document.title = "Dashboard"
    /*
        setInterval(()=>{
            get()
        }, 60000)
    */
    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        await axios.get(`${DOMAIN}/saldo`).then(res => {
            dispatch({
                type: OBTER_SALDO_TOTAL,
                saldoTotal: res.data.saldo_total.toLocaleString('pt-BR'),
                saldoDisponivel: res.data.disponivel.toLocaleString('pt-BR'),
                saldoALiberar: res.data.liberar.toLocaleString('pt-BR'),
                isLoading: false
            })
        })

        await axios.get(`${DOMAIN}/vendas/getTotalDeVendas`).then(resp => {
            dispatch({
                type: OBTER_TOTAL_VENDAS_NO_MES,
                totalVendas: resp.data.total_vendas,
                nomeMes: resp.data.nome_mes,
                isLoading: false
            })
        })

        await axios.get(`${DOMAIN}/vendas/getVendasPendentes`).then(resp => {
            dispatch({
                type: OBTER_VENDAS_PENDENTE,
                vendasPendente: resp.data,
                totalVendasPendentes: resp.data.totalVendasPendentes,
                isLoading: false
            })
        })

        await axios.get(`${DOMAIN}/anuncio/total_status`).then(status => {
            dispatch({
                type: OBTER_STATUS_ANUNCIOS,
                totalAtivos: status.data.total_ativos,
                totalPausados: status.data.total_pausados,
                isLoading: false
            })
        })
    }

    return (
        <>
            <Dimmer.Dimmable as={Segment} dimmer={state.isLoading}>
                <Dimmer active={state.isLoading} inverted>
                    <Loader>{CARREGANDO_AGUARDE}</Loader>
                </Dimmer>
                <DashboardView {...state} />
            </Dimmer.Dimmable>
        </>
    )
}