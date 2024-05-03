import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import Storage, { OPTION } from '@/utils/goodstorageutil'
import UserApi from '@/api/UserApi'

function hasProps(obj: Record<string, any>) {
  return obj && Object.getOwnPropertyNames(obj).length
}

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
    // 获取所有购物车列表接口
    async login(username: string, password: string) {
      const loginUser = { username, password } as Userinfo
      const result: AxiosResponse<Userinfo> = await UserApi.login(loginUser)

      this.userinfo = result.data

      Storage.set('token', result.data.token as string)
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
  token?: string
}

type InitUserState = {
  userinfo: Userinfo
}

const initUserState: InitUserState = {
  userinfo: {} as Userinfo
}
