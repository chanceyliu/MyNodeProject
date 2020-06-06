module.exports = app => {
    const mongoose = require("mongoose")
    // 借助mongoose组件连接MongoDB数据库
    mongoose.connect('mongodb://127.0.0.1/node-vue-moba',{
        useNewUrlParser: true
    })
}