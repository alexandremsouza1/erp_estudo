const MercadoLibreStrategy = require('passport-mercadolibre').Strategy;
const keys = require('./keys');
const usuarioService = require("../services/usuario-service");

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
    usuarioService.salvarUsuario(setUsuario(profile, accessToken, refreshToken))
    console.log("Mercado livre - session user " + accessToken)

    return done(null, profile);

  }
  ));

  const setUsuario = (profile, accessToken, refreshToken) => {
    let usuarios = {
      id: profile.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
      nickname: profile.nickname,
      first_name: profile.first_name,
      email: profile.email
    }
    return usuarios
  }

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

}
