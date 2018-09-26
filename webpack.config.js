var path = require("path");
var Html = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "./js/out.js",
        path: path.resolve(__dirname, "docs")
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "stage-2", "react"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new Html({
            filename: "index.html",
            template: "./index.html"
        })
    ]
};
