export default function optimization({ target }) {
  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          ...(target === 'web'
            ? {
                vendor: {
                  chunks: 'initial',
                  name: 'vendor',
                  test: 'vendor',
                  enforce: true
                }
              }
            : {})
        }
      }
    }
  }
}
