import ExtractTextPlugin from "extract-text-webpack-plugin";
import cssnano from "cssnano";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";

export default function styles({ target, mode, hot }) {
  function getLoader() {
    const cssLoader = {
      loader: `css-loader${target === "node" ? "/locals" : ""}`,
      options: {
        modules: true,
        localIdentName:
          mode === "production" ? "[hash:base64]" : "[name]__[local]___[hash:base64:5]",
        importLoaders: 1
      }
    };
    const fallback = target === "web" ? ["style-loader"] : [];

    const styleLoaders = [
      cssLoader,
      // NOTE postcss configs should be in postcss.config.js or in package.json
      "postcss-loader"
    ];

    const extractLoaders = ExtractTextPlugin.extract({
      fallback,
      use: styleLoaders
    });

    return hot ? ["css-hot-loader", ...extractLoaders] : extractLoaders;
  }

  return {
    module: {
      rules: [
        {
          test: /\.p?css$/,
          use: getLoader()
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        // NOTE temporary fix with contenhash until it's fixed. Maybe switch to MiniCssExtractPlugin
        filename: mode === "development" ? "[name].css" : "[name].[md5:contenthash:hex:20].css",
        allChunks: true,
        disable: target === "node"
      }),
      ...(mode === "development"
        ? []
        : [
            new OptimizeCssAssetsPlugin({
              assetNameRegExp: /\.css$/g,
              cssProcessor: cssnano,
              cssProcessorOptions: {
                discardComments: { removeAll: true },
                discardEmpty: true
              },
              canPrint: true
            })
          ])
    ]
  };
}
