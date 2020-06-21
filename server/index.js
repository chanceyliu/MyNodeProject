const express = require("express")

const app = express()

// 引用跨域模块，express框架内置的转json方法
app.use(require('cors')())
app.use(express.json())
// 利用express框架的static方法托管一个静态文件夹，使静态文件可以通过这个前缀来访问
app.use('/uploads', express.static(__dirname + '/uploads'))

// 因为./routes/admin下的index.js文件定义的接口直接抛出的是一个函数，
// 所以这里加上()直接调用，并且把app对象当作参数传入该函数
require('./routes/admin')(app)
// 与路由同理，引用数据库文件
require('./plugins/mongodb')(app)

app.listen(3000, () => {
    console.log('服务器启动成功，地址-----http://localhost:3000')
})