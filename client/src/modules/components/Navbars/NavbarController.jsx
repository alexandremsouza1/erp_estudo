import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import {reactLocalStorage} from 'reactjs-localstorage';

export default class NavbarController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nomeUsuario: ''
        }
    }

    componentDidMount = async () => {
        await axios.get('/usuario/by/362614126').then(res => {
            this.setState({
                nomeUsuario: res.data.first_name
            })
        });
        //@sisiml/accessToken
        let usuarioSession = reactLocalStorage.get('@sisiml/accessToken');
        console.log("Nome Usuario: " + usuarioSession);
    }

    render() {
        return (
            <div>
                <Navbar nomeUsuario={this.state.nomeUsuario} 
                        brandText={this.props.brandText} 
                        {...this.props}/>
            </div>
        );
    }
}