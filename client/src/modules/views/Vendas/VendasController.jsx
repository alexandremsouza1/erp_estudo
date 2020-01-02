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
            vendas: []
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

        this.getDadosEnvio()
    }

    getDadosEnvio = async () => {
        let vendas = this.state.vendas
        let newShipping = vendas.map(async venda => {
            return await axios.get(`${DOMAIN}/vendas/getDadosEnvio/${venda.dados_entrega.id}`).then(ship => {
                return ship.data
            }).catch(error => {
                swal("Error", "Houve um erro ao listar os dados envio (VendasController:40): \n \n " + error, "error");
            })
        })

        Promise.all(newShipping).then(ship => {
            this.state.vendas.map(venda => {
                if (ship.id === venda.dados_entrega.id) {
                    console.log(ship)
                }
            })
        })

        


    }

    render() {
        return (
            <VendasView
                vendas={this.state.vendas}
                getDadosEnvio={this.getDadosEnvio}
                shipping={this.state.shipping} />
        )
    }
}