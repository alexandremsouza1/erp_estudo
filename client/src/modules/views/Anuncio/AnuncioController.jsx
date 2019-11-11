import React from 'react'
import AnuncioView from './AnuncioView';

export default class AnuncioController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            response: ''
        }
    }

    componentDidMount() {
        //O getMessage retorna uma Promise
        this.getMessage()
                .then(res => this.setState({response: res.express}))
                .catch(err => console.log(err.message));
            
    }

    getMessage = async () => {
        const response = await fetch('/api/mensagem');
        const body = await response.json();
        if (response.status != '200') {
            throw Error(body.message);
        }

        return body;
    }

    

    render() {
        return(
            <div>
                <AnuncioView {...this.state}/>
            </div>
        );
    }

}