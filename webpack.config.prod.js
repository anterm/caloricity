var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
require('es6-promise').polyfill()

var localIdentName = "localIdentName=[name]-[local]_[hash:base64:5]"
var cssLoaderString = "css?modules&importLoaders=1&" + localIdentName + "!postcss"

var postcss_modules_value = require('postcss-modules-values')
var precss = require('precss')
var post_cssnext = require('postcss-cssnext')

function postcss() {
  return [
    postcss_modules_value,
    precss,
    post_cssnext,
  ]
}

var clientRendering = {
  // The configuration for the client-side rendering
  name: "client-side rendering",
  entry: {
    bundle: ['./src/client.js']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[id].[name].js',
    library: '[name]',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.DefinePlugin({ 
      'process.env.NODE_ENV': '"production"',
      IS_CLIENT: 'true',
    }),
    new ExtractTextPlugin('[name].css', {allChunks: true, disable: false}),
    new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale$/, /en-gb|ru/),
    new webpack.optimize.UglifyJsPlugin({}),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          "presets": ["es2015", "react", "stage-0"]
        }
      },
      {
        test: /\.css$/,
        // не включаем стили для post-css и css-modules:
        exclude: /(normalize|base|react-datepicker)\.css$/,
        loader: ExtractTextPlugin.extract("style", cssLoaderString)
      },    
      { 
        // включаем стили (как есть) в сборку
        test: /(normalize|base|react-datepicker)\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?[\w\d\#]+)?$/, 
        loader: 'url?limit=100000'
      },
      {
        test: /\.gif$/,
        loader: 'url?name=[name].[ext]'
      },
    ]
  },
  postcss: postcss
}

var serverRendering = {
  // The configuration for the server-side rendering
  name: "server-side rendering",
  entry: {
    bundle: './server.js'
  },
  target: "node",
  externals: /^[a-z\-0-9]+$/,
  output: {
    path: path.join(__dirname, 'build'),
    filename: "[name].server.js",
    libraryTarget: "commonjs2"
  },
  plugins: [
    new webpack.DefinePlugin({ 
      'process.env.NODE_ENV': '"production"',
      'process.env.AZURE_PATH': JSON.stringify(process.env.AZURE_PATH || false),
      IS_CLIENT: 'false',
    }),
    new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale$/, /en-gb|ru/),
    new webpack.optimize.UglifyJsPlugin({}),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          "presets": ["es2015", "react", "stage-0"]
        }
      },
      {
        test: /\.css$/,
        loader: 'css/locals?module&' + localIdentName + '!postcss',
      },
    ]
  },
  node: {
    __filename: true,
    __dirname: true,
    console: true
  },
  postcss: postcss
}


module.exports = (function() {
  switch(process.env.BUILD) {
    case 'client':
      return [clientRendering]
      break
    
    case 'server':
      return [serverRendering]

    default:
      return [clientRendering, serverRendering]
  }
}())