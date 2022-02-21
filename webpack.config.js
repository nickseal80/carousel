const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // input
  entry: './src/index.ts',

  // output
  output: {
    publicPath: "",
    path: path.resolve(__dirname, 'dist'),
    filename: 'carousel.js',
    library: {
      name: 'seal-carousel',
      type: 'umd',
      export: 'default',
    },
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      // TypeScript
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },

      // Styles
      {
        test: /\.s?css$/,
        use: [

          // Creates `style` nodes from JS strings
          "style-loader",

          // Translates CSS into CommonJS
          "css-loader",

          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },

  plugins: [
    // ...
    new CleanWebpackPlugin(),
  ],

  mode: 'development',

  // watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};