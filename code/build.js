import build from './webpack/build'
import makeConfig from './webpack/makeConfig'
import { serverOptions, clientOptions } from './options'

let mode = 'development'
if (process.argv.includes('--production')) {
  mode = 'production'
}
if (process.argv.includes('--staging')) {
  mode = 'staging'
}
const clientConfig = makeConfig({ ...clientOptions, mode })
const serverConfig = makeConfig({ ...serverOptions, mode })

build(serverConfig, clientConfig)
