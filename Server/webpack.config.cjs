module.exports = [
    {
        name: 'server',
        entry: './index.js',
        target: 'node',
        output: {
            path: __dirname + '/dist',
            filename: 'index.js',
        },
        resolve: {
            modules: [
            "node_modules"
            ],
            extensions: [".js"]
        },
        mode: 'production'
    }
]