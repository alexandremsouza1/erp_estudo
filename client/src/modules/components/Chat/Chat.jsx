import React from 'react'
import { Input, Button } from 'semantic-ui-react'
import '../../../assets/css/Global/chat.css'

/** Created by Felipe M Santos */

export default class Chat extends React.Component {

    render() {
        return (
            <div className='box box-primary direct-chat direct-chat-primary'>
                <div className='box-header with-border'>

                    <h3 className='box-title'>
                        {this.props.title}
                    </h3>

                    <div className='box-tools pull-right' style={{ 'display': this.props.displayButtonClose }}>
                        <button onClick={this.props.close} type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                    </div>

                </div>
                <div className='box-body' style={{height : this.props.height}}>
                    <div>
                        {this.props.pergunta !== null
                            ?
                            <div className='direct-chat-msg'>
                                <div className='direct-chat-info clearfix'>
                                    <span className="direct-chat-name pull-left"><b>{this.props.nomeCompletoCliente}</b></span>
                                </div>
                                <img className="direct-chat-img" src='https://adminlte.io/themes/AdminLTE/dist/img/user1-128x128.jpg' alt="Message User Image" style={{ display: 'none' }}></img>
                                <textarea  value={this.props.pergunta} className="direct-chat-text" style={{width : '100%', margin: '0 0 0', color: 'white', backgroundColor: '#4169E1'}}>
                                    
                                </textarea>
                            </div>
                            : <></>
                        }
                        <span className="direct-chat-info clearfix direct-chat-name pull-left">{this.props.dataHoraPergunta}</span>

                        {this.props.resposta !== null
                            ? 
                            <div className='direct-chat-msg right'>
                                <div className="direct-chat-info clearfix">
                                    <span className="direct-chat-name pull-right"><b>{this.props.nomeEmpresa}</b></span>
                                </div>
                                <img className="direct-chat-img" src='https://adminlte.io/themes/AdminLTE/dist/img/user7-128x128.jpg' alt="Message User Image" style={{ display: 'none' }}></img>
                                <textarea value={this.props.resposta} className="direct-chat-text" style={{width : '100%', color: 'black', backgroundColor: '#87CEFA'}}>
                                   
                                </textarea>
                            </div>
                            : <></>
                        }

                    </div>
                </div>
                <div className='box-footer' style={{ 'display': this.props.displayFooter }}>
                    <Input fluid type='text' placeholder='Digite a mensagem que deseja enviar...' action>
                        <input />
                        <Button type='submit'>Enviar resposta</Button>
                    </Input>
                </div>
            </div>
        )
    }
}