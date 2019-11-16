const MercadoLibreStrategy = require('passport-mercadolibre').Strategy;
const passport = require("passport");
const keys = require('./keys');
const axios = require('axios');

passport.use(new MercadoLibreStrategy({
    clientID: keys.mercadolivre.CLIENT_ID,
    clientSecret: keys.mercadolivre.CLIENT_SECRET,
    callbackURL: keys.mercadolivre.CALLBACK_URL,
  },
  function (accessToken, refreshToken, profile, done) {
    // + store/retrieve user from database, together with access token and refresh token
    console.log("\n");
    console.log("accessToken: "+ accessToken);
    console.log("refreshToken: "+ refreshToken);
    console.log("\n");

    console.log(profile);
    
    return done(null, profile); 
  }
));

passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });







