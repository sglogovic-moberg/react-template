const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = env => {
    return merge(common, {
        mode: "development", // mode for build-in optimizations to correnspond for each environment
        plugins: [
            // perform wide range of tasks like bundle optimization, asset management and injection of environment variables.
            new HtmlWebpackPlugin({
                // generates an HTML and automatically injects all your generated bundles
                favicon: "./src/favicon.png",
                template: "./src/index.html",
            }),
            new ForkTsCheckerWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(), // DEV ONLY!!! HMR exchanges, adds, or removes modules while an application is running, without a full reload
            new ReactRefreshWebpackPlugin(), // DEV ONLY!!! "Fast Refresh" for React components.
            new CopyPlugin({
                patterns: [{ from: "./src/scripts", to: "./scripts" }],
            }),
        ],
        devServer: {
            hot: true, // HMR
            historyApiFallback: true,
        },
        module: {
            // determine how the different types of modules within a project will be treated
            rules: [
                {
                    test: /\.ts$|tsx/, // Include all modules that pass test assertion
                    exclude: /node_modules/, // Exclude all modules matching any of these conditions
                    loader: require.resolve("babel-loader"), // which loader to use
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.png|jpg|gif$/,
                    use: ["file-loader"],
                },
                {
                    test: /\.svg$/,
                    use: ["@svgr/webpack", "file-loader"],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
            ],
        },
    });
};
