import React, {useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import NavbarController from "../modules/components/Navbars/NavbarController";
import Sidebar from "../modules/components/Sidebar/Sidebar";
import { makeStyles } from '@material-ui/core/styles';
import routes from "routes.js";
import { Widget, addResponseMessage } from 'react-chat-widget';
import '../../node_modules/react-chat-widget/lib/styles.css';
import { Launcher } from 'react-chat-window'

export default function Admin(props) {

  const [message, setMessage] = useState([])

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    //Enviar para o Mercado livre
  }

  useEffect(() => {
    addResponseMessage("Ola gostaria de saber se vocês tem tamanho M de manguinhas?")
  }, [])

  const _onMessageWasSent = (message) => {
    setMessage(message)
  }

  const _sendMessage = (text) => {
    if (text.length > 0) {
      setMessage({
        messageList: [{
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }

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

      
        <div style={{ 'textTransform': 'uppercase' }} className="App">
          <Widget
            title="Perguntas"
            subtitle={new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            badge='1'
            handleNewUserMessage={handleNewUserMessage} />
        </div> 

        {/**<div>
          <Launcher
            agentProfile={{
              teamName: 'react-chat-window',
              imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
            }}
            onMessageWasSent={_onMessageWasSent}
            messageList={message.messageList}
            sendMessage={_sendMessage}
            showEmoji
          />
        </div> */}

      </main>

    </div>
  );

}

