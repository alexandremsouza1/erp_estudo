import React from 'react'
import SignUp from './SignUp'
import axios from 'axios'
import swal from 'sweetalert'
import { DOMAIN } from '../../constants/constants'
import {Redirect} from 'react-router-dom'

export default class SignUpController extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    salvarUsuario = async (usuario) => {

        await axios.post(`${DOMAIN}/usuario/save_usuario`, usuario).then(resp => {

            if (resp.data.isUsuarioSalvo !== undefined) {
                console.log("Usuario salvo? " + resp.data.isUsuarioSalvo)
                console.log("Usuario: " + JSON.stringify(resp.data.usuario))

                //Localstorage
                localStorage.setItem('@sigiml/_id-usuario', JSON.stringify(resp.data.usuario._id))
                localStorage.setItem('@sigiml/nome-usuario', JSON.stringify(resp.data.usuario.nome))
                localStorage.setItem('@sigiml/email-usuario', JSON.stringify(resp.data.usuario.email))

                let user = {
                    id : localStorage.getItem('@sigiml/_id-usuario'),
                    nome : localStorage.getItem('@sigiml/nome-usuario'),
                    email : localStorage.getItem('@sigiml/email-usuario')
                }

                this.setState({redirect: true})

            } else {
                swal('Error', 'Ops, houve um erro ao tentar salvar o usuário: \n', 'error')
            }
        }).catch(error => swal('Error', 'Ops, houve um erro ao tentar salvar o usuário: \n' + error, 'error'))
    }

    render() {
        if(!this.state.redirect){
            return (
                <>
                    <SignUp salvarUsuario={this.salvarUsuario} />
                </>
            )
        }else{
            return (
                <>
                    <Redirect to='/acesso_ml' />
                </>
            )
        }
        
    }
}