//登录需要携带的参数
export interface LoginForm {
  Account: string,
  Password: string
}
//登录返回的数据
export interface LoginResponseData {
  Status: number,
  Message: string,
  Id: string,
  Extend: string,
  Data: {
    AccessToken: string,
    ExpireDate: string
  }
}
//返回管理员详情的数据
export interface UserResponseData {
  Status: number,
  Message: string,
  Id: string,
  Extend: string,
  Data: {
    CreatedDate: string,
    LastModified: string,
    IsSuspent: boolean,
    IsDeleted: boolean,
    DbOperateType: number,
    Id: number,
    Name: string,
    Account: string,
    Password: string,
    IconPath: string,
    Sex: number,
    Mobile:string,
    LastLoginDate: string,
    AccessToken: string,
    ExpireDate: string,
    UserType: number
  }
}