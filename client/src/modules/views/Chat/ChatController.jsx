import React from 'react'
import ChatView from './ChatView'
import {connect} from 'react-redux'
import {GET_PERGUNTAS, DOMAIN} from '../../constants/constants'
import axios from 'axios'

class ChatController extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = () =>{
        this.mostrarPerguntas()
    }

    mostrarPerguntas = () => {
        this.props.listarPerguntas(this.props.perguntas)
    }

    responder = (question_id, text) => {
        axios.post(`${DOMAIN}/notifications/responder`, {question_id: question_id, text: text}).then(response => {
            console.log("Pergunta respondida")
            this.mostrarPerguntas()
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <ChatView {...this.state} perguntas={this.props.perguntas} responder={this.responder}/>
        )
    }
}

const mapStateToProps = store => ({
    perguntas: store.perguntas.question
})

const mapDispatchToProps = dispatch => {
    return ({
        listarPerguntas: (perguntas) => {
            dispatch({type: GET_PERGUNTAS, question: perguntas})
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatController)

