import React, { useState } from 'react'
import { Button, Dropdown, Modal, Header, Icon, Segment, Message, MessageHeader, MessageContent } from 'semantic-ui-react'
import { Row, Col } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ButtonUI from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { DialogContent, DialogActions } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

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

    const [openDialogImage, setOpenDialogImage] = React.useState(false)
    const [urlTemp, setUrlTemp] = React.useState({
        url: '',
        key: 0
    })
    const [urlMain, setUrlMain] = React.useState('') 

    const handleOnClickButtonImage = (url, key) => {
        setUrlTemp({
            url,
            key
        })
        setOpenDialogImage(true)
    }

    const confirmarImagem = () => {
        props.getImageSite(urlMain)
        setOpenDialogImage(false)
        atualizarImagem()
    }

    const atualizarImagem = () => {
        let temp = []
        temp = props.urlImage.map((url, key) => {
            if(urlTemp.key === key){
                console.log(props.url)
                return props.url
            }else{
                return url
            }
        })
        console.log(temp)
        return temp
    }

    return (
        <>

            <Dialog fullWidth maxWidth='md' open={openDialogImage} onClose={() => {setOpenDialogImage(false)}}>
                <DialogTitle>Informe a URL da imagem</DialogTitle>
                <DialogContent>
                    <TextField value={urlMain} onChange={(event) => setUrlMain(event.target.value)} style={{width: '100%'}} label="URL" variant="outlined" />
                    <Message>
                        <MessageHeader>DICA</MessageHeader>
                        <MessageContent>
                            Utilize o site <a href='https://uploaddeimagens.com.br/' target='_blank'>https://uploaddeimagens.com.br/</a> pra realizar o upload da imagem, logo após informe a URL no campo acima.
                        </MessageContent>
                    </Message>
                </DialogContent>
                <DialogActions>
                    <ButtonUI onClick={() => confirmarImagem()} startIcon={<SaveAltIcon/>}>Confirmar</ButtonUI>
                    <ButtonUI onClick={() => setOpenDialogImage(false)} startIcon={<CloseIcon/>}>Fechar</ButtonUI>
                </DialogActions>
            </Dialog>

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
                            <div style={{padding: '10px 5px 0', paddingRight: '20px'}}>
                                <Paper style={{height: '170px', display: 'flex', alignItems: 'center'}} elevation={2}>
                                    <input style={{ display: 'none' }} accept="image/*" id="icon-button-file" type="file" multiple />
                                    <label htmlFor="icon-button-file">
                                        <ButtonUI onClick={() => {setOpenDialogImage(true)}} color="primary" aria-label="upload picture" component="span" startIcon={<AddCircleIcon />}>
                                            Adicionar
                                        </ButtonUI>
                                    </label>
                                </Paper>
                            </div>
                            <div>
                                <div style={{ display: 'flex' }}>
                                    {props.urlImage.map((url, key) => {
                                        return (
                                            <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                                                <div style={{padding : '0 10px 0'}}>
                                                    <IconButton onClick={() => {handleOnClickButtonImage(url, key)}}  style={{ left: '-15px' }}><AddPhotoAlternateIcon /></IconButton>
                                                </div>
                                                <Paper elevation={3} style={{margin: '0 10px 0'}}>
                                                    <img src={url} alt='imageVariation' height='100' width='80' />
                                                </Paper>
                                            </div>
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
        </>
    )
}