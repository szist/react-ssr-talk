import CopyWebpackPlugin from "copy-webpack-plugin";

export default function copyPublic({ target, publicDir }) {
  return {
    plugins: [...(target === "web" ? [new CopyWebpackPlugin([publicDir])] : [])]
  };
}
