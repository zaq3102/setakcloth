const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development', // 실서비스 : production
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'), // 빌드 위치
    filename: 'main.js', // 웹팩 빌드 후 최종적으로 만들어질 파일
    publicPath: '/'
  },
  // 번들링 될 파일 확장자 등록
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // 대상 설정 정규식
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new Dotenv()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, '/public')
    },
    port: 3000,
    compress: true,
    hot: true,
    historyApiFallback: true
  }
};
