import React from 'react'
import { Row, Col, Modal } from "react-bootstrap";
import FormInput from '../../components/FormInput/FormInput'
import { Form, Input } from 'semantic-ui-react'

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

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import imgAnuncioClassico from '../../../assets/img/anuncio_classico.PNG'
import imgAnuncioPremium from '../../../assets/img/anuncio_premium.PNG'

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
    }

}));

const HeaderExpansionPanel = ({title, subtitle, message}) => {
    return (
        <>
            <div style={{ fontSize: '18px', color: '#333333' }}>{title}</div>
            <div style={{ fontSize: '16px', color: '#666666' }}>{subtitle}</div>
            <div style={{ fontSize: '14px', color: '#31d086' }}>{message}</div>
        </>
    )
}

export default function CustomModal(props) {

    const classes = useStyles();

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
                        <Col md={8}>

                            <FormInput label="Título" value={props.titulo} style={{ "color": "blue" }} disabled={false} />

                        </Col>
                        <Col md={2}>
                            <FormInput label="Preço" placeholder='R$' value={props.preco.toLocaleString("pt-BR")} style={{ "color": "blue" }} />
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
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        
                                        expandIcon={<ExpandMoreIcon />}>
                                        <HeaderExpansionPanel className={classes.displayInline} title='Forma de entrega' subtitle='Mercado Envios por conta do comprador' message='Ofereça frete grátis e aumente as suas chances de vendas'/>
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
                                                            control={<Switch checked={false} />}
                                                            label=""
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
                                                            control={<Switch checked={true} />}
                                                            label="Selecionado"
                                                            color="primary"
                                                        />
                                                    </CardActions>
                                                </Card>
                                            </Col>

                                            <CardActions>
                                                <ButtonUI>Cancelar</ButtonUI>
                                                <ButtonUI variant="contained" color="primary">Confirmar</ButtonUI>
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

            {/**<Modal show={props.showModal} onHide={() => props.setShowModal(false)} dialogClassName="width_modal" >
            <Modal.Header closeButton style={{ 'backgroundColor': '#467EED', 'color': 'white' }}>
                <Modal.Title style={{ 'fontSize': '25px' }}>Modificar Anúncio</Modal.Title>
                <span>#{props.id}</span>
            </Modal.Header>

            <Modal.Body sytle={{ "width": "100px" }}>



            </Modal.Body>

            <Modal.Footer>
                
            </Modal.Footer>

        </Modal> */
            }
        </>
    )
}