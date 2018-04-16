import makeConfig from './webpack/makeConfig'
import runDevel from './webpack/development'

import { serverOptions, clientOptions } from './options'

const mode = process.argv.includes('--release') ? 'production' : 'development'
const serverConfig = makeConfig({ ...serverOptions, mode })

// Get the Webpack config (with options)
const clientConfig = makeConfig({
  ...clientOptions,
  hot: mode === 'development',
  mode
})

runDevel(serverConfig, clientConfig)
