import React from 'react'
import { Row, Col, Modal } from "react-bootstrap";
import FormInput from '../../components/FormInput/FormInput'
import { Form, Input, Message } from 'semantic-ui-react'

import { makeStyles } from '@material-ui/core/styles';
import ButtonUI from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import sendNotification from '../../components/Notification/Notification'

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Switch from '@material-ui/core/Switch';
import imgAnuncioClassico from '../../../assets/img/anuncio_classico.PNG'
import imgAnuncioPremium from '../../../assets/img/anuncio_premium.PNG'
import imgOfereceMercadoEnvios from '../../../assets/img/oferece_mercado_envios.png'
import imgFormaDeEntrega from '../../../assets/img/forma_de_entrega.PNG'
import imgInfoComFreteGratis from '../../../assets/img/infoComFreteGratis.png'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Popover from '@material-ui/core/Popover';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    displayInline: {
        display: 'grid'
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },

}));

const HeaderExpansionPanel = ({ title, subtitle, message }) => {
    return (
        <>
            <div style={{ fontSize: '18px', color: '#333333' }}>{title}</div>
            <div style={{ fontSize: '16px', color: '#666666' }}>{subtitle}</div>
            <div style={{ fontSize: '14px', color: '#31d086' }}>{message}</div>
        </>
    )
}

const Speaker = () => {
    return (
        <Popover title="Title">
            <p>This is a defalut Popover </p>
            <p>Content</p>
        </Popover>
    )
}

export default function EditarAnuncio(props) {

    const classes = useStyles();

    const [state, setState] = React.useState({
        isClassico: props.tipoAnuncio_id === 'gold_special' ? true : false,
        isPremium: props.tipoAnuncio_id === 'gold_pro' ? true : false,
        showInfoMercadoLivreEditarTitulo: false,
        title: props.titulo,
        freeShipping: props.freeShipping === undefined ? false : true
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        })
    }

    const handleFreeShipping = event => {
        setState({
            freeShipping: event.target.value
        })
        console.log("freeShipping: "+state.freeShipping)
    }

    const setListingType = () => {
        if (state.isClassico) {
            return 'gold_special'
        } else {
            return 'gold_pro'
        }
    }

    const mostrarTarifaVendaPremium = () => {
        if (props.json.shipping.free_shipping) {
            return ((props.preco * 16) / 100).toFixed(2)
        } else {
            return (((props.preco * 16) / 100) + 5).toFixed(2)
        }
    }

    const mostrarTarifaVendaClassico = () => {
        if (props.json.shipping.free_shipping) {
            return ((props.preco * 11) / 100).toFixed(2)
        } else {
            return (((props.preco * 11) / 100) + 5).toFixed(2)
        }
    }

    const handleConfirmarListingType = () => {
        if (state.isClassico && state.isPremium) {
            sendNotification('error', 'Você selecionou dois tipos de anúncios: CLÁSSICO e PRÉMIUM, por favor escolha apenas um dos dois e clique em Confirmar', 10000)
            return
        }
        if (!state.isClassico && !state.isPremium) {
            sendNotification('error', 'Você não selecionou nenhum tipo de anúncio, por favor escolha CLÁSSICO OU PRÉMIUM e clique em Confirmar', 10000)
            return
        }

        props.updateListingType(props.id, setListingType())
    }

    return (
        <>
            <Dialog fullScreen open={props.showModal} onClose={() => props.setShowModal(false)}>

                <AppBar className={classes.appBar} style={{ 'backgroundColor': '#4682B4' }}>
                    <Toolbar>
                        <Chip icon={<EditIcon />} label='Modificar Anúncio' />
                        <Typography variant="h6" className={classes.title}>
                            {props.titulo}
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={() => props.setShowModal(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <div style={{ margin: '15px 10px 0' }}>
                    <Row>
                        <Col md={12}>
                            <Paper elevation={3}>
                                <ExpansionPanel expanded>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}>
                                        <span style={{ fontSize: '14px', color: '#8c8c8c' }}>Total de visitas {props.visualizacao} | Total de vendas {props.quantidadeVendido}</span>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Row>
                                            <Col md={12}>
                                                <FormInput onChange={(event) => {setState({title: event.target.value})}} width='500px' label="Título" value={props.titulo} style={{ "color": "blue" }} disabled={props.quantidadeVendido > 0 ? true : false} />
                                                {props.quantidadeVendido > 0 &&
                                                    <Message info style={{ width: '500px' }}>
                                                        <Message.Header>De acordo com as políticas do Mercado Livre, só será possível alterar os títulos dos anúncios que NÃO tiverem vendas.</Message.Header>
                                                        <p style={{ fontSize: '11px' }}>Quer saber como criar um bom título para seus anúncios? <ButtonUI onClick={() => setState({ showInfoMercadoLivreEditarTitulo: true })} style={{ fontSize: '11px' }} size="small">Clique aqui</ButtonUI></p>
                                                    </Message>
                                                }
                                            </Col>
                                        </Row>
                                    </ExpansionPanelDetails>
                                    <div>
                                        <CardActions>
                                            <ButtonUI onClick={() => {props.updateTitle(props.id, state.title)}} disabled={props.quantidadeVendido > 0 ? true : false} variant="contained">Confirmar</ButtonUI>
                                        </CardActions>
                                    </div>
                                </ExpansionPanel>
                            </Paper>
                        </Col>
                    </Row>


                    <p></p>
                    <Row>
                        <Col md={12}>
                            <Paper elevation={3}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}>
                                        <span style={{ fontSize: '18px', color: '#333333' }}>Ficha técnica</span>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Row>
                                            <Col md={6}>
                                                <FormInput width='500px' label="Marca" value={props.titulo} style={{ "color": "blue" }} disabled={false} />
                                                <FormInput width='500px' label="Gênero" value={props.titulo} style={{ "color": "blue" }} disabled={false} />
                                                <FormInput width='500px' label="Volume da unidade" value={props.titulo} style={{ "color": "blue" }} disabled={false} />
                                                <FormInput width='500px' label="Idade" value={props.titulo} style={{ "color": "blue" }} disabled={false} />
                                                <FormInput width='500px' label="Peças do set" value={props.titulo} style={{ "color": "blue" }} disabled={false} />
                                            </Col>
                                            <Col md={6}>
                                                <FormInput marginLeft='100px' label="Nome do perfume" placeholder='R$' value={props.preco.toLocaleString("pt-BR")} style={{ "color": "blue" }} />
                                                <FormInput marginLeft='100px' label="Tipo" value={props.titulo} style={{ "color": "blue" }} disabled={false} />
                                                <FormInput marginLeft='100px' label="Unidade por pacote" value={props.titulo} style={{ "color": "blue" }} disabled={false} />
                                            </Col>
                                        </Row>


                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Paper>
                        </Col>
                    </Row>
                    <p></p>
                    <Row>
                        <Col md={12}>
                            <Paper elevation={3}>
                                <ExpansionPanel onChange={() => props.obterValorDoCustoFreteGratisPorAnuncio(props.id)}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}>
                                        <HeaderExpansionPanel
                                            className={classes.displayInline}
                                            title='Forma de entrega' />
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Card>
                                            <CardContent>
                                                <Row>
                                                    <Col md={6}>
                                                        <div style={{ color: '#000000', fontSize: '18px' }}>
                                                            <img src={imgOfereceMercadoEnvios}></img>Faço envios pelo Mercado Envios
                                                        </div>
                                                        <FormControl component="fieldset">
                                                            <RadioGroup value={state.freeShipping} onChange={(event) => handleFreeShipping(event)}>

                                                                <FormControlLabel style={{ paddingTop: '50px' }} value={false} control={<Radio />} label={
                                                                    <span style={{ color: '#000000', fontSize: '18px' }}>
                                                                        Com frete grátis. {' '}
                                                                        <img src={imgInfoComFreteGratis}></img>
                                                                    </span>
                                                                } />
                                                              
                                                                <div style={{ color: '#666666', fontSize: '16px', paddingLeft: '27px' }}>Você paga R$ {props.custoFrete} pelo frete para qualquer destino</div>
                                                                <FormControlLabel style={{ paddingTop: '15px' }} value={true} control={<Radio />} label={
                                                                    <div style={{ color: '#000000', fontSize: '18px' }}>Não oferecer frete grátis</div>
                                                                } />

                                                            </RadioGroup>
                                                        </FormControl>
                                                        <div style={{ color: '#666666', fontSize: '16px', paddingLeft: '27px' }}>O Comprador paga o frete</div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <img style={{ paddingTop: '120px' }} src={imgFormaDeEntrega}></img>
                                                    </Col>
                                                </Row>
                                            </CardContent>
                                            <div>
                                                <CardActions>
                                                    <ButtonUI variant="contained">Confirmar</ButtonUI>
                                                </CardActions>
                                            </div>
                                        </Card>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Paper>
                        </Col>
                    </Row>
                    <p></p>
                    <Row>
                        <Col md={12}>
                            <Paper elevation={3}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}>
                                        <span style={{ fontSize: '18px', color: '#333333' }}>Retirar pessoalmente</span>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>



                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Paper>
                        </Col>
                    </Row>
                    <p></p>
                    <Row>
                        <Col md={12}>
                            <Paper elevation={3}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}>
                                        <span style={{ fontSize: '18px', color: '#333333' }}>Tipo de anúncio</span>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Row>
                                            <Col md={6}>
                                                <Card style={{ width: '300px' }}>
                                                    <CardContent>
                                                        <div>
                                                            <img src={imgAnuncioClassico}></img>
                                                        </div>
                                                        <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
                                                            <div>Clássico</div>
                                                        </div>
                                                        <div style={{ fontSize: '20px', color: '#333333' }}>
                                                            <div>Exposição alta</div>
                                                        </div>
                                                        <div style={{ fontSize: '12px', color: '#000000' }}>
                                                            <div></div>
                                                            <div>Duração ilimitada</div>
                                                        </div>

                                                        <br></br>
                                                        <Divider style={{ marginTop: '34px' }} />
                                                        <div style={{ fontSize: '32px', color: '#000000' }}>R$ {mostrarTarifaVendaClassico()}</div>
                                                        <div style={{ fontSize: '12px', color: '#000000' }}>Tarifa de venda</div>
                                                    </CardContent>
                                                    <CardActions>
                                                        <FormControlLabel
                                                            control={<Switch checked={state.isClassico} onChange={(event) => handleChange(event)} name='isClassico' />}
                                                            label={state.isClassico ? 'Selecionado' : ''}
                                                            color="primary"
                                                        />
                                                    </CardActions>
                                                </Card>
                                            </Col>
                                            <Col md={6}>
                                                <Card style={{ width: '300px' }}>
                                                    <CardContent>
                                                        <div>
                                                            <img src={imgAnuncioPremium}></img>
                                                        </div>
                                                        <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
                                                            <div>Premium</div>
                                                        </div>
                                                        <div style={{ fontSize: '20px', color: '#333333' }}>
                                                            <div>Exposição máxima</div>
                                                        </div>
                                                        <div style={{ fontSize: '12px', color: '#000000' }}>
                                                            <div></div>
                                                            <div>Duração ilimitada</div>
                                                        </div>
                                                        <div style={{ fontSize: '12px', color: '#000000' }}>
                                                            <div></div>
                                                            <div>Você oferece parcelamento sem acréscimo</div>
                                                        </div>

                                                        <br></br>
                                                        <Divider style={{ marginTop: '9px' }} />
                                                        <div style={{ fontSize: '32px', color: '#000000' }}>R$ {mostrarTarifaVendaPremium()}</div>
                                                        <div style={{ fontSize: '12px', color: '#000000' }}>Tarifa de venda</div>
                                                    </CardContent>
                                                    <CardActions>
                                                        <FormControlLabel
                                                            control={<Switch checked={state.isPremium} onChange={(event) => handleChange(event)} name='isPremium' />}
                                                            label={state.isPremium ? 'Selecionado' : ''}
                                                            color="primary"
                                                        />
                                                    </CardActions>
                                                </Card>
                                            </Col>

                                            <CardActions>
                                                <ButtonUI onClick={() => handleConfirmarListingType()} variant="contained">Confirmar</ButtonUI>
                                            </CardActions>
                                        </Row>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Paper>
                        </Col>
                    </Row>
                    <p></p>
                    <Row>
                        <Col md={12}>
                            <Paper elevation={3}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}>
                                        <span style={{ fontSize: '18px', color: '#333333' }}>Descrição</span> <span style={{ fontSize: '14px', color: '#cccccc', paddingLeft: '5px', paddingTop: '2px' }}>| Opcional</span>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>

                                        <FormInput label="Descrição somente texto"
                                            value={props.description} style={{ "color": "blue", width: '500%' }}
                                            componentClass="textarea" rows="10" />

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Paper>
                        </Col>
                    </Row>
                    <p></p>
                    <Row>
                        <Col md={12}>
                            <Paper elevation={3}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}>
                                        <span style={{ fontSize: '18px', color: '#333333' }}>Vídeo</span> <span style={{ fontSize: '14px', color: '#cccccc', paddingLeft: '5px', paddingTop: '2px' }}>| Opcional</span>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <div>
                                            <div style={{ fontSize: '16px', color: '#666666', fontFamily: 'Helvetica Roboto Arial sans-serif' }}>Você pode adicionar um vídeo do YouTube</div>
                                            <Input icon='youtube' iconPosition='left' placeholder='Informe aqui o link do YouTube'
                                                value={props.video_id} style={{ "color": "blue", 'width': '400px' }} />
                                        </div>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Paper>
                        </Col>
                    </Row>
                    <p></p>
                    <Row>
                        <Col md={12}>
                            <Paper elevation={3}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}>
                                        <span style={{ fontSize: '18px', color: '#333333' }}>Disponibilidade de estoque</span> <span style={{ fontSize: '14px', color: '#cccccc', paddingLeft: '5px', paddingTop: '2px' }}>| Opcional</span>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>

                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Paper>
                        </Col>
                    </Row>
                    <p></p>
                    <Row>
                        <Col md={12}>
                            <Paper elevation={3}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}>
                                        <span style={{ fontSize: '18px', color: '#333333' }}>Garantia</span>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>



                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Paper>
                        </Col>
                    </Row>
                    <p></p>
                    <Row>
                        <Col md={12}>
                            <Paper elevation={3}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}>
                                        <span style={{ fontSize: '18px', color: '#333333' }}>Condição</span>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>



                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Paper>
                        </Col>
                    </Row>
                    <p></p>
                    <Row>
                        <Col md={12}>
                            <Paper elevation={3}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}>
                                        <span style={{ fontSize: '18px', color: '#333333' }}>Categoria</span>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>



                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </Paper>
                        </Col>
                    </Row>


                    <label>Estado do produto</label>
                    <Row>
                        <Col sm={1}>
                            <Form.Radio
                                label='Novo'
                                value='novo'
                                checked={props.isSelectedEstadoProduto === 'novo'}
                                onChange={props.handleChangeIsSelectedEstadoProdutoNovo} />
                        </Col>
                        <Col sm={11}>
                            <Form.Radio
                                label='Usado'
                                value='usado'
                                checked={props.isSelectedEstadoProduto === 'usado'}
                                onChange={props.handleChangeIsSelectedEstadoProdutoUsado} />
                        </Col>
                    </Row>

                    <label>Frete</label>
                    <Row>
                        <Col sm={2}>
                            <Form.Radio
                                label='Por Conta do Comprador'
                                checked={props.isSelectedFrete === ''}
                                onChange={props.handleChangeSelectedFretePorContaDoComprador} />
                        </Col>
                        <Col sm={10}>
                            <Form.Radio
                                label='Frete Grátis Brasil'
                                checked={props.isSelectedFrete === props.freteGratis}
                                onChange={props.handleChangeSelectedFreteGratis} />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <FormInput label="Garantia" value={""} style={{ "color": "blue" }} componentClass="textarea" rows="2" />
                        </Col>
                    </Row>



                    <Modal.Footer>
                        <ButtonUI startIcon={<CloseIcon />} variant="contained" color="secondary" onClick={() => props.setShowModal(false)}>
                            Fechar
                        </ButtonUI>
                    </Modal.Footer>

                </div>
            </Dialog>

            <Dialog open={state.showInfoMercadoLivreEditarTitulo} onClose={() => setState({ showInfoMercadoLivreEditarTitulo: false })} maxWidth='xl'>
                <DialogTitle>Escrever um bom título</DialogTitle>
                <Paper style={{ fontSize: '16px', color: '#666666' }}>
                    <div style={{ margin: '0 23px 0' }}>
                        <div>O título é fundamental para que os compradores encontrem o seu produto. Por isso, ele deve ser o mais claro possível.</div>
                        <p></p>
                        <div>Lembre-se de que você só será possível editar os anúncios sem vendas.</div>
                        <p></p>
                        <ul>
                            <li style={{ padding: '0 0 10px' }}>Crie o título com <strong>Produto + Marca + modelo do produto + algumas especificações que ajudem a identificar o produto.</strong></li>
                            <li style={{ padding: '0 0 10px' }}><p><strong>Evite colocar no título informações sobre outros serviços</strong>, como devoluções, frete grátis ou parcelamento. Estes dados serão incluídos por nós para que os compradores possam vê-los antes mesmo de entrar no anúncio.</p></li>
                            <li style={{ padding: '0 0 10px' }}><strong>Caso seu produto seja novo, usado ou recondicionado, não inclua isto no título</strong>, nós informaremos no detalhe do anúncio.</li>
                            <li style={{ padding: '0 0 10px' }}><p><strong>Se você vende o mesmo produto, porém em várias cores, evite especificar isso no título.</strong>É melhor criar variações, assim tudo ficará em um único anúncio.</p></li>
                            <li style={{ padding: '0 0 10px' }}><p>Caso você tenha estoque em apenas uma determinada cor, <strong>adicione a quantidade na variação correspondente ao anunciar, ou em Modificar.</strong></p></li>
                            <li style={{ padding: '0 0 10px' }}><p><strong>Se você oferecer algum desconto, destacaremos isso no seu anúncio,</strong>indicando a porcentagem do desconto.</p></li>
                            <li style={{ padding: '0 0 10px' }}><p>Separe as palavras com espaço, <strong>não use sinais de pontuação nem símbolos.</strong></p></li>
                            <li style={{ padding: '0 0 10px' }}><p>Revise para garantir que <strong>não tenha erros de ortografia.</strong></p></li>
                        </ul>
                        <div style={{ padding: '20px 0 10px' }}>Por exemplo: Notebook HP Dual Core 425 LED 14 320 GB 4 GB Wifi HDMI</div>
                    </div>
                    <Modal.Footer>
                        <ButtonUI startIcon={<CheckCircleIcon />} variant="contained" color="secondary" onClick={() => setState({ showInfoMercadoLivreEditarTitulo: false })}>
                            Ok, entendi!
                        </ButtonUI>
                    </Modal.Footer>
                </Paper>
            </Dialog>
        </>
    )
}