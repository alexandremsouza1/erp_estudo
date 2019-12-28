import React from 'react'
import VendasView from './VendasView'
import axios from 'axios'
import {DOMAIN} from '../../constants/constants'
import sendNotification from '../../components/Notification/Notification'

export default class VendasController extends React.Component {

    constructor(props){
        super(props)
        document.title = "Vendas"
        this.state = {
            vendas: []
        }
    }

    componentDidMount = () => {
        axios.get(`${DOMAIN}/vendas/todas_vendas`).then(vendas =>{
            this.setState({vendas: vendas.data})
        }).catch(error =>{
            sendNotification('error', 'Houve um erro ao listar todas as vendas (VendasController:18): '+ error)
        })
    }

    render() {
        return (
            <VendasView vendas={this.state.vendas}/>
        )
    }
}