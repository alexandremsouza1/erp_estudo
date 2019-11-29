import React from 'react'
import ClientView from '../Cliente/ClienteView'
import axios from 'axios'

export default class ClientController extends React.Component {

   constructor(props){
       super(props)

       this.state = {
           result: [{}],
           isLoading: true
       }
   }

   componentDidMount(){
        axios.get('http://localhost:5000/clientes').then(resp => {
                this.setState({
                    result: resp.data,
                    isLoading: false
                })
        }).catch(err => err)     
   }

   render(){
       return(
           <ClientView result={this.state.result} isLoading={this.state.isLoading}/>
       )
   }

}