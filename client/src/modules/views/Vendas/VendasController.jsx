import React from 'react'
import VendasView from './VendasView'
import axios from 'axios'
import { DOMAIN } from '../../constants/constants'
//import sendNotification from '../../components/Notification/Notification'
import swal from 'sweetalert'

export default class VendasController extends React.Component {

    constructor(props) {
        super(props)
        document.title = "Vendas"
        this.state = {
            vendas: [],
            dadosRastreamento: {},
            isLoading: true,
            qtdeVendasConcluidas: 0,
            qtdeVendasCanceladas: 0,
            qtdeVendasEmTransito: 0,
            qtdeVendasPendentes: 0
        }
    }

    componentDidMount = async () => {

        await axios.get(`${DOMAIN}/vendas/getVendasPendentes`).then(vendasPendentes => {
            let vendas = this.state.vendas
            vendasPendentes.data.map(venda => {
                vendas.push(venda)
            })
            this.setState({ vendas })
        }).catch(error => {
            swal("Error", "Houve um erro ao listar todas as vendas pendentes (VendasController:28):  \n \n " + error, "error");
        })
        
        await axios.get(`${DOMAIN}/vendas/getVendasConcluidas`).then(vendasConcluidas => {
            let vendas = this.state.vendas
            vendasConcluidas.data.map(venda => {
                vendas.push(venda)
            })
            this.setState({ vendas })
        }).catch(error => {
            swal("Error", "Houve um erro ao listar todas as vendas concluídas (VendasController:34):  \n \n " + error, "error");
        })

        await axios.get(`${DOMAIN}/vendas/getVendasEmTransito`).then(vendasEmTransito => {
            let vendas = this.state.vendas
            vendasEmTransito.data.map(venda => {
                vendas.push(venda)
            })
            this.setState({ vendas })
        }).catch(error => {
            swal("Error", "Houve um erro ao listar todas as vendas em transito(VendasController:44): \n \n " + error, "error");
        })

        await axios.get(`${DOMAIN}/vendas/getTotalVendas`).then(vendas => {
            this.setState({
                qtdeVendasConcluidas: vendas.data.qtdeVendasConcluidas,
                qtdeVendasCanceladas: vendas.data.qtdeVendasCanceladas,
                qtdeVendasEmTransito: vendas.data.qtdeVendasEmTransito,
                isLoading: false
            })
        }).catch(error => swal('Error','Houve um erro ao mostrar a quantidade total de vendas! \n \n ' + error, 'error'))

        await axios.get(`${DOMAIN}/vendas/getTotalVendasPendentes`).then(vendas => {
            this.setState({
                qtdeVendasPendentes: vendas.data.qtdeVendasPendentes,
                isLoading: false
            })
        }).catch(error => swal('Error','Houve um erro ao mostrar a quantidade total de vendas! \n \n ' + error, 'error'))

    }

    obterRastreioCorreios = async(codigo) => {
        await axios.get(`${DOMAIN}/rastreio/${codigo}`).then(async response =>{
            await this.setState({
                dadosRastreamento: response.data,
                isLoading: false
            })
        })
        
    }


    render() {

        return (
            <VendasView
                vendas={this.state.vendas}
                obterRastreioCorreios={this.obterRastreioCorreios}
                dadosRastreamento={this.state.dadosRastreamento}
                isLoading={this.state.isLoading}
                qtdeVendasConcluidas={this.state.qtdeVendasConcluidas}
                qtdeVendasCanceladas={this.state.qtdeVendasCanceladas}
                qtdeVendasEmTransito={this.state.qtdeVendasEmTransito}
                qtdeVendasPendentes={this.state.qtdeVendasPendentes}/>
        )
    }
}