import { HotModuleReplacementPlugin, LoaderOptionsPlugin } from "webpack";

export default function dev({ target, mode, hot }) {
  return {
    mode: mode === "staging" ? "production" : mode,
    devtool: mode === "development" ? "cheap-module-source-map" : "",
    plugins: [
      ...(target === "web" && hot ? [new HotModuleReplacementPlugin()] : []),
      // NOTE: workaround for webpack v4 for eslint-loader
      ...(mode === "development" ? [new LoaderOptionsPlugin({ options: {} })] : [])
    ],
    module: {
      rules:
        mode === "development"
          ? [
              {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
              }
            ]
          : []
    }
  };
}
