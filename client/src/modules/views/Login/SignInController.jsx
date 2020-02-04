import React from 'react'
import SignIn from './SignIn'
import axios from 'axios'
import swal from 'sweetalert'
import { DOMAIN } from '../../constants/constants'
import { Redirect } from 'react-router-dom'

export default class SignInController extends React.Component {

    

    constructor(props) {
        super(props)
        let checkedStorage =  localStorage.getItem('@sigiml/isMostrarMensagemPrincipal') === null ? false : Boolean(localStorage.getItem('@sigiml/isMostrarMensagemPrincipal'))
        this.state = {
            email: '',
            password: '',
            redirect: false,
            checked: checkedStorage,
            isShowMessageMain: checkedStorage
        }
    }

    handleShowMessage = () => {
        this.setState({
            isShowMessageMain: this.checkedStorage
        })
    }

    handleChangeCheckBox = name => event => {
        this.setState({ [name]: event.target.checked })
        localStorage.setItem('@sigiml/isMostrarMensagemPrincipal', event.target.checked)
      }

    changeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    signinUsuario = async () => {
        if (this.state.email.trim() === '') {
            swal('Atenção', 'Você não informou o e-mail, tente novamente! \n', 'warning')
            return
        }
        if (this.state.password.trim() === '') {
            swal('Atenção', 'Você não informou a senha, tente novamente! \n', 'warning')
            return
        }
        await axios.get(`${DOMAIN}/usuario/procurar_usuario_byEmail/${this.state.email.trim()}`).then(resp => {
            if (resp.data.length > 0) {
                resp.data.map(user => {
                    if (this.state.email === user.email && this.state.password === user.password) {
                        console.log("OK")
                        this.setState({ redirect: true })
                    } else {
                        swal('Atenção', 'Email e/ou senha incorretos! Por favor, tente novamente! \n', 'warning')
                    }
                })
            } else {
                swal('Atenção', 'Não existe nenhum usuário cadastrado com esse e-mail! \n', 'warning')
            }
        }).catch(error => { swal('Error', 'Houve um erro ao tentar procurar o usuario pelo e-mail \n' + error, 'error') })

    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to='/admin/dashboard' />
            )
        } else {
            return (
                <>
                    <SignIn
                        signinUsuario={this.signinUsuario}
                        {...this.state}
                        changePassword={this.changePassword}
                        changeEmail={this.changeEmail}
                        handleChangeCheckBox={this.handleChangeCheckBox}
                        handleShowMessage={this.handleShowMessage}/>
                </>
            )
        }

    }
}