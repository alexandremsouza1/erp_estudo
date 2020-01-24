import React from "react";
import { Route, Switch } from "react-router-dom";
import NavbarController from "../modules/components/Navbars/NavbarController";
import Sidebar from "../modules/components/Sidebar/Sidebar";
import { makeStyles } from '@material-ui/core/styles';
import routes from "routes.js";

export default function Admin(props) {

  const useStyles = makeStyles(theme => (
    {
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },

      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
      },

      root: {
        display: 'flex',
      },

      speedDial: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
      }
    }
  ))

  const classes = useStyles();

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
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

  const getPathName = path => {
    for (let i = 0; i < routes.length; i++) {
      if (props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "";
  };


  return (

    <div className={classes.root}>
      <NavbarController
        {...props}
        ref={React.createRef()}
        brandText={getPathName(props.location.pathname)}
      />

      <Sidebar {...props} routes={routes} ref={React.createRef()} />

      <main className={classes.content} >

        <div className={classes.toolbar} />

        <Switch>{getRoutes(routes)}</Switch>

      </main>

    </div>
  );

}

