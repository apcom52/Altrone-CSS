var webpack = require('webpack');

module.exports = {
    entry: "./src/entry.js",
    output: {
        path: __dirname + '/build',
        publicPath: "build/",
        filename: "altrone.js"
    }
}