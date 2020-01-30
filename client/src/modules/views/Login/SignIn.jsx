import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ButtonUI from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { NavLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Button, Header, Icon, Modal, Message } from 'semantic-ui-react'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Felipe M. Santos {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {

  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(true)
  const handleClose = () => setModalOpen(false)

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={() => handleClose()}
        basic
        size='small'
      >
        <Header icon='browser' content='Informação' />
        <Modal.Content>
          <Message info>
            <p>O E-mail e senha não são os mesmos dados que você usa para acessar a sua conta do MercadoLivre, caso nunca tenha acessado o sistema com email e senha, você
              deve primeiramente efetuar o seu cadastro clicando em "Cadastre-se agora!". Caso já tenha se cadastrado aqui anteriormente, basta apenas informar seu email e senha de acesso.
          </p>
          </Message>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={() => handleClose()} inverted>
            <Icon name='checkmark' /> Ok, entendi!
          </Button>
        </Modal.Actions>
      </Modal>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Acesso ao sistema
        </Typography>

          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <NavLink
              to='/admin/dashboard'>
              <ButtonUI
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Acessar
              </ButtonUI>
            </NavLink>

            
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueci minha senha
              </Link>
              </Grid>

              <Grid item>
                {'Quer experimentar grátis o SIGIML?'}{' '}
                <NavLink to='/signup'>
                  <Link href="#" variant="body2">
                    Cadastre-se agora!
                  </Link>
                </NavLink>
              </Grid>
            
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}