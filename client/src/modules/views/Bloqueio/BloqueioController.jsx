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
            bloquearPerguntas: false

        }
    }

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
        await axios.get(`${DOMAIN}/bloqueio/nickname/${this.state.nickname}`).then(async user => {
            await axios.get(`${DOMAIN}/usuario/${user.data.id}`).then(dataUser => {
                this.setState({
                    nicknameEncontrado: dataUser.data.nickname,
                    status: dataUser.data.status.site_status,
                    isShow: true
                })
            }).catch(error => {swal('Atenteceu algo de errado!', 'Opps, parece que o mercado livre ou a sua conexão com a internet estão oscilando no momento. \n Tente novamente, se o problema persistir verifique sua conexão com a internet e recarregue a página!  ', 'error')})
        }).catch(error => {swal('Atenteceu algo de errado!', 'Opps, parece que o mercado livre ou a sua conexão com a internet estão oscilando no momento. \n Tente novamente, se o problema persistir verifique sua conexão com a internet e recarregue a página!  ', 'error')})
    }

    salvarAlteracao = async () => {
        await axios.get(`${DOMAIN}/bloqueio/nickname/${this.state.nickname}`).then(async user => {
            await axios.post(`${DOMAIN}/bloqueio`, {"user_id": user.data.id}).then(response => {
                swal('Sucesso', 'Usuário '+user.data.nickname+' bloqueado conforme solicitado!', 'success')
                console.log("response: "+JSON.stringify(response.data))
            })
        }).catch(error => {swal('Atenteceu algo de errado!', 'Opps, parece que o mercado livre ou a sua conexão com a internet estão oscilando no momento. \n Tente novamente, se o problema persistir verifique sua conexão com a internet e recarregue a página!  ', 'error')})
        this.listarTodosUsuarioBloqueadosBlackListPerguntas()
    }

    listarTodosUsuarioBloqueadosBlackListPerguntas = async () => {
        await axios.post(`${DOMAIN}/bloqueio`).then(response => {
            console.log("Usuarios bloqueados: "+JSON.stringify(response.data))
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