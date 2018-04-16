import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import log from 'fancy-log'

export default config => {
  // Set `process.env.NODE_ENV` BEFORE calling the Webpack CLI
  process.env.NODE_ENV = 'development'

  const bundler = webpack(config)

  // Run Browsersync and use middleware for Hot Module Replacement
  const devMiddleware = webpackDevMiddleware(bundler, {
    // IMPORTANT: dev middleware can't access config, so we should
    // provide publicPath by ourselves
    publicPath: config.output.publicPath,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
      children: false
    },
    watchOptions: {
      aggregateTimeout: 200,
      ignored: /node_modules/
    }
    // for other settings:
    // @see https://webpack.js.org/guides/development/#webpack-dev-middleware
  })

  const middleware = [devMiddleware, webpackHotMiddleware(bundler)]

  return new Promise(resolve => {
    log('Waiting for the initial frontend webpack build to finish...')
    devMiddleware.waitUntilValid(stats => {
      log('Finished the initial frontend build.')
      if (stats.hasErrors()) {
        log('ERROR\n', stats.toString('errors-only'))
      } else {
        resolve(middleware)
      }
    })
  })
}
