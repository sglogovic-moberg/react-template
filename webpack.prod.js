const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CreateFileWebpack = require("create-file-webpack");
const path = require("path");

module.exports = env => {
    return merge(common, {
        mode: "production", // mode for build-in optimizations to correnspond for each environment
        plugins: [
            // perform wide range of tasks like bundle optimization, asset management and injection of environment variables.
            new HtmlWebpackPlugin({
                // generates an HTML and automatically injects all your generated bundles
                favicon: "./src/favicon.png",
                template: "./src/index.html",
            }),
            new CompressionPlugin(),
            new CopyPlugin({
                patterns: [{ from: "./src/scripts", to: "./scripts" }],
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    TARGET_ENV: JSON.stringify(env.TARGET_ENV),
                    BUILD_NUMBER: JSON.stringify(process.env.BUILD_NUMBER || "dev"),
                },
            }),
            new CreateFileWebpack({
                // path to folder in which the file will be created
                path: path.resolve(__dirname, "dist"),
                // file name
                fileName: "version",
                // content of the file
                content: "1.0." + process.env.BUILD_NUMBER,
            }),
        ],
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
        optimization: {
            moduleIds: "deterministic",
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/](react|react-dom|react-lottie-player|luxon|i18next|lottie-web)[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            },
            usedExports: true,
            // https://webpack.js.org/plugins/terser-webpack-plugin/
            // This plugin uses terser to minify/minimize your JavaScript.
            minimize: true,
            minimizer: [new TerserPlugin()],
        },
    });
};
