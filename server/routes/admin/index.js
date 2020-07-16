module.exports = app => {
    // 使用module.exports这种写法既将该文件导出是一个函数，方便外部引用后可直接调用
    // 引用express
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const AdminUser = require('../../models/AdminUser');
    // 调用express框架的子路由
    const router = express.Router({
        // 表示将路径合并至可获取的参数里
        mergeParams: true
    })
    // const Category = require('../../models/Category')

    // 创建分类
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 通过id编辑分类
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 查询分类
    router.get('/', async (req, res, next) => {
        // 取出前端传入的token
        const token = String(req.headers.authorization || '').split(' ')[1];
        // 解密token并校验，返回登录用户的ID
        const { id } = jwt.verify(token, app.get('secret'));
        req.user = await AdminUser.findById(id)
        console.log(req.user)
        await next()
    }, async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        // limit(10)限制查询10条,setOptions使我们需要关联查询的字段变为动态的
        const items = await req.Model.find().setOptions(queryOptions)
        res.send(items)
    })
    // 通过id查询分类
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 通过id删除分类
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id),
            res.send({
                success: 'CODE_200',
                error: 'CODE_500',
            })
    })

    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        // 调用next(),执行完当前函数，继续执行下一个，一般来说最后一个操作就直接省略掉了next()
        next()
    }, router)


    // 上传文件接口
    const multer = require('multer')
    // 定义文件要上传到服务端项目的哪个文件夹下
    const upload = multer({
        dest: __dirname + '/../../uploads/'
    })
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录接口
    app.post('/admin/api/login', async (req, res) => {
        // 对象解构赋值
        const { username, password } = req.body;
        // 1.根据用户名在数据库中找到该用户数据(因为之前查询用户信息时屏蔽了密码，所以现在要加上)
        const user = await AdminUser.findOne({
            name: username
        }).select('+password');
        console.log(user)
        if (!user) {
            return res.status(422).send({
                message: '用户不存在'
            })
        }
        // 2.校验密码
        // 利用bcryptjs内置方法比对密码和散列后的密码是否匹配
        const isValid = require('bcryptjs').compareSync(password, user.password);
        if (!isValid) {
            return res.status(422).send({
                message: '密码错误'
            })
        }
        // 3.返回token
        const token = jwt.sign({ id: user._id }, app.get('secret'));
        res.send({ token })
    })
}