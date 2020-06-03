module.exports = app => {
    // 引用express
    const express = require('express')
    // 调用express框架的子路由
    const router = express.Router()

    app.use('/admin/api',router)
}