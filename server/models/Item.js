const mongoose = require('mongoose')

// 该文件就是在我们的MongoDB数据库中创建了一张Category表，new一个Schema指定该表中的字段和类型
const schema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String }
})

module.exports = mongoose.model('Item', schema)