const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development", // production || development
  // Chosen mode tells webpack to use its built-in optimizations accordingly.

  entry: {
    index: "./src/index.js"
    // Here the application starts executing and webpack starts bundling
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "js/[name].[hash].bundle.js",
    // the filename template for entry chunks
    publicPath: "/"
    // We inferred the "public path" (such as / or /my-project) from homepage.
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { minimize: true, sourceMap: true } }
        ]
      },
      {
        test: /\.(ico|jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "image/[name].[hash].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[hash].[ext]"
          }
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true
            }
          }
        ]
      }
    ]
  },

  resolve: {
    // alias: {
    //   react: "preact-compat",
    //   "react-dom": "preact-compat"
    // },
    // material UI dosent support preact
    extensions: ["*", ".js", ".json", ".jsx", ".css"]
    // extensions that are used
  },

  performance: {
    hints: "warning", // string false | error | warning
    // A warning will be displayed notifying you of a large asset.
    maxAssetSize: 300000, // int (in bytes),
    maxEntrypointSize: 5000000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
    }
  },

  devtool: "eval-source-map", // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.
  target: "web", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules
  stats: {
    // Examine all modules
    maxModules: Infinity,
    // Display bailout reasons
    optimizationBailout: true
  }, // lets you precisely control what bundle information gets displayed

  devServer: {
    proxy: {
      "/api": "http://localhost:3000"
      // proxy URLs to backend development server
    },
    historyApiFallback: true,
    // true for index.html upon 404, object for multiple paths
    contentBase: path.resolve(__dirname, "dist"),
    hot: true,
    stats: "errors-only",
    open: true,
    host: "localhost",
    port: 8080,
    compress: true,
    https: false,
    noInfo: false
    // only errors & warns on hot reload
  },

  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        NODE_PATH: JSON.stringify("./src")
      }
    }),
    new CopyWebpackPlugin([
      {
        from: "public/manifest.json",
        to: "manifest.json"
      },
      {
        from: "public/favicon.ico",
        to: "favicon.ico"
      }
    ]),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body"
    }),
    // Simplifies creation of HTML files to serve your webpack bundles
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].bundle.css"
    }),
    // uncomment this if u want to use browser sync
    // new BrowserSyncPlugin(
    //   {
    //     // browse to http://localhost:3000/ during development,
    //     // ./public directory is being served
    //     host: "localhost",
    //     //host for browser sync
    //     port: 8081,
    //     // port for browser sync
    //     proxy: "http://localhost:8080"
    //     // proxy from webpack dev server
    //   },
    //   {
    //     // prevent BrowserSync from reloading the page
    //     // and let Webpack Dev Server take care of this
    //     reload: false
    //   }
    // ),

    new webpack.HotModuleReplacementPlugin()
  ],
  //advance setting
  profile: false, // boolean
  // capture timing information
  bail: false, //boolean
  // fail out on the first error instead of tolerating it.
  cache: false, // boolean
  // disable/enable caching
  watch: false, // boolean
  // enables watching
  recordsPath: path.resolve(__dirname, "build/records.json"),
  recordsInputPath: path.resolve(__dirname, "build/records.json"),
  recordsOutputPath: path.resolve(__dirname, "build/records.json")
};
