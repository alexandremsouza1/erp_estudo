import React from 'react';
import Navbar from './Navbar';

export default class NavbarController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nomeUsuario: localStorage.getItem('@sigiml/nome-usuario'),
            sobrenome: localStorage.getItem('@sigiml/sobrenome-usuario')
        }
    }

    render() {
        return (
            <div>
                <Navbar nomeUsuario={this.state.nomeUsuario} 
                        brandText={this.props.brandText} 
                        {...this.props}
                        {...this.state}/>
            </div>
        );
    }
}