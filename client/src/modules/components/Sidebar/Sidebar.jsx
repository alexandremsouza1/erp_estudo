import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import { NavLink } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {OPEN_DRAWER_MENU} from '../../constants/constants'

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';


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
    drawerPaper: {
      width: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
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
  }));

  const classes = useStyles();
  const theme = useTheme();
  const sideBarState = useSelector(store => store.sidebar)
  const dispatch = useDispatch()

  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  const [selectedIndex, setSelectedIndex] = React.useState(props.location.pathname);

  const handleListItemClick = (path) => {
    setSelectedIndex(path);
  };

  const handleClickClose = () => {
    dispatch({type: OPEN_DRAWER_MENU, isSidebar: false})
  }

  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: sideBarState.isSidebar,
          [classes.drawerClose]: !sideBarState.isSidebar,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: sideBarState.isSidebar,
            [classes.drawerClose]: !sideBarState.isSidebar,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleClickClose}>
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
                  <ListItem button key={key} onClick={() => handleListItemClick(prop.layout + prop.path)} selected={selectedIndex === prop.layout + prop.path}>
                    <ListItemIcon style={{'marginLeft':'10px'}}><i className={prop.icon} style={{ 'fontSize': '15px' }} /></ListItemIcon>
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

