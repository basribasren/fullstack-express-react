const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
	mode: isProduction ? 'production' : 'development',

	entry: {
		index: './src/main.js'
	},

	devtool: isProduction ? 'none' : 'source-map',

	target: 'web',

	output: {
		path: path.resolve(__dirname, '..', 'dist'),
		filename: 'js/[name].[hash].js',
		chunkFilename: 'js/[name].[hash].js',
		publicPath: '/'
	},

	resolve: {
		modules: ['node_modules'],
		extensions: ['*', '.js', '.json', '.jsx', '.css'],
		// alias: {
		// '@': path.resolve(__dirname, '..', 'src'),
		//   react: 'preact-compat',
		//   'react-dom': 'preact-compat'
		// },
		// symlinks: false
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
					options: {
						minimize: true,
						removeComments: false,
						collapseWhitespace: false
					}
				}]
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, 
					{
						loader: 'css-loader',
						options: {
							minimize: true,
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(ico|png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff|woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'media/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.svg$/,
				use: [{
					loader: 'svg-url-loader',
					options: {
						// Inline files smaller than 10 kB
						limit: 10 * 1024,
						noquotes: true
					}
				}]
			},
			{
				test: /\.txt$/,
				use: ['raw-loader']
			}
		]
	},

	performance: {
		hints: isProduction ? 'warning' : false, // string false | error | warning
		maxAssetSize: 300000, // int (in bytes),
		maxEntrypointSize: 300000, // int (in bytes)
	},


	stats: {
		maxModules: Infinity,
		optimizationBailout: true
	},

	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: 'public/manifest.json',
				to: 'manifest.json'
			},
			{
				from: 'public/favicon.ico',
				to: 'favicon.ico'
			}
		]),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			filename: 'index.html',
			inject: 'body'
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css',
			chunkFilename: 'css/[id].[hash].css'
		})
	]
}
