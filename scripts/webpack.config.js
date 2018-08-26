/**
 * Webpack config file for blocktron-node
 * Sandeep Vattapparambil
 */

//Constants
const path = require('path');
const webpack = require('webpack');
const PrettierPlugin = require('prettier-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

//Webpack config object
module.exports = (env) => {
    return {
        //set webpack build mode
        mode: env && env.production === true ? 'production' : 'development',
        //Node polyfills
        node: {
            process: true
        },
        target: 'node',
        //add a banner
        plugins: [
            new webpack.BannerPlugin({
                banner: '//Blocktron-node (c) 2018, Sandeep Vattapparambil',
                raw: true
            }),
            new webpack.BannerPlugin({
                banner: '#!/usr/bin/env node',
                raw: true
            }),
            new PrettierPlugin({
                'parser': 'flow',
                'singleQuote': true,
                'printWidth': 90,
                'tabWidth': 3,
                'useTabs': false,
                'semi': true,
                'encoding': 'utf-8',
                'extensions': ['.js']
            })
        ],
        //exclude node_modules
        externals: [nodeExternals()],
        //set minification flag
        optimization: {
            minimize: env && env.production === true ? true : false
        },
        //set webpack bundle entry point
        entry: path.resolve(__dirname, '../', 'bin/server.js'),
        //set webpack bundle output
        output: {
            //set output target for UMD
            library: 'blocktron-node',
            libraryTarget: 'commonjs2',
            path: path.resolve(__dirname, '../', 'dist'),
            filename: env && env.production === true ? 'blocktron_node.min.js' : 'blocktron_node.js'
        },
        //set up babel transpiler
        module: {
            rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }]
        },
        //set console logs in color
        stats: {
            colors: true
        },
        //include source-map in builds
        devtool: 'cheap-source-map'
    }
};
