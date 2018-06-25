/**
 * Webpack config file for blocktron-lib development
 * Sandeep Vattapparambil
 */

//Constants
const path = require('path');
const webpack = require('webpack');
const PrettierPlugin = require('prettier-webpack-plugin');
const fs = require('fs');

//Include the node modules
let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

//Webpack config object
module.exports = {
    //set webpack build mode
    mode: 'none',
    //set target as server (node)
    target: 'node',
    //Configuration settings
    plugins: [
        new PrettierPlugin({
            'parser': 'flow',
            'singleQuote': true,
            'printWidth': 90,
            'tabWidth': 3,
            'useTabs': false,
            'semi': true,
            'encoding': 'utf-8',
            'extensions': ['.js', '.ts']
        })
    ],
    //set minification flag
    optimization: {
        minimize: false
    },
    //set webpack bundle entry point
    entry: './bin/server.js',
    //set webpack bundle output
    output: {
        //set output target for commonjs require
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
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
    devtool: 'source-map'
};
