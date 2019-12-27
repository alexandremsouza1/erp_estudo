import React from "react";
import { Route, Switch } from "react-router-dom";
import NavbarController from "../modules/components/Navbars/NavbarController";
import Footer from "../modules/components/Footer/Footer";
import Sidebar from "../modules/components/Sidebar/Sidebar";

import routes from "routes.js";

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedClasses: "dropdown show-dropdown open"
    };
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  getPathName = path => {
    for (let i = 0; i < routes.length; i++) {
      if (this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "";
  };

  render() {
    return (

      <div className="wrapper">

        <Sidebar {...this.props} routes={routes}/>

        <div id="main-panel" className="main-panel" ref="mainPanel">

          <NavbarController
            {...this.props}
            brandText={this.getPathName(this.props.location.pathname)}
          />

          <Switch>{this.getRoutes(routes)}</Switch>

          <Footer />
        </div>
      </div>
    );
  }
}

export default Admin;
