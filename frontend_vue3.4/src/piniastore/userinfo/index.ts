import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import Storage, { OPTION } from '@/utils/goodstorageutil'
import UserApi from '@/api/UserApi'
import { hasProps } from '@/utils'

export default defineStore('userinfoStrore', {
  state: () => {
    return initUserState
  },
  getters: {
    storeLoginUser(state): Userinfo {
      return hasProps(state.userinfo) ? state.userinfo : Storage.get('userinfo')
    }
  },
  actions: {
    setUserinfo(userinfo: Userinfo) {
      this.userinfo = userinfo
    },
    // 获取所有购物车列表接口
    async login(username: string, password: string) {
      const loginUser = { username, password } as Userinfo
      const result: AxiosResponse<Userinfo> = await UserApi.login(loginUser)

      this.userinfo = result.data

      Storage.set('access_token', result.data.access_token as string)
      Storage.set('refresh_token', result.data.refresh_token as string)
      Storage.set('userid', result.data.userid)
      Storage.set('userinfo', result.data)
    },
    async registeredUsers(username: string, password: string) {
      const result: AxiosResponse<Userinfo> = await UserApi.registeredUsers(
        username,
        password
      )
      this.userinfo = result.data

      Storage.set('access_token', result.data.access_token as string)
      Storage.set('refresh_token', result.data.refresh_token as string)
      Storage.set('userid', result.data.userid)
      Storage.set('userinfo', result.data)
    }
  }
})

export type Userinfo = {
  userid: number
  username: string
  password: string
  address: string
  valid: number
  birth: Date
  access_token?: string
  refresh_token?: string
}

type InitUserState = {
  userinfo: Userinfo
}

const initUserState: InitUserState = {
  userinfo: {} as Userinfo
}
