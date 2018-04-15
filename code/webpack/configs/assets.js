export default function assets({ target }) {
  const emitFile = target !== "node";

  const withLimit = limit => ({
    loader: "url-loader",
    options: {
      limit,
      emitFile
    }
  });

  return {
    module: {
      rules: [
        {
          test: /\.(gif|jpg|png|svg)(\?.*)?$/,
          use: withLimit(10000) // 10 kb
        },
        {
          test: /favicon\.ico$/,
          use: withLimit(1)
        },
        {
          test: /\.(ttf|eot|woff|woff2)(\?.*)?$/,
          use: withLimit(100000) // 100kb
        }
      ]
    }
  };
}
