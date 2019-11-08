import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import AdminNavbarLinks from "./AdminNavbarLinks.jsx";

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarExists: false
    };
  }


  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>

          <Navbar.Brand>
            <a href="#">{this.props.brandText}</a>
          </Navbar.Brand>

        </Navbar.Header>

        <Navbar.Collapse>
          <AdminNavbarLinks />
        </Navbar.Collapse>

      </Navbar>
    );
  }
}

export default Header;
