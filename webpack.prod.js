 const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');
 const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


 module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',

  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\/]node_modules[\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: ['...',new CssMinimizerPlugin()],
  },
});
