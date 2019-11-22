import React from 'react';
import axios from 'axios';
import Navbar from './Navbar';

export default class NavbarController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nomeUsuario: ''
        }
    }

    componentdidMount = async () => {
        await axios.get('http://localhost:5000/usuario/by/362614126').then(res => {
            this.setState({
                nomeUsuario: res.data
            })
        });

        console.log("Nome Usuario: " + this.state.nomeUsuario);
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