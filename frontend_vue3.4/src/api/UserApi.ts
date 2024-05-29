import request from '@/utils/axiosUtil'
import { Userinfo, UserLoginPrams } from '@/piniastore/userinfo/index'

class UserApi {
  static userApi: UserApi = new UserApi()

  // login(username: string, password: string) {
  login(params: UserLoginPrams) {
    // 登录接口
    return request.post('/usermodule/login', false, params)
  }
  loginRenewal(params: LoginRenewalParams) {
    // 登录续期接口 access_token 有效期为1小时，当超过1小时，需要调用该接口进行续期
    return request.post('/usermodule/loginrenewal', false, params)
  }

  registeredUsers(params: UserLoginPrams) {
    return request.post('/usermodule/registeredUsers', false, params)
  }
  // 获取验证码
  getCaptcha() {
    return request.get('/usermodule/getCaptcha', false)
  }
}

interface LoginRenewalParams {
  userid: number
  access_token: string
  refresh_token: string
}

export default UserApi.userApi
