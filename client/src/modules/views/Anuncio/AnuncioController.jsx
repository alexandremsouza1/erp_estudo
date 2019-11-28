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

    componentDidMount() {
       
        axios.get(`http://localhost:5000/anuncio`).then(res => {
           this.setState({
                result: res.data,
                isLoading: false
            });
        }).catch(err => err);
    }


    render() {
        return(
            <div>
                <AnuncioView {...this.state}/>
            </div>
        );
    }

}