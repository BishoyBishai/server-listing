const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: "inline-source-map",
  devServer: {
    hot: true,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};
