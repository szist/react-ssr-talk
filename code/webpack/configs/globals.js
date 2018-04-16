import { DefinePlugin } from 'webpack'

export default function globals({ target, mode }) {
  return {
    plugins: [
      new DefinePlugin({
        ...(target === 'web'
          ? {
              process: {},
              'process.env': {}
            }
          : {}),
        'process.env.NODE_ENV': JSON.stringify(mode),
        __DEV__: mode === 'development',
        __SERVER__: target === 'node'
      })
    ]
  }
}
