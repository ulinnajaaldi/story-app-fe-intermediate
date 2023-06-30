/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const htmlWebpackPluginConfig = {
  meta: {
    viewport:
      'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
  },
  templateParameters: {
    brandName: 'Ceritain!',
  },
};

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ceritain!',
      filename: 'index.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/index.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Ceritain!',
      filename: 'user/dashboard.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/user/dashboard.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Ceritain!',
      filename: 'user/add-story.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/user/add-story.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Ceritain!',
      filename: 'user/edit-story.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/user/edit-story.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Login - Ceritain!',
      filename: 'auth/login.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/auth/login.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Register - Ceritain!',
      filename: 'auth/register.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/auth/register.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Ceritain!',
      filename: 'user/add-guest-story.html',
      favicon: path.resolve(__dirname, 'src/public/favicon.png'),
      template: path.resolve(__dirname, 'src/views/user/add-guest-story.html'),
      ...htmlWebpackPluginConfig,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/user/'),
        },
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/auth/'),
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin({ extensions: ['js'] }),
  ],
};
