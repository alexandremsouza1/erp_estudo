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
            qtdeVendasCanceladas: 0
        }
    }

    componentDidMount = async () => {
        
        await axios.get(`${DOMAIN}/vendas/getVendasConcluidas`).then(vendas => {
            this.setState({ vendas: vendas.data })
        }).catch(error => {
            swal("Error", "Houve um erro ao listar todas as vendas concluídas (VendasController:23):  \n \n " + error, "error");
        })

        await axios.get(`${DOMAIN}/vendas/getVendasEmTransito`).then(vendasEmTransito => {
            let vendas = this.state.vendas
            vendasEmTransito.data.map(venda => {
                vendas.push(venda)
            })
            this.setState({ vendas })
        }).catch(error => {
            swal("Error", "Houve um erro ao listar todas as vendas em transito(VendasController:29): \n \n " + error, "error");
        })

        await axios.get(`${DOMAIN}/vendas/getTotalVendasConcluidas`).then(vendasConcluidas => {
            this.setState({
                qtdeVendasConcluidas: vendasConcluidas.data.qtdeVendasConcluidas
            })
        }).catch(error => swal('Error','Houve um erro ao mostrar a quantidade total de vendas concluidas! \n \n ' + error, 'error'))

        await axios.get(`${DOMAIN}/vendas/getTotalVendasCanceladas`).then(vendasCanceladas => {
            this.setState({
                qtdeVendasCanceladas: vendasCanceladas.data.qtdeVendasCanceladas
            })
        }).catch(error => swal('Error','Houve um erro ao mostrar a quantidade total de vendas concluidas! \n \n ' + error, 'error'))
  
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
                qtdeVendasCanceladas={this.state.qtdeVendasCanceladas}/>
        )
    }
}