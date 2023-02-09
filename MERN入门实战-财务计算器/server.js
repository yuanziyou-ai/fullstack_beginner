const path = require('path');
const express = require('express');
const dotenv = require('dotenv');//NPM库：dotenv，从文件加载环境变量
//Node.js 中有不少常用的 Color 模块，例如 chalk、colors.js、cli-color 等，通过这些模块我们输出各种带颜色、方面区分或者更酷的日志以及 CLI 工具提示。
const colors = require('colors');
//morgan是express默认的日志中间件，也可以脱离express，作为node.js的日志组件单独使用。
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

