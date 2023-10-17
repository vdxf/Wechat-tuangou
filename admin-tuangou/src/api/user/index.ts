import request from '@/utils/request'
import type { LoginForm, LoginResponseData, UserResponseData } from './type'

//用户登录
export const reqLogin = (data: LoginForm) => request.post<any,LoginResponseData>('/Passport/Login', data)
//用户登出
export const reqLoginOut = () => request.get('/Passport/LoginOut')
//获取管理员详情
export const reqUserInfo = (data: any) => request.get<any,UserResponseData>('/User/GetManagersInfo', data)