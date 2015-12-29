module.exports = {
    entry: {
        index: ['./js/index.js'],
    },
    output: {
        filename: 'index.js',
        path: './out'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loaders: ['raw', 'html-minify']
            }
        ]
    }
};
