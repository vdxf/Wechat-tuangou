export interface Response {
  Status: number,
  Message: string,
  Id: string,
  Extend: string,
}

//登录需要携带的参数
export interface LoginForm {
  Account: string,
  Password: string
}
//登录返回的数据
export interface LoginResponseData extends Response {
  Data: {
    AccessToken: string,
    ExpireDate: string
  }
}