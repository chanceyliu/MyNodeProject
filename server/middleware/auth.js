module.exports = options => {
    // 登录校验中间件
    const jwt = require('jsonwebtoken');
    const assert = require('http-assert');
    const AdminUser = require('../models/AdminUser');

    return async (req, res, next) => {
        // 取出前端传入的token
        const token = String(req.headers.authorization || '').split(' ')[1];
        assert(token, 401, '请先登录');
        // 解密token并校验，返回登录用户的ID
        const { id } = jwt.verify(token, req.app.get('secret'));
        assert(id, 401, '请先登录');
        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录');
        await next()
    }
}