import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class AdminNavbarLinks extends Component {
  render() {
    const notification = (
      <div>
        <i className="fa fa-comment-o" />
        <b className="caret" />
        <span className="notification">
          1
        </span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );

    return (
      <div>
        <Nav>

          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}><b>Nova mensagem</b>: Qual o preço do kit?</MenuItem>

          </NavDropdown>

        </Nav>

        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            Ola! {this.props.nomeUsuario}
          </NavItem>


          <NavItem eventKey={3} href="#">
            Sair
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
