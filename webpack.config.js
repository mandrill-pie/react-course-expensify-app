const dirname = __dirname;
const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.join(dirname, 'public'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			loader: 'babel-loader',
			test: /\.jsx?$/,
			exclude: /node_modules/,
			query: {
				presets: [
					'env',
					'react',
					'es2015'
				],
				plugins: [
					'transform-class-properties',
					'transform-object-rest-spread'
				]
			}
		}, {
			use: [
				'style-loader',
				'css-loader',
				'sass-loader'
			],
			test: /\.s?css$/
		}]
	},
	watch: true,
	devServer: {
		contentBase: path.join(dirname, 'public'),
		historyApiFallback: true
	},
	devtool: 'cheap-module-eval-source-map'
};