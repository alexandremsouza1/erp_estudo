import React from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import Navbar from "../modules/components/Navbars/Navbar";
import Footer from "../modules/components/Footer/Footer";
import Sidebar from "../modules/components/Sidebar/Sidebar";

import { style } from "variables/Variables.jsx";

import routes from "routes.js";

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _notificationSystem: null,
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


  componentDidMount() {

    this.setState({ 
      _notificationSystem: this.refs.notificationSystem 
    });

    let _notificationSystem = this.refs.notificationSystem;


    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Bem-vindo <b>Felipe Miguel dos Santos</b>.
        </div>
      ),
      level: "success",
      position: "tr",
      autoDismiss: 15
    });
  }


  render() {
    return (

      <div className="wrapper">

        <NotificationSystem ref="notificationSystem" style={style} />

        <Sidebar {...this.props} routes={routes}/>

        <div id="main-panel" className="main-panel" ref="mainPanel">

          <Navbar
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
