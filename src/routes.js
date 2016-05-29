if(typeof require.ensure !== 'function') 
	require.ensure = (d, c) => c(require)


module.exports = function(isLogged) {
  return {
    path: "/",
    component: require('./components/app').default,
    childRoutes: [
      {
        path: 'portions/:mode(/:date(/:index))',
        onEnter: (nextState, replace) => {
          if(!isLogged()) 
            replace("/?redirect=" + nextState.location.pathname)
        },

        getComponent(location, cb) {
          require.ensure([], require => {
            cb(null, require('./components/portions/PortionContainer').default)
          }, 'portions')
        }
      },

      {
        path: 'products',
        onEnter: (nextState, replace) => {
          if(!isLogged()) 
            replace("/?redirect=" + nextState.location.pathname)
        },

        getComponent(location, cb) {
          require.ensure([], require => {
            cb(null, require('./components/products/ProductContainer').default)
          }, 'products')
        }
      }
    ],
    
    getIndexRoute(location, callback) {
      require.ensure([], require => {
        callback(null, {
          component: require('./components/main/Main').default,
        })
      }, 'main')
    }
  }
}