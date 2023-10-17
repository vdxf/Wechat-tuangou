import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { LoginForm,LoginResponseData } from '@/api/user/type'
const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: localStorage.getItem("TOKEN"),
    }
  },
  actions: {
    async userLogin(data: LoginForm){
      const res:LoginResponseData = await reqLogin(data)
      if (res.Status === 0){
        this.token = res.Data.AccessToken
        localStorage.setItem("TOKEN", res.Data.AccessToken)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.Message))
      }
    }
  },
  getters: {}
})
export default useUserStore
