import React from 'react'
import { renderToString } from 'react-dom/server'

import { RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import configureStore  from './src/store'

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import path from 'path'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/calDiary', (err, res) => {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err)
  } else {
    console.log('Connected to Database')
  }
})

const app = express();

app.set('view engine', 'ejs')
app.set("views", path.resolve('views'))
app.use('/build', express.static(path.join(__dirname, 'build')))

app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json())
app.use(cookieParser())

require('./passport')(passport)

const MongoStore = require('connect-mongodb-session')(session);

app.use(session({ 
  store: new MongoStore(
    {
      uri: 'mongodb://localhost/calDiary',
      collection: 'sessions',
      expires: 1000 * 60 * 60 * 24 // 1 day
    },
    (error) => {}
  ),
  secret: 'yoursecretword',
  resave: true,
  saveUninitialized: true
}));


app.use(passport.initialize())
app.use(passport.session())

if(process.env.NODE_ENV === "development") {
  require('./webpack')(app)
}

// server routes
require('./api')(app, passport)

// react-router routes
const routes = require('./src/routes')

app.get('*', (req, res) => {
  const isAuth = req.isAuthenticated()

  match({ routes: routes(() => isAuth), location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const store  = configureStore()
      const cookie = req.headers.cookie
      const user_id = req.user ? req.user._id : null

      if(isAuth) {
        store.dispatch({ 
          type: "LOGIN_SUCCESS", 
          response: { username: req.user.username, id: req.user._id }
        })
      } 

      Promise.all(fetchAll(store, renderProps, cookie, user_id)).then(() => {
        try {
          render(res, store, renderProps)
        } catch(e) {
          res.status(500).send("Something went wrong.");
        }
      }).catch((response) => {
        res.status(500).send("Something went wrong!");
      });
    } else {
      res.status(404).send('Not found')
    }
  })
});

function fetchAll(store, routerState, cookie, user_id) {
  return routerState.components.map((componentClass) => {
    if(componentClass.fetchData) {
      return componentClass.fetchData(store.dispatch, routerState.params, cookie, user_id)
    }
  })
}

function render(res, store, renderProps) {
  const finalState = JSON.stringify(store.getState())
  
  res.render('index', {
    content: renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    ),
    initialState: finalState,
    NODE_ENV: process.env.NODE_ENV
  })
}


app.listen(3000, () => {
  console.log("Listening at http://localhost:3000");
})