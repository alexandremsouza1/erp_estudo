import React from 'react'
import PerguntasView from './PerguntasView'
import socketIOClient from 'socket.io-client'
import {DOMAIN} from '../../constants/constants'

class PerguntasController extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            endPont: DOMAIN
        }
    }

    componentDidMount = () => {
        let socket = socketIOClient(this.state.endPont)
        socket.on('notification-ml-perguntas', (perguntas) => {
            console.log(perguntas)
        })
    }

    render(){
        return(
            <PerguntasView/>
        )
    }
}

export default PerguntasController