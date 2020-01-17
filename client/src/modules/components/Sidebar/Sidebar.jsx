import React from "react";
import { NavLink } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import logo from "assets/img/reactlogo.png";

export default function Sidebar(props) {

  


  const drawerWidth = 240;

  /**
   * <div
          id="sidebar"
          className="sidebar"
        >
  
          <div className="logo">
  
            <a href="/" className="simple-text logo-mini">
              <div className="logo-img">
                <img src={logo} alt="logo_image" />
              </div>
            </a>
  
            <a href="/" className="simple-text logo-normal">
              #Sistema#
            </a>
  
          </div>
  
          <div className="sidebar-wrapper">
            <ul className="nav">
  
              {this.props.routes.map((prop, key) => {
                if (!prop.redirect) {
                  return (
                    <li className={this.activeRoute(prop.layout + prop.path)} key={key}>
                      <NavLink
                        to={prop.layout + prop.path}
                        className="nav-link"
                        activeClassName="active">
  
                        <i className={prop.icon} style={{'fontSize': '15px'}}/>
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                  );
                }
                return null;
              })}
  
            </ul>
          </div>
        </div>
   */

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();
  const theme = useTheme();


  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: true,
          [classes.drawerClose]: false,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: true,
            [classes.drawerClose]: false,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />

        {props.routes.map((prop, key) => {
          if (!prop.redirect) {
            //https://material-ui.com/pt/components/lists/#simple-list
            return (
              <List key={key}>
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                  style={{'color':'black'}}>
                  <ListItem button key={key} onClick={() => handleListItemClick(key)} selected={selectedIndex === key}>
                    <ListItemIcon><i className={prop.icon} style={{ 'fontSize': '15px' }} /></ListItemIcon>
                    <ListItemText primary={prop.name} />
                  </ListItem>
                </NavLink>
              </List>
            );
          }
          return null;
        })}

      </Drawer>
    </>
  );

}

