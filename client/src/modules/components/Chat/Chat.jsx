import React from 'react'
import { Input, Button } from 'semantic-ui-react'
import '../../../assets/css/Global/chat.css'

export default class Chat extends React.Component {

    render() {
        return (
            <div className='box box-primary direct-chat direct-chat-primary'>
                <div className='box-header with-border'>

                    <h3 className='box-title'>
                        {this.props.title}
                    </h3>

                    <div className='box-tools pull-right' style={{'display': this.props.displayButtonClose}}>
                        <button onClick={this.props.close} type="button" className="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                    </div>

                </div>
                <div className='box-body'>
                    <div>
                        <div className='direct-chat-msg'>
                            <div className='direct-chat-info clearfix'>
                                <span className="direct-chat-name pull-left">{this.props.nomeCompletoCliente}</span>
                            </div>
                            <img className="direct-chat-img" src='https://adminlte.io/themes/AdminLTE/dist/img/user1-128x128.jpg' alt="Message User Image"></img>
                            <div className="direct-chat-text">
                                {this.props.pergunta}
                            </div>
                        </div>
                        <span className="direct-chat-info clearfix direct-chat-name pull-left">{this.props.dataHoraPergunta}</span>

                        <div className='direct-chat-msg right'>
                            <div className="direct-chat-info clearfix">
                            <span className="direct-chat-name pull-right">{this.props.nomeEmpresa}</span>
                            </div>
                            <img className="direct-chat-img" src='https://adminlte.io/themes/AdminLTE/dist/img/user7-128x128.jpg' alt="Message User Image"></img>
                            <div className="direct-chat-text" style={{ "background": '#337AB7', 'backgroundColor': '#337AB7', 'color': '#fff' }}>
                                {this.props.resposta}
                            </div>
                        </div>

                    </div>
                </div>
                <div className='box-footer' style={{'display': this.props.displayFooter}}>
                    <Input fluid type='text' placeholder='Digite a mensagem que deseja enviar...' action>
                        <input />
                        <Button type='submit'>Enviar resposta</Button>
                    </Input>
                </div>
            </div>
        )
    }
}