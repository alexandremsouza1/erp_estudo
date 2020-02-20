import React from 'react'
import ChatView from './ChatView'
import axios from 'axios'
import {DOMAIN} from '../../constants/constants'

export default class ChatController extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            perguntas: []
        }
    }

    componentDidMount(){
        axios.get(`${DOMAIN}/perguntas/fila_perguntas`).then(response => {
            this.setState({
                perguntas: response.data
            })
        })
    }

    render() {
        return (
            <ChatView {...this.state}/>
        )
    }
}