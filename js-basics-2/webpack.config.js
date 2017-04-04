const path = require('path');
const Bluebird = require('bluebird');
const fs = Bluebird.promisifyAll(require('fs-extra'));

const getEntries = () => {
  const staticDir = path.join(__dirname, 'static');
  const dirs = fs.readdirSync(staticDir).filter(item => fs.statSync(path.join(staticDir, item)).isDirectory());
  
  const result = dirs.reduce((next, current) => {
    next[current] = ['babel-polyfill', `./${current}/index.js`];
    return next;
  }, {});

  return result;
};

getEntries();

module.exports = {
  entry: getEntries(),
  output: {
    path: path.resolve(process.cwd(), 'static'),
    filename: '[name].bundle.js'
  },
  context: path.resolve(process.cwd(), 'static'),
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(process.cwd(), 'static')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['latest'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};