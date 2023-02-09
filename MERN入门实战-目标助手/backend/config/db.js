// 编写MongoDB验证，转换和业务逻辑是非常麻烦的. 所以我们发明了Mongoose.
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
// const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
// Mongoose为模型提供了一种直接的，基于scheme结构去定义你的数据模型。它内置数据验证， 查询构建，业务逻辑钩子等，开箱即用。



const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
