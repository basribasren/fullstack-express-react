const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production", // production || development
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

  optimization: {
    minimize: true,
    nodeEnv: "production",
    sideEffects: true,
    concatenateModules: false,
    runtimeChunk: true
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
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png|gif)$/,
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
  devtool: "source-map", // enum
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
  },
  // lets you precisely control what bundle information gets displayed

  plugins: [
    new CleanWebpackPlugin(["dist"]),
    // plugin to remove your build folder(s) before building
    new webpack.DefinePlugin({
      "process.env": {
        NODE_PATH: JSON.stringify("./src"),
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // The DefinePlugin allows you to create global constants
    // which can be configured at compile time
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
    // copyWebpack Plugin for copy the staic file from public dir
    new HtmlWebpackPlugin({
      template: "public/index.html",
      // input html that use
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      // minify the html file
      filename: "index.html",
      // output file name
      inject: "body"
      // place to inject the bundle
    }),
    // Simplifies creation of HTML files to serve your webpack bundles
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, "src/*.html")),
      minimize: true,
      purifyOptions: {
        whitelist: []
      }
    }),
    // This plugin extracts CSS into separate files.
    new InjectManifest({
      swSrc: "src/sw.js",
      swDest: "sw.js",
      importWorkboxFrom: "local"
    }),
    // Using workbox with injectManifest to create serive worker
    new CompressionPlugin({
      cache: true,
      // Enable/disable file caching.
      filename: "[path].gz[query]",
      // The target asset filename.
      algorithm: "gzip",
      // The compression algorithm/function.
      test: /\.js$|\.css$|\.html$/,
      // Test to match files against.
      threshold: 1024,
      // Only assets bigger than this size are processed. In bytes.
      minRatio: 0.8
      // Only assets that compress better than this ratio are processed
    }),
    // Prepare compressed versions of assets to serve them with Content-Encoding
    // Visualize size of webpack output files with an interactive zoomable treemap
    new webpack.optimize.AggressiveMergingPlugin({ minSizeReduce: 1.5 })
  ],

  // Don't attempt to continue if there are any errors.
  bail: true
};
