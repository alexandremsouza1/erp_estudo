import React from 'react'
import '../../../assets/css/Global/style.css'
import { Row, Col } from "react-bootstrap"
import Panel from '../../components/Panel/Panel'
import UserCard from '../../components/UserCard/UserCard'
import imgParaPreparar from '../../../assets/img/delivery-box-icon128px.png'
import imgProntoParaEnviar from '../../../assets/img/delivery-truck-icon128px.png'
import imgEmTrasito from '../../../assets/img/truck-icon128px.png'
import imgConcluido from '../../../assets/img/Accept-icon128px.png'
import { Card, Divider, Dimmer, Loader, Segment } from 'semantic-ui-react'
import iconWhatsapp from '../../../assets/img/WhatsApp-icon.png'
import iconUser from '../../../assets/img/user16px.png'
import iconEnvio from '../../../assets/img/delivery-truck-icon16px.png'
import iconMoney from '../../../assets/img/money16px.png'
import iconPagamentoConfirmado from '../../../assets/img/success-icon16px.png'


export default class VendasView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            status_envio: '',
            badgeSucess: 'badge badge-success',
            badgeDange: 'badge badge-danger'
        }
    }

    getStatusEmTransito = () => {
        //console.log({ status_envio: 'shipped' })
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
                                    onClick={() => this.getStatusEmTransito()}>
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
                    
                    if (venda.dados_entrega.status === this.state.status_envio) {

                        console.log(venda.dados_entrega.status)
                        return (
                            
                                <Panel key={key} title={<>Pedido <span className="badge badge-success" style={{ 'color': 'white' }}>
                                    {this.getTraduzirStatusEnvio(this.state.status_envio)}</span> - Nº #{venda.id_venda} - {venda.itens_pedido.titulo_anuncio}</>}
                                    content={
                                        <>
                                            <Row>
                                                <Col md={4}>
                                                    <Card fluid color='blue'>
                                                        <Card.Content>
                                                            <Card.Header style={{ 'marginLeft': '-15px' }}>
                                                                <img src={iconUser}></img>{' '}
                                                                {venda.comprador.first_name_comprador} {venda.comprador.last_name_comprador}
                                                            </Card.Header>
                                                            <Card.Meta>
                                                                <div>
                                                                    {venda.comprador.nickname_comprador}
                                                                </div>
                                                                <Divider />
                                                                <div>
                                                                    CPF: {venda.comprador.documento_comprador}
                                                                </div>
                                                                <div>
                                                                    <img src={iconWhatsapp}></img>{' '}
                                                                    <a href={venda.comprador.whatsapp} target='_blank' data-toggle="tooltip" title='Número de contato do Whatsapp web!'>{venda.comprador.numero_contato}</a>
                                                                </div>

                                                            </Card.Meta>
                                                            <Card.Description>

                                                            </Card.Description>
                                                        </Card.Content>
                                                    </Card>
                                                </Col>

                                                <Col md={4}>
                                                    <Card fluid color='blue'>
                                                        <Card.Content>
                                                            <Card.Header style={{ 'marginLeft': '-15px' }}>
                                                                <img src={iconMoney}></img>{' '}
                                                                Recebimento
                                                        </Card.Header>
                                                            <Card.Meta>{venda.data_venda}</Card.Meta>
                                                            <Divider />
                                                            <Card.Description>
                                                                <img src={iconPagamentoConfirmado}></img>{' '}
                                                                <span style={{ 'color': '#19b698', 'fontSize': '18px', 'fontFamily': 'Open Sans' }}>R$ {venda.valor_venda.toFixed(2).toLocaleString('pt-BR')}</span>
                                                                <div data-toggle="tooltip" title={venda.status_pagamento === 'approved' ? 'Aprovado' : 'Não aprovado'}>
                                                                    <span className={venda.dados_pagamento[0].status_pagamento === 'approved' ? this.state.badgeSucess : this.state.badgeDange} style={{ 'color': 'white' }}>{venda.dados_pagamento[0].status_pagamento === 'approved' ? 'Aprovado' : 'Estornado'}</span>
                                                                </div>
                                                            </Card.Description>
                                                        </Card.Content>
                                                    </Card>
                                                </Col>

                                                <Col md={4}>
                                                    <Card fluid color='blue'>
                                                        <Card.Content>
                                                            <Card.Header style={{ 'marginLeft': '-15px' }}>
                                                                <img src={iconEnvio}></img>{' '}
                                                                Envio
                                                        </Card.Header>
                                                            <Card.Meta>
                                                                Código de Rastreio:
                                                        </Card.Meta>
                                                            <Divider />
                                                            <Card.Description>
                                                                <div>
                                                                    CEP: {venda.dados_entrega.cep}
                                                                </div>
                                                                <div>
                                                                    Valor pago: {venda.valor_venda.toFixed(2).toLocaleString('pt-BR')}
                                                                </div>
                                                            </Card.Description>
                                                        </Card.Content>
                                                    </Card>
                                                </Col>
                                            </Row>
                                            <Divider />
                                            <Row>
                                                <Col md={6}>
                                                    <div className='panel panel-info'>
                                                        <div className='panel-heading oneLine'>
                                                            <h3 className='panel-title'>
                                                                Dados da Entrega
                                                        </h3>
                                                        </div>
                                                        <div className='panel-body'>
                                                            <div>Destinatário: <b>{venda.comprador.first_name_comprador} {venda.comprador.last_name_comprador}</b></div>
                                                            <div>CEP: <b>{venda.dados_entrega.cep}</b></div>
                                                            <div>Endereço: <b>{venda.dados_entrega.rua}</b></div>
                                                            <div>Complemento:</div>
                                                            <div>Bairro: </div>
                                                            <div>Cidade: <b>{venda.dados_entrega.cidade}</b> - Estado: <b>{venda.dados_entrega.estado}</b></div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className='panel panel-info'>
                                                        <div className='panel-heading oneLine'>
                                                            <h3 className='panel-title'>
                                                                Detalhes do Envio
                                                        </h3>
                                                        </div>
                                                        <div className='panel-body'>
                                                            Detalhes do Envio
                                                    </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </>
                                    }>
                                </Panel>
                        )
                    }
                })}
            </div>
        )
    }
}