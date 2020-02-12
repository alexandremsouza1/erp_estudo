import React from "react";
import { Button, Modal, Header, Icon, Select, Comment, Form, Input } from 'semantic-ui-react'
import {formatarDataHora} from '../../../Helpers/util'
import userAvatar from '../../../assets/img/funcionario-icon.png'
import Chat from '../../components/Chat/Chat'
import '../../../assets/css/Global/chat.css'

export default function PerguntasAnuncio(props) {

    return (
        <Modal closeOnDimmerClick={true} open={props.isShowPerguntas} style={{
            'position': 'relative',
            'marginLeft': '50%',
            'marginRight': '50%'
        }} closeIcon>
            <Header style={{'paddingTop': '10px'}} icon='conversation' content={<>Perguntas 
                    <span style={{'marginLeft': '700px'}} className='box-tools pull-right'>
                        <button style={{'color': 'white'}} onClick={() => { props.setIsShowPerguntas(false) }} type="button" className="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                    </span></>}
                style={{ 'backgroundColor': '#467EED', 'color': 'white' }}>
                    
                </Header>
            <Modal.Content>
                 <p>{props.question.length === 0 ? 'Nenhuma pergunta para esse anúncio!' : props.titulo}</p>
                 <p style={{ 'fontSize': '12px', 'position': 'absolute', 'marginTop': '-15px' }}>
                     {props.question.length === 0 ? '' : 'O sistema irá listar apenas as 50 primeiras perguntas'}
                 </p>

                {props.question.map((property, key) => {
                    return(
                        <Chat nomeCompletoCliente={property.date_created != null ? formatarDataHora(property.date_created) : property.date_created} 
                              pergunta={property.text} 
                              resposta={property.answer != null ? property.answer.text : ''}
                              nomeEmpresa='Comproline'
                              displayFooter={'none'}
                              displayButtonClose={'none'}/>
                    )
                    /*
                    return (
                        <Comment.Group key={key}>
                            <Header as='h3' dividing></Header>
                            <Comment>
                                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                                <Comment.Content>
                                    <Comment.Author as='a'>{property.from.id}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{property.date_created != null ? formatarDataHora(property.date_created) : property.date_created}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>
                                        <p>{property.text}</p>
                                    </Comment.Text>
                                </Comment.Content>
                                <Comment.Group>
                                    <Comment>
                                        <Comment.Avatar src={userAvatar} />
                                        <Comment.Content>
                                            <Comment.Author as='a'>Comproline</Comment.Author>
                                            <Comment.Metadata>
                                                <div>{property.answer != null ? formatarDataHora(property.answer.date_created) : ''}</div>
                                            </Comment.Metadata>
                                            <Comment.Text>{property.answer != null ? property.answer.text : ''}</Comment.Text>
                                        </Comment.Content>
                                    </Comment>
                                </Comment.Group>
                            </Comment>
                        </Comment.Group>
                    )
                    */

                })

             }
            </Modal.Content>

            <Modal.Actions>
                <Button color='red' onClick={() => { props.setIsShowPerguntas(false) }}>
                    <Icon name='remove' /> Fechar
                </Button>
            </Modal.Actions>
        </Modal>
    )
}