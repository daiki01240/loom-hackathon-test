const webpack = require('webpack')

module.exports = {
  context: __dirname + "/src",
  entry: [
    "regenerator-runtime/runtime",
    "./index",
  ],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }],
  },
  resolve: {
  extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  optimization: {
    minimizer: []
  },
}
