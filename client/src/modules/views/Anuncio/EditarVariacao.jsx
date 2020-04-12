import React, { useState } from 'react'
import { Button, Dropdown, Modal, Header, Icon, Segment } from 'semantic-ui-react'
import { Row, Col } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ButtonUI from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

export default function EditarVariacao(props) {
    const useStyles = makeStyles(theme => ({

        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }));

    const classes = useStyles();


    return (
        <>
            <Dialog fullScreen open={props.isShowEditarAnuncio} onClose={() => props.closeModalEditVariacao(false)}>
                <AppBar className={classes.appBar} style={{ 'backgroundColor': '#4682B4' }}>
                    <Toolbar>

                        <Typography variant="h6" className={classes.title}>
                            <>Alterar variação - {props.attributeCombinations.value_name}</>
                        </Typography>

                        <IconButton edge="start" color="inherit" onClick={() => props.closeModalEditVariacao(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <div style={{ margin: '15px 10px 0' }}>
                    <Row>
                        <Col md={5}>
                            <FormInput label="Variação" placeholder='Variação' value={props.attributeCombinations.value_name} style={{ "color": "blue" }} />
                        </Col>
                        <Col md={2}>
                            <FormInput label="SKU" placeholder='SKU' style={{ "color": "blue" }} />
                        </Col>
                        <Col md={2}>
                            <FormInput label="Qtde estoque da variação" value={props.variation.available_quantity} placeholder='Estoque da variação' style={{ "color": "blue" }} />
                        </Col>
                        <Col md={3}>
                            <FormInput label='Código universal de produto' placeholder='Código universal de produto' />
                        </Col>
                    </Row>
                    <br></br>
                    <Segment raised color='grey'>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <Paper elevation={2}>
                                    <input style={{ display: 'none' }} accept="image/*" id="icon-button-file" type="file" multiple />
                                    <label htmlFor="icon-button-file">
                                        <ButtonUI color="primary" aria-label="upload picture" component="span" startIcon={<AddCircleIcon />}>
                                            Adicionar
                                </ButtonUI>
                                    </label>
                                </Paper>
                            </div>
                            <div>
                                <div style={{ display: 'flex' }}>
                                    {props.urlImage.map((url, key) => {
                                        return (
                                            <>
                                                <div>
                                                    <IconButton style={{ left: '-15px' }}><DeleteForeverIcon /></IconButton>
                                                </div>
                                                <div>
                                                    <img src={url} alt='imageVariation' height='100' width='80' />
                                                    <Dropdown floating labeled button text='' icon='image outline' className='icon'>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Header content='Selecione uma imagem!' />
                                                            {props.urlImage.map((image, key) => {
                                                                return (
                                                                    <Dropdown.Item key={key}>
                                                                        <img src={image} alt='image' height='100' width='80' />
                                                                    </Dropdown.Item>
                                                                )
                                                            })}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </Segment>

                    <Modal.Actions>
                        <Button color='green' onClick={() => props.closeModalEditVariacao(false)}>
                            <Icon name='checkmark' /> Alterar
                    </Button>
                        <Button color='red' onClick={() => props.closeModalEditVariacao(false)}>
                            <Icon name='remove' /> Fechar
                    </Button>
                    </Modal.Actions>

                </div>
            </Dialog>

            {/**
            <Modal size='fullscreen' open={this.props.isShowEditarAnuncio}>
            <Header icon='edit' content={<>Alterar variação - {this.props.attributeCombinations.value_name}</>}
                style={{ 'backgroundColor': '#467EED', 'color': 'white' }} />

            <Modal.Content sytle={{ "width": "100px" }}>
                <Row>
                    <Col md={5}>
                        <FormInput label="Variação" placeholder='Variação' value={this.props.attributeCombinations.value_name} style={{ "color": "blue" }} />
                    </Col>
                    <Col md={2}>
                        <FormInput label="SKU" placeholder='SKU' style={{ "color": "blue" }} />
                    </Col>
                    <Col md={2}>
                        <FormInput label="Qtde estoque da variação" value={this.props.variation.available_quantity} placeholder='Estoque da variação' style={{ "color": "blue" }} />
                    </Col>
                    <Col md={3}>
                        <FormInput label='Código universal de produto' placeholder='Código universal de produto' />
                    </Col>
                </Row>
                <br></br>
                <Segment raised color='grey'>
                    <Row>
                        {this.props.urlImage.map((url) => {
                            return (
                                <Col md={1}>
                                    <img src={url} alt='imageVariation' height='100' width='80' />
                                    <Dropdown floating labeled button text='' icon='image outline' className='icon'>
                                        <Dropdown.Menu>
                                            <Dropdown.Header content='Selecione uma imagem!' />
                                            {this.props.urlImage.map((image, key) => {
                                                return (
                                                    <Dropdown.Item key={key}>
                                                        <img src={image} alt='image' height='100' width='80' />
                                                    </Dropdown.Item>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            )
                        })}
                    </Row>
                </Segment>
            </Modal.Content>

            <Modal.Actions>
                <Button color='green' onClick={() => this.props.closeModalEditVariacao(false)}>
                    <Icon name='checkmark' /> Alterar
                    </Button>
                <Button color='red' onClick={() => this.props.closeModalEditVariacao(false)}>
                    <Icon name='remove' /> Fechar
                    </Button>
            </Modal.Actions>

        </Modal > */}
        </>
    )
}