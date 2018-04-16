import path from 'path'
const version = process.env.VERSION || 'v1'
const buildDir = path.resolve(__dirname, 'build')
export const clientOptions = {
  entry: `./app/app_${version}.js`,
  vendor: [
    'react',
    'react-dom',
    'react-helmet',
    'react-redux',
    'react-router-dom',
    'redux',
    'classnames'
  ],
  publicDir: `./app/public`,
  target: 'web',
  buildDir
}

export const serverOptions = {
  entry: `./server/server_${version}.js`,
  target: 'node',
  buildDir
}
