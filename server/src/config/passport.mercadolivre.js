//const MercadoLibreStrategy = require('passport-mercadolibre').Strategy;
const MercadoLibreStrategy = require('./mercado-livre').Strategy
const keys = require('./keys');
const usuarioService = require("../services/usuario-service");
const axios = require('axios')
const constants = require('../constants/constants');

module.exports = (passport) => {

  passport.use(new MercadoLibreStrategy({

    clientID: keys.mercadolivre.CLIENT_ID,
    clientSecret: keys.mercadolivre.CLIENT_SECRET,
    callbackURL: keys.mercadolivre.CALLBACK_URL,

  }, (accessToken, refreshToken, profile, done) => {
    /*
    usuarioController.buscarUsuarioPorID(setUsuario(profile, accessToken, refreshToken)).then(user => {
      if(user.isExiteUsuario === false){
        usuarioController.salvarUsuario(setUsuario(profile, accessToken, refreshToken));
      }else{
        usuarioController.editarUsuario(user._id, accessToken, refreshToken);
        console.log("user: " + user);
        return done(null, user);
      }
    });
    */
    //usuarioService.salvarUsuario(setUsuario(profile, accessToken, refreshToken))
    //console.log("Mercado livre - profile " + JSON.stringify(profile))

    return done(null, profile);

  }
  ));

  const setUsuario = (profile, accessToken, refreshToken) => {
   return {
      contas: [{
        idConta: profile.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        nickname: profile.nickname
      }],
      nome: profile.first_name,
      sobrenome: profile.last_name,
      email: profile.email
    }
  }

  passport.serializeUser((profile, done) => {
    done(null, profile);
  });

  passport.deserializeUser((profile, done) => {
    done(null, profile);
  });

}
