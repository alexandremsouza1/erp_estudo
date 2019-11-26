import React from 'react'
import AnuncioView from './AnuncioView';
import axios from 'axios'

export default class AnuncioController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            response: '',
            thArray: ['Título', 'Preço', "Descrição"],
            result: [{}],
            isLoading: true
        }
 
    }

    componentDidMount(){
       console.log("Clique")
        axios.get(`http://localhost:5000/anuncio`).then(res => {
           this.setState({
                result: res.data,
                isLoading: false
            });
        }).catch(err => {console.log(err)});
    }


    render() {
        return(
            <div>
                <AnuncioView {...this.state} mostrarAnuncios={this.state.mostrarAnuncios}/>
            </div>
        );
    }

}