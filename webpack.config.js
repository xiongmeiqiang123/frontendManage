const webpack = require('webpack'),
	path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	WebpackMd5Hash = require('webpack-md5-hash')

const config =  {
	devtool:'cheap-module-eval-source-map',
	entry: {
		main: './views/index.js'
	},
	output: {
        path: path.join(__dirname, './dist'),
        filename: '[name]/bundle.js'
    },
    plugins: [
    	new WebpackMd5Hash(),
    	new HtmlWebpackPlugin({
            template: './views/index.html',
            favicon: './views/static/favicon.ico'
    	})
    ],
    resolve: {
      alias: {
        vue: 'vue/dist/vue.js',
		conf: path.join(__dirname, './conf'),
		components: path.join(__dirname, './components'),
		}
    },
    module: {
	    rules: [
		    {
		        test: /\.vue$/,
		        loader: 'vue-loader'
		    },
	      	{
	            test: /\.js$/,
	            exclude: /node_modules/,
	            loader: 'babel-loader',
	            query: {
	                presets: ["vue-app", 'es2015', 'es2017'],
	                plugins: ["transform-class-properties", "transform-object-rest-spread", "transform-decorators", ["component", [
						    {
						      "libraryName": "element-ui",
						      "styleLibraryName": "theme-default"
						    }
				  	]]]
	            }
        	},
        	{
		        test: /\.css$/,
		        loader: 'style-loader!css-loader'
		    },
		    {
	            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
	            loader: 'file-loader'
	          },
	          {
	            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
	            loader: 'file-loader',
	            query: {
	              name: '[name].[ext]?[hash]'
	            }
	          }
	    ]
	 }
}

module.exports = config;
