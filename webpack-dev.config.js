var SRC_DIR = `${__dirname}/src`

module.exports = {
  entry: ['babel-polyfill', `${SRC_DIR}/entry.js`],
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/static/'
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
        loaders: ['style', 'css', 'less']
      }
    ]
  },
  resolve: {
    modulesDirectories: [ 'src', 'web_modules', 'node_modules' ],
    extensions: [ '', '.js', '.less' ],
  }
}
