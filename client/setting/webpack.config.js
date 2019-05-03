const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config.js')

module.exports = merge(baseWebpackConfig, {

	devServer: {
		proxy: {
			'/api': 'http://localhost:3000'
			// proxy URLs to backend development server
		},
		historyApiFallback: true,
		hot: true,
		open: true,
		host: 'localhost',
		port: 8080,
		compress: true,
	},

	plugins: [
		// // uncomment this if u want to use browser sync
		// new BrowserSyncPlugin(
		// 	{
		// 		// browse to http://localhost:3000/ during development,
		// 		// ./public directory is being served
		// 		host: 'localhost',
		// 		//host for browser sync
		// 		port: 8081,
		// 		// port for browser sync
		// 		proxy: 'http://localhost:8080'
		// 		// proxy from webpack dev server
		// 	},
		// 	{
		// 		// prevent BrowserSync from reloading the page
		// 		// and let Webpack Dev Server take care of this
		// 		reload: false
		// 	}
		// ),
		
		new webpack.DefinePlugin({
			'process.env': {
				API_PATH: JSON.stringify('http://localhost:3000/api')
			}
		}),
		new FriendlyErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
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
	recordsPath: path.resolve(__dirname, '../build/records.json'),
	recordsInputPath: path.resolve(__dirname, '../build/records.json'),
	recordsOutputPath: path.resolve(__dirname, '../build/records.json')
})
