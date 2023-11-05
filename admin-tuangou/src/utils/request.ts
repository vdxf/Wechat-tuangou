import router from '@/router'
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
    if (!respData) {
      return ElMessage({
        message: '网络繁忙，请稍后再试(1)',
        type: 'warning',
      })
    }
    const { Status } = respData
    if ([201].includes(Status)) {
      const userInfo = useUserStore()
      userInfo.AccessToken = ''
      localStorage.removeItem('AccessToken')
      router.replace('/login')
      return ElMessage({
        message: '登录已失效，请重新登录',
        type: 'warning',
      })
    }
    if (Status !== 0) {
      return ElMessage({
        message: '网络繁忙，请稍后再试(2)',
        type: 'warning',
      })
    }
    return respData
  },
  (error) => {
    console.log(error.config, '请求错误 => ', error)

    if (error && error.response) {
      const { status, data: respData } = error.response
      error = status ? `网络繁忙，请稍后再试[${status}]` : `网络繁忙，请稍后再试(3)`
      if (respData && respData.Message) {
        error = respData.Message
      }
    } else if (error && error.message) {
      error = error.message
    } else {
      error = `网络繁忙，请稍后再试(4)`
    }
    return ElMessage({
      message: error,
      type: 'warning',
    })
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
