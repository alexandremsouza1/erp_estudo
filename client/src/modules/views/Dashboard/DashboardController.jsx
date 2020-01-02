import React, { useEffect } from 'react'
import axios from 'axios'
import DashboardView from './DashboardView'
import { useSelector, useDispatch } from 'react-redux'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import {
    OBTER_SALDO_TOTAL,
    OBTER_TOTAL_VENDAS_NO_MES,
    OBTER_VENDAS_PENDENTE,
    CARREGANDO_AGUARDE
}
    from '../../constants/constants'
import {DOMAIN} from '../../constants/constants'    

export default function DashboardController() {

    const dispatch = useDispatch()
    const store = useSelector(store => store.dashboard)

    document.title = "Dashboard"
    /*
        setInterval(()=>{
            get()
        }, 60000)
    */
    useEffect(() => {
        get()
    }, [])

    function get() {
        axios.get(`${DOMAIN}/saldo`).then(res => {
            dispatch({
                type: OBTER_SALDO_TOTAL,
                saldoTotal: res.data.saldo_total.toLocaleString('pt-BR'),
                saldoDisponivel: res.data.disponivel.toLocaleString('pt-BR'),
                isLoading: false
            })
        })

        axios.get(`${DOMAIN}/vendas/getTotalDeVendas`).then(resp => {
            dispatch({
                type: OBTER_TOTAL_VENDAS_NO_MES,
                totalVendas: resp.data.total_vendas,
                nomeMes: resp.data.nome_mes,
                isLoading: false
            })
        })

        axios.get(`${DOMAIN}/vendas/getVendasPendentes`).then(resp => {
            dispatch({
                type: OBTER_VENDAS_PENDENTE,
                vendasPendente: resp.data,
                totalVendasPendentes: resp.data.totalVendasPendentes,
                isLoading: false
            })
        })
    }

    return (
        <>
            <Dimmer.Dimmable as={Segment} dimmer={store.isLoading}>
                <Dimmer active={store.isLoading} inverted>
                    <Loader>{CARREGANDO_AGUARDE}</Loader>
                </Dimmer>
                <DashboardView {...store} />
            </Dimmer.Dimmable>
        </>
    )
}