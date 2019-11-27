import React from 'react'
import axios from 'axios'
import DashboardView from './DashboardView'

export default class DashboardController extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        axios.get('http://localhost:5000/saldo').then(res => {
            this.setState({
                saldoTotal: res.data.saldo_total.toLocaleString('pt-BR'),
                saldoDisponivel: res.data.disponivel.toLocaleString('pt-BR')
            })
        })

        axios.get('http://localhost:5000/total-vendas').then(resp => {
            this.setState({
                totalVendas: resp.data.total_vendas
            })
        })
    }

    render() {
        return (
            <div>
                <DashboardView {...this.state} />
            </div>
        )
    }

}