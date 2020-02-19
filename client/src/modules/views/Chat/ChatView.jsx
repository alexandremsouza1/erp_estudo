import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Grid } from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { Input } from 'semantic-ui-react'
import ChatComponent from './ChatComponent'

import { Tab } from 'semantic-ui-react'

const panes = [
    { menuItem: 'Perguntas', render: () => <Tab.Pane></Tab.Pane> },
    { menuItem: 'Mensagens de pós venda', render: () => <Tab.Pane><ChatComponent /></Tab.Pane> }
]

export default function ChatView(props) {

    return (
        <>
            <ChatComponent />
        </>
    )
}

