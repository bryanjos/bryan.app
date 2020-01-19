const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const nodeModulesPath = path.resolve(__dirname, 'node_modules')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

function minimizers() {
  if (devMode) {
    return []
  } else {
    return [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
  }
}

// The webpack config
module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['./site/assets/css/app.css', './site/assets/js/app.js'],
  },
  output: {
    path: path.resolve(__dirname, 'site', 'static'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: '/',
  },
  optimization: {
    minimizer: minimizers(),
  },
  plugins: [
    // Copy all of our assets to the priv/static folder
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'site', 'assets', 'static'),
        to: path.resolve(__dirname, 'site', 'static'),
      },
    ]),
    new ImageminPlugin({
      disable: devMode,
      test: /\.(jpe?g|png|gif|svg)$/i,
    }),
    // Separate the css into it's own file
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      // JS rules
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // SCSS rules
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {sourceMap: true}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {
            loader: 'resolve-url-loader',
            options: {keepQuery: true, sourceMap: true},
          },
        ],
      },
      // For images and fonts found in our scss files
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: [nodeModulesPath],
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: devMode,
            },
          },
        ],
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?[a-z0-9\=\.]+)?$/,
        exclude: [nodeModulesPath],
        loader: 'file-loader',
      },
    ],
  },
}
