import request from '@/utils/axiosUtil'
import { Userinfo } from '@/piniastore/userinfo/index'

class UserApi {
  static userApi: UserApi = new UserApi()

  // login(username: string, password: string) {
  login(userinfo: Userinfo) {
    // 登录接口
    return request.post('/usermodule/login', false, userinfo)
  }
}

export default UserApi.userApi
