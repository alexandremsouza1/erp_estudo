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

    componentDidMount = async () => {
        await axios.get('http://localhost:5000/usuario/all').then(res => {
            this.setState({
                nomeUsuario: res.data.first_name
            })
        });
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