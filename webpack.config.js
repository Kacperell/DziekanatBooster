const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const javascript = {
    test: /\.(js)$/,
    use: [{
        loader: 'babel-loader',
        options: {
            presets: ["@babel/preset-env"]
        }
    }],
};

const postcss = {
    loader: 'postcss-loader',
    options: {
        plugins() {
            return [autoprefixer({
                browsers: 'last 3 versions'
            })];
        }
    }
};

const styles = {
    test: /\.(scss)$/,
    use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
};

const config = {
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    entry: {
        App: './client/index.js'
    },

    devtool: 'source-map',

    output: {

        path: path.resolve(__dirname, 'public', 'dist'),

        filename: '[name].bundle.js'
    },

    module: {
        // TODO: add bundled styles to public/dist
        rules: [javascript, styles]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
    ]
};
process.noDeprecation = true;

module.exports = config;