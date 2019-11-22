const MercadoLibreStrategy = require('passport-mercadolibre').Strategy;
const keys = require('./keys');
const usuarioController = require("../controllers/usuario-controller");
const reactLocalStorage = require("reactjs-localstorage");
var localStorage = require('localStorage');


module.exports = (passport) => {

  passport.use(new MercadoLibreStrategy({

    clientID: keys.mercadolivre.CLIENT_ID,
    clientSecret: keys.mercadolivre.CLIENT_SECRET,
    callbackURL: keys.mercadolivre.CALLBACK_URL,

  }, (accessToken, refreshToken, profile, done) => {
    usuarioController.buscarUsuarioPorID(setUsuario(profile, accessToken, refreshToken)).then(res => {
      if(res.isExiteUsuario === false){
        usuarioController.salvarUsuario(setUsuario(profile, accessToken, refreshToken));
      }else{
        usuarioController.editarUsuario(res._id, accessToken, refreshToken);
        localStorage.setItem('@sisiml/accessToken', accessToken);
        console.log("LocalStorage: " + localStorage.getItem('@sisiml/accessToken'));
      }
    });
    
    return done(null, profile);
  }
  ));

  const setUsuario = (profile, accessToken, refreshToken) => {
    let _usuarioJSON = {
      id: profile.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
      nickname: profile.nickname,
      first_name: profile.first_name,
      email: profile.email
    }
    return _usuarioJSON;
  }

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

}
