import React from 'react'
import '../../../assets/css/Global/style.css'
import { Row, Col, Modal } from "react-bootstrap"
import Panel from '../../components/Panel/Panel'
import imgParaPreparar from '../../../assets/img/delivery-box-icon128px.png'
import imgProntoParaEnviar from '../../../assets/img/delivery-truck-icon128px.png'
import imgConcluido from '../../../assets/img/Accept-icon128px.png'
import { Divider, Icon, Step } from 'semantic-ui-react'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import SmsIcon from '@material-ui/icons/Sms';
import iconPagamentoConfirmado from '../../../assets/img/success-icon16px.png'
import iconCustoEnvio from '../../../assets/img/delete-icon16px.png'
import RoomIcon from '@material-ui/icons/Room';
import Avatar from '@material-ui/core/Avatar';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import GoogleMaps from '../../components/GoogleMaps/GoogleMaps'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import IconButton from '@material-ui/core/IconButton';
import Iframe from 'react-iframe'
import DialogFull from '../../components/Dialogs/DialogFull'
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react'

export default class VendasView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            status_envio: '',
            badgeSucess: 'badge badge-success',
            badgeDange: 'badge badge-danger',
            openDialogFull: false,
            openDialogCodigoRastreio: false,
            venda: {}
        }
    }

    getStatusEmTransito = () => {
        this.setState({ status_envio: 'shipped' })
    }

    getStatusEntregue = () => {
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

    exibirBoleto = (venda) => {
        this.setState(
            {
                openDialogFull: true,
                venda: venda
            }
        )
    }

    exibirRastreamento = (codigo) => {
        this.setState(
            {
                openDialogCodigoRastreio: true,
                codigo: codigo
            }
        )
        this.props.obterRastreioCorreios(codigo)
    }

    render() {
        return (
            <div className="content">
                <div >
                    <div >
                        <Row>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Paper elevation={2}>
                                    <Step.Group>
                                        <Step active href="#" style={{'fontSize': '16px'}}>
                                            <Avatar alt="concluido" src={imgParaPreparar} />
                                            <Step.Content style={{ 'marginLeft': '10px' }}>
                                                <Step.Title>Pendentes</Step.Title>
                                                <Step.Description>0 vendas</Step.Description>
                                            </Step.Content>
                                        </Step>

                                        <Step active href="#" style={{'fontSize': '16px'}}>
                                            <Avatar alt="concluido" src={imgProntoParaEnviar} />
                                            <Step.Content style={{ 'marginLeft': '10px' }}>
                                                <Step.Title>Pronto para enviar</Step.Title>
                                                <Step.Description>5 vendas</Step.Description>
                                            </Step.Content>
                                        </Step>

                                        <Step active onClick={() => this.getStatusEmTransito()} style={{'fontSize': '16px'}}>
                                            <Icon name="truck" />
                                            <Step.Content style={{ 'marginLeft': '10px' }}>
                                                <Step.Title>Em trânsito</Step.Title>
                                                <Step.Description>13 vendas</Step.Description>
                                            </Step.Content>
                                        </Step>

                                        <Step active onClick={() => this.getStatusEntregue()} style={{'fontSize': '16px'}}>
                                            <Avatar alt="concluido" src={imgConcluido} />
                                            <Step.Content style={{ 'marginLeft': '10px' }}>
                                                <Step.Title>Concluídas</Step.Title>
                                                <Step.Description>69 vendas</Step.Description>
                                            </Step.Content>
                                        </Step>

                                    </Step.Group>
                                </Paper>

                            </Grid>
                        </Row>
                        <Divider />
                    </div>
                </div>
                {this.props.vendas.map((venda, key) => {

                    if (venda.dados_entrega.status === this.state.status_envio) {
                        return (
                            <Paper elevation={3} key={key}>
                                <Panel style={{ 'backgroundColor': '#1976d2', 'color': 'white' }} key={key} title={<div>Pedido <span className="badge badge-success" style={{ 'color': 'white' }}>
                                    {this.getTraduzirStatusEnvio(this.state.status_envio)}</span> - Nº #{venda.id_venda} - {venda.itens_pedido.titulo_anuncio} - {venda.data_venda}
                                </div>}
                                    content={
                                        <>
                                            <Row>
                                                <Col md={6}>
                                                    <Paper elevation={3}>
                                                        <Card>
                                                            <CardActionArea>
                                                                <CardContent>
                                                                    <Typography gutterBottom variant="h5" component="h2">
                                                                        Nome: {venda.comprador.first_name_comprador} {venda.comprador.last_name_comprador}
                                                                    </Typography>
                                                                    <Typography variant="body2" component="p">
                                                                        <strong>Usuário:</strong> {venda.comprador.nickname_comprador}  <strong>CPF:</strong> {venda.comprador.documento_comprador}
                                                                    </Typography>
                                                                </CardContent>
                                                            </CardActionArea>
                                                            <CardActions>
                                                                <Tooltip title="Clique aqui para enviar mensagem para o comprador pelo Whatsapp Web">
                                                                    <Button
                                                                        variant="contained"
                                                                        style={{ 'color': 'white', 'backgroundColor': 'green' }}
                                                                        startIcon={<WhatsAppIcon />}>
                                                                        <a href={venda.comprador.whatsapp} style={{ 'color': 'white' }} target='_blank' data-toggle="tooltip" title='Enviar mensagem WhatsApp'>Enviar mensagem WhatsApp</a>
                                                                    </Button>
                                                                </Tooltip>
                                                                <Tooltip title="Clique aqui para enviar mensagem para o comprador para ser lido na plataforma do Mercado Livre">
                                                                    <Button
                                                                        variant="contained"
                                                                        style={{ 'color': 'black', 'backgroundColor': '#ffe600' }}
                                                                        startIcon={<SmsIcon />}>
                                                                        Enviar Mensagem Mercado Livre
                                                                    </Button>
                                                                </Tooltip>
                                                            </CardActions>
                                                        </Card>
                                                    </Paper>
                                                </Col>

                                                <Col md={6}>
                                                    <Paper elevation={3}>

                                                        <Card style={{ 'height': '135px' }}>

                                                            <CardContent>

                                                                <Row>
                                                                    <Col md={6}>

                                                                        <div>Data da venda: <b>{venda.data_venda}</b></div>
                                                                        <div>Valor do produto: <b>R$ {venda.valor_venda.toLocaleString('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' })}</b></div>
                                                                        <div>
                                                                            Status de pagamento:
                                                                                <div className={venda.dados_pagamento[0].status_pagamento === 'approved' ? this.state.badgeSucess : this.state.badgeDange}
                                                                                style={{ 'color': 'white', 'fontSize': '10px', 'marginLeft': '5px' }}>{venda.dados_pagamento[0].status_pagamento === 'approved' ? 'Aprovado' : 'Estornado'}</div>
                                                                        </div>

                                                                        <CardActions>
                                                                            {venda.dados_pagamento[0].boleto_url !== null &&
                                                                                <Button
                                                                                    variant="contained"
                                                                                    style={{ 'color': 'black', 'marginBottom': '20px', 'marginTop': '15px', 'marginLeft': '-9px' }}
                                                                                    color='default'
                                                                                    onClick={() => this.exibirBoleto(venda)}
                                                                                    startIcon={<PictureAsPdfIcon color="primary" />}>
                                                                                    Visualizar Boleto
                                                                                </Button>
                                                                            }
                                                                        </CardActions>
                                                                    </Col>

                                                                    <Col md={6}>


                                                                        <div>Tipo de pagamento: <b>{venda.dados_pagamento[0].tipoPagamento}</b></div>
                                                                        <div>Custo de envio: <b>R$ {venda.dados_pagamento[0].custo_envio.toLocaleString('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' })}</b></div>
                                                                        <div>Valor pago: <b>R$ {venda.dados_pagamento[0].total_pago.toLocaleString('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' })}</b></div>
                                                                        <div>Qtde vendido: <b>{venda.itens_pedido.quantidade_vendido}</b></div>


                                                                    </Col>



                                                                </Row>


                                                            </CardContent>


                                                        </Card>
                                                    </Paper>
                                                </Col>

                                            </Row>
                                            <Divider />
                                            <Row>
                                                <Col md={6}>

                                                    <div className='panel'>
                                                        <div className='panel-heading oneLine'>
                                                            <h3 className='panel-title'>
                                                                Dados da Entrega
                                                                </h3>
                                                        </div>
                                                        <div className='panel-body'>
                                                            <div>Destinatário: <b>{venda.comprador.first_name_comprador} {venda.comprador.last_name_comprador}</b></div>
                                                            <Typography variant="body2">
                                                                CEP: <b>{venda.dados_entrega.endereco_entrega.cep}</b>
                                                            </Typography>
                                                            <div>Quem recebe: <b>{venda.dados_entrega.endereco_entrega.nomePessoaEntrega}</b> - <b>Tel.: {venda.dados_entrega.endereco_entrega.telefonePessoaEntrega}</b></div>
                                                            <div>Endereço: <b>{venda.dados_entrega.endereco_entrega.rua}</b> - Nº <b>{venda.dados_entrega.endereco_entrega.numero}</b></div>
                                                            <div>Bairro: <b>{venda.dados_entrega.endereco_entrega.bairro.name}</b></div>
                                                            <div>Cidade: <b>{venda.dados_entrega.endereco_entrega.cidade.name}</b> - Estado: <b>{venda.dados_entrega.endereco_entrega.estado.name}</b></div>
                                                        </div>
                                                    </div>

                                                </Col>



                                                <Col md={6}>

                                                    <div className='panel' style={{ 'height': '193px' }}>


                                                        <div className='panel-heading oneLine'>
                                                            <h3 className='panel-title'>
                                                                Detalhes do Envio
                                                                </h3>
                                                        </div>
                                                        <div className='panel-body'>
                                                            <Typography variant="body2">
                                                                Código de Rastreio: {venda.dados_entrega.cod_rastreamento}
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                Método de envio: <b>{venda.dados_entrega.metodo_envio}</b>
                                                            </Typography>
                                                        </div>


                                                        <CardActions style={{ 'marginTop': '-15px' }}>

                                                            <Tooltip title="Acompanhar o rastreamento do produto">
                                                                <Button
                                                                    variant="contained"
                                                                    color="default"
                                                                    onClick={() => this.exibirRastreamento(venda.dados_entrega.cod_rastreamento)}
                                                                    startIcon={<LocalShippingIcon />}>
                                                                    Visualizar rastreamento
                                                                    </Button>
                                                            </Tooltip>
                                                        </CardActions>
                                                    </div>


                                                </Col>
                                            </Row>
                                        </>
                                    }>
                                </Panel>



                            </Paper>
                        )
                    }
                })}

                {this.state.openDialogFull &&

                    <Modal show={this.state.openDialogFull} onHide={() => this.setState({ openDialogFull: false })} style={{ 'marginTop': '50px' }} dialogClassName="width_modal_900px">
                        <Modal.Header closeButton style={{ 'backgroundColor': '#467EED', 'color': 'white' }}>
                            <Modal.Title>{this.state.venda.dados_pagamento[0].tipoPagamento}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Iframe url={this.state.venda.dados_pagamento[0].boleto_url}
                                width='880px'
                                height='450px' />
                        </Modal.Body>
                    </Modal>
                }

                {this.state.openDialogCodigoRastreio &&

                    <Modal show={this.state.openDialogCodigoRastreio} onHide={() => this.setState({ openDialogCodigoRastreio: false })} style={{ 'marginTop': '50px' }} dialogClassName="width_modal_900px">
                        <Modal.Header closeButton style={{ 'backgroundColor': '#467EED', 'color': 'white' }}>
                            <Modal.Title>{this.props.dadosRastreamento.error !== '404' ? <>Rastreamento - {this.props.dadosRastreamento.code}</> : <>Atenção</>}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.props.isLoading === false ?
                                this.props.dadosRastreamento.error !== '404' ?
                                    <div>
                                        <Row style={{ 'fontSize': '15px' }}>
                                            <Col md={2}>
                                                <div>Entregue ? <b>{this.props.dadosRastreamento.isDelivered === true ? 'Sim' : 'Não'}</b></div>
                                            </Col>
                                            <Col md={5}>
                                                <div>Data da postagem: <b>{this.props.dadosRastreamento.postedAt}</b></div>
                                            </Col>
                                            <Col md={5}>
                                                <div>Última atualização: <b>{this.props.dadosRastreamento.updatedAt}</b></div>
                                            </Col>
                                        </Row>

                                        {this.props.dadosRastreamento.tracks !== null ?
                                            this.props.dadosRastreamento.tracks.map((track, key) => {
                                                return (
                                                    <>
                                                        <Timeline lineColor={'#ddd'} key={key}>
                                                            <TimelineItem
                                                                key={key}
                                                                dateText={track.trackedAt}
                                                                style={{ 'color': '#337ab7' }}>

                                                                <div style={{ 'textTransform': 'uppercase' }}>{track.locale}</div>
                                                                <Divider />
                                                                <div style={{ 'textTransform': 'uppercase' }}><b>{track.status}</b></div>
                                                                <Divider />
                                                                {track.observation !== null ? <div style={{ 'textTransform': 'uppercase' }}><b>{track.observation}</b></div> : ''}

                                                            </TimelineItem>
                                                        </Timeline>
                                                    </>
                                                )
                                            })
                                            : ''}
                                    </div> : <div>{this.props.dadosRastreamento.message}</div>
                                : <div>Carregando dados...</div>
                            }

                        </Modal.Body>
                    </Modal>
                }
            </div>
        )
    }
}