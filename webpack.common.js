const path = require("path");

module.exports = {
    // 'babel-polyfill',
    entry: ["./src/index.tsx"], // babel-polyfill for async await, entry point for building internal dependency graph
    output: {
        // where webpack emits the bundles and its name
        filename: "[name].[fullhash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        chunkFilename: "[id].[contenthash].js", 
    },
    devServer: {
        historyApiFallback: true,
        port: 8080,
    },
    devtool: "source-map", // So we can debug react in chrome rather than vanilla JS
    target: "web", // Instructs webpack to target a specific environment (web default)
    resolve: {
        // Configure how modules are resolved
        modules: [__dirname, "src", "node_modules"], // Tell webpack what directories should be searched when resolving modules
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"], // Attempt to resolve these extensions in order
    }
}
