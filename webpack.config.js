import path from 'path'
import webpack from 'webpack'

const localIdentName = "localIdentName=[name]-[local]_[hash:base64:5]"
const cssLoaderString = `css?modules&importLoaders=1&${localIdentName}&sourceMap!postcss`

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    bundle: [
    'webpack-hot-middleware/client',
    './src/client.js'
    ]
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
      IS_CLIENT: "true",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale$/, /en-gb|ru/),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["es2015", "react", "stage-0"],
        "plugins": [
          ["react-transform", {
            "transforms": [{
              "transform": "react-transform-hmr",
              "imports": ["react"],
              "locals": ["module"]
            }, {
              "transform": "react-transform-catch-errors",
              "imports": ["react", "redbox-react"]
            }]
          }]
        ]
      }
    },
    {
      test: /\.css$/,
      exclude: /(normalize|base|react-datepicker)\.css$/,
      loader: 'style!' + cssLoaderString
    },
    {
      test: /(normalize|base|react-datepicker)\.css$/,
      loader: 'style!css'
    },
    {
      test: /\.(woff|woff2|eot|ttf|svg)(\?[\w\d\#]+)?$/, 
      loader: 'url-loader?limit=100000'
    },

    {
      test: /\.gif$/,
      loader: 'url?name=[name].[ext]'
    },
    ]
  },
  postcss: postcss
}



function postcss() {
  return [
    require('postcss-modules-values'),
    require('precss'),
    require('postcss-cssnext'),
  ]
}