const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: [
      path.join(__dirname, './src/app.js')
    ],
    vendor: [
      'react',
      'react-dom',
      'moment'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // require.resolve needed for babel-loader
        query: {
          presets: [
            [require.resolve('babel-preset-es2015'), { "modules": false }],
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-react-optimize'),
            require.resolve('babel-preset-stage-0')
          ],
          ignore: [
            '/node_modules/'
          ]
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?minimize!autoprefixer-loader?browsers=last 2 version!sass-loader?sourceMap&outputStyle=expanded&includePaths[]=' + (encodeURIComponent(path.resolve(process.cwd(), './node_modules')))
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      },
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false
    }),
  ],
  resolve: {
    modules: [
      'node_modules', // resolve dependencies modules from main app
      path.join(__dirname, 'node_modules'), // resolve dependencies modules from submodules
      '../../modules' // resolve "sub" modules
    ]
  }
};

