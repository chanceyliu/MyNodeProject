const express = require("express")

const app = express()

// 因为./routes/admin下的index.js文件定义的接口直接抛出的是一个函数，
// 所以这里加上()直接调用，并且把app对象当作参数传入该函数
require('./routes/admin')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})