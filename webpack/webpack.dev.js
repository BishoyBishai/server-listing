const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};
