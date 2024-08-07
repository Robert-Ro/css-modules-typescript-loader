const path = require('path')
const webpack = require('webpack')
const memoryfs = require('memory-fs')

module.exports = (entry, options = {}) => {
  const { sourceMap, ...loaderOptions } = options
  try {
    const compiler = webpack({
      entry,
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              {
                loader: require.resolve('./index.js'),
                options: {
                  mode: 'emit',
                },
              },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: !!sourceMap,
                },
              },
            ],
          },
        ],
      },
    })
    compiler.outputFileSystem = new memoryfs()

    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        console.log({
          failed: true,
          errors: err || stats.toJson().errors,
        })
      } else {
        console.log(stats)
      }
    })
  } catch (error) {
    console.log(error)
  }
  //
}
