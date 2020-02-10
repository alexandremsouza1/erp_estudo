import React from 'react'
import { ControlLabel, Row, Col, FormControl, Modal } from "react-bootstrap";
import Button from "modules/components/CustomButton/CustomButton.jsx";
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
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

export default function CustomModal(props) {

    const classes = useStyles();

    return (
        <>
            <Dialog fullScreen open={props.showModal} onClose={() => props.setShowModal(false)}>

                <AppBar className={classes.appBar} style={{ 'backgroundColor': '#1976d2' }}>
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
                            <label>Preço</label>
                            <Input
                                icon='money'
                                iconPosition='left'
                                label={{ tag: true, content: 'Reais' }}
                                labelPosition='right'
                                placeholder='R$'
                                value={props.preco.toLocaleString("pt-BR")}
                                style={{ "color": "blue" }}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={5}>
                            <label>Tipo de Anúncio</label>
                            <FormControl componentClass='select'>
                                <option value='classico'>{props.tipoAnuncio_id === 'gold_special' ? props.tipoAnuncio : 'Clássico - Exposição alta'}</option>
                                <option value='premium'>{props.tipoAnuncio_id === 'gold_pro' ? props.tipoAnuncio : 'Premium - Exposição máxima'}</option>
                            </FormControl>
                        </Col>
                        <Col md={2}>
                            <div>
                                <ControlLabel>Link Vídeo YouTube</ControlLabel>
                                <Input icon='youtube' iconPosition='left' placeholder='Informe aqui o link do YouTube'
                                    value={props.video_id} style={{ "color": "blue", 'width': '400px' }} />
                            </div>

                        </Col>
                    </Row>
                    <p></p>
                    <Row>
                        <Col md={12}>
                            <FormInput label="Descrição somente texto"
                                value={props.description} style={{ "color": "blue" }}
                                componentClass="textarea" rows="10" />
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
                        <ButtonUI style={{margin: '0 5px 0'}} startIcon={<SaveIcon />} variant="contained" color="primary" onClick={() => props.setShowModal(false)}>
                            Salvar
                         </ButtonUI>

                        <ButtonUI  startIcon={<CloseIcon />} variant="contained" color="secondary" onClick={() => props.setShowModal(false)}>
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