const MercadoLibreStrategy = require('passport-mercadolibre').Strategy;
const keys = require('./keys');
const usuarioController = require("../controllers/usuario-controller");

module.exports = (passport) => {



  passport.use(new MercadoLibreStrategy({

    clientID: keys.mercadolivre.CLIENT_ID,
    clientSecret: keys.mercadolivre.CLIENT_SECRET,
    callbackURL: keys.mercadolivre.CALLBACK_URL,

  }, (accessToken, refreshToken, profile, done) => {

    usuarioController.buscarUsuarioPorID(setUsuario(profile, accessToken, refreshToken)).then(res => {
      //console.log("Resultado: " + res);
      if(res === false){
        usuarioController.salvarUsuario(setUsuario(profile, accessToken, refreshToken));
      }
    });

    return done(null, profile);
  }
  ));

  const setUsuario = (profile, accessToken, refreshToken) => {
    UsuarioJSON = {
      id: profile.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
      nickname: profile.nickname,
      first_name: profile.first_name,
      email: profile.email
    }
    return UsuarioJSON;
  }

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

}






