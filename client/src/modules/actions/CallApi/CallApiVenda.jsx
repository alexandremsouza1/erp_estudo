import React from 'react'
import { DOMAIN, GET_VENDAS_PENDENTES } from '../../constants/constants'
import axios from 'axios'
import swal from 'sweetalert'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

class CallApiVenda extends React.Component {

    constructor(props){
        super(props)
    }

    actionVendasPendentes = (vendasPendentes) => ({
        type: GET_VENDAS_PENDENTES,
        vendasPendentes: vendasPendentes
    })

    componentDidMount = async () => {
        await axios.get(`${DOMAIN}/vendas/getVendasPendentes`).then(vendasPendentes => {
            console.log("vendasPendentes: "+vendasPendentes.data)
            this.props.vendasPendentes(vendasPendentes)
        }).catch(error => {
            swal('Error', 'Ops, ocorreu um problema ao carregar as vendas pendentes: \n' + error, 'error')
        })
    }

    render() {
        return (
            <></>
        )
    }
}

const mapDispatchToProps = dispatch => {
    bindActionCreators({
        vendasPendentes: (vendasPendentes) => {
            dispatch({
                type: GET_VENDAS_PENDENTES,
                vendasPendentes: vendasPendentes
            })
        }
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(CallApiVenda)

