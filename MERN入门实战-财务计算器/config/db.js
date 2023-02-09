const mongoose = require('mongoose');
// Mongoose为模型提供了一种直接的，基于scheme结构去定义你的数据模型。它内置数据验证， 查询构建，业务逻辑钩子等，开箱即用。
// Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成。
// 允许使用的 SchemaTypes 有:
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    process.exit(1);
  }
}

module.exports = connectDB;