import React from 'react'
import axios from 'axios'
import DashboardView from './DashboardView'

export default class DashboardController extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            saldoTotal: 0,
            saldoDisponivel: 0
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/saldo').then(resp =>{
            this.setState({
                saldoTotal: resp.saldo_total,
                saldoDisponivel: resp.disponivel
            })
        })
    }

    render(){
        return(
            <div><DashboardView {...this.state}/></div>
        )
    }

}