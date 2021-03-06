const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  performance: {
    hints: false
  },
  context: path.resolve('src'),
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app.js'
  ],
  output: {
    path: path.resolve('dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './src/public',
    hot: true,
    historyApiFallback: true,
    inline: false,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: true
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // require.resolve needed for babel-loader
        // .babelrc is not working for local modules
        query: {
          presets: [
            [require.resolve('babel-preset-es2015'), { "modules": false }],
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-stage-0'),
            require.resolve('babel-preset-react-hmre')
          ]
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader?sourceMap&outputStyle=expanded&includePaths[]=' + (encodeURIComponent(path.resolve(process.cwd(), './node_modules')))
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'CLIENT': JSON.stringify('true')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    modules: [
      'node_modules', // resolve dependencies modules from main app
      path.join(__dirname, 'node_modules'), // resolve dependencies modules from submodules
      '../../modules' // resolve "sub" modules
    ]
  }
};
