import axios, { type AxiosRequestConfig } from 'axios'
import { useUserinfoStore } from '@/stores'
import { formatPathParams } from '@daysnap/utils'
import router from '@/router'
import { log } from './log'

const { host } = window.location

export const baseURL =
  host.includes('localhost') || host.includes('daysnap')
    ? 'https://dz.xuetang51.com/'
    : '//xyt.51jiachang.com/'

const instance = axios.create({
  baseURL,
  timeout: 60 * 1000,
  responseType: 'json',
})

instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const { data, params } = config
    log(config, `请求参数 =>`, data || params)

    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { data: respData, config } = response
    log(config, '请求返回 => ', respData)

    if (!respData) {
      return Promise.reject(`网络繁忙，请稍后再试(1)`)
    }

    const { Status, Message, Data } = respData
    if ([201].includes(Status)) {
      const { setUserinfo } = useUserinfoStore()
      setUserinfo(void 0)
      router.replace('/login')
      return Promise.reject(`登录已失效，请重新登录`)
    }
    if (Status !== 0) {
      return Promise.reject(Message || `网络繁忙，请稍后再试(2)`)
    }

    return Data
  },
  (error) => {
    log(error.config, '请求错误 => ', error)

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
    return Promise.reject(error)
  },
)

const curl = <T = any>(
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

  const { userinfo } = useUserinfoStore()
  const { AccessToken } = userinfo || {}
  if (AccessToken) {
    options.headers = Object.assign(headers, { AccessToken })
  }

  // 转换 url path params
  if (!(data instanceof FormData)) {
    ;({ path: url, rest: data } = formatPathParams(url, data))
  }

  return instance({
    ...options,
    url,
    [method.toLocaleLowerCase() === 'get' ? 'params' : 'data']: data,
  })
}

export default curl
