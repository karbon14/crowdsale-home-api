const webpack = require('webpack')
const path = require('path')

const avoidWarnigns = [
  // Prevents this issue warning WARNING in ./node_modules/formidable/lib/incoming_form.js
  new webpack.DefinePlugin({ 'global.GENTLY': false }),
  // Prevents this issue warning WARNING in ./node_modules/any-promise/register.js
  new webpack.NormalModuleReplacementPlugin(/^any-promise$/, 'bluebird')
]

const plugins = [...avoidWarnigns]

module.exports = () => ({
  target: 'node',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins,
  node: {
    __dirname: true,
    __filename: true
  }
})
