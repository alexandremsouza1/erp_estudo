import React, { useEffect } from 'react'
import axios from 'axios'
import DashboardView from './DashboardView'
import { useSelector, useDispatch } from 'react-redux'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import swal from 'sweetalert'
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

    const data = {
        labels: ['01/2020','02/2020', '03/2020', '04/2020', '05/2020', '06/2020', '07/2020' , '08/2020' , '09/2020' , '10/2020', '11/2020', '12/2020'],
        datasets: [
            {
                label: 'Faturamento',
                data: [500.50, 657.98, 789.98, 547.98, 365.65, 568.98, 698.98, 780.98, 890.65, 654.32, 345.78, 456.87, 568.98, 780.90],
                fill: false,
                backgroundColor: '#42A5F5',
                borderColor: '#42A5F5'
            }
        ]
    };

   
    const get = async () => {
        await axios.get(`${DOMAIN}/saldo`).then(res => {
            dispatch({
                type: OBTER_SALDO_TOTAL,
                saldoTotal: res.data.saldo_total.toLocaleString('pt-BR'),
                saldoDisponivel: res.data.disponivel.toLocaleString('pt-BR'),
                saldoALiberar: res.data.liberar.toLocaleString('pt-BR'),
                saldoBloqueado: res.data.bloqueado.toLocaleString('pt-BR'),
                isLoading: false,
                isLoadingStatusPublicacoes: false
            })
        }).catch(error => {
            swal("Error", "Houve um erro ao mostrar os saldos (Dashboard:45):  \n \n " + error, "error");
        })

        await axios.get(`${DOMAIN}/vendas/getTotalDeVendas`).then(resp => {
            dispatch({
                type: OBTER_TOTAL_VENDAS_NO_MES,
                totalVendas: resp.data.total_vendas,
                nomeMes: resp.data.nome_mes,
                isLoading: false
            })
        }).catch(error => {
            swal("Error", "Houve um erro ao mostrar o total de vendas (Dashboard:56):  \n \n " + error, "error");
        })

        await axios.get(`${DOMAIN}/vendas/getVendasPendentes`).then(resp => {
            dispatch({
                type: OBTER_VENDAS_PENDENTE,
                vendasPendente: resp.data,
                totalVendasPendentes: resp.data.totalVendasPendentes,
                isLoading: false
            })
        }).catch(error => {
            swal("Error", "Houve um erro ao mostrar as vendas pendentes (Dashboard:67):  \n \n " + error, "error");
        })

        await axios.get(`${DOMAIN}/anuncio/total_status`).then(status => {
            dispatch({
                type: OBTER_STATUS_ANUNCIOS,
                totalAtivos: status.data.total_ativos,
                totalPausados: status.data.total_pausados,
                isLoading: false
            })
        }).catch(error => {
            swal("Error", "Houve um erro ao mostrar os status dos anuncios (Dashboard:78):  \n \n " + error, "error");
        })
    }

    return (
        <>
            <Dimmer.Dimmable as={Segment} dimmer={state.isLoading.toString()}>
                <Dimmer active={state.isLoading} inverted>
                    <Loader>Carregando dados do Mercado Livre, por favor aguarde...</Loader>
                </Dimmer>
                <DashboardView {...state} data={data}/>
            </Dimmer.Dimmable>
        </>
    )
}