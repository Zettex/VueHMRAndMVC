var path = require('path')
var webpack = require('webpack')
var fs = require('fs')

var appBundlePath = './src/bundle/'
var appBasePath = './src/common/'

var jsEntries = {}
// We search for index.js files inside basePath folder and make those as entries
fs.readdirSync(appBasePath).forEach(function (name) {
    var indexFile = appBasePath + name + '/index.js'
    console.log(name, indexFile)
    if (fs.existsSync(indexFile)) {
        jsEntries[name] = indexFile
    }

    console.log('----------------------------------------------')
})

// Нужно получать файлы вида: {имя скрипта} {Путь старта + имя скрипта (папка) + index.js}
// 

module.exports = {
    entry: () => //jsEntries, 
    {
        function getFiles(startPath) {
            var results = []
            var files = fs.readdirSync(startPath)
            files.forEach(function (name) {
                var filename = path.join(startPath, name)
                var fullPath = path.join(filename, '/index.js')
                console.log('filename: ' + filename + '\t\t', '|||       fullPath: ' +  fullPath)
                var stat = fs.lstatSync(filename)
                if (fs.existsSync(fullPath)) {
                    results.push({ name, path: fullPath })
                }
                else if (stat.isDirectory()) {
                    results = results.concat(getFiles(filename))
                } 
            })
            return results
        }

        var entryPoints = {}
        getFiles(appBasePath).forEach(function (file) {
            const { name, path } = file
            console.log(file)
            entryPoints[name] = '.\\' + path
        })

        return entryPoints
    },
    output: {
        path: path.resolve(__dirname, appBundlePath),
        publicPath: '/src/bundle/',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, appBasePath)
        }
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
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
    },
    devServer: {
        proxy: {
            '*': {
                target: 'http://localhost:5001',
                changeOrigin: true
            }
        }
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
}
