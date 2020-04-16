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
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import sendNotification from '../../components/Notification/Notification'

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
        setUrlMain("")
        setOpenDialogImage(true)
    }

    const confirmarImagem = async () => {
        if(urlMain !== ''){
            await props.getImageSite(urlMain)
            setOpenDialogImage(false)
            await props.setImageVariation(await atualizarImagem())
        }else{
            sendNotification('error', 'Ops. Você esqueceu de informar a URL, digite novamente e clique em CONFIRMAR!', 5000)
        }
    }

    const atualizarImagem = () => {
        let temp = []
        temp = props.urlImage.map((url, key) => {
            if (urlTemp.key === key) {
                return localStorage.getItem("@sisiml/url_image")
            } else {
                return url
            }
        })
        return temp
    }

    return (
        <>

            <Dialog fullWidth maxWidth='md' open={openDialogImage} onClose={() => { setOpenDialogImage(false) }}>
                <DialogTitle>Informe a URL da imagem</DialogTitle>
                <DialogContent>
                    <TextField error={urlMain === '' ? true : false} value={urlMain} onChange={(event) => setUrlMain(event.target.value)} style={{ width: '100%' }} label="URL" variant="outlined" />
                    <Message>
                        <MessageHeader>
                            Utilize o site <a href='https://uploaddeimagens.com.br/' target='_blank'>https://uploaddeimagens.com.br/</a> pra realizar o upload da imagem, logo após informe a URL no campo acima.
                        </MessageHeader>
                    </Message>
                </DialogContent>
                <DialogActions>
                    <ButtonUI onClick={() => confirmarImagem()} startIcon={<SaveAltIcon />}>Confirmar</ButtonUI>
                    <ButtonUI onClick={() => setOpenDialogImage(false)} startIcon={<CloseIcon />}>Fechar</ButtonUI>
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
                            <div style={{ padding: '10px 5px 0', paddingRight: '20px' }}>
                                <Paper style={{ height: '100px', display: 'flex', alignItems: 'center' }} elevation={2}>
                                    <ButtonUI onClick={() => { setOpenDialogImage(true) }} color="primary" aria-label="upload picture" component="span" startIcon={<AddCircleIcon />}>
                                        Adicionar
                                        </ButtonUI>
                                </Paper>
                            </div>
                            <div>
                                <div style={{ display: 'flex' }}>
                                    {props.urlImage.map((url, key) => {
                                        return (
                                            <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Paper elevation={3} style={{ margin: '0 10px 0', marginTop: '10px' }}>
                                                    <img src={url} alt='imageVariation' height='100' width='80' />
                                                </Paper>
                                                <div style={{ padding: '0 10px 0', display: 'flex'}}>
                                                    <div>
                                                        <Tooltip title="Clique aqui para alterar a imagem!">
                                                            <IconButton onClick={() => { handleOnClickButtonImage(url, key) }} style={{ left: '-15px' }}><AddPhotoAlternateIcon /></IconButton>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip title="Clique aqui para remover a imagem!">
                                                            <IconButton onClick={() => { handleOnClickButtonImage(url, key) }} style={{ left: '-35px' }}><DeleteForeverIcon /></IconButton>
                                                        </Tooltip>
                                                    </div>
                                                </div>
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