import { defineStore } from 'pinia'
import { useState } from '@daysnap/vue-use'
import type { Userinfo } from '@/types'
import { createNamespace } from '@/utils'
import { withOut } from '../withOut'

export const useUserinfoStore = withOut(
  defineStore(
    createNamespace('USER_INFO'),
    () => {
      const [userinfo, setUserinfo] = useState<Userinfo>()
      return { userinfo, setUserinfo }
    },
    {
      persist: true,
    },
  ),
)
