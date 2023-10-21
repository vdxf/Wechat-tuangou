import request from '@/utils/request'
import type { LoginForm, LoginResponseData, UserResponseData } from './type'

//用户登录
export const reqLogin = (data: LoginForm) => 
  request<LoginResponseData>('/Passport/Login', data, { method: 'POST' })
//用户登出
export const reqLoginOut = () => request('/Passport/LoginOut')
//获取管理员详情
export const reqUserInfo = (data: any) => request<any,UserResponseData>('/User/GetManagersInfo', data, { methods: 'POST' })