import mongoose from 'mongoose'
import Products from '../src/models/Products'
import Portions from '../src/models/Portions'

module.exports = function(app, passport) {

function isLoggedIn(req, res, next) {
  if(!req.isAuthenticated()) 
    return res.redirect('/');

  next();
}

function isAuth(req, res, next) {
  if(!req.isAuthenticated()) 
    return res.status(401).end()

  next()
}



// AUTH -----------------------------------------------------------
app.get('/api/auth', (req, res) => {
  if(!req.isAuthenticated())
    return res.status(401).end()

  res.json(req.user)
})


app.get('/api/auth/twitter', passport.authenticate('twitter'))
app.get('/api/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
)


app.get('/api/auth/facebook', passport.authenticate('facebook'))
app.get('/api/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
)


app.get('/api/auth/vkontakte', passport.authenticate('vkontakte'))
app.get('/api/auth/vkontakte/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
)


app.post('/api/auth/login', (req, res, next) => {
  passport.authenticate('local-login', {failureFlash: true}, (err, user, info) => {
    if(err) 
      return next(err)
    if(!user) 
      return res.status(401).json([info.message])
 
    req.logIn(user, err => {
      if(err)
        return next(err)
      res.json({username: user.username, id: user._id})
    })
  })(req, res, next)
})


app.post('/api/auth/signup', (req, res, next) => {
  passport.authenticate('local-signup', {failureFlash: true}, (err, user, info) => {
    if(err)
      return next(err)
      
    if(!user)
      return res.status(401).json([info.message])
      
    req.logIn(user, err => {
      if(err)
        return next(err)
      res.json({username: user.username, id: user._id})
    })
  })(req, res, next)
})


app.get('/api/auth/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})



// PRODUCTS -------------------------------------------------------
app.get("/api/users/:user_id/products", isAuth, (req, res) => {
  res.set("Cache-control", "max-age=20")
  const user_id = req.user._id

	Products.find({ user_id }, (err, products) => {
		res.json(products)
	})
})

app.post("/api/users/:userId/products", isAuth, (req, res, next) => {
  if(!req.body) return res.end()

  const product = {
    ...req.body,
    user_id: req.user._id,
    _id: mongoose.Types.ObjectId(),
  }

  new Products(product).save((err, r) => {
    res.json(product)
  })
})

app.put('/api/users/:userId/products/:productId', isAuth, (req, res, next) => {
  if(!req.body) 
    return res.end()

  Products.update(
    { _id: req.params.productId, user_id: req.user._id },
    req.body,
    (err, result) => {
      res.end()
    }
  )
})

app.delete("/api/users/:userId/products/:productId", isAuth, (req, res) => {
  Products.remove({_id: req.params.productId, user_id: req.user._id }, err => {
    res.end()
  })
})




// PORTIONS -------------------------------------------------------
// Добавить продукт к порции
app.post("/api/portions/:portionId/products", isAuth, (req, res, next) => {
  if(!req.body) 
    return res.end()

  const product = {
    ...req.body,
    _id: mongoose.Types.ObjectId(),
  }

  Portions.update(
    { _id: req.params.portionId, user_id: req.user._id },
    { $push: { products: product } },
    (err, result) => {
      res.json(product)
    }
  )
})

// Изменить продукт в порции
app.put('/api/portions/:portionId/products/:productId', isAuth, (req, res, next) => {
  if(!req.body) return res.end()

  const products = {}
  for(let name in req.body) {
    products["products.$." + name] = req.body[name]
  }

  Portions.update(
    { "products._id": req.params.productId},
    products,
    (err, result) => {
      res.end(`The product ${req.params.productId} has been updated`)
    }
  )
})

// Удалить продукт из порции
app.delete("/api/portions/:portionId/products/:productId", isAuth, (req, res) => {
  Portions.update(
    { 'products._id': req.params.productId, user_id: req.user._id },
    { $pull: { products: { "_id": req.params.productId } } },
    (err, result) => {
      res.end(`The product ${req.params.productId} has been removed from the portion`)
    }
  )
  res.end()
})




// Получить порции за день
app.get('/api/users/:userId/portions/date/:date', isAuth, (req, res, next) => {
  res.set("Cache-control", "max-age=20")
  const today = new Date(req.params.date);
  const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));

  Portions
    .find({user_id: req.user._id, date: { $gte: today, $lt: tomorrow }})
    .sort({'date': 1})
    .exec((err, portions) => {
      if(err) return res.end()
      res.json(portions)
    })
})


// Создать порцию
app.post('/api/portions', isAuth, (req, res, next) => {
  if(!req.body) 
    return res.end()
  
  const product = {
    ...req.body,
    user_id: req.user._id,
    _id: mongoose.Types.ObjectId()
  }

  new Portions(product).save(function(err, r) {
    res.json(product)
  })
})

// Удалить порцию
app.delete("/api/portions/:portionId", isAuth, (req, res) => {
  Portions.remove({_id: req.params.portionId, user_id: req.user._id }, err => {
    res.end()
  })
})




app.get('/api/users/:userId/stat/all-time-portions', isAuth, (req, res, next) => {
  res.set("Cache-control", "max-age=20")
  
  const aggregate = [
    {$match: { user_id: req.user._id }},
    {$unwind: "$products"}, 
    {$group: {
      _id: {$substr: ["$date", 0, 10] },
      caloricity: {$sum: "$products.caloricity"}, 
      protein: {$sum: "$products.protein"},
      fat: {$sum: "$products.fat"},
      ch: {$sum: "$products.ch"}
    }},
    {$sort: { _id: 1 }}
  ]
 
  const limit = parseInt(req.query.limit)
  if(limit && limit < 500) 
    aggregate.push({$limit: limit})

  Portions.aggregate(aggregate, (err, result) => {
    if(err) res.end()
    res.json(result)
  })
})

} // module.exports