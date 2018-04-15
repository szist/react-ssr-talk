import path from "path";
import nodeExternals from "webpack-node-externals";
import ManifestPlugin from "webpack-manifest-plugin";

export default function output({ target, mode, buildDir }) {
  const outputPath = path.resolve(
    buildDir,
    target === "web" ? "public" : ""
  );
  return {
    target,
    externals: target === "web" ? [] : [/^\.\/assets$/, nodeExternals(), { newrelic: true }],
    output: {
      path: outputPath,
      publicPath: "/",
      filename: target === "node" || mode === "development" ? "[name].js" : "[name].[hash].js",
      chunkFilename: mode === "development" ? "[name].js" : "[name].[chunkhash].js",
      libraryTarget: target === "node" ? "commonjs2" : undefined
    },
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
    },
    optimization: {
      ...(target === "node" ? { splitChunks: false } : {})
    },
    performance: {
      hints: mode === "development" || target === "node" ? false : "warning",
      maxAssetSize: 250000, // 250 kB
      maxEntrypointSize: 500000 // 500 kB
    },
    plugins: [
      ...(target === "web"
        ? [
            new ManifestPlugin({
              fileName: path.resolve(outputPath, "../assets.json"),
              writeToFileEmit: true
            })
          ]
        : [])
    ]
  };
}
