const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESlintPlugin = require('eslint-webpack-plugin');
const { ProgressPlugin } = require('webpack');
const { NetlifyPlugin } = require('netlify-webpack-plugin');

module.exports = (env, options) => {
  const isProd = options.mode === 'production';

  const mode = isProd ? 'production' : 'development';
  const target = isProd ? 'browserslist' : 'web';
  const devtool = isProd ? undefined : 'source-map';

  const config = {
    mode,
    target,
    devtool,
    context: path.join(__dirname, '/src'),
    entry: './index.tsx',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].[contenthash:8].js',
      publicPath: '/',
    },
    devServer: {
      open: true,
      port: 'auto',
      historyApiFallback: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(c|sa|sc)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: !isProd
                    ? '[name]--[local]--[hash:base64:2]'
                    : '[local]-[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: { plugins: [require('postcss-preset-env')] },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[hash][ext]',
          },
        },
        {
          test: /\.t|jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
            'ts-loader',
          ],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new ProgressPlugin(),
      ...[new ESlintPlugin({ extensions: ['ts', 'tsx', 'js', 'jsx'] })],
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
        favicon: './assets/favicon.ico',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash:8].css',
      }),
      new NetlifyPlugin({
        redirects: [
          {
            from: '/*',
            to: '/index.html',
            status: 200,
          },
        ],
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
  };

  return config;
};
