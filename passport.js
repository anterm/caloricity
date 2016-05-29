import User from './src/models/Users'
import config from './config/constants'

const LocalStrategy   = require('passport-local').Strategy
const VKontakteStrategy = require('passport-vkontakte').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const FacebookStrategy = require('passport-facebook').Strategy


function findOrCreateUser(provider, profile, done) {
  User.findOne(
    {provider, providerId: profile.id }, 
    (err, user) => {
      if(err) return done(err)
      if(user) return done(err, user)

      var user = new User({
        username: profile.displayName,
        provider,
        providerId: profile.id
      });

      user.save(err => {
        if(err) console.log(err)
        return done(err, user)
      });
    }
  )
}

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })


  passport.use(new FacebookStrategy({
      clientID: "yourID",
      clientSecret: "yourSecret",
      callbackURL: config.site_url
    },
    (accessToken, refreshToken, profile, done) => {
      findOrCreateUser('facebook', profile, done)
    }
  ))


  passport.use(new TwitterStrategy({
      consumerKey: "yourKey",
      consumerSecret: "yourSecret",
      callbackURL: config.site_url
    },
    (token, tokenSecret, profile, done) => {
      findOrCreateUser('twitter', profile, done)
    }
  ))


  passport.use(new VKontakteStrategy({
      clientID:     "yourID",
      clientSecret: "yourSecret",
      callbackURL: config.site_url,
      profileFields: ['email', 'city']
    },
    (accessToken, refreshToken, profile, done) => {
      findOrCreateUser('vkontakte', profile, done)
    }
  ))


  passport.use('local-signup', new LocalStrategy({
      passReqToCallback: true
    },
    (req, username, password, done) => {
      process.nextTick(function() {
        User.findOne({ provider: 'local', username }, (err, user) => {
          if(err) 
            return done(err)

          if(user)
            return done(null, false,  { message: "Имя уже занято!" })

          var newUser = new User()
          newUser.username = username;
          newUser.password = newUser.generateHash(password)
          newUser.provider = "local"
          newUser.save(err => {
            if(err)
              throw err
            return done(null, newUser)
          })
        })
      })
    }
  ))


  passport.use('local-login', new LocalStrategy({
      passReqToCallback: true
    },
    (req, username, password, done) => {
      User.findOne({ username, provider: 'local' }, (err, user) => {
        if(err)
          return done(err)

        if(!user)
          return done(null, false, { message: "Пользователя с таким именем нет!" })

        if(!user.validPassword(password))
          return done(null, false, { message: "Неверный пароль!" })

        return done(null, user)
      })
    }
  ))
}