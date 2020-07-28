// 请求文件
import axios from 'axios'
import Vue from 'vue'
import router from './router/index'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

// 全局拦截报错的请求
http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
        // 与后端统一自行约定，当状态码等于401时返回登录页面
        if (err.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

// 当使用我们自定义的http请求的时候，带上一个自定义的请求头，既用户token，我们要以此来判断用户是否登录
http.interceptors.request.use(function (config) {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
})


export default http