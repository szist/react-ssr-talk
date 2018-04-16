export default function entries({ entry, hot, target, vendor }) {
  return {
    entry: {
      ...(target === 'web'
        ? {
            app: [entry, ...(hot ? ['webpack-hot-middleware/client'] : [])],
            ...(vendor ? { vendor } : {})
          }
        : {
            // target === 'node'
            server: entry
          })
    }
  }
}
