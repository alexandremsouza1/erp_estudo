import React from 'react'
import ChatView from './ChatView'
import {connect} from 'react-redux'
import {GET_PERGUNTAS} from '../../constants/constants'

class ChatController extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount = () =>{
        this.props.listarPerguntas(this.props.perguntas)
    }

    render() {
        return (
            <ChatView {...this.state} perguntas={this.props.perguntas}/>
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

