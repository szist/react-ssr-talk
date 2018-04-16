/* eslint-disable */
module.exports = () => ({
  plugins: [
    require('postcss-import')({ path: ['app'] }),
    require('postcss-nested')(),
    require('postcss-cssnext')({ browsers: ['last 3 versions'] })
  ]
})
