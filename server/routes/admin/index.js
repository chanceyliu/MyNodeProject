module.exports = app => {
    // 使用module.exports这种写法既将该文件导出是一个函数，方便外部引用后可直接调用
    // 引用express
    const express = require('express')
    // 调用express框架的子路由
    const router = express.Router()
    const Category = require('../../models/Category')

    // 创建分类
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })
    // 通过id编辑分类
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 查询分类
    router.get('/categories', async (req, res) => {
        // limit(10)限制查询10条
        const items = await Category.find().limit(10)
        res.send(items)
    })
    // 通过id查询分类
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    // 通过id删除分类
    router.delete('/categories/:id', async (req, res) => {
        await Category.findByIdAndDelete(req.params.id),
        res.send({
            success: 'CODE_200',
            error: 'CODE_500',
        })
    })

    app.use('/admin/api', router)
}