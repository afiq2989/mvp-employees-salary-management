const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'), 
        filename: 'bundle.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],
    resolve: {
        alias: {
                '../../theme.config$': require('path').join(
                __dirname,
                '/src/semantic/theme.config',
            ),
        }
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react',
                          {
                            plugins: ['@babel/plugin-proposal-class-properties'
                            , '@babel/plugin-transform-runtime'
                          ],
                          },
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true,
                    },
                  },
                  {
                    loader: 'less-loader',
                    options: {
                      lessOptions: {
                        sourceMap: true,
                        math: 'always',
                        strictMath: false
                      },
                    },
                  },
                ]
            },
            {
              test: /\.scss$/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true,
                  },
                },
                {
                  loader: 'sass-loader'
                }
              ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/i,
                use: [
                  'file-loader',
                ],
            }
        ]
    }
}