import log from 'fancy-log'
import webpack from 'webpack'

function build(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        return reject(err)
      }

      if (stats.hasErrors()) {
        return reject(stats.toString('errors-only'))
      }

      log(
        '[webpack]\n',
        stats.toString({
          colors: true,
          version: false,
          hash: false,
          timings: true,
          chunks: false,
          chunkModules: false,
          children: false
        })
      )

      return resolve()
    })
  })
}

export default function buildAll(serverConfig, clientConfig) {
  build(clientConfig).then(() => build(serverConfig))
}
