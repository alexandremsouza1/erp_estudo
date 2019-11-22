import React from "react";
import { Navbar } from "react-bootstrap";

import NavbarLinks from "../Navbars/NavbarLinks";
import axios from 'axios';

export default class Header extends React.Component{

  constructor(props){
    super(props);

    this.state = {
        nomeUsuario: ''
    }
}

componentDidMount() {
    axios.get('/usuario/by/362614126').then(res => {
      console.log(res);
        this.setState({
            nomeUsuario: res.data.first_name
        })
    });

   
}

   render() { 
    return (
      <Navbar fluid>

        <Navbar.Header>

          <Navbar.Brand>
            {this.props.brandText}
          </Navbar.Brand>
          
        </Navbar.Header>

        <Navbar.Collapse>
          <NavbarLinks nomeUsuario= {this.state.nomeUsuario}/>
        </Navbar.Collapse>

      </Navbar>
    );
  }
}

