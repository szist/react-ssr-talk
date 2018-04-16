export default function babel({ mode }) {
  return {
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
              '@babel/preset-react',
              '@babel/preset-stage-3'
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              ...(mode === 'development'
                ? []
                : [
                    '@babel/plugin-transform-react-constant-elements',
                    '@babel/plugin-transform-react-inline-elements'
                  ])
            ]
          }
        }
      ]
    }
  }
}
