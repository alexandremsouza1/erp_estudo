import React from 'react'
import axios from 'axios'
import DashboardView from './DashboardView'

export default class DashboardController extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/saldo').then(res => {
            this.setState({
                saldoTotal: res.data.saldo_total.toLocaleString('pt-BR'),
                saldoDisponivel: res.data.disponivel.toLocaleString('pt-BR'),
            })
        })

        axios.get('http://localhost:5000/vendas/total-vendas').then(resp => {
            this.setState({
                totalVendas: resp.data.total_vendas,
                nomeMes: resp.data.nome_mes
            })
        })
        //http://localhost:5000/vendas/vendas-pendentes
        axios.get('http://localhost:5000/vendas/vendas-pendentes').then(resp => {

            this.setState({
                titulo: resp.data.titulo,
                variacao: resp.data.variacao,
                cliente: resp.data.cliente,
                dataPedido: resp.data.dataPedido,
                valor: resp.data.preco.toLocaleString('pt-BR'),
                linkBoleto: resp.data.boleto,
                fotoPrincipal: resp.data.fotoPrincipal,
                isLoading: false
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