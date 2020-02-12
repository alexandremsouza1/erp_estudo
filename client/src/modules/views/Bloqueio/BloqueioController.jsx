import React from 'react';
import BloqueioView from './BloqueioView'
import axios from 'axios'
import swal from 'sweetalert'
import {DOMAIN} from '../../constants/constants'
import {removerCaracteresEspeciaisEAcentos} from '../../../Helpers/util'


export default class BloqueioController extends React.Component {
    constructor(props){
        super(props)

        document.title = "Bloqueios"

        this.state = {
            nickname: '',
            nicknameEncontrado: '',
            status: '',
            isShow: false,
            bloquearCompras: false,
            bloquearPerguntas: false,
            usuarioBloqueadosPerguntas: [],
            isShowUsuarioPerguntas: false
        }
    }

    mensagemDeFalha = 'Opps, parece que o mercado livre ou a sua conexão com a internet estão oscilando no momento ou você digitou algum caracter que não é permitido pelo Mercado Livre. \n\n Tente novamente, se o problema persistir verifique sua conexão com a internet e recarregue a página!'

    componentDidMount = () => {
        this.listarTodosUsuarioBloqueadosBlackListPerguntas()
    }

    handleOnChange = (state, event) => {
        this.setState({
            [state]: event.target.value
        })
    }

    handleOnChecked = async (state, event) => {
        this.setState({
            [state]: event.target.checked
        })
    }

    buscarUsuarioPorNickname = async () => {
        if(this.state.nickname.trim() === ''){
            swal('Atenção', 'Você não informou o apelido, digite e tente novamente!', 'warning')
        }else{
            await axios.get(`${DOMAIN}/bloqueio/nickname/${this.state.nickname}`).then(async user => {
                await axios.get(`${DOMAIN}/usuario/${user.data.id}`).then(dataUser => {
                    this.setState({
                        nicknameEncontrado: dataUser.data.nickname,
                        status: dataUser.data.status.site_status,
                        isShow: true
                    })
                }).catch(error => {swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error')})
            }).catch(error => {swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error')})

            await axios.get(`${DOMAIN}/bloqueio/buscarUsuarioBlackListPerguntasPorNickNameMongoDB/${this.state.nickname}`).then(userbd => {
                console.log("userbd.data: "+JSON.stringify(userbd.data))
                this.setState({
                    bloquearPerguntas: userbd.data[0] <= 0 ? false : userbd.data[0].bloquearPerguntas
                })
            }).catch(error => {console.log(error)})
        }
    }

    salvarAlteracao = async () => {
        await axios.get(`${DOMAIN}/bloqueio/nickname/${this.state.nickname}`).then(async user => {
            await axios.post(`${DOMAIN}/bloqueio`, {"user_id": user.data.id}).then(response => {
                swal('Sucesso', 'Usuário '+this.state.nicknameEncontrado+' bloqueado conforme solicitado!', 'success')
                console.log("response: "+JSON.stringify(response.data))
            })
        }).catch(error => {swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error')})
        
        await axios.post(`${DOMAIN}/bloqueio/salvarUsuarioBlackListPerguntas`, {
            usuario_sistema: localStorage.getItem('@sigiml/_id-usuario'), 
            nickname: this.state.nicknameEncontrado,
            bloquearPerguntas: this.state.bloquearPerguntas
        }).then(response => {
            console.log("USUARIO SALVO NO BANCO DE DADOS - (BLOQUEADO PARA PERGUNTAS)")
        }).catch(error => {swal('Atenteceu algo de errado!', this.mensagemDeFalha, 'error')})

        this.listarTodosUsuarioBloqueadosBlackListPerguntas()
    }

    listarTodosUsuarioBloqueadosBlackListPerguntas = async () => {
        await axios.get(`${DOMAIN}/bloqueio/listarUsuarioBlackListPerguntas`).then(response => {
            this.setState({
                usuarioBloqueadosPerguntas: response.data,
                isShowUsuarioPerguntas: response.data.length > 0 ? true : false
            })
        }).catch(() => {console.log('Nenhum usuário encontrado na black list')})
    }

    render () {
        return (
            <>
                <BloqueioView {...this.state} 
                              buscarUsuarioPorNickname={this.buscarUsuarioPorNickname}
                              handleOnChange={this.handleOnChange}
                              handleOnChecked={this.handleOnChecked}
                              salvarAlteracao={this.salvarAlteracao}/>
            </>
        )
    }
}