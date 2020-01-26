import React from 'react'
import '../../../assets/css/Global/style.css'
import { Row, Col, Modal } from "react-bootstrap"
import Panel from '../../components/Panel/Panel'
import imgParaPreparar from '../../../assets/img/delivery-box-icon128px.png'
import imgProntoParaEnviar from '../../../assets/img/delivery-truck-icon128px.png'
import imgConcluido from '../../../assets/img/Accept-icon128px.png'
import iconCancelled from '../../../assets/img/cancelled.png'
import { Divider, Icon, Step } from 'semantic-ui-react'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import SmsIcon from '@material-ui/icons/Sms';
import iconInterrogation from '../../../assets/img/interrogation.png'
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
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Iframe from 'react-iframe'
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react'
import SearchIcon from '@material-ui/icons/Search';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

export default class VendasView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            status_envio: '',
            badgeSucess: 'badge badge-success',
            badgeDange: 'badge badge-danger',
            openDialogFull: false,
            openDialogCodigoRastreio: false,
            venda: {},
            vendas: [],
            renderizar: false,
            openModalVerMaisDetalhes: false,
            textFieldSearch: ''
        }

        this.handleClickSearch = this.handleClickSearch.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    getStatusEmTransito = () => {
        let vendasDelivered = this.props.vendas.filter(venda => {
            return venda.dados_entrega.status === 'shipped'
        })
        this.setState({ vendas: vendasDelivered, renderizar: true })
    }

    getStatusEntregue = () => {
        let vendasDelivered = this.props.vendas.filter(venda => {
            return venda.dados_entrega.status === 'delivered'
        })
        this.setState({ vendas: vendasDelivered, renderizar: true })
    }

    getStatusCanceladas = () => {
        let vendasDelivered = this.props.vendas.filter(venda => {
            return venda.dados_entrega.status === 'cancelled'
        })
        this.setState({ vendas: vendasDelivered, renderizar: true })
    }

    getTraduzirStatusEnvio = status_envio => {
        if (status_envio === 'shipped') {
            return 'EM TRÂNSITO'
        }
        if (status_envio === 'delivered') {
            return 'ENTREGUE'
        }
        if (status_envio === 'cancelled') {
            return 'CANCELADO'
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

    exibirVerMaisDetalhes = (venda) => {
        this.setState(
            {
                openModalVerMaisDetalhes: true,
                venda: venda
            }
        )
    }

    handleSearch = (event) => {
        this.setState(
            {
                textFieldSearch: event.target.value, renderizar: true
            }
        )
    }

    handleClickSearch = () => {
        let pesquisa = this.props.vendas.filter(venda => {
            return venda.itens_pedido.titulo_anuncio.toLowerCase().includes(this.state.textFieldSearch.toLowerCase())
        })
        this.setState(
            {
                vendas: pesquisa, renderizar: true
            }
        )
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
                                        <Step active href="#" style={{ 'fontSize': '12px' }}>
                                            <Avatar alt="concluido" src={imgParaPreparar} />
                                            <Step.Content style={{ 'marginLeft': '10px' }}>
                                                <Step.Title>Pendentes</Step.Title>
                                                <Step.Description>0 vendas</Step.Description>
                                            </Step.Content>
                                        </Step>

                                        <Step active href="#" style={{ 'fontSize': '12px' }}>
                                            <Avatar alt="concluido" src={imgProntoParaEnviar} />
                                            <Step.Content style={{ 'marginLeft': '10px' }}>
                                                <Step.Title>Pronto para enviar</Step.Title>
                                                <Step.Description>0 vendas</Step.Description>
                                            </Step.Content>
                                        </Step>

                                        <Step active onClick={() => this.getStatusEmTransito()} style={{ 'fontSize': '12px' }}>
                                            <Icon name="truck" />
                                            <Step.Content style={{ 'marginLeft': '10px' }}>
                                                <Step.Title>Em trânsito</Step.Title>
                                                <Step.Description>0 vendas</Step.Description>
                                            </Step.Content>
                                        </Step>

                                        <Step active onClick={() => this.getStatusEntregue()} style={{ fontSize: '12px' }}>
                                            <Avatar alt="concluido" src={imgConcluido} />
                                            <Step.Content style={{ 'marginLeft': '10px' }}>
                                                <Step.Title>Concluídas</Step.Title>
                                                <Step.Description><b>{this.props.qtdeVendasConcluidas || <>Carregando...</>}</b> vendas</Step.Description>
                                            </Step.Content>
                                        </Step>

                                        <Step active onClick={() => this.getStatusCanceladas()} style={{ fontSize: '12px' }}>
                                            <Avatar alt="cancelado" src={iconCancelled} />
                                            <Step.Content style={{ 'marginLeft': '10px' }}>
                                                <Step.Title>Canceladas</Step.Title>
                                                <Step.Description><b>{this.props.qtdeVendasCanceladas || <>Carregando...</>}</b> vendas</Step.Description>
                                            </Step.Content>
                                        </Step>

                                    </Step.Group>
                                </Paper>

                            </Grid>
                        </Row>

                        <Divider />
                        <span>
                            <TextField style={{ width: '80%' }}
                                value={this.state.textFieldSearch}
                                label='Buscar por título'
                                variant='outlined'
                                onChange={(event) => this.handleSearch(event)} />

                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SearchIcon />}
                                onClick={() => this.handleClickSearch()}
                                style={{ height: '51px', margin: '0 5px 0', backgroundColor: '#1976d2' }}>
                                Pesquisar
                            </Button>

                        </span>
                        <Divider />
                    </div>
                </div>

                {this.state.vendas.length > 0

                    ? this.state.vendas.map((venda, key) => {

                        if (this.state.renderizar) {
                            return (
                                <Paper elevation={3} key={key}>
                                    <Panel style={{ 'backgroundColor': '#1976d2', 'color': 'white' }} key={key} title={<div>Pedido <span style={{ 'color': 'white' }}>
                                        |{this.getTraduzirStatusEnvio(venda.dados_entrega.status)}|</span> - Nº #{venda.id_venda} - {venda.itens_pedido.titulo_anuncio} - {venda.data_venda}
                                    </div>}
                                        content={
                                            <>
                                                <Row>
                                                    <Col md={6}>
                                                        <Paper elevation={3}>
                                                            <Card>

                                                                <CardContent>
                                                                    <Typography gutterBottom variant="h5" component="h2">
                                                                        Nome: {venda.comprador.first_name_comprador} {venda.comprador.last_name_comprador}
                                                                    </Typography>
                                                                    <Typography variant="body2" component="p">
                                                                        <strong>Usuário:</strong> {venda.comprador.nickname_comprador}  <strong>CPF:</strong> {venda.comprador.documento_comprador}
                                                                    </Typography>
                                                                </CardContent>

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
                                                                            <div>Status de pagamento: <b>{venda.dados_pagamento[0].status_pagamento === 'approved' ? 'Aprovado' : 'Estornado'}</b></div>

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
                                                                            <Tooltip title="Clique aqui ver mais detalhes">
                                                                                <Button style={{ 'marginLeft': '-8px', 'marginTop': '8px' }} onClick={() => this.exibirVerMaisDetalhes(venda)}>Ver mais detalhes</Button>
                                                                            </Tooltip>
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

                                                        <div className='panel' style={{ 'height': '193px'}}>

                                                            {venda.dados_entrega.cod_rastreamento === null
                                                                ?
                                                                <div>
                                                                    <div className='panel-heading oneLine' style={{marginLeft : '-15px'}}>
                                                                        <h3 className='panel-title'>
                                                                            Notas:
                                                                        </h3>
                                                                    </div>
                                                                   
                                                                    <div>Uma ordem pode ser cancelada pelos seguintes motivos:</div>
                                                                    <div>- Requeria aprovação do pagamento para descontar do estoque, mas, no tempo de processo de aprovação, o item foi pausado/finalizado por falta de estoque, portanto, o pagamento é retornado ao comprador.</div>
                                                                    <div>- Requeria pagamento, mas, após certo tempo, não foi paga, por isso é automaticamente cancelada.</div>
                                                                </div>
                                                                : <>
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
                                                                </>
                                                            }

                                                            {venda.dados_entrega.cod_rastreamento !== null
                                                                ?
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
                                                                : <></>
                                                            }

                                                        </div>


                                                    </Col>
                                                </Row>
                                            </>
                                        }>
                                    </Panel>
                                </Paper>
                            )
                        }
                    }
                    )

                    : <>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', color: '#333' }}>
                            <img src={iconInterrogation} style={{ width: '90px', height: '90px', margin: '0 0 18px' }}></img>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', color: '#333', fontSize: '18px', margin: '0 0 18px' }}>
                            Nada por aqui…
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', color: '#666', 'fontSize': '14px', margin: '0 0 14px' }}>
                            Não há vendas com este filtro ou nenhum filtro foi clicado. Por favor, tente tente novamente nas opções acima.
                        </div>
                    </>
                }

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

                {this.state.openModalVerMaisDetalhes &&

                    <Modal show={this.state.openModalVerMaisDetalhes} onHide={() => this.setState({ openModalVerMaisDetalhes: false })} style={{ 'marginTop': '50px' }} dialogClassName="width_modal_1000px">
                        <Modal.Header closeButton style={{ 'backgroundColor': '#467EED', 'color': 'white' }}>
                            <Modal.Title>{this.state.venda.itens_pedido.titulo_anuncio} - {this.state.venda.itens_pedido.id_anuncio}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>SKU</TableCell>
                                            <TableCell align="right">Taxa da venda</TableCell>
                                            <TableCell align="right">Garantia</TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {this.state.venda.itens_pedido.sku === null ? <>Não informado</> : this.state.venda.itens_pedido.sku}
                                            </TableCell>
                                            <TableCell align="right">R$ {this.state.venda.itens_pedido.taxa_venda.toFixed(2)}</TableCell>
                                            <TableCell align="right">{this.state.venda.itens_pedido.garantia === null ? <>Não informado</> : this.state.venda.itens_pedido.garantia}</TableCell>
                                            {this.state.venda.itens_pedido.variation_attributes.map((variation, key) => {
                                                return (
                                                    <TableCell key={key} align="right"><b>{variation.value_name}</b></TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
                                                                dateInnerStyle={{ background: '#467EED', color: 'white' }}
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