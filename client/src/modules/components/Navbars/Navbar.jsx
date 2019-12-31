import React from "react";
import { Navbar } from "react-bootstrap";

import NavbarLinks from "../Navbars/NavbarLinks";

export default class Header extends React.Component {

  render() {
    return (
      <Navbar fluid>

        <Navbar.Header>

          <Navbar.Brand>
            {this.props.brandText}
          </Navbar.Brand>

        </Navbar.Header>

        <Navbar.Collapse>
          <NavbarLinks nomeUsuario={this.props.nomeUsuario} />
        </Navbar.Collapse>

      </Navbar>
    );
  }
}

