import request from '@/utils/axiosUtil'
import { Userinfo } from '@/piniastore/userinfo/index'

class UserApi {
  static userApi: UserApi = new UserApi()

  // login(username: string, password: string) {
  login(userinfo: Userinfo) {
    // 登录接口
    return request.post('/usermodule/login', false, userinfo)
  }
  loginRenewal(params: LoginRenewalParams) {
    // 登录续期接口 access_token 有效期为1小时，当超过1小时，需要调用该接口进行续期
    return request.post('/usermodule/loginrenewal', false, params)
  }

  registeredUsers(username: string, password: string) {
    return request.post('/usermodule/registeredUsers', false, {
      username,
      password
    })
  }
}

interface LoginRenewalParams {
  userid: number
  access_token: string
  refresh_token: string
}

export default UserApi.userApi
