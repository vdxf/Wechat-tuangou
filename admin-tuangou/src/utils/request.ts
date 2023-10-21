import useUserStore from '@/stores/modules/user'
import axios, { type AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
const ajax = axios.create({
  baseURL: '/api/admin',
  timeout: 10000
})
// 请求拦截
ajax.interceptors.request.use(
  (config) => {
    const { data, params } = config
    console.log(config, '请求参数 => ', data || params)
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 响应拦截器
ajax.interceptors.response.use(
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

const request = <T = any>(
  url: string,
  data: Record<string, any> = {},
  options?: Omit<AxiosRequestConfig, 'params' | 'data' | 'url'>,
): Promise<T> => {
  const { method, headers = {} } = (options = Object.assign(
    {
      url,
      method: 'get',
    },
    options,
  ))

  const userInfo = useUserStore()
  const { AccessToken } = userInfo || {}
  if (AccessToken) {
    options.headers = Object.assign(headers, { AccessToken })
  }

  return ajax({
    ...options,
    url,
    [method.toLocaleLowerCase() === 'get' ? 'params' : 'data']: data,
  })
}

export default request
