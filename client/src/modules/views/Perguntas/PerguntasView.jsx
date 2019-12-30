import React from 'react'
import user from '../../../assets/img/user16px.png'
import { Input, Button } from 'semantic-ui-react'

export default class PerguntasView extends React.Component {

    render(){
        return(
            <div className='box box-primary direct-chat direct-chat-primary'>
                <div className='box-header with-border'>
                    <h3 className='box-title'>
                    Pergunta referente ao anúncio Kit 10 Blusas Gg E G Feminina Crepe Frete Grátis Promoção
                    </h3>
                    <div className='box-tools pull-right'>
                        <span data-toggle="tooltip" title="" className="badge bg-light-blue" data-original-title="3 New Messages">3</span>
                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                        <button type="button" className="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                    </div>
                </div>
                <div className='box-body'>
                    <div className='direct-chat-messages'>
                        <div className='direct-chat-msg'>
                            <div className='direct-chat-info clearfix'>
                                <span className="direct-chat-name pull-left">Alexander Pierce</span>
                                <span className="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>
                            </div>
                            <img class="direct-chat-img" src='https://adminlte.io/themes/AdminLTE/dist/img/user1-128x128.jpg' alt="Message User Image"></img>
                            <div class="direct-chat-text">
                                Is this template really for free? That's unbelievable!
                            </div>
                        </div>

                        <div className='direct-chat-msg right'>
                            <div className="direct-chat-info clearfix">
                                <span className="direct-chat-name pull-right">Sarah Bullock</span>
                                <span className="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span>
                            </div>
                            <img class="direct-chat-img" src='https://adminlte.io/themes/AdminLTE/dist/img/user7-128x128.jpg' alt="Message User Image"></img>
                            <div class="direct-chat-text">
                                You better believe it!
                            </div>
                        </div>
                    </div>
                </div>
                <div className='box-footer'>
                    <Input fluid type='text' placeholder='Digite a mensagem que deseja enviar...' action>
                        <input />
                        <Button type='submit'>Responder</Button>
                    </Input>
                </div>
            </div>
        )
    }
}