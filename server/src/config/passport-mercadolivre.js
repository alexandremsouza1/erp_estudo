const MercadoLibreStrategy = require('passport-mercadolibre').Strategy;
const keys = require('./keys');
const usuarioController = require("../controllers/usuario-controller");

module.exports = (passport) => {

  

passport.use(new MercadoLibreStrategy({

    clientID: keys.mercadolivre.CLIENT_ID,
    clientSecret: keys.mercadolivre.CLIENT_SECRET,
    callbackURL: keys.mercadolivre.CALLBACK_URL,
  
  }, (accessToken, refreshToken, profile, done) => {
    // + store/retrieve user from database, together with access token and refresh token
    console.log("\n");
    console.log("accessToken: "+ accessToken);
    console.log("refreshToken: "+ refreshToken);
    console.log("\n");
    console.log(profile);
    
    UsuarioJSON = {
      id: profile.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
      nickname: profile.nickname,
      first_name: profile.first_name,
      email: profile.email
    }

    usuarioController.salvarUsuario(UsuarioJSON);

    return done(null, profile); 
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

}






