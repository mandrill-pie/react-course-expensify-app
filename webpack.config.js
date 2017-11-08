const dirname = __dirname;
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
	const isProduction = env === 'production';
	const CSSExtract = new ExtractTextPlugin('styles.css');
	console.log(isProduction ? 'Production build' : 'Development build');

	return {
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
						//'es2015'
					],
					plugins: [
						'transform-class-properties',
						'transform-object-rest-spread'
					]
				}
			}, {
				use: CSSExtract.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				}),
				test: /\.s?css$/
			}]
		},
		plugins: [
			CSSExtract
		],
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: {
			contentBase: path.join(dirname, 'public'),
			historyApiFallback: true
		}
	};
};