import axios from 'axios'
import { ElMessage } from 'element-plus'
const request = axios.create({
  baseURL: '/api/admin',
  timeout: 10000
})
// 请求拦截
request.interceptors.request.use(
  (config) => {
    //config: 请求拦截器回调注入的对象(配置对象)
    //可以通过请求头携带公共参数-token
    console.log(config, '请求参数 => ')
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data: respData, config } = response
    console.log(config, '请求结果 => ', respData)
    return respData
  },
  (error) => {
    const status = error.response.status
    let message = ''
    switch (status) {
      case 401:
        message = '登录时间过期'
        break
      case 403: 
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
      case 501:
      case 502:
      case 503:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    ElMessage({
      type: 'error',
      message
    })
    return Promise.reject(new Error(error))
  }
)

export default request
