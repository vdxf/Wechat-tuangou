import { defineStore } from 'pinia'
import { reqLogin, reqLoginOut } from '@/api/user'
import type { LoginForm,LoginResponseData } from '@/api/user/type'
import type { UserState } from './type/type'
import { firstRoute } from '@/router/firstRoute'
const useUserStore = defineStore('User', {
  state: ():UserState => {
    return {
      AccessToken: localStorage.getItem("AccessToken"),
      Id: localStorage.getItem("Id"),
      menuRoutes: firstRoute
    }
  },
  actions: {
    async userLogin(data: LoginForm){
      const res:LoginResponseData = await reqLogin(data)
      if (res.Status === 0){
        localStorage.setItem("AccessToken", res.Data.AccessToken)
        localStorage.setItem("Id", res.Id)
      } else {
        return Promise.reject(new Error(res.Message))
      }
    },
    async userLoginOut() {
      await reqLoginOut()
      localStorage.removeItem('AccessToken')
      localStorage.removeItem('Id')
    }
  },
  getters: {}
})
export default useUserStore
