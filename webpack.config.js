const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плаг
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin'); // подключили плагин
// подключите к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // указали первое место, куда заглянет webpack, — файл index.js в папке src
  entry: {
    main: './src/pages/index.js'
  },
  // указали в какой файл будет собираться весь js и дали ему имя
  output: {
    path: path.resolve(__dirname, 'dist'), // переписали точку выхода, используя утилиту path
    filename: 'main.js',
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        }, 'postcss-loader']
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: "./src/favicon.ico"
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
};

// module.exports — это синтаксис экспорта в Node.js
