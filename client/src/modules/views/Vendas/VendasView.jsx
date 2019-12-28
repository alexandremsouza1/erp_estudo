import React from 'react'
import '../../../assets/css/Global/style.css'
import { Row, Col } from "react-bootstrap"
import Panel from '../../components/Panel/Panel'
import UserCard from '../../components/UserCard/UserCard'
import imgParaPreparar from '../../../assets/img/delivery-box-icon128px.png'
import imgProntoParaEnviar from '../../../assets/img/delivery-truck-icon128px.png'
import imgEmTrasito from '../../../assets/img/truck-icon128px.png'
import imgConcluido from '../../../assets/img/Accept-icon128px.png'


export default class VendasView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            status_envio: ''
        }
    }

    getStatusEnviado = () => {
        console.log({ status_envio: 'shipped' })
        this.setState({ status_envio: 'shipped' })
    }

    getStatusEntregue = () => {
        console.log({ status_envio: 'delivered' })
        this.setState({ status_envio: 'delivered' })
    }

    getTraduzirStatusEnvio = status_envio => {
        if (status_envio === 'shipped') {
            return 'EM TRÂNSITO'
        }
        if (status_envio === 'delivered') {
            return 'ENTREGUE'
        }
    }

    render() {
        return (
            <div className="content">
                <div >
                    <div >
                        <Row>
                            <Col md={3}>
                                <UserCard
                                    name="Para preparar"
                                    userName="0 vendas"
                                    avatar={imgParaPreparar}>
                                </UserCard>
                            </Col>

                            <Col md={3}>
                                <UserCard
                                    name="Pronto para enviar"
                                    userName="1 venda"
                                    avatar={imgProntoParaEnviar}>
                                </UserCard>
                            </Col>

                            <Col md={3}>
                                <UserCard
                                    name="Em trânsito"
                                    userName="2 venda"
                                    avatar={imgEmTrasito}
                                    onClick={() => this.getStatusEnviado()}>
                                </UserCard>
                            </Col>

                            <Col md={3}>
                                <UserCard
                                    name="Concluídas"
                                    userName="55 vendas"
                                    avatar={imgConcluido}
                                    onClick={() => this.getStatusEntregue()}>
                                </UserCard>
                            </Col>
                        </Row>
                    </div>
                </div>
                {this.props.vendas.map((venda, key) => {
                    if (venda.status_envio === this.state.status_envio) {
                        return (
                            <Panel key={key} title={<>Pedido <span className="badge badge-success" style={{'color': 'white'}}>
                                {this.getTraduzirStatusEnvio(this.state.status_envio)}</span> - Nº #{venda.id_venda} - {venda.titulo}</>} 
                            content={
                                <div>
                                    <span>Conteúdo</span>
                                </div>
                            }>
                            </Panel>
                        )
                    }
                })}
            </div>
        )
    }
}