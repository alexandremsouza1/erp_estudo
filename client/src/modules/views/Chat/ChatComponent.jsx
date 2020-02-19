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

import { Tab } from 'semantic-ui-react'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 430,
    },
    inline: {
        display: 'inline',
    },
}));

export default function ChatComponent(props) {

    const classes = useStyles();

    return (
        <Grid columns={2} divided>
            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#818281' }}>Perguntas</span>
            <Grid.Row>
                <Grid.Column width={7}>
                    <List component="nav" className={classes.root}>
                        <ListItem button alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Felipe Miguel dos Santos" src="/" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Felipe Miguel dos Santos"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            Anuncio
                                            </Typography>
                                        <span style={{ fontSize: '11px' }}>- Perfume Amakha 15ml Promoção Ótimas Fragrâncias</span>
                                    </React.Fragment>
                                }
                            />
                            <ListItemSecondaryAction style={{ padding: '0 0 15px' }}>
                                <span>6 minutos atrás</span>
                            </ListItemSecondaryAction>
                        </ListItem>

                        <Divider variant="inset" component="li" />

                        <ListItem button alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Adnair Miguel dos Santos" src="/" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Adnair Miguel dos Santos"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            Anuncio
                                            </Typography>
                                        <span style={{ fontSize: '11px' }}>- Perfume Amakha 15ml Promoção Ótimas Fragrâncias</span>
                                    </React.Fragment>
                                }
                            />
                            <ListItemSecondaryAction style={{ padding: '0 0 15px' }}>
                                <span>12 minutos atrás</span>
                            </ListItemSecondaryAction>
                        </ListItem>

                        <Divider variant="inset" component="li" />

                        <ListItem button alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Paloma Santos" src="/" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Paloma Santos"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            Anuncio
                                            </Typography>
                                        <span style={{ fontSize: '11px' }}>- Kit 10 Blusas Feminina Crepe Atacado - Promoção Frete Grátis</span>
                                    </React.Fragment>
                                }
                            />
                            <ListItemSecondaryAction style={{ padding: '0 0 15px' }}>
                                <span>28 minutos atrás</span>
                            </ListItemSecondaryAction>
                        </ListItem>

                    </List>
                </Grid.Column>

                <Grid.Column>
                    <AppBar position="static" style={{ backgroundColor: '#4682b4' }}>
                        <Toolbar variant="dense">
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column style={{ width: '200px' }}>
                                        <div>Felipe Miguel dos Santos</div>
                                        <div><a style={{ fontSize: '10px', color: 'white' }} href='#'>#MLB9870987090</a></div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <ListItemSecondaryAction>
                                <span><a style={{ fontSize: '12px', color: 'white' }} href='#'>Perfume Amakha 15ml Promoção Ótimas Fragrâncias</a></span>
                            </ListItemSecondaryAction>
                        </Toolbar>
                    </AppBar>
                    <Paper elevation={3} style={{ height: '350px' }}>
                        <div style={{ display: 'flex' }}>

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <div style={{backgroundColor: '#3f51b5', color: '#FFFFFF'}}>
                                Haha thank you Clarke, I'm doing our best
                            </div>
                        </div>

                    </Paper>
                    <Paper component='form'>
                        <Input type='text' fluid placeholder='Digite uma resposta...' action>
                            <input />
                            <Button
                                variant="contained"
                                color="default"
                                startIcon={<SendIcon />}>
                                Enviar
                                </Button>
                        </Input>
                    </Paper>
                </Grid.Column>

            </Grid.Row>
        </Grid>
    )
}