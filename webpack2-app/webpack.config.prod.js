const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = {
  devtool: 'source-map',
  context: path.resolve('src'),
  entry: {
    app: [
      './app.js'
    ],
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'CLIENT': JSON.stringify('true')
      }
    }),
    new InlineManifestWebpackPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
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
      filename: '[name].[chunkhash].css',
      disable: false
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/public/prod.html'),
      chunksSortMode: 'dependency'
    }),
    new OfflinePlugin()
  ],
  resolve: {
    modules: [
      'node_modules', // resolve dependencies modules from main app
      path.join(__dirname, 'node_modules'), // resolve dependencies modules from submodules
      '../../modules' // resolve "sub" modules
    ]
  }
};
