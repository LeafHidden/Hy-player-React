import axios from 'axios'
import { METHOD } from './config'
import baseURL from "../baseURL";
axios.defaults.baseURL = baseURL.url
axios.defaults.timeout = 50000
// 请求携带cookie
axios.defaults.withCredentials = true



// let loading = null;
// 添加请求拦截器

axios.interceptors.request.use(
    function (config) {

        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {

    
        return response;
    },
    function (error) {



        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export function request (method, url, parmas) {
    switch (method) {
        case METHOD.GET:
            return GET(url, parmas);
        case METHOD.POST:
            return POST(url, parmas);
        case METHOD.PUT:
            return PUT(url, parmas)
        case METHOD.DELETE:
            return DELETE(url, parmas);
            default: break;
    }
}
function GET (url, params) {
    return axios.get(url, params);
}

function POST (url, params) {
    return axios.post(url, params);
}

function PUT (url, params) {
    return axios.put(url, params);
}
function DELETE (url, params) {
    return axios.delete(url, params);
}