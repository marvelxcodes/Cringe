module.exports = [
  {
    name: 'server',
    entry: './index.js',
    target: 'node',
    output: {
      path: __dirname + '/dist',
      filename: 'index.cjs',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    mode: 'production'
  }
]