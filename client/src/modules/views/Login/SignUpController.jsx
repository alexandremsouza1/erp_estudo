import React from 'react'
import SignUp from './SignUp'
import axios from 'axios'
import swal from 'sweetalert'
import {DOMAIN} from '../../constants/constants' 


export default class SignUpController extends React.Component {

    constructor(props){
        super(props)
    }

    salvarUsuario = async (usuario) => {
        
        await axios.post(`${DOMAIN}/usuario/save_usuario`, usuario).then(resp => {
            
            if(resp.data.isUsuarioSalvo !== undefined){
                console.log("Usuario salvo? "+resp.data.isUsuarioSalvo)
                console.log("Usuario: "+JSON.stringify(resp.data.usuario))

                //Localstorage
                localStorage.setItem('@sigiml/_id-usuario', JSON.stringify(resp.data.usuario._id))
                localStorage.setItem('@sigiml/nome-usuario', JSON.stringify(resp.data.usuario.nome))
                localStorage.setItem('@sigiml/email-usuario', JSON.stringify(resp.data.usuario.email))

                let id = localStorage.getItem('@sigiml/_id-usuario')
                let nome = localStorage.getItem('@sigiml/nome-usuario')
                let email = localStorage.getItem('@sigiml/email-usuario')

            }else{
                swal('Error', 'Ops, houve um erro ao tentar salvar o usuário: \n', 'error')
            }
        }).catch(error => swal('Error', 'Ops, houve um erro ao tentar salvar o usuário: \n'+ error, 'error'))
    }

    render() {
        return(
            <>
                <SignUp salvarUsuario={this.salvarUsuario}/>
            </>
        )
    }
}