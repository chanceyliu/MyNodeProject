const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    // 使用bcrypt组件对密码进行加密，使数据库中保存的数据非明文
    password: {
        type: String,
        // 设置查询时密码不会被查出
        select: false,
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    },
})

module.exports = mongoose.model('AdminUser', schema)