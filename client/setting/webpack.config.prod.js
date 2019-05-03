const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
// const PurifyCSSPlugin = require('purifycss-webpack')
// const { InjectManifest } = require('workbox-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.config.js')

module.exports = merge(baseWebpackConfig, {
	optimization: {
		minimize: true,
		nodeEnv: 'production',
		sideEffects: true,
		concatenateModules: false,
		runtimeChunk: true,
		noEmitOnErrors: true,
		namedChunks: true,    
		moduleIds: 'hashed',
		chunkIds: 'named',
		mergeDuplicateChunks: false,
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					name: 'vendor/vendors',
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: 'initial'
				},
				common: {
					name: 'js/common',
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true
				}
			}
		}
	},

	plugins: [
		// // Simplifies creation of HTML files to serve your webpack bundles
		// new PurifyCSSPlugin({
		// 	// Give paths to parse for rules. These should be absolute!
		// 	paths: glob.sync(path.join(__dirname, 'src/*.html')),
		// 	minimize: true,
		// 	purifyOptions: {
		// 		whitelist: []
		// 	}
		// }),
		// // This plugin extracts CSS into separate files.
		// new InjectManifest({
		// 	swSrc: 'src/sw.js',
		// 	swDest: 'sw.js',
		// 	importWorkboxFrom: 'local'
		// }), 
		
		new webpack.DefinePlugin({
			'process.env': {
				API_PATH: JSON.stringify('http://localhost:3000/')
			}
		}),
		// Using workbox with injectManifest to create serive worker
		new CompressionPlugin({
			cache: true,
			// Enable/disable file caching.
			filename: '[path].gz[query]',
			// The target asset filename.
			algorithm: 'gzip',
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
})
