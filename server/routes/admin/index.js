module.exports = app => {
    // 使用module.exports这种写法既将该文件导出是一个函数，方便外部引用后可直接调用
    // 引用express
    const express = require('express')
    // 调用express框架的子路由
    const router = express.Router()
    const Category = require('../../models/Category')

    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        console.log('categories路由请求---------',model);
        res.send(model)
    })

    app.use('/admin/api', router)
}