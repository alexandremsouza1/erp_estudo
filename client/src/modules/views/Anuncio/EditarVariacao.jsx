import React, { useState } from 'react'
import { Divider, Segment, Message, MessageHeader, MessageContent } from 'semantic-ui-react'
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
import _ from 'lodash'

export default function EditarVariacao(props) {


    const MENSAGEM_USUARIO = "Ops. Você esqueceu de informar a URL, digite novamente e clique em CONFIRMAR!"
    const MENSAGEM_USUARIO_02 = "Não é possível adicionar mais imagens, o limite permitido pelo Mercado Livre é de 10 imagem por variação"

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
    const [isNovaImagem, setIsNovaImagem] = React.useState(false)
    const [sources, setSources] = React.useState([])
    const [idRemovidos, setIdRemovidos] = React.useState([])

    const handleOnClickNovaImagem = () => {
        setUrlMain("")
        setIsNovaImagem(true)
        setOpenDialogImage(true)

    }

    const handleOnClickButtonImage = (url, key) => {
        setUrlTemp({
            url,
            key
        })
        setUrlMain("")
        setIsNovaImagem(false)
        setOpenDialogImage(true)
    }

    const confirmarImagem = async () => {
        if (isNovaImagem) {
            if (urlMain !== '') {
                await sendNotification('success', 'Adicionando a imagem, por favor aguarde...', 2000)
                await props.getImageSite(urlMain)
                setOpenDialogImage(false)
                await props.setImageVariation(await adicionarImagem())
            } else {
                sendNotification('error', MENSAGEM_USUARIO, 5000)
            }
        } else {
            if (urlMain !== '') {
                await sendNotification('success', 'Atualizando a imagem, por favor aguarde...', 2000)
                await props.getImageSite(urlMain)
                setOpenDialogImage(false)
                await props.setImageVariation(await atualizarImagem())
            } else {
                sendNotification('error', MENSAGEM_USUARIO, 5000)
            }
        }
    }

    const adicionarImagem = async () => {
        if (props.urlImage.length < 10) {
            await props.urlImage.push({url: localStorage.getItem("@sisiml/url_image")})
            setTimeout(() => {
                sendNotification('success', 'Imagem adicionada.', 1000)
            }, 2002);
            sources.push({source: localStorage.getItem("@sisiml/url_image")})
            setSources(sources)
            return props.urlImage
        } else {
            sendNotification('error', MENSAGEM_USUARIO_02, 5000)
            return props.urlImage
        }
    }

    const atualizarImagemAPIMercadoLivre = () => {
        let pictures = []
        sources.push(getIDsImagensExistente(props.urlImage))
        setSources(sources)
        pictures.push(sources.map(image => (image)))

        let variations = []
        variations.push({
            id: props.vart.id,
            picture_ids: props.urlImage
        })

        /* variations.map(vart => {
                 props.json.variations.map(value => {
                     if(vart.id !== value.id){
                         variations.push({
                             id: value.id,
                             picture_ids: variacaoAtual(vart.id, pictures)
                         })
                     }
                 })
         })*/
        console.log(variations)
        console.log(pictures)
        console.log(getIDsImagensExistente(props.urlImage))
        //props.updateImagemVariation(props.id, variations, pictures)
        props.closeModalEditVariacao(false)
    }

    const getIDsImagensExistente = (pictures) => {
        let temp = []
        pictures.map(pic => {
            if(pic.id !== undefined){
                temp.push({
                    id: pic.id
                })
            }
            temp = _.remove(temp, (str) => {
                if (!str.id.includes("https://uploaddeimagens.com.br")) { return str }
            })

            temp = _.remove(temp, (str) => {
                return idRemovidos.map(result => {
                    if(result.id === str.id){
                        return str
                    }
                })
            })
        })
       
        return temp
    }

    const atualizarImagem = () => {
        let temp = []
        props.urlImage.map((image, key) => {
            if (urlTemp.key === key) {
                setTimeout(() => {
                    sendNotification('success', 'Imagem atualizada.', 1000)
                }, 2002);
                sources.push({source: localStorage.getItem("@sisiml/url_image")})
                idRemovidos.push({id: image.id})
                setIdRemovidos(idRemovidos)
                setSources(sources)
                temp.push({
                    url: localStorage.getItem("@sisiml/url_image"),
                    id: image.id
                })
            } else {
                temp.push({
                    url: image.url,
                    id: image.id
                })
            }
        })
        return temp
    }

    return (
        <>

            <Dialog fullWidth maxWidth='md' open={openDialogImage} onClose={() => { setOpenDialogImage(false) }}>
                {isNovaImagem ?
                    <DialogTitle>Informe a URL para adicionar a imagem</DialogTitle>
                    : <DialogTitle>Informe a URL para atualizar a imagem</DialogTitle>
                }
                <DialogContent>
                    <Message>
                        <MessageHeader>Considerações e práticas recomendadas</MessageHeader>
                        <MessageContent>
                            As imagens RGB são muito mais recomendáveis do que as CMYK. Recomendamos que você envie imagens de 1200 x 1200 px. Se estas forem maiores, o Mercado Livre irá editar para ter 1200 px. Além disso, você pode publicar uma quantidade máxima imagens por anúncio, dependendo da categoria que deseja fazer. Você pode carregar imagens de até 10 MB nos seguintes formatos:
                        <ul>
                                <li>JPG</li>
                                <li>JPEG</li>
                                <li>JPEG</li>
                            </ul>
                        </MessageContent>
                    </Message>

                    {/*<FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="labelBdImage">Utilizar banco de imagens</InputLabel>
                        <Select
                            labelId="labelBdImage"
                        >
                            <MenuItem value={10}>
                                <img alt='bdImage' height='100' width='80' src="https://uploaddeimagens.com.br/images/002/596/357/full/imagem_teste.jpg?1587135791"></img>
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <Divider horizontal>Ou</Divider>
            */  }

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
                            <FormInput label={<>Variação ({props.attributeCombinations.name})</>} placeholder='Variação' value={props.attributeCombinations.value_name} style={{ "color": "blue" }} />
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
                                    <ButtonUI onClick={() => { handleOnClickNovaImagem() }} color="primary" aria-label="upload picture" component="span" startIcon={<AddCircleIcon />}>
                                        Adicionar
                                    </ButtonUI>
                                </Paper>
                            </div>
                            <div>
                                <div style={{ display: 'flex' }}>
                                    {props.urlImage.map((imagem, key) => {
                                        return (
                                            <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Paper elevation={3} style={{ margin: '0 10px 0', marginTop: '10px' }}>
                                                    <img src={imagem.url} alt='imageVariation' height='100' width='80' />
                                                </Paper>
                                                <div style={{ padding: '0 10px 0', display: 'flex' }}>
                                                    <div>
                                                        <Tooltip title="Clique aqui para alterar a imagem!">
                                                            <IconButton onClick={() => { handleOnClickButtonImage(imagem.url, key) }} style={{ left: '-15px' }}><AddPhotoAlternateIcon /></IconButton>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip title="Clique aqui para remover a imagem!">
                                                            <IconButton onClick={() => { handleOnClickButtonImage(imagem.url, key) }} style={{ left: '-35px' }}><DeleteForeverIcon /></IconButton>
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

                    <DialogActions>
                        <ButtonUI variant="contained" color="primary" onClick={() => atualizarImagemAPIMercadoLivre()} startIcon={<SaveAltIcon />}>Confirmar</ButtonUI>
                        <ButtonUI variant="contained" color="secondary" onClick={() => props.closeModalEditVariacao(false)} startIcon={<CloseIcon />}>  Fechar   </ButtonUI>
                    </DialogActions>

                </div>
            </Dialog>
        </>
    )
}