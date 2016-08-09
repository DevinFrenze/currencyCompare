var precss = require('precss')
var autoprefixer = require('autoprefixer')
var SRC_DIR = `${__dirname}/src`
var DEST_DIR = `${__dirname}/static`

module.exports = {
  entry: ['babel-polyfill', `${SRC_DIR}/entry.js`],
  output: {
    path: DEST_DIR,
    filename: 'bundle.js',
    publicPath: DEST_DIR
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: SRC_DIR,
        loader: 'babel',
        query: {
          presets: [ 'es2015', 'react' ],
          plugins: [ 'transform-async-to-generator' ]
        }
      },
      {
        test: /\.less$/,
        include: SRC_DIR,
        loaders: ['style', 'css', 'postcss', 'less']
      }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer];
  },
  resolve: {
    modulesDirectories: [ 'src', 'web_modules', 'node_modules' ],
    extensions: [ '', '.js', '.less', '.min.js' ],
  }
}
